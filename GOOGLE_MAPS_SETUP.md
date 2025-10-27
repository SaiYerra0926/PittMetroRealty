# Google Maps API Key Setup Guide

## Step 1: Get Your Google Maps API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/google/maps-apis
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click "Select a project" at the top
   - Click "New Project" if you don't have one
   - Give it a name like "Pittsburgh Real Estate"

3. **Enable the Maps Embed API**
   - In the left sidebar, go to "APIs & Services" > "Library"
   - Search for "Maps Embed API"
   - Click on it and press "Enable"

4. **Create API Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - **IMPORTANT**: Copy the API key immediately (you won't see it again)

5. **Secure Your API Key (Recommended)**
   - Click on your API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add these referrers:
     - `localhost:*`
     - `127.0.0.1:*`
     - Your production domain (when you deploy)

## Step 2: Add API Key to Your Project

1. **Create Environment File**
   - In your project root folder, create a file called `.env.local`
   - Add this line (replace with your actual API key):
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyYourActualAPIKeyHere
   ```

2. **Restart Your Development Server**
   ```bash
   npm run dev
   ```

## Step 3: Test Your Setup

After restarting, you should see:
- Interactive Google Maps instead of the fallback message
- Pittsburgh area map with zoom controls
- Property overlay on the right side
- Map controls at the bottom left

## Troubleshooting

**If you still see the fallback message:**
1. Check that `.env.local` file exists in the project root
2. Verify the API key is correct (no extra spaces)
3. Make sure you restarted the development server
4. Check browser console for any error messages

**If you get "API key not valid" error:**
1. Verify the Maps Embed API is enabled in Google Cloud Console
2. Check that your API key restrictions allow your domain
3. Make sure you copied the full API key without extra characters

## Free Usage Limits

Google Maps Embed API is free for:
- Up to 25,000 map loads per month
- Perfect for most real estate websites
- No credit card required for basic usage
