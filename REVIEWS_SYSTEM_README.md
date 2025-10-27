# Pitt Metro Realty Reviews System

A comprehensive client review system with database persistence, caching, and real-time updates.

## 🚀 Features

- **Database Persistence**: All reviews stored in MySQL database
- **Cache Management**: Multi-level caching (memory + localStorage)
- **Real-time Updates**: Immediate display of new reviews
- **Professional UI**: Beautiful, responsive design
- **Review Statistics**: Average ratings, total counts, star distribution
- **Form Validation**: Client-side and server-side validation
- **Search & Filter**: Find reviews by rating, location, or text
- **Admin Functions**: Approve/reject reviews, delete reviews
- **API Endpoints**: RESTful API for all operations

## 📋 Prerequisites

- Node.js 16+ 
- MySQL 5.7+ or MySQL 8.0+
- npm or yarn

## 🛠️ Installation

### Quick Setup (Recommended)

1. **Run the setup script:**
   ```bash
   chmod +x setup-reviews.sh
   ./setup-reviews.sh
   ```

2. **Edit environment variables:**
   ```bash
   # Edit .env file with your database credentials
   nano .env
   ```

3. **Start the API server:**
   ```bash
   npm start
   ```

### Manual Setup

1. **Install dependencies:**
   ```bash
   cp package-backend.json package.json
   npm install
   ```

2. **Setup database:**
   ```bash
   # Create database and tables
   mysql -u root -p < database/schema.sql
   
   # Or use the setup script
   node database/setup.js
   ```

3. **Configure environment:**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## 🗄️ Database Schema

### Reviews Table
```sql
CREATE TABLE reviews (
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

### Additional Tables
- `review_analytics` - Track review interactions
- `review_cache` - Performance optimization
- Views and stored procedures for easy data access

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get all approved reviews |
| GET | `/api/reviews/stats` | Get review statistics |
| POST | `/api/reviews` | Add new review |
| GET | `/api/reviews/rating/:rating` | Get reviews by rating |
| GET | `/api/reviews/search?q=query` | Search reviews |
| GET | `/api/health` | Health check |

### Admin Endpoints (Add authentication in production)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/reviews/:id/status` | Update review status |
| DELETE | `/api/reviews/:id` | Delete review |

### Example API Usage

```javascript
// Get all reviews
const response = await fetch('http://localhost:3001/api/reviews');
const data = await response.json();

// Add new review
const newReview = {
  name: "John Doe",
  email: "john@example.com",
  location: "Pittsburgh, PA",
  rating: 5,
  review_text: "Excellent service!",
  property_type: "Purchased $500K Home"
};

const response = await fetch('http://localhost:3001/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newReview)
});
```

## 🎨 Frontend Integration

The `ReviewsSection` component is already integrated into the main page. It includes:

- **Review Display**: Shows all approved reviews with ratings
- **Review Form**: Allows clients to submit new reviews
- **Statistics**: Displays total reviews, average rating, star distribution
- **Cache Management**: Automatic caching for performance
- **Real-time Updates**: New reviews appear immediately

### Component Features

```tsx
import ReviewsSection from "@/components/ReviewsSection";

// The component handles:
// - Loading reviews from API
// - Caching for performance
// - Form submission
// - Real-time updates
// - Error handling
// - Responsive design
```

## 💾 Cache Management

### Multi-Level Caching

1. **Memory Cache**: Fast access for current session
2. **localStorage**: Persists across page refreshes
3. **Database Cache**: Server-side performance optimization

### Cache Keys

- `reviews_10_0` - Reviews with limit/offset
- `review_stats` - Review statistics
- `reviews_by_rating_5` - Reviews by rating

### Cache Invalidation

- Automatic cache clearing on new reviews
- Time-based expiration (5 minutes for reviews, 10 minutes for stats)
- Manual cache clearing for admin operations

## 🔧 Configuration

### Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pittmetro_reviews
DB_PORT=3306

# API Configuration
PORT=3001
NODE_ENV=development

# Cache Configuration
CACHE_DURATION=300000
```

### Frontend Configuration

```env
# Add to your React app's .env
REACT_APP_API_URL=http://localhost:3001/api
```

## 🚀 Deployment

### Production Setup

1. **Database Security:**
   ```sql
   -- Create dedicated database user
   CREATE USER 'pittmetro_user'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT SELECT, INSERT, UPDATE, DELETE ON pittmetro_reviews.* TO 'pittmetro_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Environment Variables:**
   ```env
   NODE_ENV=production
   DB_HOST=your_production_host
   DB_USER=pittmetro_user
   DB_PASSWORD=secure_password
   ```

3. **Security Headers:**
   ```javascript
   // Add to your Express app
   app.use(helmet());
   app.use(express-rate-limit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   }));
   ```

## 📊 Monitoring & Analytics

### Review Analytics

The system tracks:
- Review views
- Helpful votes
- Report flags
- User interactions

### Performance Metrics

- Cache hit rates
- API response times
- Database query performance
- Error rates

## 🧪 Testing

### Run Tests

```bash
# Install test dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

### Test Coverage

- API endpoint testing
- Database operations
- Cache functionality
- Form validation
- Error handling

## 🔒 Security Considerations

### Input Validation

- Server-side validation for all inputs
- SQL injection prevention
- XSS protection
- Rate limiting

### Data Protection

- Email validation
- IP address logging
- User agent tracking
- Review moderation

## 📝 Database Maintenance

### Regular Tasks

```sql
-- Clean expired cache
DELETE FROM review_cache WHERE expires_at < NOW();

-- Update statistics
CALL GetReviewStats();

-- Archive old reviews (optional)
CREATE TABLE reviews_archive AS SELECT * FROM reviews WHERE created_at < DATE_SUB(NOW(), INTERVAL 2 YEAR);
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials in .env
   - Ensure MySQL is running
   - Verify database exists

2. **Reviews Not Loading**
   - Check API server is running
   - Verify CORS settings
   - Check browser console for errors

3. **Cache Issues**
   - Clear browser localStorage
   - Restart API server
   - Check cache expiration settings

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm start

# Check database connection
node -e "require('./database/setup.js')"
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check database logs
4. Contact the development team

## 🎯 Future Enhancements

- [ ] Email notifications for new reviews
- [ ] Review moderation dashboard
- [ ] Advanced analytics and reporting
- [ ] Review photo attachments
- [ ] Social media integration
- [ ] Review response system
- [ ] Automated review requests
- [ ] Review sentiment analysis

---

**Built with ❤️ for Pitt Metro Realty**
