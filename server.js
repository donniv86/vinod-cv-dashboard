/**
 * Simple Backend Server for External API Integration
 * Handles SerpAPI (Google Scholar) and Proxycurl (LinkedIn) calls
 */

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Keys
const SERPAPI_KEY = process.env.VITE_SERPAPI_KEY || process.env.SERPAPI_KEY;
const PROXYCURL_KEY = process.env.VITE_PROXYCURL_KEY || process.env.PROXYCURL_KEY;

// Google Scholar Data via SerpAPI
app.get('/api/google-scholar', async (req, res) => {
  try {
    if (!SERPAPI_KEY) {
      return res.status(400).json({
        error: 'SerpAPI key not configured. Please add VITE_SERPAPI_KEY to your .env file'
      });
    }

    console.log('Fetching Google Scholar data for Vinod Devaraji...');

    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_scholar',
        q: 'Vinod Devaraji',
        api_key: SERPAPI_KEY,
        num: 100 // Get more results for better analysis
      }
    });

    // Parse the response to extract publication data
    const data = response.data;
    console.log('SerpAPI response received');

    // Extract publication information
    let publications = [];
    let totalCitations = 0;
    let hIndex = 0;

    if (data.organic_results) {
      publications = data.organic_results.map(result => ({
        title: result.title,
        authors: result.authors,
        citations: parseInt(result.cited_by?.total || 0),
        year: result.year,
        snippet: result.snippet
      }));

      // Calculate total citations
      totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);

      // Simple H-index calculation (can be improved)
      const sortedCitations = publications
        .map(pub => pub.citations)
        .sort((a, b) => b - a);

      hIndex = sortedCitations.findIndex((citations, index) => citations <= index + 1);
      if (hIndex === -1) hIndex = sortedCitations.length;
    }

    const result = {
      publications: {
        count: publications.length,
        citations: totalCitations,
        hIndex: hIndex,
        lastUpdated: new Date().toISOString()
      },
      rawData: publications.slice(0, 10) // First 10 publications for reference
    };

    console.log('Google Scholar data processed:', result);
    res.json(result);

  } catch (error) {
    console.error('Error fetching Google Scholar data:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch Google Scholar data',
      details: error.response?.data || error.message
    });
  }
});

// LinkedIn Data via Proxycurl (if you have the key)
app.get('/api/linkedin-profile', async (req, res) => {
  try {
    if (!PROXYCURL_KEY) {
      return res.status(400).json({
        error: 'Proxycurl key not configured. Please add VITE_PROXYCURL_KEY to your .env file'
      });
    }

    console.log('Fetching LinkedIn data...');

    const response = await axios.get('https://nubela.co/proxycurl/api/v2/linkedin', {
      params: {
        url: 'https://linkedin.com/in/vinod-d-ph-d-8bb57a36',
        api_key: PROXYCURL_KEY
      }
    });

    const data = response.data;
    console.log('LinkedIn data received');

    // Extract relevant information
    const result = {
      linkedin: {
        experience: calculateExperienceYears(data.experiences || []),
        currentPosition: data.experiences?.[0]?.title || 'Senior Scientist II',
        company: data.experiences?.[0]?.company || 'Schrödinger',
        location: data.location || 'Bangalore, India',
        lastUpdated: new Date().toISOString()
      }
    };

    console.log('LinkedIn data processed:', result);
    res.json(result);

  } catch (error) {
    console.error('Error fetching LinkedIn data:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch LinkedIn data',
      details: error.response?.data || error.message
    });
  }
});

// Helper function to calculate experience years
function calculateExperienceYears(experiences) {
  if (!experiences || experiences.length === 0) return 14; // Default fallback

  const now = new Date();
  let totalYears = 0;

  experiences.forEach(exp => {
    const startDate = new Date(exp.starts_at?.year || 2010, 0, 1);
    const endDate = exp.ends_at ? new Date(exp.ends_at.year, 0, 1) : now;
    const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
    totalYears += Math.max(0, years);
  });

  return Math.round(totalYears);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apis: {
      serpapi: !!SERPAPI_KEY,
      proxycurl: !!PROXYCURL_KEY
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   - GET /api/google-scholar (SerpAPI: ${SERPAPI_KEY ? '✅ Configured' : '❌ Not configured'})`);
  console.log(`   - GET /api/linkedin-profile (Proxycurl: ${PROXYCURL_KEY ? '✅ Configured' : '❌ Not configured'})`);
  console.log(`   - GET /api/health`);
  console.log(`\n🔧 To configure API keys, create a .env file with:`);
  console.log(`   VITE_SERPAPI_KEY=your_serpapi_key_here`);
  console.log(`   VITE_PROXYCURL_KEY=your_proxycurl_key_here`);
});