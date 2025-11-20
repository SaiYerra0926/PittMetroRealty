// Reviews API for Pitt Metro Realty
// Handles CRUD operations for reviews with caching and database persistence
// PostgreSQL Version

import pool from '../src/lib/database.js';
import crypto from 'crypto';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const cache = new Map();

class ReviewsAPI {
  constructor() {
    this.pool = pool; // Use existing PostgreSQL pool
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
      // PostgreSQL uses is_verified boolean instead of status enum
      // Join with properties to get location and property_type
      const result = await this.pool.query(
        `SELECT 
          r.*,
          p.property_type,
          CASE 
            WHEN p.city IS NOT NULL AND p.state IS NOT NULL 
            THEN p.city || ', ' || p.state 
            ELSE NULL 
          END as location
        FROM reviews r
        LEFT JOIN properties p ON r.property_id = p.id
        WHERE r.is_verified = true OR r.is_verified IS NULL 
        ORDER BY r.created_at DESC 
        LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      // Map to match expected format
      const rows = result.rows.map(row => ({
        ...row,
        name: row.reviewer_name,
        email: row.reviewer_email,
        text: row.review_text
      }));

      const response = {
        reviews: rows,
        total: rows.length,
        limit,
        offset
      };

      this.setCache(cacheKey, response);
      return response;
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
      const result = await this.pool.query(
        `SELECT 
          COUNT(*) as total_reviews,
          AVG(rating) as average_rating,
          COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star_reviews,
          COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star_reviews,
          COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star_reviews,
          COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star_reviews,
          COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star_reviews
        FROM reviews WHERE is_verified = true OR is_verified IS NULL`
      );

      const stats = result.rows[0];
      stats.average_rating = parseFloat(stats.average_rating || 0).toFixed(1);

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
      property_id = null,
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
      // Ensure UUID extension exists
      await this.pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      
      // Create reviews table if it doesn't exist (PostgreSQL schema)
      // Note: location is computed from property data, not stored directly
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS reviews (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
          user_id UUID REFERENCES users(id),
          reviewer_name VARCHAR(100) NOT NULL,
          reviewer_email VARCHAR(255),
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          review_text TEXT,
          is_verified BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).catch(() => {
        // Table might already exist, ignore error
      });

      // Insert review using PostgreSQL syntax
      // Note: location and property_type are not stored in reviews table
      // They are computed from property data when needed
      const result = await this.pool.query(
        `INSERT INTO reviews (reviewer_name, reviewer_email, rating, review_text, property_id, is_verified)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [name, email, parseInt(rating), review_text, property_id || null, true]
      );

      const review = result.rows[0];

      // Get property info if property_id exists to compute location and property_type
      let computedLocation = location || null;
      let computedPropertyType = property_type || null;
      
      if (review.property_id) {
        try {
          const propertyResult = await this.pool.query(
            'SELECT property_type, city, state FROM properties WHERE id = $1',
            [review.property_id]
          );
          if (propertyResult.rows.length > 0) {
            const prop = propertyResult.rows[0];
            computedPropertyType = prop.property_type || property_type || null;
            if (prop.city && prop.state) {
              computedLocation = `${prop.city}, ${prop.state}`;
            }
          }
        } catch (propError) {
          // Property lookup failed, use provided values
          console.warn('Could not fetch property info:', propError);
        }
      }

      // Clear cache to ensure fresh data
      this.clearCache('reviews');
      this.clearCache('stats');

      return {
        id: review.id,
        message: 'Review added successfully',
        review: {
          id: review.id,
          name: review.reviewer_name,
          email: review.reviewer_email,
          location: computedLocation,
          rating: parseInt(review.rating),
          review_text: review.review_text,
          property_type: computedPropertyType,
          created_at: review.created_at ? new Date(review.created_at).toISOString() : new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error adding review:', error);
      throw new Error('Failed to add review');
    }
  }

  // Update review status (admin function)
  // PostgreSQL uses is_verified boolean instead of status enum
  async updateReviewStatus(reviewId, status) {
    // Convert status string to boolean for PostgreSQL
    let isVerified = true;
    if (status === 'pending' || status === 'rejected') {
      isVerified = false;
    }

    try {
      const result = await this.pool.query(
        'UPDATE reviews SET is_verified = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [isVerified, reviewId]
      );

      if (result.rows.length === 0) {
        throw new Error('Review not found');
      }

      // Clear cache
      this.clearCache('reviews');
      this.clearCache('stats');

      return { 
        message: 'Review status updated successfully',
        review: result.rows[0]
      };
    } catch (error) {
      console.error('Error updating review status:', error);
      throw new Error('Failed to update review status');
    }
  }

  // Delete review (admin function)
  async deleteReview(reviewId) {
    try {
      const result = await this.pool.query(
        'DELETE FROM reviews WHERE id = $1 RETURNING *',
        [reviewId]
      );

      if (result.rows.length === 0) {
        throw new Error('Review not found');
      }

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
      const result = await this.pool.query(
        `SELECT 
          r.*,
          p.property_type,
          CASE 
            WHEN p.city IS NOT NULL AND p.state IS NOT NULL 
            THEN p.city || ', ' || p.state 
            ELSE NULL 
          END as location
        FROM reviews r
        LEFT JOIN properties p ON r.property_id = p.id
        WHERE r.rating = $1 AND (r.is_verified = true OR r.is_verified IS NULL) 
        ORDER BY r.created_at DESC 
        LIMIT $2`,
        [rating, limit]
      );

      // Map to match expected format
      const rows = result.rows.map(row => ({
        ...row,
        name: row.reviewer_name,
        email: row.reviewer_email,
        text: row.review_text
      }));

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
      const result = await this.pool.query(
        `SELECT 
          r.*,
          p.property_type,
          CASE 
            WHEN p.city IS NOT NULL AND p.state IS NOT NULL 
            THEN p.city || ', ' || p.state 
            ELSE NULL 
          END as location
        FROM reviews r
        LEFT JOIN properties p ON r.property_id = p.id
        WHERE (r.reviewer_name ILIKE $1 OR r.review_text ILIKE $2 OR p.city ILIKE $3 OR p.state ILIKE $3) 
        AND (r.is_verified = true OR r.is_verified IS NULL) 
        ORDER BY r.created_at DESC 
        LIMIT $4`,
        [`%${query}%`, `%${query}%`, `%${query}%`, limit]
      );

      // Map to match expected format
      const rows = result.rows.map(row => ({
        ...row,
        name: row.reviewer_name,
        email: row.reviewer_email,
        text: row.review_text
      }));

      return rows;
    } catch (error) {
      console.error('Error searching reviews:', error);
      throw new Error('Failed to search reviews');
    }
  }
}

// Note: This file exports route handlers, not a standalone Express app
// The routes are registered in server.js
// Express.js route handlers for reviews API

// Create instance of ReviewsAPI
const reviewsAPI = new ReviewsAPI();

// Export route handlers (these are registered in server.js)
// Function names must match what server.js expects

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const reviews = await reviewsAPI.getReviews(parseInt(limit), parseInt(offset));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Get review statistics
export const getReviewStats = async (req, res) => {
  try {
    const stats = await reviewsAPI.getReviewStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Create review
export const createReview = async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    };
    const result = await reviewsAPI.addReview(reviewData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Update review status (admin)
export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await reviewsAPI.updateReviewStatus(id, status);
    res.json(result);
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Delete review (admin)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reviewsAPI.deleteReview(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Export the ReviewsAPI class for use in other files
export { ReviewsAPI };