# Reviews API Setup Guide

This guide explains how to set up the Reviews API for the Pitt Metro Realty website.

## Overview

The Reviews system allows users to submit reviews which are stored in a database and displayed dynamically on the website. The system includes:

- **Frontend**: React component that displays reviews and allows submission
- **API Service**: TypeScript service that handles API calls with localStorage fallback
- **Backend API**: Node.js/Express server (optional - can use mock)

## Setup Options

### Option 1: Use Existing Backend API (Recommended)

If you have the backend API server running (`api/reviews.js`):

1. **Start the API server**:
   ```bash
   # Make sure Node.js and MySQL are installed
   node api/reviews.js
   # Or set up as an Express route
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root:
   ```env
   VITE_API_URL=http://localhost:3001/api
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=pittmetro_reviews
   ```

3. **Create the database**:
   ```sql
   CREATE DATABASE IF NOT EXISTS pittmetro_reviews;
   
   USE pittmetro_reviews;
   
   CREATE TABLE IF NOT EXISTS reviews (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       location VARCHAR(255),
       rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
       review_text TEXT NOT NULL,
       property_type VARCHAR(255),
       status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       ip_address VARCHAR(45),
       user_agent TEXT
   );
   ```

### Option 2: Use localStorage (Fallback - Works Immediately)

If you don't have a backend server, the app will automatically use localStorage:

- Reviews are stored in the browser's localStorage
- Works offline
- Data persists across page refreshes
- **Note**: Reviews stored this way are only visible to the user who submitted them

### Option 3: Use a Mock API Server (For Development)

Create a simple Express server:

```javascript
// mock-api-server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let reviews = [];
let reviewIdCounter = 1;

// GET /api/reviews
app.get('/api/reviews', (req, res) => {
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  res.json({ reviews: approvedReviews });
});

// POST /api/reviews
app.post('/api/reviews', (req, res) => {
  const { name, email, location, rating, review_text, property_type } = req.body;
  
  const newReview = {
    id: reviewIdCounter++,
    name,
    email,
    location: location || '',
    rating,
    review_text,
    property_type: property_type || '',
    status: 'approved',
    created_at: new Date().toISOString()
  };
  
  reviews.push(newReview);
  res.json({ message: 'Review added successfully', review: newReview });
});

// GET /api/reviews/stats
app.get('/api/reviews/stats', (req, res) => {
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const totalReviews = approvedReviews.length;
  const averageRating = approvedReviews.length > 0
    ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;
  
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  approvedReviews.forEach(r => {
    ratingCounts[r.rating]++;
  });
  
  res.json({
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    fiveStarReviews: ratingCounts[5],
    fourStarReviews: ratingCounts[4],
    threeStarReviews: ratingCounts[3],
    twoStarReviews: ratingCounts[2],
    oneStarReviews: ratingCounts[1]
  });
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
```

Run with:
```bash
node mock-api-server.js
```

## API Endpoints

### GET `/api/reviews`
Fetch all approved reviews.

**Response:**
```json
{
  "reviews": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "location": "Pittsburgh, PA",
      "rating": 5,
      "review_text": "Great service!",
      "property_type": "Purchased $500K Home",
      "status": "approved",
      "created_at": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

### POST `/api/reviews`
Submit a new review.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "location": "Pittsburgh, PA",
  "rating": 5,
  "review_text": "Great service!",
  "property_type": "Purchased $500K Home"
}
```

**Response:**
```json
{
  "message": "Review added successfully",
  "review": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "location": "Pittsburgh, PA",
    "rating": 5,
    "review_text": "Great service!",
    "property_type": "Purchased $500K Home",
    "status": "approved",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
}
```

### GET `/api/reviews/stats`
Get review statistics.

**Response:**
```json
{
  "totalReviews": 15,
  "averageRating": 4.9,
  "fiveStarReviews": 12,
  "fourStarReviews": 3,
  "threeStarReviews": 0,
  "twoStarReviews": 0,
  "oneStarReviews": 0
}
```

## Frontend Integration

The Reviews component (`src/components/ReviewsSection.tsx`) automatically:
- Fetches reviews from the API on load
- Falls back to localStorage if API is unavailable
- Shows loading states
- Displays error messages
- Calculates statistics dynamically

## Environment Variables

Add to `.env` file:
```env
VITE_API_URL=http://localhost:3001/api
```

## Testing

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Start the API server** (if using):
   ```bash
   node mock-api-server.js
   # or
   node api/reviews.js
   ```

3. **Open the website** and navigate to the Reviews section

4. **Submit a review** using the form

5. **Verify the review appears** in the reviews list

## Production Deployment

For production:

1. **Use a real database** (MySQL, PostgreSQL, etc.)
2. **Add authentication** for admin endpoints
3. **Add rate limiting** to prevent spam
4. **Add email validation** and moderation
5. **Set up CORS** properly for your domain
6. **Use environment variables** for sensitive data
7. **Add logging and monitoring**

## Troubleshooting

- **Reviews not showing**: Check browser console for API errors
- **API connection failed**: Verify API server is running and CORS is configured
- **LocalStorage fallback**: Check browser DevTools > Application > Local Storage
- **Database errors**: Verify database connection and table structure

## Security Considerations

- Validate all input on the server side
- Sanitize review text to prevent XSS
- Rate limit review submissions
- Implement CAPTCHA for spam prevention
- Moderate reviews before publishing
- Secure API endpoints with authentication
