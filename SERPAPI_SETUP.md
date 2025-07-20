# 🚀 SerpAPI Setup Guide

## Step 1: Create Environment File

Create a `.env` file in your project root:

```bash
# Create .env file
touch .env
```

Add your SerpAPI key to the `.env` file:

```env
VITE_SERPAPI_KEY=your_actual_serpapi_key_here
```

## Step 2: Install Backend Dependencies

```bash
# Install backend dependencies
npm install express axios cors dotenv
npm install --save-dev nodemon
```

## Step 3: Start the Backend Server

```bash
# Start the backend server
node server.js
```

You should see:
```
🚀 Backend server running on port 3001
📊 API endpoints:
   - GET /api/google-scholar (SerpAPI: ✅ Configured)
   - GET /api/linkedin-profile (Proxycurl: ❌ Not configured)
   - GET /api/health
```

## Step 4: Test the Integration

1. Make sure your frontend is running (`npm run dev`)
2. Open your browser to `http://localhost:5179`
3. Check the browser console for API calls
4. The Data Admin Panel should show real Google Scholar data

## Step 5: Verify Data

The system will now:
- ✅ Fetch real publication count from Google Scholar
- ✅ Calculate actual citations
- ✅ Determine H-index from your publications
- ✅ Update automatically every 24 hours

## Troubleshooting

### If you see "SerpAPI key not configured":
1. Make sure your `.env` file exists
2. Check that `VITE_SERPAPI_KEY` is set correctly
3. Restart the backend server

### If you see CORS errors:
1. Make sure the backend is running on port 3001
2. Check that the frontend is making requests to `http://localhost:3001`

### If SerpAPI returns no results:
1. Try different search terms in `server.js`
2. Check your SerpAPI account for remaining searches
3. Verify the search query "Vinod Devaraji" returns results

## Expected Results

After setup, you should see:
- Real publication count (not the default 40)
- Actual citation numbers
- Calculated H-index
- Automatic updates when you publish new papers

## Next Steps

Once SerpAPI is working, you can:
1. Add Proxycurl for LinkedIn data
2. Set up automatic daily updates
3. Add more sophisticated H-index calculations
4. Include publication titles and details

Your CV Dashboard will now have real, automatically updated data! 🎉