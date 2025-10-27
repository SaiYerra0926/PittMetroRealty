// Database Setup Script for Pitt Metro Realty Reviews
// This script sets up the database connection and initializes the schema

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pittmetro_reviews',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4',
  timezone: '+00:00'
};

class DatabaseSetup {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      // First connect without database to create it if needed
      const tempConfig = { ...dbConfig };
      delete tempConfig.database;
      
      this.connection = await mysql.createConnection(tempConfig);
      console.log('Connected to MySQL server');

      // Create database if it doesn't exist
      await this.connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
      console.log(`Database '${dbConfig.database}' created or already exists`);

      // Switch to the database
      await this.connection.execute(`USE ${dbConfig.database}`);
      console.log(`Using database '${dbConfig.database}'`);

      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  async setupSchema() {
    try {
      // Read and execute schema file
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Split by semicolon and execute each statement
      const statements = schema.split(';').filter(stmt => stmt.trim());
      
      for (const statement of statements) {
        if (statement.trim()) {
          await this.connection.execute(statement);
        }
      }
      
      console.log('Database schema setup completed');
      return true;
    } catch (error) {
      console.error('Schema setup failed:', error);
      throw error;
    }
  }

  async seedData() {
    try {
      // Check if reviews already exist
      const [rows] = await this.connection.execute('SELECT COUNT(*) as count FROM reviews');
      
      if (rows[0].count === 0) {
        console.log('Seeding initial data...');
        
        const sampleReviews = [
          {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            location: 'Shadyside, Pittsburgh',
            rating: 5,
            review_text: 'Pitt Metro Realty helped us find our dream home and made the entire process seamless. Their knowledge of the Pittsburgh market is unmatched.',
            property_type: 'Purchased $1.2M Single Family Home'
          },
          {
            name: 'Jennifer Martinez',
            email: 'jennifer.martinez@email.com',
            location: 'Historic Quarter',
            rating: 5,
            review_text: 'As a first-time homebuyer, I was overwhelmed by the process. Pitt Metro Realty patiently guided me through everything and negotiated an amazing deal.',
            property_type: 'Purchased $650K Condominium'
          },
          {
            name: 'David Thompson',
            email: 'david.thompson@email.com',
            location: 'Suburban Gardens',
            rating: 5,
            review_text: 'We\'ve bought and sold homes before, but working with Pitt Metro Realty was by far the best experience. Their market insights saved us thousands.',
            property_type: 'Sold $950K Villa'
          }
        ];

        for (const review of sampleReviews) {
          await this.connection.execute(
            'INSERT INTO reviews (name, email, location, rating, review_text, property_type, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [review.name, review.email, review.location, review.rating, review.review_text, review.property_type, 'approved']
          );
        }
        
        console.log('Initial data seeded successfully');
      } else {
        console.log('Data already exists, skipping seed');
      }
    } catch (error) {
      console.error('Data seeding failed:', error);
      throw error;
    }
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      console.log('Database connection closed');
    }
  }

  async setup() {
    try {
      await this.connect();
      await this.setupSchema();
      await this.seedData();
      console.log('Database setup completed successfully!');
    } catch (error) {
      console.error('Database setup failed:', error);
      throw error;
    } finally {
      await this.close();
    }
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  const setup = new DatabaseSetup();
  setup.setup().catch(console.error);
}

module.exports = DatabaseSetup;
