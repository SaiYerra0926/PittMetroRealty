# Property Listings API Setup Guide

This guide explains how to set up the Property Listings API for the Property Owner Portal.

## Overview

The Property Listings API allows property owners to:
- Create new property listings
- Upload property photos
- View and manage their listings
- Track listing status (Draft, Pending Review, Approved, Published, Rejected)

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Get All Properties
```
GET /properties
```

**Query Parameters:**
- `status` (optional): Filter by status (e.g., "Published", "Pending Review")
- `listingType` (optional): Filter by type ("rent", "sell", "buy")
- `ownerEmail` (optional): Filter by owner email
- `limit` (optional): Number of results to return
- `offset` (optional): Number of results to skip

**Response:**
```json
{
  "listings": [
    {
      "id": "uuid",
      "title": "Beautiful 3BR/2BA Home",
      "description": "...",
      "address": "123 Main St",
      "city": "Pittsburgh",
      "state": "PA",
      "zipCode": "15213",
      "propertyType": "Single Family Home",
      "bedrooms": 3,
      "bathrooms": 2,
      "squareFeet": 1800,
      "price": 250000,
      "listingType": "sell",
      "status": "Published",
      "photos": [...],
      "features": [...],
      "amenities": [...],
      "ownerName": "John Doe",
      "ownerEmail": "john@example.com",
      "ownerPhone": "(555) 123-4567",
      "submittedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 1
}
```

#### 2. Get Single Property
```
GET /properties/:id
```

**Response:**
```json
{
  "listing": {
    "id": "uuid",
    ...
  }
}
```

#### 3. Create Property Listing
```
POST /properties
```

**Request Body:**
```json
{
  "title": "Beautiful 3BR/2BA Home",
  "description": "Stunning property in prime location",
  "address": "123 Main St",
  "city": "Pittsburgh",
  "state": "PA",
  "zipCode": "15213",
  "propertyType": "Single Family Home",
  "bedrooms": 3,
  "bathrooms": 2,
  "squareFeet": 1800,
  "yearBuilt": 2018,
  "lotSize": 5000,
  "price": 250000,
  "listingType": "sell",
  "features": ["Garage", "Garden", "Updated Kitchen"],
  "amenities": ["Pool", "Gym"],
  "availableDate": "2024-03-01",
  "photos": [
    {
      "name": "photo1.jpg",
      "url": "data:image/jpeg;base64,...",
      "size": 1024000
    }
  ],
  "ownerName": "John Doe",
  "ownerEmail": "john@example.com",
  "ownerPhone": "(555) 123-4567",
  "ownerPreferredContact": "email"
}
```

**Response:**
```json
{
  "message": "Property created successfully",
  "listing": {
    "id": "uuid",
    "status": "Pending Review",
    "submittedAt": "2024-01-15T10:00:00Z",
    ...
  }
}
```

#### 4. Update Property
```
PUT /properties/:id
```

**Request Body:** (Partial property data)

#### 5. Delete Property
```
DELETE /properties/:id
```

**Response:**
```json
{
  "message": "Property deleted successfully"
}
```

#### 6. Get Property Statistics
```
GET /properties/stats
```

**Query Parameters:**
- `ownerEmail` (optional): Get stats for specific owner

**Response:**
```json
{
  "totalListings": 10,
  "publishedListings": 5,
  "pendingListings": 3,
  "approvedListings": 7
}
```

#### 7. Get Properties by Owner
```
GET /properties?ownerEmail=owner@example.com
```

## Database Schema

### Properties Table
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  property_type VARCHAR(100) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(3,1) NOT NULL,
  square_feet INTEGER NOT NULL,
  year_built INTEGER,
  lot_size INTEGER,
  price DECIMAL(12,2) NOT NULL,
  listing_type VARCHAR(20) NOT NULL CHECK (listing_type IN ('rent', 'sell', 'buy')),
  status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Pending Review', 'Approved', 'Published', 'Rejected')),
  available_date DATE,
  owner_name VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  owner_phone VARCHAR(50) NOT NULL,
  owner_preferred_contact VARCHAR(20) DEFAULT 'email',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Property Photos Table
```sql
CREATE TABLE property_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  photo_name VARCHAR(255) NOT NULL,
  photo_size INTEGER,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Property Features Table
```sql
CREATE TABLE property_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  feature_name VARCHAR(100) NOT NULL,
  UNIQUE(property_id, feature_name)
);
```

### Property Amenities Table
```sql
CREATE TABLE property_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  amenity_name VARCHAR(100) NOT NULL,
  UNIQUE(property_id, amenity_name)
);
```

## Mock Server Setup (Development)

For development, you can use `json-server` to create a mock API:

### 1. Install json-server
```bash
npm install -g json-server
```

### 2. Create db.json
```json
{
  "properties": [],
  "stats": {
    "totalListings": 0,
    "publishedListings": 0,
    "pendingListings": 0,
    "approvedListings": 0
  }
}
```

### 3. Start Mock Server
```bash
json-server --watch db.json --port 3001 --routes routes.json
```

### 4. Create routes.json
```json
{
  "/api/properties": "/properties",
  "/api/properties/:id": "/properties/:id",
  "/api/properties/stats": "/stats"
}
```

## Production Setup

### Using Node.js/Express

1. Set up database connection (PostgreSQL recommended)
2. Create API routes in `api/properties.ts`
3. Implement proper authentication/authorization
4. Add file upload handling for photos
5. Set up error handling and validation
6. Add rate limiting and security measures

### Example Express Route
```typescript
import express from 'express';
import { createProperty, getProperties, getProperty, updateProperty, deleteProperty, getPropertyStats } from '../api/properties';

const router = express.Router();

router.post('/properties', createProperty);
router.get('/properties', getProperties);
router.get('/properties/:id', getProperty);
router.put('/properties/:id', updateProperty);
router.delete('/properties/:id', deleteProperty);
router.get('/properties/stats', getPropertyStats);

export default router;
```

## Frontend Integration

The frontend uses the `PropertiesAPI` class (`src/lib/api/properties.ts`):

```typescript
import { PropertiesAPI } from '@/lib/api/properties';

const propertiesApi = new PropertiesAPI();

// Create property
const newListing = await propertiesApi.createProperty(listingData);

// Get properties
const response = await propertiesApi.getProperties({ status: 'Published' });

// Get owner's properties
const ownerProperties = await propertiesApi.getPropertiesByOwner('owner@example.com');
```

## LocalStorage Fallback

The API client includes localStorage fallback for offline functionality:
- Properties are cached locally after successful API calls
- If API fails, cached data is used
- Ensures better user experience during network issues

## Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:3001/api
```

## Testing

Test the API endpoints using curl or Postman:

```bash
# Create property
curl -X POST http://localhost:3001/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Property",
    "description": "Test description",
    ...
  }'

# Get properties
curl http://localhost:3001/api/properties

# Get stats
curl http://localhost:3001/api/properties/stats
```

## Notes

- Photos are sent as base64-encoded strings in JSON
- For production, consider using file upload endpoints (multipart/form-data)
- Implement proper image optimization and CDN storage
- Add pagination for large property lists
- Implement search and filtering capabilities
- Add image validation and size limits
- Implement proper error handling and user feedback

