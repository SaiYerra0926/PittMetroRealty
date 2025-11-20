# Complete API Documentation & Server Configuration Guide

## 📋 Table of Contents
1. [API Endpoints List](#api-endpoints-list)
2. [Server Configuration Files](#server-configuration-files)
3. [API Client Files](#api-client-files)
4. [Server Route Files](#server-route-files)

---

## 🔌 API Endpoints List

### Base URL Configuration
- **Development**: `http://localhost:3001/api`
- **Production**: Set via `VITE_API_URL` environment variable
- **Default Fallback**: `http://localhost:3001/api`

---

### 1. Health Check API

| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Check API server status | `server.js` (line 48) |

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "database": "checking",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

---

### 2. Properties API

#### 2.1 Get All Properties
| Method | Endpoint | Description | Query Parameters | File Location |
|--------|----------|-------------|------------------|---------------|
| GET | `/api/properties` | Get all property listings | `status`, `listingType`, `ownerEmail`, `limit`, `offset`, `type`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `city` | `api/properties.ts` (line 5) |

**Client Method:** `PropertiesAPI.getProperties(filters?)`  
**Client File:** `src/lib/api/properties.ts` (line 132)

---

#### 2.2 Get Single Property
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| GET | `/api/properties/:id` | Get property by ID | `api/properties.ts` (line 141) |

**Client Method:** `PropertiesAPI.getProperty(id)`  
**Client File:** `src/lib/api/properties.ts` (line 169)

---

#### 2.3 Create Property
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| POST | `/api/properties` | Create new property listing | `api/properties.ts` (line 220) |

**Client Method:** `PropertiesAPI.createProperty(listingData)`  
**Client File:** `src/lib/api/properties.ts` (line 188)

---

#### 2.4 Update Property
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| PUT | `/api/properties/:id` | Update existing property | `api/properties.ts` (line 451) |

**Client Method:** `PropertiesAPI.updateProperty(id, listingData)`  
**Client File:** `src/lib/api/properties.ts` (line 239)

---

#### 2.5 Delete Property
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| DELETE | `/api/properties/:id` | Delete property listing | `api/properties.ts` (line 728) |

**Client Method:** `PropertiesAPI.deleteProperty(id)`  
**Client File:** `src/lib/api/properties.ts` (line 275)

---

#### 2.6 Get Properties by Owner
| Method | Endpoint | Description | Query Parameters | File Location |
|--------|----------|-------------|------------------|---------------|
| GET | `/api/properties/owner` | Get properties by owner email | `ownerEmail` (required) | `api/properties.ts` (line 786) |

**Client Method:** `PropertiesAPI.getPropertiesByOwner(ownerEmail)`  
**Client File:** `src/lib/api/properties.ts` (line 321)

---

#### 2.7 Get Published Properties
| Method | Endpoint | Description | Query Parameters | File Location |
|--------|----------|-------------|------------------|---------------|
| GET | `/api/properties` | Get published properties | `status=Published`, `listingType` (optional) | Uses `getProperties` endpoint |

**Client Method:** `PropertiesAPI.getPublishedProperties(listingType?)`  
**Client File:** `src/lib/api/properties.ts` (line 346)

---

#### 2.8 Get Property Statistics
| Method | Endpoint | Description | Query Parameters | File Location |
|--------|----------|-------------|------------------|---------------|
| GET | `/api/properties/stats` | Get property listing statistics | `ownerEmail` (optional) | Not directly in routes, but client calls it |

**Client Method:** `PropertiesAPI.getPropertyStats(ownerEmail?)`  
**Client File:** `src/lib/api/properties.ts` (line 296)

---

#### 2.9 Get Property Reviews
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| GET | `/api/properties/:id/reviews` | Get reviews for a specific property | `api/properties.ts` (line 890) |

---

#### 2.10 Create Contact Inquiry
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| POST | `/api/inquiries` | Create contact inquiry for a property | `api/properties.ts` (line 422) |

---

### 3. Reviews API

#### 3.1 Get All Reviews
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| GET | `/api/reviews` | Get all verified reviews | `api/reviews.ts` (line 4) |

**Client Method:** `fetchReviews()`  
**Client File:** `src/lib/api/reviews.ts` (line 38)

---

#### 3.2 Get Review Statistics
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| GET | `/api/reviews/stats` | Get review statistics (total, average rating, star counts) | `api/reviews.ts` (line 59) |

**Client Method:** `fetchReviewStats()`  
**Client File:** `src/lib/api/reviews.ts` (line 62)

---

#### 3.3 Create Review
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| POST | `/api/reviews` | Submit a new review | `api/reviews.ts` (line 104) |

**Client Method:** `submitReview(reviewData)`  
**Client File:** `src/lib/api/reviews.ts` (line 81)

**Required Fields:**
- `name` (string)
- `email` (string)
- `rating` (number, 1-5)
- `review_text` (string)

**Optional Fields:**
- `location` (string)
- `property_type` (string)
- `property_id` (UUID)

---

#### 3.4 Update Review Status
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| PUT | `/api/reviews/:id/status` | Update review verification status (admin) | `api/reviews.ts` (line 247) |

**Request Body:**
```json
{
  "is_verified": true
}
```

---

#### 3.5 Delete Review
| Method | Endpoint | Description | File Location |
|--------|----------|-------------|---------------|
| DELETE | `/api/reviews/:id` | Delete a review (admin) | `api/reviews.ts` (line 281) |

---

## 📁 Server Configuration Files

### 1. Environment Variables File
**File Name:** `.env` (create from `env.example`)  
**Location:** Root directory  
**Purpose:** Store all server configuration details

**Required Variables:**
```env
# Database Configuration
DATABASE_HOST=your_database_host
DATABASE_PORT=5432
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name

# Server Configuration
PORT=3001
NODE_ENV=development

# API Configuration (for frontend)
VITE_API_URL=http://localhost:3001/api

# Security
JWT_SECRET=your_jwt_secret_here
API_KEY=your_api_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Example File:** `env.example` (already exists in root)

---

### 2. Main Server File
**File Name:** `server.js`  
**Location:** Root directory  
**Purpose:** Express server setup, CORS configuration, route registration

**Key Configuration Points:**
- **Port:** Line 8 - `const PORT = process.env.PORT || 3001;`
- **CORS Origins:** Lines 11-19 - Allowed origins for CORS
- **Route Registration:** Lines 67-82 - All API routes

---

### 3. Database Configuration File
**File Name:** `src/lib/database.js` or `src/lib/database.ts`  
**Location:** `src/lib/`  
**Purpose:** PostgreSQL database connection pool configuration

**Configuration:**
- Database connection pool setup
- Connection string from environment variables
- Connection testing utilities

---

## 📂 API Client Files (Frontend)

### 1. Properties API Client
**File Name:** `src/lib/api/properties.ts`  
**Purpose:** Frontend API client for all property-related endpoints

**Key Configuration:**
- **Base URL:** Line 68 - `this.baseUrl = baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:3001/api';`
- **Methods:**
  - `testConnection()` - Test API connection
  - `getProperties()` - Get all properties
  - `getProperty()` - Get single property
  - `createProperty()` - Create property
  - `updateProperty()` - Update property
  - `deleteProperty()` - Delete property
  - `getPropertyStats()` - Get statistics
  - `getPropertiesByOwner()` - Get by owner email
  - `getPublishedProperties()` - Get published only

---

### 2. Reviews API Client
**File Name:** `src/lib/api/reviews.ts`  
**Purpose:** Frontend API client for all review-related endpoints

**Key Configuration:**
- **Base URL:** Line 2 - `const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';`
- **Methods:**
  - `fetchReviews()` - Get all reviews
  - `fetchReviewStats()` - Get review statistics
  - `submitReview()` - Submit new review

---

## 🔧 Server Route Files (Backend)

### 1. Properties Routes
**File Name:** `api/properties.ts`  
**Location:** `api/` directory  
**Purpose:** Backend route handlers for property endpoints

**Exported Functions:**
- `getProperties` - Get all properties with filters
- `getPropertyById` - Get single property
- `createProperty` - Create new property
- `updateProperty` - Update existing property
- `deleteProperty` - Delete property
- `getPropertiesByOwner` - Get properties by owner email
- `getPropertyReviews` - Get reviews for a property
- `createInquiry` - Create contact inquiry

**Registered in:** `server.js` (lines 68-75)

---

### 2. Reviews Routes
**File Name:** `api/reviews.ts`  
**Location:** `api/` directory  
**Purpose:** Backend route handlers for review endpoints

**Exported Functions:**
- `getReviews` - Get all verified reviews
- `getReviewStats` - Get review statistics
- `createReview` - Create new review
- `updateReviewStatus` - Update review verification status
- `deleteReview` - Delete a review

**Registered in:** `server.js` (lines 78-82)

---

## 📝 Summary: Where to Configure Server Details

### For Development:
1. **Create `.env` file** in root directory (copy from `env.example`)
2. **Set `VITE_API_URL`** in `.env` for frontend API calls
3. **Set `PORT`** in `.env` for server port
4. **Set database credentials** in `.env`

### For Production:
1. **Set environment variables** on hosting platform (Netlify, Vercel, etc.)
2. **Update `VITE_API_URL`** to production API URL
3. **Update CORS origins** in `server.js` (lines 11-19)
4. **Set `NODE_ENV=production`** in environment

### Files That Need Server Configuration:

| File | Purpose | Configuration Location |
|------|---------|----------------------|
| `.env` | Environment variables | Root directory (create from `env.example`) |
| `server.js` | Server setup & routes | Lines 8, 11-19, 67-82 |
| `src/lib/api/properties.ts` | Properties API client | Line 68 (baseUrl) |
| `src/lib/api/reviews.ts` | Reviews API client | Line 2 (API_BASE_URL) |
| `src/lib/database.js` | Database connection | Database connection config |

---

## 🚀 Quick Reference: All API Endpoints

### Properties (10 endpoints)
1. `GET /api/health` - Health check
2. `GET /api/properties` - Get all properties
3. `GET /api/properties/:id` - Get single property
4. `POST /api/properties` - Create property
5. `PUT /api/properties/:id` - Update property
6. `DELETE /api/properties/:id` - Delete property
7. `GET /api/properties/owner?ownerEmail=...` - Get by owner
8. `GET /api/properties/stats?ownerEmail=...` - Get statistics
9. `GET /api/properties/:id/reviews` - Get property reviews
10. `POST /api/inquiries` - Create inquiry

### Reviews (5 endpoints)
1. `GET /api/reviews` - Get all reviews
2. `GET /api/reviews/stats` - Get review statistics
3. `POST /api/reviews` - Create review
4. `PUT /api/reviews/:id/status` - Update review status
5. `DELETE /api/reviews/:id` - Delete review

**Total: 16 API Endpoints**

---

## 📌 Important Notes

1. **Base URL Configuration:**
   - Frontend uses `VITE_API_URL` environment variable
   - Default fallback: `http://localhost:3001/api`
   - Set in `.env` file or hosting platform environment variables

2. **CORS Configuration:**
   - Configured in `server.js` (lines 11-41)
   - Development: Allows all origins
   - Production: Restricted to specific origins

3. **Database Configuration:**
   - Configured via environment variables in `.env`
   - Connection pool managed in `src/lib/database.js`

4. **Error Handling:**
   - All API clients have fallback to localStorage
   - Server returns standardized error responses
   - Error middleware in `server.js` (lines 85-92)

