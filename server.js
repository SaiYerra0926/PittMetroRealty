import express from 'express';
import cors from 'cors';
import { testConnection } from './src/lib/database.js';
import * as propertyRoutes from './api/properties.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = await testConnection();
    res.json({
      success: true,
      message: 'API is running',
      database: isConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'API health check failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Property routes
app.get('/api/properties', propertyRoutes.getProperties);
app.get('/api/properties/:id', propertyRoutes.getPropertyById);
app.post('/api/properties', propertyRoutes.createProperty);
app.post('/api/inquiries', propertyRoutes.createInquiry);
app.get('/api/properties/:id/reviews', propertyRoutes.getPropertyReviews);

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Pitt Metro Realty API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Properties API: http://localhost:${PORT}/api/properties`);
});

export default app;
