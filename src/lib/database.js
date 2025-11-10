import { Pool } from 'pg';

// AWS RDS PostgreSQL Database configuration
// Supports environment variables: DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME
const dbConfig = {
  host: process.env.DATABASE_HOST || 'pittmetropg.c1sg4s884u9n.us-east-2.rds.amazonaws.com',
  port: Number(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres123',
  database: process.env.DATABASE_NAME || 'postgres',
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS connections
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 30000, // Connection timeout (30 seconds)
  // Additional connection options for better reliability
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
  // Connection retry settings
  allowExitOnIdle: false,
};

// Create connection pool with error handling
export const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('❌ Unexpected error on idle database client:', err);
  process.exit(-1);
});

// Handle connection errors
pool.on('connect', () => {
  console.log('✅ Database pool connection established');
});

pool.on('acquire', () => {
  // Client acquired from pool
});

pool.on('remove', () => {
  // Client removed from pool
});

// Test database connection with retry logic
export const testConnection = async (retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔌 Attempting database connection (attempt ${attempt}/${retries})...`);
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000);
      });
      
      // Race between connection and timeout
      const client = await Promise.race([
        pool.connect(),
        timeoutPromise
      ]);
      
      console.log('✅ Database connection established');
      
      // Test query with timeout
      const queryTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Query timeout')), 5000);
      });
      
      const result = await Promise.race([
        client.query('SELECT NOW() as current_time, version() as pg_version'),
        queryTimeout
      ]);
      
      console.log('✅ Database query successful');
      console.log('📅 Database time:', result.rows[0].current_time);
      console.log('📊 PostgreSQL version:', result.rows[0].pg_version.split(' ')[0] + ' ' + result.rows[0].pg_version.split(' ')[1]);
      
      client.release();
      return true;
    } catch (error) {
      console.error(`❌ Database connection attempt ${attempt} failed:`, error.message);
      
      if (attempt === retries) {
        console.error('❌ All connection attempts failed. Please check:');
        console.error('   1. Database host:', dbConfig.host);
        console.error('   2. Database port:', dbConfig.port);
        console.error('   3. Database name:', dbConfig.database);
        console.error('   4. Database user:', dbConfig.user);
        console.error('   5. Database password: [configured]');
        console.error('   6. Network/firewall allows connections to port 5432');
        console.error('   7. AWS RDS security group allows connections from your IP');
        console.error('   8. Database server is running and accessible');
        console.error('   9. SSL connection is properly configured');
        console.error('   10. Database credentials are correct');
        return false;
      }
      
      // Wait before retry (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      console.log(`⏳ Waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  return false;
};

// Graceful shutdown
export const closePool = async () => {
  await pool.end();
  console.log('🔌 Database pool closed');
};

export default pool;

