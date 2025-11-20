# 🚀 Server Configuration Guide - Step by Step

This guide shows you **exactly which files** need configuration and **what details** to update for your server and database.

---

## 📋 Files That Need Configuration

### ✅ **ONLY 1 FILE NEEDS YOUR CREDENTIALS:**

## 1. `.env` File (PRIMARY CONFIGURATION FILE)

**Location:** Root directory (create this file)  
**Action:** Copy `env.example` and rename to `.env`, then update with your details

### Required Configuration:

```env
# ============================================
# DATABASE CONFIGURATION (REQUIRED)
# ============================================
# Replace these with YOUR database credentials
DATABASE_HOST=your_database_host_here
DATABASE_PORT=5432
DATABASE_USER=your_database_username
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name

# Optional: Use connection string format instead
# DATABASE_URL=postgresql://username:password@host:port/database

# ============================================
# SERVER CONFIGURATION (REQUIRED)
# ============================================
# Port where your API server will run
PORT=3001

# Environment: 'development' or 'production'
NODE_ENV=development

# ============================================
# API URL CONFIGURATION (REQUIRED)
# ============================================
# For Development (local):
VITE_API_URL=http://localhost:3001/api

# For Production (replace with your server URL):
# VITE_API_URL=https://your-api-server.com/api

# ============================================
# FRONTEND URL (REQUIRED)
# ============================================
# For Development:
FRONTEND_URL=http://localhost:5173

# For Production (replace with your frontend URL):
# FRONTEND_URL=https://your-frontend-domain.com

# ============================================
# SECURITY (OPTIONAL but RECOMMENDED)
# ============================================
JWT_SECRET=your_jwt_secret_here_change_this
API_KEY=your_api_key_here_change_this

# ============================================
# OPTIONAL CONFIGURATIONS
# ============================================
# Cache Configuration
CACHE_DURATION=300000
REDIS_URL=redis://localhost:6379

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Email Configuration (if using email features)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 📝 Step-by-Step Configuration Instructions

### Step 1: Create `.env` File

1. **Copy the example file:**
   ```bash
   cp env.example .env
   ```

2. **Open `.env` file** in your text editor

3. **Update these REQUIRED fields:**

   ```env
   # Database - REPLACE WITH YOUR VALUES
   DATABASE_HOST=your_actual_database_host
   DATABASE_PORT=5432
   DATABASE_USER=your_actual_username
   DATABASE_PASSWORD=your_actual_password
   DATABASE_NAME=your_actual_database_name
   
   # API URL - REPLACE WITH YOUR SERVER URL
   VITE_API_URL=http://your-server-ip:3001/api
   # OR for production:
   # VITE_API_URL=https://your-domain.com/api
   
   # Frontend URL - REPLACE WITH YOUR FRONTEND URL
   FRONTEND_URL=http://your-frontend-url
   ```

### Step 2: Update CORS Settings (if needed)

**File:** `server.js`  
**Location:** Lines 11-19

**For Development:** No changes needed (allows all origins)

**For Production:** Update allowed origins:

```javascript
const allowedOrigins = [
  'https://your-production-domain.com',
  'https://your-frontend-domain.com',
  'http://localhost:5173',  // Keep for local testing
  'http://localhost:3001',
];
```

---

## 🔍 Files That Read Configuration (NO CHANGES NEEDED)

These files **automatically read** from `.env` file. **You don't need to modify them**, but here's where they get their values:

### 1. Database Connection
**File:** `src/lib/database.js`  
**Reads from:** `.env` file (DATABASE_HOST, DATABASE_PORT, etc.)  
**Status:** ✅ Already configured to read from environment variables

**How it works:**
```javascript
// This file automatically reads from .env
const dbConfig = {
  host: process.env.DATABASE_HOST || 'fallback_host',
  port: Number(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'postgres',
};
```

### 2. Server Port
**File:** `server.js`  
**Reads from:** `.env` file (PORT)  
**Status:** ✅ Already configured (line 8)

**How it works:**
```javascript
const PORT = process.env.PORT || 3001;
```

### 3. API Client - Properties
**File:** `src/lib/api/properties.ts`  
**Reads from:** `.env` file (VITE_API_URL)  
**Status:** ✅ Already configured (line 68)

**How it works:**
```javascript
this.baseUrl = baseUrl || import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

### 4. API Client - Reviews
**File:** `src/lib/api/reviews.ts`  
**Reads from:** `.env` file (VITE_API_URL)  
**Status:** ✅ Already configured (line 2)

**How it works:**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

---

## ✅ Configuration Checklist

Before deploying, make sure you have:

- [ ] Created `.env` file in root directory
- [ ] Set `DATABASE_HOST` with your database host/IP
- [ ] Set `DATABASE_PORT` (usually 5432)
- [ ] Set `DATABASE_USER` with your database username
- [ ] Set `DATABASE_PASSWORD` with your database password
- [ ] Set `DATABASE_NAME` with your database name
- [ ] Set `VITE_API_URL` with your API server URL
- [ ] Set `FRONTEND_URL` with your frontend URL
- [ ] Set `PORT` (usually 3001)
- [ ] Set `NODE_ENV` (development or production)
- [ ] Updated CORS origins in `server.js` (for production)

---

## 🎯 Quick Configuration Template

Copy this template and fill in your values:

```env
# ============================================
# YOUR CONFIGURATION - FILL IN BELOW
# ============================================

# Database Details
DATABASE_HOST=YOUR_DATABASE_HOST_OR_IP
DATABASE_PORT=5432
DATABASE_USER=YOUR_DATABASE_USERNAME
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
DATABASE_NAME=YOUR_DATABASE_NAME

# Server Details
PORT=3001
NODE_ENV=production

# API URL (Your server where API runs)
VITE_API_URL=https://your-api-server.com/api
# OR for local: http://localhost:3001/api

# Frontend URL (Your website URL)
FRONTEND_URL=https://your-website.com
# OR for local: http://localhost:5173

# Security (Generate random strings)
JWT_SECRET=generate_random_string_here
API_KEY=generate_random_string_here
```

---

## 🔐 Security Notes

1. **Never commit `.env` file to Git** - It contains sensitive credentials
2. **Use strong passwords** for database
3. **Generate random strings** for JWT_SECRET and API_KEY
4. **Use HTTPS** in production
5. **Restrict CORS** to your domains only in production

---

## 📦 Files Summary

| File | Action Required | Purpose |
|------|----------------|---------|
| `.env` | ✅ **CREATE & CONFIGURE** | All server and database credentials |
| `server.js` | ⚠️ Update CORS (production only) | Server setup and CORS configuration |
| `src/lib/database.js` | ❌ No changes | Reads from `.env` automatically |
| `src/lib/api/properties.ts` | ❌ No changes | Reads from `.env` automatically |
| `src/lib/api/reviews.ts` | ❌ No changes | Reads from `.env` automatically |

---

## 🚀 After Configuration

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm run server
   # OR
   npm start
   ```

3. **Start the frontend (in another terminal):**
   ```bash
   npm run dev
   ```

4. **Test the connection:**
   - Visit: `http://localhost:3001/api/health`
   - Should return: `{"success": true, "message": "API is running"}`

---

## 🆘 Troubleshooting

### Database Connection Issues:
- Check database host is accessible
- Verify database credentials in `.env`
- Check firewall allows port 5432
- Verify database server is running

### API Connection Issues:
- Verify `VITE_API_URL` in `.env` matches your server
- Check server is running on correct port
- Verify CORS settings in `server.js`

### Frontend Not Loading Data:
- Check browser console for errors
- Verify `VITE_API_URL` is correct
- Ensure API server is running
- Check network tab for failed requests

---

## 📞 Need Help?

If you need to share configuration details:
1. **DO NOT** share your `.env` file directly
2. Share the **template** with placeholders
3. Use secure methods to share actual credentials

---

**Remember:** Only the `.env` file needs your actual credentials. All other files automatically read from it!

