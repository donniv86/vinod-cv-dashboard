/**
 * Manual Data Configuration
 * Update these values whenever your information changes
 * This provides a simple way to keep data current without external APIs
 */

export const MANUAL_DATA = {
  // Academic Publications
  publications: {
    count: 44, // Total number of publications (updated from Google Scholar)
    citations: 674, // Total citations (updated from Google Scholar)
    hIndex: 15, // H-index (updated from Google Scholar)
    lastUpdated: '2025-07-20', // Date when you last updated this
  },

  // Professional Experience
  linkedin: {
    experience: 14, // Years of experience
    currentPosition: 'Senior Scientist II',
    company: 'Schrödinger',
    location: 'Bangalore, India',
    lastUpdated: '2024-01-15',
  },

  // GitHub Data (this will be auto-fetched, but you can override here)
  github: {
    // These will be overridden by real API data
    repositories: 10, // Updated from GitHub API
    stars: 0, // Updated from GitHub API
    languages: ['Python', 'Vue', 'Jupyter Notebook'], // Will be updated automatically
    followers: 0, // Updated from GitHub API
    following: 6, // Updated from GitHub API
    lastUpdated: '2025-07-20',
  },

  // Additional Metrics
  metrics: {
    projects: 15, // Number of major projects
    patents: 2, // Number of patents
    awards: 5, // Number of awards/recognitions
    conferences: 25, // Number of conference presentations
    workshops: 12, // Number of workshops conducted
  },

  // Skills and Expertise
  skills: {
    primary: ['Computational Drug Discovery', 'Molecular Modeling', 'Machine Learning'],
    programming: ['Python', 'R', 'JavaScript', 'Vue.js'],
    tools: ['Schrödinger Suite', 'AutoDock', 'GROMACS', 'PyMOL'],
    databases: ['ChEMBL', 'PubChem', 'PDB', 'UniProt'],
  }
}

// Helper function to update data
export const updateManualData = (section: keyof typeof MANUAL_DATA, data: any) => {
  MANUAL_DATA[section] = { ...MANUAL_DATA[section], ...data, lastUpdated: new Date().toISOString().split('T')[0] }
  console.log(`Updated ${section} data:`, MANUAL_DATA[section])
}

// Helper function to get current data
export const getCurrentData = () => {
  return {
    ...MANUAL_DATA,
    lastUpdated: new Date().toISOString()
  }
}