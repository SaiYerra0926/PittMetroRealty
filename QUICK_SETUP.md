# ⚡ Quick Setup - Copy & Configure

## 🎯 What You Need to Do

### **ONLY 1 FILE NEEDS YOUR CREDENTIALS:**

## Step 1: Create `.env` File

1. **Copy the example file:**
   ```bash
   cp env.example .env
   ```

2. **Open `.env` file** and update these values:

```env
# ============================================
# UPDATE THESE VALUES WITH YOUR DETAILS
# ============================================

# Database Credentials (REQUIRED)
DATABASE_HOST=your_database_host_here
DATABASE_PORT=5432
DATABASE_USER=your_database_username
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name

# Server Port (REQUIRED)
PORT=3001

# API URL (REQUIRED)
# For local development:
VITE_API_URL=http://localhost:3001/api

# For production (replace with your server URL):
# VITE_API_URL=https://your-server.com/api

# Frontend URL (REQUIRED)
# For local development:
FRONTEND_URL=http://localhost:5173

# For production (replace with your frontend URL):
# FRONTEND_URL=https://your-website.com

# Environment
NODE_ENV=development
```

---

## Step 2: (Optional) Update CORS for Production

**File:** `server.js`  
**Lines:** 11-19

If deploying to production, update the allowed origins:

```javascript
const allowedOrigins = [
  'https://your-production-domain.com',
  'https://your-frontend-domain.com',
  'http://localhost:5173',  // Keep for testing
];
```

---

## ✅ That's It!

All other files automatically read from `.env` file. No other changes needed!

---

## 📋 Files That Read Configuration (No Changes Needed)

These files automatically use values from `.env`:

- ✅ `src/lib/database.js` - Reads database credentials
- ✅ `server.js` - Reads PORT
- ✅ `src/lib/api/properties.ts` - Reads VITE_API_URL
- ✅ `src/lib/api/reviews.ts` - Reads VITE_API_URL

---

## 🚀 Start Your Application

```bash
# Install dependencies (first time only)
npm install

# Start the API server
npm run server

# In another terminal, start the frontend
npm run dev
```

---

## 🆘 Need Help?

See `SERVER_CONFIGURATION_GUIDE.md` for detailed instructions.

---

**Remember:** Only update the `.env` file with your credentials. Everything else works automatically!

