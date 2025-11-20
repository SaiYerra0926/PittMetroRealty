# API Quick Reference Guide

## 📋 Complete API List (16 Endpoints)

### Health Check (1)
- `GET /api/health` - Server health check

### Properties API (10)
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/owner?ownerEmail=...` - Get by owner
- `GET /api/properties/stats?ownerEmail=...` - Get statistics
- `GET /api/properties/:id/reviews` - Get property reviews
- `POST /api/inquiries` - Create contact inquiry

### Reviews API (5)
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/stats` - Get review statistics
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id/status` - Update review status
- `DELETE /api/reviews/:id` - Delete review

---

## 📁 Files for Server Configuration

### 1. Environment Variables
**File:** `.env` (create from `env.example`)  
**Location:** Root directory  
**Contains:**
- Database credentials (DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME)
- Server port (PORT=3001)
- API URL (VITE_API_URL=http://localhost:3001/api)
- Security keys (JWT_SECRET, API_KEY)
- Frontend URL (FRONTEND_URL)

### 2. Server Configuration
**File:** `server.js`  
**Location:** Root directory  
**Key Lines:**
- Line 8: Port configuration
- Lines 11-19: CORS allowed origins
- Lines 67-82: Route registration

### 3. Database Configuration
**File:** `src/lib/database.js` or `src/lib/database.ts`  
**Location:** `src/lib/`  
**Purpose:** PostgreSQL connection pool

---

## 📂 API Client Files (Frontend)

| File | Purpose | Base URL Config |
|------|---------|----------------|
| `src/lib/api/properties.ts` | Properties API client | Line 68 |
| `src/lib/api/reviews.ts` | Reviews API client | Line 2 |

---

## 🔧 Server Route Files (Backend)

| File | Purpose | Registered In |
|------|---------|---------------|
| `api/properties.ts` | Property route handlers | `server.js` lines 68-75 |
| `api/reviews.ts` | Review route handlers | `server.js` lines 78-82 |

---

## ⚙️ Configuration Checklist

### Development Setup:
- [ ] Create `.env` file from `env.example`
- [ ] Set `VITE_API_URL=http://localhost:3001/api`
- [ ] Set `PORT=3001`
- [ ] Configure database credentials
- [ ] Update CORS origins in `server.js` if needed

### Production Setup:
- [ ] Set environment variables on hosting platform
- [ ] Update `VITE_API_URL` to production URL
- [ ] Update CORS origins in `server.js` (lines 11-19)
- [ ] Set `NODE_ENV=production`

---

## 🔗 Base URLs

- **Development:** `http://localhost:3001/api`
- **Production:** Set via `VITE_API_URL` environment variable
- **Default Fallback:** `http://localhost:3001/api`

---

For detailed documentation, see `API_DOCUMENTATION.md`

