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

    console.log('Fetching detailed Google Scholar data for Vinod Devaraji...');

    // Fetch multiple pages for comprehensive data
    const allPublications = [];
    let page = 0;
    const maxPages = 5; // Fetch up to 5 pages (100 results per page)

    while (page < maxPages) {
      const response = await axios.get('https://serpapi.com/search.json', {
        params: {
          engine: 'google_scholar',
          q: 'Vinod Devaraji',
          api_key: SERPAPI_KEY,
          num: 100,
          start: page * 100
        }
      });

      const data = response.data;

      if (!data.organic_results || data.organic_results.length === 0) {
        break; // No more results
      }

      // Process publications from this page
      const pagePublications = data.organic_results.map(result => ({
        title: result.title,
        authors: result.publication_info?.authors?.map(author => author.name).join(', ') || 'N/A',
        citations: parseInt(result.inline_links?.cited_by?.total || 0),
        year: extractYear(result.publication_info?.summary) || 'N/A',
        snippet: result.snippet,
        publication: extractJournal(result.publication_info?.summary) || 'N/A',
        link: result.link,
        snippet_highlighted_words: result.snippet_highlighted_words || []
      }));

      allPublications.push(...pagePublications);
      page++;

      // If we got less than 100 results, we've reached the end
      if (data.organic_results.length < 100) {
        break;
      }
    }

    console.log(`Fetched ${allPublications.length} publications from Google Scholar`);

    // Remove duplicates based on title
    const uniquePublications = allPublications.filter((pub, index, self) =>
      index === self.findIndex(p => p.title === pub.title)
    );

    // Sort by citations (descending)
    const sortedPublications = uniquePublications.sort((a, b) => b.citations - a.citations);

    // Calculate enhanced metrics
    const totalCitations = sortedPublications.reduce((sum, pub) => sum + pub.citations, 0);
    const averageCitations = totalCitations / sortedPublications.length;

    // Enhanced H-index calculation
    const hIndex = calculateEnhancedHIndex(sortedPublications);

    // Calculate additional metrics
    const metrics = calculatePublicationMetrics(sortedPublications);

    const result = {
      publications: {
        count: sortedPublications.length,
        citations: totalCitations,
        hIndex: hIndex,
        averageCitations: Math.round(averageCitations * 100) / 100,
        lastUpdated: new Date().toISOString()
      },
      metrics: metrics,
      publicationsList: sortedPublications.slice(0, 50), // Top 50 publications
      summary: {
        totalPublications: sortedPublications.length,
        highlyCited: sortedPublications.filter(pub => pub.citations >= 50).length,
        recentPublications: sortedPublications.filter(pub => pub.year >= 2020).length,
        topCited: sortedPublications[0]?.citations || 0
      }
    };

    console.log('Enhanced Google Scholar data processed:', {
      publications: result.publications.count,
      citations: result.publications.citations,
      hIndex: result.publications.hIndex,
      topCited: result.summary.topCited
    });

    res.json(result);

  } catch (error) {
    console.error('Error fetching Google Scholar data:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch Google Scholar data',
      details: error.response?.data || error.message
    });
  }
});

// Helper function to extract year from publication summary
function extractYear(summary) {
  if (!summary) return 'N/A';

  // Look for 4-digit year pattern
  const yearMatch = summary.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? yearMatch[0] : 'N/A';
}

// Helper function to extract journal name from publication summary
function extractJournal(summary) {
  if (!summary) return 'N/A';

  // Look for journal name before the year
  const parts = summary.split(',');
  if (parts.length >= 2) {
    // Take the part before the last comma (which usually contains the journal)
    const journalPart = parts[parts.length - 2]?.trim();
    if (journalPart && !journalPart.match(/\b(19|20)\d{2}\b/)) {
      return journalPart;
    }
  }

  // Fallback: take first part if it doesn't contain a year
  const firstPart = parts[0]?.trim();
  if (firstPart && !firstPart.match(/\b(19|20)\d{2}\b/)) {
    return firstPart;
  }

  return 'N/A';
}

// Enhanced H-index calculation
function calculateEnhancedHIndex(publications) {
  if (!publications || publications.length === 0) return 0;

  // Sort by citations in descending order
  const sortedCitations = publications
    .map(pub => pub.citations)
    .sort((a, b) => b - a);

  // Find H-index: largest number h such that h publications have at least h citations each
  let hIndex = 0;
  for (let i = 0; i < sortedCitations.length; i++) {
    if (sortedCitations[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }

  return hIndex;
}

// Calculate additional publication metrics
function calculatePublicationMetrics(publications) {
  if (!publications || publications.length === 0) {
    return {
      citationRanges: {},
      yearDistribution: {},
      topJournals: [],
      collaborationNetworks: []
    };
  }

  // Citation ranges
  const citationRanges = {
    '0-10': publications.filter(pub => pub.citations >= 0 && pub.citations <= 10).length,
    '11-50': publications.filter(pub => pub.citations >= 11 && pub.citations <= 50).length,
    '51-100': publications.filter(pub => pub.citations >= 51 && pub.citations <= 100).length,
    '101-500': publications.filter(pub => pub.citations >= 101 && pub.citations <= 500).length,
    '500+': publications.filter(pub => pub.citations > 500).length
  };

  // Year distribution
  const yearDistribution = {};
  publications.forEach(pub => {
    if (pub.year && pub.year !== 'N/A') {
      yearDistribution[pub.year] = (yearDistribution[pub.year] || 0) + 1;
    }
  });

  // Top journals (extract from publication field)
  const journalCounts = {};
  publications.forEach(pub => {
    if (pub.publication && pub.publication !== 'N/A') {
      const journal = pub.publication.split(',')[0]; // Take first part as journal name
      journalCounts[journal] = (journalCounts[journal] || 0) + 1;
    }
  });

  const topJournals = Object.entries(journalCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([journal, count]) => ({ journal, count }));

  // Collaboration networks (extract from authors)
  const authorCounts = {};
  publications.forEach(pub => {
    if (pub.authors) {
      const authors = pub.authors.split(',').map(author => author.trim());
      authors.forEach(author => {
        if (author && author !== 'Vinod Devaraji') {
          authorCounts[author] = (authorCounts[author] || 0) + 1;
        }
      });
    }
  });

  const topCollaborators = Object.entries(authorCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([author, count]) => ({ author, count }));

  return {
    citationRanges,
    yearDistribution,
    topJournals,
    topCollaborators
  };
}

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