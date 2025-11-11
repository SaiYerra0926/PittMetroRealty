import pool from '../src/lib/database.js';

// Get all reviews (for general reviews section)
export const getReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        r.id,
        r.reviewer_name as name,
        r.reviewer_email as email,
        r.rating,
        r.review_text as text,
        r.review_text,
        r.is_verified,
        r.created_at,
        p.property_type,
        CASE 
          WHEN p.city IS NOT NULL AND p.state IS NOT NULL 
          THEN p.city || ', ' || p.state 
          ELSE NULL 
        END as location
      FROM reviews r
      LEFT JOIN properties p ON r.property_id = p.id
      WHERE r.is_verified = true OR r.is_verified IS NULL
      ORDER BY r.created_at DESC`
    );
    
    // Map to frontend format
    const reviews = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name || row.reviewer_name || 'Anonymous',
      email: row.email || row.reviewer_email || '',
      location: row.location || '',
      rating: parseInt(row.rating) || 5,
      text: row.text || row.review_text || '',
      review_text: row.review_text || row.text || '',
      property_type: row.property_type || '',
      created_at: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      is_verified: row.is_verified === true || row.is_verified === null // Treat null as verified (legacy data)
    }));
    
    res.json({
      success: true,
      reviews: reviews,
      total: reviews.length
    });
    
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get review statistics
export const getReviewStats = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
      FROM reviews
      WHERE is_verified = true OR is_verified IS NULL`
    );
    
    const stats = result.rows[0];
    
    res.json({
      success: true,
      totalReviews: parseInt(stats.total_reviews) || 0,
      averageRating: parseFloat(stats.average_rating) || 0,
      fiveStarReviews: parseInt(stats.five_star) || 0,
      fourStarReviews: parseInt(stats.four_star) || 0,
      threeStarReviews: parseInt(stats.three_star) || 0,
      twoStarReviews: parseInt(stats.two_star) || 0,
      oneStarReviews: parseInt(stats.one_star) || 0
    });
    
  } catch (error) {
    console.error('Error fetching review stats:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    res.status(500).json({
      success: false,
      message: 'Failed to fetch review statistics',
      error: process.env.NODE_ENV === 'development' 
        ? (error instanceof Error ? error.message : 'Unknown error')
        : 'Internal server error. Please try again later.'
    });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    const {
      name,
      email,
      location,
      rating,
      review_text,
      property_type,
      property_id
    } = req.body;
    
    // Validation
    if (!name || !email || !rating || !review_text) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, rating, and review_text are required'
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Try to find property_id if property_type is provided
    let finalPropertyId = property_id || null;
    if (!finalPropertyId && property_type) {
      const propertyResult = await pool.query(
        'SELECT id FROM properties WHERE property_type = $1 LIMIT 1',
        [property_type]
      );
      if (propertyResult.rows.length > 0) {
        finalPropertyId = propertyResult.rows[0].id;
      }
    }
    
    // Ensure UUID extension and reviews table exist
    try {
      // Enable UUID extension if not already enabled
      await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      
      // Create reviews table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS reviews (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
          user_id UUID REFERENCES users(id),
          reviewer_name VARCHAR(100) NOT NULL,
          reviewer_email VARCHAR(255),
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          review_text TEXT,
          is_verified BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (tableError) {
      // Table might already exist, log but continue
      console.log('Reviews table check:', tableError instanceof Error ? tableError.message : 'Unknown');
    }
    
    // Insert review
    const result = await pool.query(
      `INSERT INTO reviews (
        reviewer_name,
        reviewer_email,
        rating,
        review_text,
        property_id,
        is_verified
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        name,
        email,
        parseInt(rating),
        review_text,
        finalPropertyId,
        true // Auto-approve reviews (can be changed to false for moderation)
      ]
    );
    
    const review = result.rows[0];
    
    // Get property info if property_id exists
    let propertyInfo = null;
    if (review.property_id) {
      const propertyResult = await pool.query(
        'SELECT property_type, city, state FROM properties WHERE id = $1',
        [review.property_id]
      );
      if (propertyResult.rows.length > 0) {
        propertyInfo = propertyResult.rows[0];
      }
    }
    
    // Format response
    const formattedReview = {
      id: review.id,
      name: review.reviewer_name,
      email: review.reviewer_email,
      location: location || (propertyInfo ? `${propertyInfo.city}, ${propertyInfo.state}` : ''),
      rating: parseInt(review.rating),
      text: review.review_text,
      review_text: review.review_text,
      property_type: property_type || propertyInfo?.property_type || '',
      created_at: review.created_at ? new Date(review.created_at).toISOString() : new Date().toISOString(),
      is_verified: review.is_verified === true
    };
    
    res.status(201).json({
      success: true,
      message: 'Review submitted successfully!',
      review: formattedReview
    });
    
  } catch (error) {
    console.error('Error creating review:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      body: req.body
    });
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: process.env.NODE_ENV === 'development' 
        ? (error instanceof Error ? error.message : 'Unknown error')
        : 'Internal server error. Please try again later.'
    });
  }
};

// Update review status (for admin/moderation)
export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_verified } = req.body;
    
    const result = await pool.query(
      'UPDATE reviews SET is_verified = $1 WHERE id = $2 RETURNING *',
      [is_verified, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Review status updated successfully',
      review: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update review status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete a review (for admin)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

