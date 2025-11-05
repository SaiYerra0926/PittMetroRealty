import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏠 Pitt Metro Realty Database Setup');
console.log('==================================');

// Supabase Database configuration
const dbConfig = {
  host: 'db.vrdqdeyzxzggzdbmiwdg.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres',
  ssl: {
    rejectUnauthorized: false, // Required for Supabase connections
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased timeout for Supabase connections
};

console.log('📊 Database Configuration:');
console.log(`   Host: ${dbConfig.host}`);
console.log(`   Port: ${dbConfig.port}`);
console.log(`   Database: ${dbConfig.database}`);
console.log(`   User: ${dbConfig.user}`);
console.log(`   Password: ${dbConfig.password}`);
console.log('');

const pool = new Pool(dbConfig);

async function setupDatabase() {
  let client;
  
  try {
    console.log('🔌 Connecting to PostgreSQL database...');
    client = await pool.connect();
    
    // Test connection
    const result = await client.query('SELECT NOW()');
    console.log('✅ Connected successfully at:', result.rows[0].now);
    
    // Read and execute schema
    console.log('🏗️  Creating database schema...');
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    console.log('📁 Schema file path:', schemaPath);
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at: ${schemaPath}`);
    }
    
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    console.log('📄 Schema file size:', schemaSQL.length, 'characters');
    
    await client.query(schemaSQL);
    console.log('✅ Schema created successfully');
    
    // Read and execute data insertion
    console.log('📊 Inserting sample data...');
    const dataPath = path.join(__dirname, 'database', 'insert_data.sql');
    console.log('📁 Data file path:', dataPath);
    
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at: ${dataPath}`);
    }
    
    const dataSQL = fs.readFileSync(dataPath, 'utf8');
    console.log('📄 Data file size:', dataSQL.length, 'characters');
    
    await client.query(dataSQL);
    console.log('✅ Sample data inserted successfully');
    
    // Verify data insertion
    console.log('🔍 Verifying data...');
    const propertyCount = await client.query('SELECT COUNT(*) FROM properties');
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    const photoCount = await client.query('SELECT COUNT(*) FROM property_photos');
    const featureCount = await client.query('SELECT COUNT(*) FROM property_features');
    const amenityCount = await client.query('SELECT COUNT(*) FROM property_amenities');
    const reviewCount = await client.query('SELECT COUNT(*) FROM reviews');
    const inquiryCount = await client.query('SELECT COUNT(*) FROM contact_inquiries');
    
    console.log('');
    console.log('📈 Database Setup Complete!');
    console.log(`   Properties: ${propertyCount.rows[0].count}`);
    console.log(`   Users: ${userCount.rows[0].count}`);
    console.log(`   Photos: ${photoCount.rows[0].count}`);
    console.log(`   Features: ${featureCount.rows[0].count}`);
    console.log(`   Amenities: ${amenityCount.rows[0].count}`);
    console.log(`   Reviews: ${reviewCount.rows[0].count}`);
    console.log(`   Inquiries: ${inquiryCount.rows[0].count}`);
    console.log('');
    console.log('🚀 You can now start the API server with: npm run server');
    console.log('🌐 API will be available at: http://localhost:3001');
    console.log('');
    console.log('📋 Available API endpoints:');
    console.log('   GET  /api/health - Health check');
    console.log('   GET  /api/properties - List all properties');
    console.log('   GET  /api/properties/:id - Get property by ID');
    console.log('   POST /api/properties - Create new property');
    console.log('   POST /api/inquiries - Submit contact inquiry');
    console.log('   GET  /api/properties/:id/reviews - Get property reviews');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting:');
    console.error('   1. Make sure Supabase database is accessible');
    console.error('   2. Verify the database connection details are correct');
    console.error('   3. Check username and password are correct');
    console.error('   4. Ensure SSL connection is properly configured');
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function closeConnection() {
  await pool.end();
  console.log('🔌 Database connection closed');
}

// Run setup
setupDatabase()
  .then(() => {
    console.log('🎉 Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Database setup failed:', error.message);
    process.exit(1);
  })
  .finally(() => {
    closeConnection();
  });

