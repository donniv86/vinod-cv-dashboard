/**
 * Composable for fetching and maintaining consistent data from external platforms
 * Automatically updates publication counts, citations, experience, and project data
 */

import { ref, computed, onMounted, readonly } from 'vue'
import { MANUAL_DATA } from '../config/manual-data'

interface PublicationData {
  count: number
  citations: number
  hIndex: number
  averageCitations?: number
  lastUpdated: string
}

interface PublicationMetrics {
  citationRanges: Record<string, number>
  yearDistribution: Record<string, number>
  topJournals: Array<{ journal: string; count: number }>
  topCollaborators: Array<{ author: string; count: number }>
}

interface PublicationItem {
  title: string
  authors: string
  citations: number
  year: string
  snippet: string
  publication: string
  link: string
  snippet_highlighted_words: string[]
}

interface PublicationSummary {
  totalPublications: number
  highlyCited: number
  recentPublications: number
  topCited: number
}

interface GitHubData {
  repositories: number
  stars: number
  contributions: number
  languages: string[]
  followers: number
  following: number
  lastUpdated: string
}

interface LinkedInData {
  experience: number
  currentPosition: string
  company: string
  location: string
  lastUpdated: string
}

interface ExternalData {
  publications: PublicationData
  publicationsList?: PublicationItem[]
  metrics?: PublicationMetrics
  summary?: PublicationSummary
  github: GitHubData
  linkedin: LinkedInData
}

// Configuration for external APIs
const CONFIG = {
  GITHUB_USERNAME: 'donniv86',
  LINKEDIN_ID: 'vinod-d-ph-d-8bb57a36',
  GOOGLE_SCHOLAR_ID: 'YOUR_GOOGLE_SCHOLAR_ID', // Replace with actual ID
  UPDATE_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
}

export function useExternalData() {
  // Initialize with manual data (reliable fallback)
  const data = ref<ExternalData>({
    publications: {
      count: MANUAL_DATA.publications.count,
      citations: MANUAL_DATA.publications.citations,
      hIndex: MANUAL_DATA.publications.hIndex,
      averageCitations: 0,
      lastUpdated: MANUAL_DATA.publications.lastUpdated
    },
    publicationsList: [],
    metrics: {
      citationRanges: {},
      yearDistribution: {},
      topJournals: [],
      topCollaborators: []
    },
    summary: {
      totalPublications: 0,
      highlyCited: 0,
      recentPublications: 0,
      topCited: 0
    },
    github: {
      repositories: MANUAL_DATA.github.repositories,
      stars: MANUAL_DATA.github.stars,
      contributions: 0,
      languages: MANUAL_DATA.github.languages,
      followers: MANUAL_DATA.github.followers,
      following: MANUAL_DATA.github.following,
      lastUpdated: MANUAL_DATA.github.lastUpdated
    },
    linkedin: {
      experience: MANUAL_DATA.linkedin.experience,
      currentPosition: MANUAL_DATA.linkedin.currentPosition,
      company: MANUAL_DATA.linkedin.company,
      location: MANUAL_DATA.linkedin.location,
      lastUpdated: MANUAL_DATA.linkedin.lastUpdated
    }
  })

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties for easy access
  const publicationCount = computed(() => data.value.publications.count)
  const citationCount = computed(() => data.value.publications.citations)
  const hIndex = computed(() => data.value.publications.hIndex)
  const repositoryCount = computed(() => data.value.github.repositories)
  const experienceYears = computed(() => data.value.linkedin.experience)

  // Fetch GitHub data - This actually works!
  const fetchGitHubData = async () => {
    try {
      console.log('Fetching GitHub data...')
      const response = await fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}`)
      if (!response.ok) throw new Error('GitHub API error')

      const userData = await response.json()
      console.log('GitHub user data:', userData)

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?per_page=100`)
      const repos = await reposResponse.json()
      console.log('GitHub repos:', repos.length)

      // Calculate total stars
      const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)

      // Get unique languages
      const languageSet = new Set<string>()
      repos.forEach((repo: any) => {
        if (repo.language && typeof repo.language === 'string') {
          languageSet.add(repo.language)
        }
      })
      const languages = Array.from(languageSet).slice(0, 5)

      data.value.github = {
        repositories: userData.public_repos,
        stars: totalStars,
        contributions: 0, // Would need GitHub GraphQL API for this
        languages: languages,
        followers: userData.followers,
        following: userData.following,
        lastUpdated: new Date().toISOString()
      }

      console.log('Updated GitHub data:', data.value.github)
    } catch (err) {
      console.warn('Failed to fetch GitHub data, using manual data:', err)
      // Keep manual data if fetch fails
    }
  }

  // For Google Scholar and LinkedIn, we use the backend API
  const fetchGoogleScholarData = async () => {
    try {
      console.log('Fetching Google Scholar data via backend API...')

      const response = await fetch('http://localhost:3001/api/google-scholar')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Backend API error')
      }

      const scholarData = await response.json()
      console.log('Google Scholar data received:', scholarData)

      data.value.publications = {
        count: scholarData.publications.count,
        citations: scholarData.publications.citations,
        hIndex: scholarData.publications.hIndex,
        averageCitations: scholarData.publications.averageCitations,
        lastUpdated: scholarData.publications.lastUpdated
      }

      // Update enhanced data
      if (scholarData.publicationsList) {
        data.value.publicationsList = scholarData.publicationsList
      }
      if (scholarData.metrics) {
        data.value.metrics = scholarData.metrics
      }
      if (scholarData.summary) {
        data.value.summary = scholarData.summary
      }

      console.log('Updated Google Scholar data:', data.value.publications)
    } catch (err) {
      console.warn('Failed to fetch Google Scholar data, using manual data:', err)
      // Keep manual data if fetch fails
    }
  }

  const fetchLinkedInData = async () => {
    try {
      console.log('Fetching LinkedIn data via backend API...')

      const response = await fetch('http://localhost:3001/api/linkedin-profile')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Backend API error')
      }

      const linkedinData = await response.json()
      console.log('LinkedIn data received:', linkedinData)

      data.value.linkedin = {
        experience: linkedinData.linkedin.experience,
        currentPosition: linkedinData.linkedin.currentPosition,
        company: linkedinData.linkedin.company,
        location: linkedinData.linkedin.location,
        lastUpdated: linkedinData.linkedin.lastUpdated
      }

      console.log('Updated LinkedIn data:', data.value.linkedin)
    } catch (err) {
      console.warn('Failed to fetch LinkedIn data, using manual data:', err)
      // Keep manual data if fetch fails
    }
  }

  // Fetch all external data
  const fetchAllData = async () => {
    isLoading.value = true
    error.value = null

    try {
      console.log('Starting to fetch all external data...')
      await Promise.allSettled([
        fetchGitHubData(), // This works!
        fetchGoogleScholarData(), // Uses backend API
        fetchLinkedInData() // Uses backend API
      ])
      console.log('Finished fetching external data')
    } catch (err) {
      error.value = 'Failed to fetch external data'
      console.error('Error fetching external data:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Check if data needs updating
  const shouldUpdateData = () => {
    const lastUpdate = new Date(data.value.publications.lastUpdated)
    const now = new Date()
    return (now.getTime() - lastUpdate.getTime()) > CONFIG.UPDATE_INTERVAL
  }

  // Initialize data fetching
  onMounted(() => {
    console.log('useExternalData mounted, checking if update needed...')
    if (shouldUpdateData()) {
      console.log('Data update needed, fetching...')
      fetchAllData()
    } else {
      console.log('Data is recent, no update needed')
    }
  })

  // Manual refresh function
  const refreshData = () => {
    console.log('Manual refresh requested')
    fetchAllData()
  }

  // Function to update manual data (for easy updates)
  const updateManualData = (section: 'publications' | 'linkedin' | 'github', newData: any) => {
    data.value[section] = { ...data.value[section], ...newData, lastUpdated: new Date().toISOString() }
    console.log(`Updated ${section} data:`, data.value[section])
  }

  return {
    data: readonly(data),
    isLoading: readonly(isLoading),
    error: readonly(error),
    publicationCount,
    citationCount,
    hIndex,
    repositoryCount,
    experienceYears,
    refreshData,
    fetchAllData,
    updateManualData
  }
}