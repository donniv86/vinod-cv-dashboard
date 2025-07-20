/**
 * Configuration for external API integrations
 * This file contains settings for LinkedIn, Google Scholar, and GitHub data fetching
 */

export const EXTERNAL_API_CONFIG = {
  // GitHub Configuration
  GITHUB: {
    USERNAME: 'donniv86',
    API_BASE_URL: 'https://api.github.com',
    UPDATE_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
  },

  // LinkedIn Configuration (requires backend service)
  LINKEDIN: {
    PROFILE_ID: 'vinod-d-ph-d-8bb57a36',
    // Note: LinkedIn doesn't have a public API
    // You'll need to use a service like Proxycurl or create a backend scraper
    UPDATE_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Google Scholar Configuration (requires backend service)
  GOOGLE_SCHOLAR: {
    PROFILE_ID: 'YOUR_GOOGLE_SCHOLAR_ID', // Replace with actual ID
    // Note: Google Scholar doesn't have a public API
    // You'll need to use a service like SerpAPI or create a backend scraper
    UPDATE_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
  },

  // Backend Service Configuration (for LinkedIn and Google Scholar)
  BACKEND: {
    BASE_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
    ENDPOINTS: {
      LINKEDIN_DATA: '/api/linkedin-data',
      GOOGLE_SCHOLAR_DATA: '/api/google-scholar-data',
      REFRESH_DATA: '/api/refresh-data',
    },
  },

  // Cache Configuration
  CACHE: {
    ENABLED: true,
    DURATION: 24 * 60 * 60 * 1000, // 24 hours
    STORAGE_KEY: 'cv-dashboard-external-data',
  },

  // Error Handling
  ERROR_HANDLING: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
    FALLBACK_TO_CACHED: true,
  },
}

// Default data values (used as fallback)
export const DEFAULT_DATA = {
  publications: {
    count: 44,
    citations: 674,
    hIndex: 15,
  },
  github: {
    repositories: 11,
    stars: 0,
    contributions: 0,
    languages: ['Python', 'JavaScript', 'TypeScript'],
  },
  linkedin: {
    experience: 14,
    currentPosition: 'Senior Scientist II',
    company: 'Schrödinger',
    location: 'Bangalore, India',
  },
}

// API Response Types
export interface GitHubUserResponse {
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepoResponse {
  id: number
  name: string
  description: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  html_url: string
}

export interface LinkedInProfileResponse {
  experience: number
  currentPosition: string
  company: string
  location: string
  lastUpdated: string
}

export interface GoogleScholarResponse {
  publications: number
  citations: number
  hIndex: number
  lastUpdated: string
}