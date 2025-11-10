import pool from './src/lib/database.js';

async function testConnection() {
  console.log('🔌 Testing Supabase PostgreSQL connection...');
  console.log('Connection string: postgresql://postgres:***@db.vrdqdeyzxzggzdbmiwdg.supabase.co:5432/postgres?sslmode=require');
  console.log('');
  
  try {
    console.log('Attempting to connect...');
    const client = await Promise.race([
      pool.connect(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout after 30 seconds')), 30000))
    ]);
    console.log('✅ Database connection established successfully!');
    
    // Test query
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version, current_database() as db_name');
    console.log('✅ Query executed successfully!');
    console.log('');
    console.log('📊 Database Information:');
    console.log('   Database Name:', result.rows[0].db_name);
    console.log('   Current Time:', result.rows[0].current_time);
    console.log('   PostgreSQL Version:', result.rows[0].pg_version.split(' ')[0] + ' ' + result.rows[0].pg_version.split(' ')[1]);
    console.log('');
    
    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📋 Available Tables:');
    if (tablesResult.rows.length > 0) {
      tablesResult.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
      
      // Check properties table
      if (tablesResult.rows.some(r => r.table_name === 'properties')) {
        const countResult = await client.query('SELECT COUNT(*) as count FROM properties');
        console.log('');
        console.log('📊 Properties Count:', countResult.rows[0].count);
      }
    } else {
      console.log('   No tables found');
    }
    
    client.release();
    await pool.end();
    
    console.log('');
    console.log('🎉 Database connection test successful!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('');
    console.error('Error details:', error);
    process.exit(1);
  }
}

testConnection();

