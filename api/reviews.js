// Reviews API for Pitt Metro Realty
// Handles CRUD operations for reviews with caching and database persistence

const mysql = require('mysql2/promise');
const crypto = require('crypto');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pittmetro_reviews',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4'
};

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const cache = new Map();

class ReviewsAPI {
  constructor() {
    this.pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  // Generate cache key
  generateCacheKey(operation, params = {}) {
    const keyData = `${operation}_${JSON.stringify(params)}`;
    return crypto.createHash('md5').update(keyData).digest('hex');
  }

  // Cache management
  setCache(key, data, duration = CACHE_DURATION) {
    const expiresAt = Date.now() + duration;
    cache.set(key, { data, expiresAt });
  }

  getCache(key) {
    const cached = cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }
    if (cached) {
      cache.delete(key);
    }
    return null;
  }

  clearCache(pattern = '') {
    if (pattern) {
      for (const key of cache.keys()) {
        if (key.includes(pattern)) {
          cache.delete(key);
        }
      }
    } else {
      cache.clear();
    }
  }

  // Get all approved reviews
  async getReviews(limit = 10, offset = 0) {
    const cacheKey = this.generateCacheKey('reviews', { limit, offset });
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const [rows] = await this.pool.execute(
        'SELECT * FROM reviews WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
        ['approved', limit, offset]
      );

      const result = {
        reviews: rows,
        total: rows.length,
        limit,
        offset
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw new Error('Failed to fetch reviews');
    }
  }

  // Get review statistics
  async getReviewStats() {
    const cacheKey = this.generateCacheKey('stats');
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const [rows] = await this.pool.execute(
        `SELECT 
          COUNT(*) as total_reviews,
          AVG(rating) as average_rating,
          COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star_reviews,
          COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star_reviews,
          COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star_reviews,
          COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star_reviews,
          COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star_reviews
        FROM reviews WHERE status = 'approved'`
      );

      const stats = rows[0];
      stats.average_rating = parseFloat(stats.average_rating).toFixed(1);

      this.setCache(cacheKey, stats, 10 * 60 * 1000); // Cache stats for 10 minutes
      return stats;
    } catch (error) {
      console.error('Error fetching review stats:', error);
      throw new Error('Failed to fetch review statistics');
    }
  }

  // Add new review
  async addReview(reviewData) {
    const {
      name,
      email,
      location,
      rating,
      review_text,
      property_type,
      ip_address = null,
      user_agent = null
    } = reviewData;

    // Validation
    if (!name || !email || !rating || !review_text) {
      throw new Error('Missing required fields');
    }

    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }

    try {
      const [result] = await this.pool.execute(
        `INSERT INTO reviews (name, email, location, rating, review_text, property_type, ip_address, user_agent, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
        [name, email, location, rating, review_text, property_type, ip_address, user_agent]
      );

      // Clear cache to ensure fresh data
      this.clearCache('reviews');
      this.clearCache('stats');

      return {
        id: result.insertId,
        message: 'Review added successfully',
        review: {
          id: result.insertId,
          name,
          email,
          location,
          rating,
          review_text,
          property_type,
          created_at: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error adding review:', error);
      throw new Error('Failed to add review');
    }
  }

  // Update review status (admin function)
  async updateReviewStatus(reviewId, status) {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      throw new Error('Invalid status');
    }

    try {
      await this.pool.execute(
        'UPDATE reviews SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, reviewId]
      );

      // Clear cache
      this.clearCache('reviews');
      this.clearCache('stats');

      return { message: 'Review status updated successfully' };
    } catch (error) {
      console.error('Error updating review status:', error);
      throw new Error('Failed to update review status');
    }
  }

  // Delete review (admin function)
  async deleteReview(reviewId) {
    try {
      await this.pool.execute('DELETE FROM reviews WHERE id = ?', [reviewId]);

      // Clear cache
      this.clearCache('reviews');
      this.clearCache('stats');

      return { message: 'Review deleted successfully' };
    } catch (error) {
      console.error('Error deleting review:', error);
      throw new Error('Failed to delete review');
    }
  }

  // Get reviews by rating
  async getReviewsByRating(rating, limit = 10) {
    const cacheKey = this.generateCacheKey('reviews_by_rating', { rating, limit });
    const cached = this.getCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const [rows] = await this.pool.execute(
        'SELECT * FROM reviews WHERE rating = ? AND status = ? ORDER BY created_at DESC LIMIT ?',
        [rating, 'approved', limit]
      );

      this.setCache(cacheKey, rows);
      return rows;
    } catch (error) {
      console.error('Error fetching reviews by rating:', error);
      throw new Error('Failed to fetch reviews by rating');
    }
  }

  // Search reviews
  async searchReviews(query, limit = 10) {
    try {
      const [rows] = await this.pool.execute(
        `SELECT * FROM reviews 
         WHERE (name LIKE ? OR review_text LIKE ? OR location LIKE ?) 
         AND status = 'approved' 
         ORDER BY created_at DESC 
         LIMIT ?`,
        [`%${query}%`, `%${query}%`, `%${query}%`, limit]
      );

      return rows;
    } catch (error) {
      console.error('Error searching reviews:', error);
      throw new Error('Failed to search reviews');
    }
  }

  // Close database connection
  async close() {
    await this.pool.end();
  }
}

// Express.js middleware for handling CORS and JSON
const express = require('express');
const cors = require('cors');

const app = express();
const reviewsAPI = new ReviewsAPI();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/reviews', async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const reviews = await reviewsAPI.getReviews(parseInt(limit), parseInt(offset));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reviews/stats', async (req, res) => {
  try {
    const stats = await reviewsAPI.getReviewStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    };
    const result = await reviewsAPI.addReview(reviewData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/reviews/rating/:rating', async (req, res) => {
  try {
    const { rating } = req.params;
    const { limit = 10 } = req.query;
    const reviews = await reviewsAPI.getReviewsByRating(parseInt(rating), parseInt(limit));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reviews/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const reviews = await reviewsAPI.searchReviews(q, parseInt(limit));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes (add authentication in production)
app.put('/api/reviews/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await reviewsAPI.updateReviewStatus(parseInt(id), status);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewsAPI.deleteReview(parseInt(id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Reviews API server running on port ${PORT}`);
});

module.exports = { ReviewsAPI, app };
