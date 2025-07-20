# Backend Setup for Automated Data Fetching

## Current Status

✅ **GitHub API**: Working perfectly - fetches real data automatically
❌ **Google Scholar**: Needs API service (no public API)
❌ **LinkedIn**: Needs API service (no public API)

## Quick Solutions

### Option 1: Use Existing API Services (Recommended)

#### For Google Scholar - SerpAPI
```bash
# Sign up at https://serpapi.com/
# Get API key and use this endpoint:
curl "https://serpapi.com/search.json?engine=google_scholar&q=Vinod+Devaraji&api_key=YOUR_API_KEY"
```

#### For LinkedIn - Proxycurl
```bash
# Sign up at https://proxycurl.com/
# Get API key and use this endpoint:
curl "https://nubela.co/proxycurl/api/v2/linkedin?url=https://linkedin.com/in/vinod-d-ph-d-8bb57a36&api_key=YOUR_API_KEY"
```

### Option 2: Simple Backend Service (Node.js)

Create a simple Express server:

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

const SERPAPI_KEY = 'your_serpapi_key';
const PROXYCURL_KEY = 'your_proxycurl_key';

app.get('/api/google-scholar', async (req, res) => {
  try {
    const response = await axios.get(
      `https://serpapi.com/search.json?engine=google_scholar&q=Vinod+Devaraji&api_key=${SERPAPI_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Google Scholar data' });
  }
});

app.get('/api/linkedin-profile', async (req, res) => {
  try {
    const response = await axios.get(
      `https://nubela.co/proxycurl/api/v2/linkedin?url=https://linkedin.com/in/vinod-d-ph-d-8bb57a36&api_key=${PROXYCURL_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LinkedIn data' });
  }
});

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});
```

### Option 3: Manual Data Entry with Auto-Update

If you prefer not to use external APIs, you can manually update the data in the config file:

```typescript
// src/config/manual-data.ts
export const MANUAL_DATA = {
  publications: {
    count: 40, // Update manually
    citations: 1247, // Update manually
    hIndex: 16, // Update manually
  },
  linkedin: {
    experience: 14, // Update manually
    currentPosition: 'Senior Scientist II',
    company: 'Schrödinger',
    location: 'Bangalore, India',
  }
}
```

## Implementation Steps

1. **For Immediate Results**: Use Option 3 (manual data) for now
2. **For Full Automation**: Set up Option 1 or 2
3. **Test GitHub Integration**: Already working!

## Cost Estimates

- **SerpAPI**: ~$50/month for Google Scholar scraping
- **Proxycurl**: ~$30/month for LinkedIn data
- **Alternative**: Manual updates (free)

## Next Steps

1. Choose your preferred option
2. Set up the backend service
3. Update the frontend to use the new endpoints
4. Test the complete system

Would you like me to implement any of these options?