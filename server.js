import express from 'express';
import cors from 'cors';
import { testConnection } from './src/lib/database.js';
import * as propertyRoutes from './api/properties.js';
import * as reviewRoutes from './api/reviews.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes with specific origins
const allowedOrigins = [
  'https://pittmetrorealty.com',
  'https://pittmetrorealty.netlify.app',
  'http://localhost:5173',
  'http://localhost:3001',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://3.12.102.126:3001',
  'http://127.0.0.1:3001'
];

// In development, allow all origins for easier debugging
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true
  }));
} else {
  // In production, use strict CORS
  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check that always responds quickly
app.get('/api/health', async (req, res) => {
  // Always respond immediately - don't wait for database
  const response = {
    success: true,
    message: 'API is running',
    database: 'checking',
    timestamp: new Date().toISOString()
  };
  
  res.json(response);
  
  // Check database connection asynchronously (don't block response)
  testConnection().then((isConnected) => {
    console.log(`Database status: ${isConnected ? 'connected' : 'disconnected'}`);
  }).catch((error) => {
    console.log(`Database check failed: ${error.message}`);
  });
});

// Property routes - order matters! More specific routes first
app.get('/api/properties/owner', propertyRoutes.getPropertiesByOwner);
app.get('/api/properties/:id/reviews', propertyRoutes.getPropertyReviews);
app.get('/api/properties', propertyRoutes.getProperties);
app.get('/api/properties/:id', propertyRoutes.getPropertyById);
app.post('/api/properties', propertyRoutes.createProperty);
app.put('/api/properties/:id', propertyRoutes.updateProperty);
app.delete('/api/properties/:id', propertyRoutes.deleteProperty);
app.post('/api/inquiries', propertyRoutes.createInquiry);

// Review routes
app.get('/api/reviews', reviewRoutes.getReviews);
app.get('/api/reviews/stats', reviewRoutes.getReviewStats);
app.post('/api/reviews', reviewRoutes.createReview);
app.put('/api/reviews/:id/status', reviewRoutes.updateReviewStatus);
app.delete('/api/reviews/:id', reviewRoutes.deleteReview);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server - listen on all interfaces (0.0.0.0) to ensure it's accessible
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Pitt Metro Realty API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Properties API: http://localhost:${PORT}/api/properties`);
  console.log(`\n✅ Server is ready to accept connections!\n`);
  console.log(`Server is listening on 0.0.0.0:${PORT} (all network interfaces)\n`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please stop the existing server or use a different port.`);
  } else {
    console.error(`❌ Server failed to start:`, err.message);
  }
  process.exit(1);
});

export default app;