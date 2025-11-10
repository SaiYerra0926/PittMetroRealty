import pool from './src/lib/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function insertSampleData() {
  let client;
  
  try {
    console.log('🔌 Connecting to database...');
    client = await pool.connect();
    console.log('✅ Connected successfully');
    
    // Check if data already exists
    const existingCount = await client.query('SELECT COUNT(*) FROM properties');
    if (existingCount.rows[0].count > 0) {
      console.log(`✅ Database already has ${existingCount.rows[0].count} properties`);
      client.release();
      return;
    }
    
    // Read and execute insert_data.sql
    const dataPath = path.join(__dirname, 'database', 'insert_data.sql');
    if (fs.existsSync(dataPath)) {
      console.log('📄 Reading insert_data.sql...');
      const dataSQL = fs.readFileSync(dataPath, 'utf8');
      
      console.log('📊 Inserting sample data...');
      await client.query('BEGIN');
      
      // Split by semicolons and execute each statement
      const statements = dataSQL.split(';').filter(s => s.trim().length > 0);
      for (const statement of statements) {
        const trimmed = statement.trim();
        if (trimmed && !trimmed.startsWith('--')) {
          try {
            await client.query(trimmed);
          } catch (err) {
            // Ignore errors for duplicate inserts or constraints
            if (!err.message.includes('duplicate') && !err.message.includes('constraint')) {
              console.error(`Warning: ${err.message}`);
            }
          }
        }
      }
      
      await client.query('COMMIT');
      console.log('✅ Sample data inserted successfully');
    } else {
      console.log('⚠️ insert_data.sql not found, inserting minimal sample data...');
      
      await client.query('BEGIN');
      
      // Insert a sample property
      const result = await client.query(`
        INSERT INTO properties (title, description, address, city, state, zip_code, property_type, bedrooms, bathrooms, square_feet, price, listing_type, status, owner_email, owner_phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING id
      `, [
        'Beautiful Modern Home in Pittsburgh',
        'Stunning modern home with premium finishes and excellent location.',
        '123 Main Street',
        'Pittsburgh',
        'PA',
        '15213',
        'Single Family Home',
        3,
        2,
        1800,
        450000,
        'sell',
        'Published',
        'owner@pittmetro.com',
        '(412) 555-0100'
      ]);
      
      const propertyId = result.rows[0].id;
      
      // Insert a photo
      await client.query(`
        INSERT INTO property_photos (property_id, photo_url, photo_name, is_primary, display_order)
        VALUES ($1, $2, $3, $4, $5)
      `, [
        propertyId,
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'property-exterior.jpg',
        true,
        1
      ]);
      
      await client.query('COMMIT');
      console.log('✅ Sample property inserted successfully');
    }
    
    // Verify data
    const count = await client.query('SELECT COUNT(*) FROM properties');
    console.log(`✅ Database now has ${count.rows[0].count} properties`);
    
    client.release();
    await pool.end();
    
    console.log('🎉 Sample data insertion complete!');
    
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
      client.release();
    }
    console.error('❌ Error inserting sample data:', error);
    throw error;
  }
}

insertSampleData().catch(console.error);

