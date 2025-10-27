import { Pool } from 'pg';

console.log('🏠 Pitt Metro Realty Database Test');
console.log('==================================');

// Database configuration
const dbConfig = {
  host: 'localhost',
  port: 5433,
  database: 'pittmetrorealty',
  user: 'postgres',
  password: 'postgres',
};

console.log('📊 Database Configuration:');
console.log(`   Host: ${dbConfig.host}`);
console.log(`   Port: ${dbConfig.port}`);
console.log(`   Database: ${dbConfig.database}`);
console.log(`   User: ${dbConfig.user}`);
console.log(`   Password: ${dbConfig.password}`);
console.log('');

const pool = new Pool(dbConfig);

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    const client = await pool.connect();
    
    // Test connection
    const result = await client.query('SELECT NOW()');
    console.log('✅ Connected successfully at:', result.rows[0].now);
    
    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Existing tables:');
    tablesResult.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    // Check data counts
    if (tablesResult.rows.length > 0) {
      console.log('');
      console.log('📊 Data counts:');
      
      try {
        const propertyCount = await client.query('SELECT COUNT(*) FROM properties');
        console.log(`   Properties: ${propertyCount.rows[0].count}`);
      } catch (e) {
        console.log('   Properties: Table not found');
      }
      
      try {
        const userCount = await client.query('SELECT COUNT(*) FROM users');
        console.log(`   Users: ${userCount.rows[0].count}`);
      } catch (e) {
        console.log('   Users: Table not found');
      }
      
      try {
        const photoCount = await client.query('SELECT COUNT(*) FROM property_photos');
        console.log(`   Photos: ${photoCount.rows[0].count}`);
      } catch (e) {
        console.log('   Photos: Table not found');
      }
    }
    
    client.release();
    await pool.end();
    
    console.log('');
    console.log('🎉 Database connection test successful!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('');
    console.error('🔧 Troubleshooting:');
    console.error('   1. Make sure PostgreSQL is running on port 5433');
    console.error('   2. Verify the database "pittmetrorealty" exists');
    console.error('   3. Check username and password are correct');
    console.error('   4. Ensure PostgreSQL is accessible from localhost');
    process.exit(1);
  }
}

testConnection();

