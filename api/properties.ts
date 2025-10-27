import { Pool } from 'pg';
import pool from '../src/lib/database.js';

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const { type, status, minPrice, maxPrice, bedrooms, bathrooms, city } = req.query;
    
    let query = `
      SELECT 
        p.*,
        u.first_name as owner_first_name,
        u.last_name as owner_last_name,
        u.phone as owner_phone,
        u.email as owner_email,
        a.first_name as agent_first_name,
        a.last_name as agent_last_name,
        a.phone as agent_phone,
        a.email as agent_email
      FROM properties p
      LEFT JOIN users u ON p.owner_id = u.id
      LEFT JOIN users a ON p.agent_id = a.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    let paramCount = 1;
    
    if (type) {
      query += ` AND p.property_type = $${paramCount}`;
      params.push(type);
      paramCount++;
    }
    
    if (status) {
      query += ` AND p.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    
    if (minPrice) {
      query += ` AND p.price >= $${paramCount}`;
      params.push(parseFloat(minPrice as string));
      paramCount++;
    }
    
    if (maxPrice) {
      query += ` AND p.price <= $${paramCount}`;
      params.push(parseFloat(maxPrice as string));
      paramCount++;
    }
    
    if (bedrooms) {
      query += ` AND p.bedrooms >= $${paramCount}`;
      params.push(parseInt(bedrooms as string));
      paramCount++;
    }
    
    if (bathrooms) {
      query += ` AND p.bathrooms >= $${paramCount}`;
      params.push(parseFloat(bathrooms as string));
      paramCount++;
    }
    
    if (city) {
      query += ` AND p.city ILIKE $${paramCount}`;
      params.push(`%${city}%`);
      paramCount++;
    }
    
    query += ` ORDER BY p.created_at DESC`;
    
    const result = await pool.query(query, params);
    
    // Get photos for each property
    const propertiesWithPhotos = await Promise.all(
      result.rows.map(async (property) => {
        const photosResult = await pool.query(
          'SELECT * FROM property_photos WHERE property_id = $1 ORDER BY display_order',
          [property.id]
        );
        
        const featuresResult = await pool.query(
          'SELECT feature_name FROM property_features WHERE property_id = $1',
          [property.id]
        );
        
        const amenitiesResult = await pool.query(
          'SELECT amenity_name FROM property_amenities WHERE property_id = $1',
          [property.id]
        );
        
        return {
          ...property,
          photos: photosResult.rows,
          features: featuresResult.rows.map(f => f.feature_name),
          amenities: amenitiesResult.rows.map(a => a.amenity_name)
        };
      })
    );
    
    res.json({
      success: true,
      data: propertiesWithPhotos,
      count: propertiesWithPhotos.length
    });
    
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch properties',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const propertyResult = await pool.query(
      `SELECT 
        p.*,
        u.first_name as owner_first_name,
        u.last_name as owner_last_name,
        u.phone as owner_phone,
        u.email as owner_email,
        a.first_name as agent_first_name,
        a.last_name as agent_last_name,
        a.phone as agent_phone,
        a.email as agent_email
      FROM properties p
      LEFT JOIN users u ON p.owner_id = u.id
      LEFT JOIN users a ON p.agent_id = a.id
      WHERE p.id = $1`,
      [id]
    );
    
    if (propertyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    const property = propertyResult.rows[0];
    
    // Get photos
    const photosResult = await pool.query(
      'SELECT * FROM property_photos WHERE property_id = $1 ORDER BY display_order',
      [id]
    );
    
    // Get features
    const featuresResult = await pool.query(
      'SELECT feature_name FROM property_features WHERE property_id = $1',
      [id]
    );
    
    // Get amenities
    const amenitiesResult = await pool.query(
      'SELECT amenity_name FROM property_amenities WHERE property_id = $1',
      [id]
    );
    
    // Get reviews
    const reviewsResult = await pool.query(
      'SELECT * FROM reviews WHERE property_id = $1 ORDER BY created_at DESC',
      [id]
    );
    
    const propertyWithDetails = {
      ...property,
      photos: photosResult.rows,
      features: featuresResult.rows.map(f => f.feature_name),
      amenities: amenitiesResult.rows.map(a => a.amenity_name),
      reviews: reviewsResult.rows
    };
    
    res.json({
      success: true,
      data: propertyWithDetails
    });
    
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch property',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new property
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      state,
      zip_code,
      property_type,
      bedrooms,
      bathrooms,
      square_feet,
      year_built,
      lot_size,
      price,
      listing_type,
      available_date,
      owner_id,
      agent_id,
      features,
      amenities,
      photos
    } = req.body;
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert property
      const propertyResult = await client.query(
        `INSERT INTO properties (
          title, description, address, city, state, zip_code, property_type,
          bedrooms, bathrooms, square_feet, year_built, lot_size, price,
          listing_type, available_date, owner_id, agent_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *`,
        [
          title, description, address, city, state, zip_code, property_type,
          bedrooms, bathrooms, square_feet, year_built, lot_size, price,
          listing_type, available_date, owner_id, agent_id
        ]
      );
      
      const property = propertyResult.rows[0];
      
      // Insert features
      if (features && features.length > 0) {
        for (const feature of features) {
          await client.query(
            'INSERT INTO property_features (property_id, feature_name) VALUES ($1, $2)',
            [property.id, feature]
          );
        }
      }
      
      // Insert amenities
      if (amenities && amenities.length > 0) {
        for (const amenity of amenities) {
          await client.query(
            'INSERT INTO property_amenities (property_id, amenity_name) VALUES ($1, $2)',
            [property.id, amenity]
          );
        }
      }
      
      // Insert photos
      if (photos && photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          await client.query(
            `INSERT INTO property_photos (
              property_id, photo_url, photo_name, photo_size, is_primary, display_order
            ) VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              property.id,
              photo.url,
              photo.name,
              photo.size,
              i === 0, // First photo is primary
              i + 1
            ]
          );
        }
      }
      
      await client.query('COMMIT');
      
      res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: property
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create property',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create contact inquiry
export const createInquiry = async (req, res) => {
  try {
    const { property_id, name, email, phone, message, inquiry_type } = req.body;
    
    const result = await pool.query(
      `INSERT INTO contact_inquiries (
        property_id, name, email, phone, message, inquiry_type
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [property_id, name, email, phone, message, inquiry_type]
    );
    
    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get reviews for a property
export const getPropertyReviews = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM reviews WHERE property_id = $1 ORDER BY created_at DESC',
      [id]
    );
    
    res.json({
      success: true,
      data: result.rows
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
