import { Pool } from 'pg';

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
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Increased timeout for Supabase connections
};

// Create connection pool
export const pool = new Pool(dbConfig);

// Test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    const result = await client.query('SELECT NOW()');
    console.log('📅 Database time:', result.rows[0].now);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Graceful shutdown
export const closePool = async () => {
  await pool.end();
  console.log('🔌 Database pool closed');
};

export default pool;

