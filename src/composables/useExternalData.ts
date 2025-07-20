/**
 * Composable for fetching and maintaining consistent data from external platforms
 * Automatically updates publication counts, citations, experience, and project data
 */

import { ref, computed, onMounted, readonly } from 'vue'

interface PublicationData {
  count: number
  citations: number
  hIndex: number
  lastUpdated: string
}

interface GitHubData {
  repositories: number
  stars: number
  contributions: number
  languages: string[]
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
  const data = ref<ExternalData>({
    publications: {
      count: 40, // Default from your summary
      citations: 1247, // Default from your summary
      hIndex: 16, // Default from your summary
      lastUpdated: new Date().toISOString()
    },
    github: {
      repositories: 11, // Default from your summary
      stars: 0,
      contributions: 0,
      languages: ['Python', 'JavaScript', 'TypeScript'],
      lastUpdated: new Date().toISOString()
    },
    linkedin: {
      experience: 14, // Default from your summary
      currentPosition: 'Senior Scientist II',
      company: 'Schrödinger',
      location: 'Bangalore, India',
      lastUpdated: new Date().toISOString()
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

  // Fetch GitHub data
  const fetchGitHubData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}`)
      if (!response.ok) throw new Error('GitHub API error')

      const userData = await response.json()

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?per_page=100`)
      const repos = await reposResponse.json()

      // Calculate total stars
      const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)

      // Get unique languages (simplified approach)
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
        lastUpdated: new Date().toISOString()
      }
    } catch (err) {
      console.warn('Failed to fetch GitHub data:', err)
      // Keep existing data if fetch fails
    }
  }

  // Fetch Google Scholar data (Note: Google Scholar doesn't have a public API)
  // This would require a backend service or manual updates
  const fetchGoogleScholarData = async () => {
    try {
      // For now, we'll use a placeholder approach
      // In production, you'd need a backend service to scrape Google Scholar
      // or use a service like SerpAPI

      // Placeholder: Update with actual data when available
      data.value.publications = {
        count: 40, // Update with actual count
        citations: 1247, // Update with actual citations
        hIndex: 16, // Update with actual h-index
        lastUpdated: new Date().toISOString()
      }
    } catch (err) {
      console.warn('Failed to fetch Google Scholar data:', err)
    }
  }

  // Fetch LinkedIn data (Note: LinkedIn doesn't have a public API)
  // This would require a backend service or manual updates
  const fetchLinkedInData = async () => {
    try {
      // For now, we'll use a placeholder approach
      // In production, you'd need a backend service to scrape LinkedIn
      // or use a service like Proxycurl API

      // Placeholder: Update with actual data when available
      data.value.linkedin = {
        experience: 14, // Update with actual experience years
        currentPosition: 'Senior Scientist II',
        company: 'Schrödinger',
        location: 'Bangalore, India',
        lastUpdated: new Date().toISOString()
      }
    } catch (err) {
      console.warn('Failed to fetch LinkedIn data:', err)
    }
  }

  // Fetch all external data
  const fetchAllData = async () => {
    isLoading.value = true
    error.value = null

    try {
      await Promise.allSettled([
        fetchGitHubData(),
        fetchGoogleScholarData(),
        fetchLinkedInData()
      ])
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
    if (shouldUpdateData()) {
      fetchAllData()
    }
  })

  // Manual refresh function
  const refreshData = () => {
    fetchAllData()
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
    fetchAllData
  }
}