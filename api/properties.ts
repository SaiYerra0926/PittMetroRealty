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
        
        // Map database fields to frontend format
        const mappedProperty = {
          ...property,
          zipCode: property.zip_code || property.zipCode || '',
          propertyType: property.property_type || property.propertyType || '',
          squareFeet: property.square_feet || property.squareFeet || 0,
          yearBuilt: property.year_built || property.yearBuilt,
          lotSize: property.lot_size || property.lotSize || 0,
          listingType: property.listing_type || property.listingType || 'rent',
          availableDate: property.available_date || property.availableDate,
          submittedAt: property.created_at || property.createdAt,
          createdAt: property.created_at || property.createdAt,
          updatedAt: property.updated_at || property.updatedAt,
          photos: photosResult.rows.map(p => ({
            id: p.id,
            name: p.photo_name || p.name || '',
            url: p.photo_url || p.url || '',
            size: p.photo_size || p.size || 0
          })),
          features: featuresResult.rows.map(f => f.feature_name).filter(Boolean),
          amenities: amenitiesResult.rows.map(a => a.amenity_name).filter(Boolean),
          ownerName: property.owner_name || (property.owner_first_name ? `${property.owner_first_name} ${property.owner_last_name || ''}`.trim() : '') || '',
          ownerEmail: property.owner_email || property.ownerEmail || '',
          ownerPhone: property.owner_phone || property.ownerPhone || ''
        };
        
        return mappedProperty;
      })
    );
    
    res.json({
      success: true,
      listings: propertiesWithPhotos,
      total: propertiesWithPhotos.length
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
      zipCode,
      zip_code,
      propertyType,
      property_type,
      bedrooms,
      bathrooms,
      squareFeet,
      square_feet,
      yearBuilt,
      year_built,
      lotSize,
      lot_size,
      price,
      listingType,
      listing_type,
      availableDate,
      available_date,
      owner_id,
      agent_id,
      ownerName,
      ownerEmail,
      ownerPhone,
      ownerPreferredContact,
      features,
      amenities,
      photos,
      status
    } = req.body;
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert property - handle both camelCase and snake_case
      const propertyResult = await client.query(
        `INSERT INTO properties (
          title, description, address, city, state, zip_code, property_type,
          bedrooms, bathrooms, square_feet, year_built, lot_size, price,
          listing_type, available_date, owner_id, agent_id, status, owner_email, owner_phone
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING *`,
        [
          title, 
          description, 
          address, 
          city, 
          state, 
          zipCode || zip_code, 
          propertyType || property_type,
          bedrooms, 
          bathrooms, 
          squareFeet || square_feet, 
          yearBuilt || year_built, 
          lotSize || lot_size, 
          price,
          listingType || listing_type, 
          availableDate || available_date, 
          owner_id, 
          agent_id,
          status || 'Pending Review',
          ownerEmail || '',
          ownerPhone || ''
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
      
      // Insert photos - handle multiple photos
      if (photos && Array.isArray(photos) && photos.length > 0) {
        console.log(`Inserting ${photos.length} photos for property ${property.id}`);
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          // Handle both base64 data URLs and regular URLs
          const photoUrl = photo.url || photo.photo_url || '';
          const photoName = photo.name || photo.photo_name || `photo_${i + 1}.jpg`;
          const photoSize = photo.size || photo.photo_size || 0;
          
          if (photoUrl) {
            await client.query(
              `INSERT INTO property_photos (
                property_id, photo_url, photo_name, photo_size, is_primary, display_order
              ) VALUES ($1, $2, $3, $4, $5, $6)`,
              [
                property.id,
                photoUrl,
                photoName,
                photoSize,
                i === 0, // First photo is primary
                i + 1
              ]
            );
            console.log(`Inserted photo ${i + 1}/${photos.length}: ${photoName}`);
          } else {
            console.warn(`Skipping photo ${i + 1} - no URL provided`);
          }
        }
        console.log(`Successfully inserted ${photos.length} photos`);
      } else {
        console.log('No photos to insert');
      }
      
      await client.query('COMMIT');
      
      // Fetch the complete property with all relations for response
      const completePropertyResult = await client.query(
        'SELECT * FROM properties WHERE id = $1',
        [property.id]
      );
      
      const photosResult = await client.query(
        'SELECT * FROM property_photos WHERE property_id = $1 ORDER BY display_order',
        [property.id]
      );
      
      const featuresResult = await client.query(
        'SELECT feature_name FROM property_features WHERE property_id = $1',
        [property.id]
      );
      
      const amenitiesResult = await client.query(
        'SELECT amenity_name FROM property_amenities WHERE property_id = $1',
        [property.id]
      );
      
      const completeProperty = {
        ...completePropertyResult.rows[0],
        zipCode: completePropertyResult.rows[0].zip_code,
        propertyType: completePropertyResult.rows[0].property_type,
        squareFeet: completePropertyResult.rows[0].square_feet,
        yearBuilt: completePropertyResult.rows[0].year_built,
        lotSize: completePropertyResult.rows[0].lot_size,
        listingType: completePropertyResult.rows[0].listing_type,
        availableDate: completePropertyResult.rows[0].available_date,
        submittedAt: completePropertyResult.rows[0].created_at,
        createdAt: completePropertyResult.rows[0].created_at,
        photos: photosResult.rows.map(p => ({
          id: p.id,
          name: p.photo_name,
          url: p.photo_url,
          size: p.photo_size
        })),
        features: featuresResult.rows.map(f => f.feature_name),
        amenities: amenitiesResult.rows.map(a => a.amenity_name),
        ownerName: ownerName || '',
        ownerEmail: ownerEmail || '',
        ownerPhone: ownerPhone || '',
        ownerPreferredContact: ownerPreferredContact || 'email'
      };
      
      res.status(201).json({
        success: true,
        message: 'Property created successfully',
        listing: completeProperty
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

// Update property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      address,
      city,
      state,
      zipCode,
      zip_code,
      propertyType,
      property_type,
      bedrooms,
      bathrooms,
      squareFeet,
      square_feet,
      yearBuilt,
      year_built,
      lotSize,
      lot_size,
      price,
      listingType,
      listing_type,
      availableDate,
      available_date,
      features,
      amenities,
      photos,
      ownerName,
      ownerEmail,
      ownerPhone,
      status
    } = req.body;
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Check if property exists
      const propertyCheck = await client.query(
        'SELECT * FROM properties WHERE id = $1',
        [id]
      );
      
      if (propertyCheck.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({
          success: false,
          message: 'Property not found'
        });
      }
      
      // Update property
      const updateFields: string[] = [];
      const updateValues: any[] = [];
      let paramCount = 1;
      
      if (title !== undefined) {
        updateFields.push(`title = $${paramCount++}`);
        updateValues.push(title);
      }
      if (description !== undefined) {
        updateFields.push(`description = $${paramCount++}`);
        updateValues.push(description);
      }
      if (address !== undefined) {
        updateFields.push(`address = $${paramCount++}`);
        updateValues.push(address);
      }
      if (city !== undefined) {
        updateFields.push(`city = $${paramCount++}`);
        updateValues.push(city);
      }
      if (state !== undefined) {
        updateFields.push(`state = $${paramCount++}`);
        updateValues.push(state);
      }
      if (zipCode !== undefined || zip_code !== undefined) {
        updateFields.push(`zip_code = $${paramCount++}`);
        updateValues.push(zipCode || zip_code);
      }
      if (propertyType !== undefined || property_type !== undefined) {
        updateFields.push(`property_type = $${paramCount++}`);
        updateValues.push(propertyType || property_type);
      }
      if (bedrooms !== undefined) {
        updateFields.push(`bedrooms = $${paramCount++}`);
        updateValues.push(bedrooms);
      }
      if (bathrooms !== undefined) {
        updateFields.push(`bathrooms = $${paramCount++}`);
        updateValues.push(bathrooms);
      }
      if (squareFeet !== undefined || square_feet !== undefined) {
        updateFields.push(`square_feet = $${paramCount++}`);
        updateValues.push(squareFeet || square_feet);
      }
      if (yearBuilt !== undefined || year_built !== undefined) {
        updateFields.push(`year_built = $${paramCount++}`);
        updateValues.push(yearBuilt || year_built);
      }
      if (lotSize !== undefined || lot_size !== undefined) {
        updateFields.push(`lot_size = $${paramCount++}`);
        updateValues.push(lotSize || lot_size);
      }
      if (price !== undefined) {
        updateFields.push(`price = $${paramCount++}`);
        updateValues.push(price);
      }
      if (listingType !== undefined || listing_type !== undefined) {
        updateFields.push(`listing_type = $${paramCount++}`);
        updateValues.push(listingType || listing_type);
      }
      if (availableDate !== undefined || available_date !== undefined) {
        updateFields.push(`available_date = $${paramCount++}`);
        updateValues.push(availableDate || available_date);
      }
      if (status !== undefined) {
        updateFields.push(`status = $${paramCount++}`);
        updateValues.push(status);
      }
      
      updateFields.push(`updated_at = NOW()`);
      updateValues.push(id);
      
      if (updateFields.length > 1) {
        const updateQuery = `
          UPDATE properties 
          SET ${updateFields.join(', ')}
          WHERE id = $${paramCount}
          RETURNING *
        `;
        
        const propertyResult = await client.query(updateQuery, updateValues);
        const property = propertyResult.rows[0];
        
        // Update features
        if (features !== undefined) {
          // Delete existing features
          await client.query(
            'DELETE FROM property_features WHERE property_id = $1',
            [id]
          );
          // Insert new features
          if (Array.isArray(features) && features.length > 0) {
            for (const feature of features) {
              await client.query(
                'INSERT INTO property_features (property_id, feature_name) VALUES ($1, $2)',
                [id, feature]
              );
            }
          }
        }
        
        // Update amenities
        if (amenities !== undefined) {
          // Delete existing amenities
          await client.query(
            'DELETE FROM property_amenities WHERE property_id = $1',
            [id]
          );
          // Insert new amenities
          if (Array.isArray(amenities) && amenities.length > 0) {
            for (const amenity of amenities) {
              await client.query(
                'INSERT INTO property_amenities (property_id, amenity_name) VALUES ($1, $2)',
                [id, amenity]
              );
            }
          }
        }
        
        // Update photos - handle multiple photos
        if (photos !== undefined) {
          // Delete existing photos
          await client.query(
            'DELETE FROM property_photos WHERE property_id = $1',
            [id]
          );
          // Insert new photos
          if (Array.isArray(photos) && photos.length > 0) {
            console.log(`Updating ${photos.length} photos for property ${id}`);
            for (let i = 0; i < photos.length; i++) {
              const photo = photos[i];
              // Handle both base64 data URLs and regular URLs
              const photoUrl = photo.url || photo.photo_url || '';
              const photoName = photo.name || photo.photo_name || `photo_${i + 1}.jpg`;
              const photoSize = photo.size || photo.photo_size || 0;
              
              if (photoUrl) {
                await client.query(
                  `INSERT INTO property_photos (
                    property_id, photo_url, photo_name, photo_size, is_primary, display_order
                  ) VALUES ($1, $2, $3, $4, $5, $6)`,
                  [
                    id,
                    photoUrl,
                    photoName,
                    photoSize,
                    i === 0, // First photo is primary
                    i + 1
                  ]
                );
                console.log(`Updated photo ${i + 1}/${photos.length}: ${photoName}`);
              } else {
                console.warn(`Skipping photo ${i + 1} - no URL provided`);
              }
            }
            console.log(`Successfully updated ${photos.length} photos`);
          } else {
            console.log('No photos to update');
          }
        }
        
        await client.query('COMMIT');
        
        // Fetch updated property with all relations
        const updatedPropertyResult = await client.query(
          'SELECT * FROM properties WHERE id = $1',
          [id]
        );
        
        const photosResult = await client.query(
          'SELECT * FROM property_photos WHERE property_id = $1 ORDER BY display_order',
          [id]
        );
        
        const featuresResult = await client.query(
          'SELECT feature_name FROM property_features WHERE property_id = $1',
          [id]
        );
        
        const amenitiesResult = await client.query(
          'SELECT amenity_name FROM property_amenities WHERE property_id = $1',
          [id]
        );
        
        const updatedProperty = {
          ...updatedPropertyResult.rows[0],
          photos: photosResult.rows,
          features: featuresResult.rows.map(f => f.feature_name),
          amenities: amenitiesResult.rows.map(a => a.amenity_name)
        };
        
        res.json({
          success: true,
          message: 'Property updated successfully',
          data: updatedProperty
        });
      } else {
        await client.query('ROLLBACK');
        res.status(400).json({
          success: false,
          message: 'No fields to update'
        });
      }
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update property',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Check if property exists
      const propertyCheck = await client.query(
        'SELECT * FROM properties WHERE id = $1',
        [id]
      );
      
      if (propertyCheck.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({
          success: false,
          message: 'Property not found'
        });
      }
      
      // Delete related records
      await client.query('DELETE FROM property_features WHERE property_id = $1', [id]);
      await client.query('DELETE FROM property_amenities WHERE property_id = $1', [id]);
      await client.query('DELETE FROM property_photos WHERE property_id = $1', [id]);
      await client.query('DELETE FROM contact_inquiries WHERE property_id = $1', [id]);
      await client.query('DELETE FROM reviews WHERE property_id = $1', [id]);
      
      // Delete property
      await client.query('DELETE FROM properties WHERE id = $1', [id]);
      
      await client.query('COMMIT');
      
      res.json({
        success: true,
        message: 'Property deleted successfully'
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete property',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get properties by owner email
export const getPropertiesByOwner = async (req, res) => {
  try {
    const { ownerEmail } = req.query;
    
    if (!ownerEmail) {
      return res.status(400).json({
        success: false,
        message: 'ownerEmail query parameter is required'
      });
    }
    
    let query = `
      SELECT 
        p.*,
        u.first_name as owner_first_name,
        u.last_name as owner_last_name,
        u.phone as owner_phone,
        u.email as owner_email
      FROM properties p
      LEFT JOIN users u ON p.owner_id = u.id
      WHERE u.email = $1 OR p.owner_email = $1
    `;
    
    const result = await pool.query(query, [ownerEmail]);
    
    // Get photos, features, and amenities for each property
    const propertiesWithDetails = await Promise.all(
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
        
        // Map database fields to frontend format
        const mappedProperty = {
          id: property.id,
          title: property.title || '',
          description: property.description || '',
          address: property.address || '',
          city: property.city || '',
          state: property.state || '',
          zipCode: property.zip_code || property.zipCode || '',
          propertyType: property.property_type || property.propertyType || '',
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          squareFeet: property.square_feet || property.squareFeet || 0,
          yearBuilt: property.year_built || property.yearBuilt,
          lotSize: property.lot_size || property.lotSize || 0,
          price: property.price || 0,
          listingType: property.listing_type || property.listingType || 'rent',
          status: property.status || 'Draft',
          availableDate: property.available_date || property.availableDate,
          photos: photosResult.rows.map(p => ({
            id: p.id,
            name: p.photo_name || p.name || '',
            url: p.photo_url || p.url || '',
            size: p.photo_size || p.size || 0
          })),
          features: featuresResult.rows.map(f => f.feature_name).filter(Boolean),
          amenities: amenitiesResult.rows.map(a => a.amenity_name).filter(Boolean),
          ownerName: property.owner_name || property.owner_first_name + ' ' + (property.owner_last_name || '') || '',
          ownerEmail: property.owner_email || property.ownerEmail || '',
          ownerPhone: property.owner_phone || property.ownerPhone || '',
          ownerPreferredContact: property.owner_preferred_contact || property.ownerPreferredContact || 'email',
          submittedAt: property.submitted_at || property.submittedAt || property.created_at || property.createdAt,
          createdAt: property.created_at || property.createdAt,
          updatedAt: property.updated_at || property.updatedAt
        };
        
        return mappedProperty;
      })
    );
    
    res.json({
      success: true,
      listings: propertiesWithDetails,
      total: propertiesWithDetails.length
    });
    
  } catch (error) {
    console.error('Error fetching properties by owner:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch properties',
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
