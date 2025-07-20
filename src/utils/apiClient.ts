/**
 * API Client with Caching
 * Handles API requests with intelligent caching and error handling
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { apiResponseCache, userDataCache } from './cacheManager'

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  cache?: boolean
  cacheDuration?: number
  retryAttempts?: number
  retryDelay?: number
  timeout?: number
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  cached: boolean
  timestamp: number
}

export interface ApiError {
  message: string
  status?: number
  statusText?: string
  data?: any
  timestamp: number
}

class ApiClient {
  private baseURL: string
  private defaultConfig: ApiRequestConfig

  constructor(baseURL: string = '', config: Partial<ApiRequestConfig> = {}) {
    this.baseURL = baseURL
    this.defaultConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: true,
      cacheDuration: 5 * 60 * 1000, // 5 minutes
      retryAttempts: 3,
      retryDelay: 1000,
      timeout: 10000,
      ...config
    }
  }

  /**
   * Generate cache key for request
   */
  private generateCacheKey(url: string, config: ApiRequestConfig): string {
    const key = `${config.method}:${url}`
    if (config.body) {
      return `${key}:${JSON.stringify(config.body)}`
    }
    return key
  }

  /**
   * Create timeout promise
   */
  private createTimeout(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`))
      }, timeout)
    })
  }

  /**
   * Retry request with exponential backoff
   */
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempts: number,
    delay: number
  ): Promise<T> {
    try {
      return await requestFn()
    } catch (error) {
      if (attempts <= 1) {
        throw error
      }

      await new Promise(resolve => setTimeout(resolve, delay))
      return this.retryRequest(requestFn, attempts - 1, delay * 2)
    }
  }

  /**
   * Make API request with caching
   */
  async request<T = any>(
    url: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const finalConfig = { ...this.defaultConfig, ...config }
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`
    const cacheKey = this.generateCacheKey(fullURL, finalConfig)

    // Check cache for GET requests
    if (finalConfig.method === 'GET' && finalConfig.cache) {
      const cached = await apiResponseCache.get<ApiResponse<T>>(cacheKey)
      if (cached) {
        console.log(`[API] Cache hit for: ${fullURL}`)
        return cached
      }
    }

    // Make request
    const response = await this.retryRequest(
      async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), finalConfig.timeout!)

        try {
          const response = await fetch(fullURL, {
            method: finalConfig.method,
            headers: finalConfig.headers,
            body: finalConfig.body ? JSON.stringify(finalConfig.body) : undefined,
            signal: controller.signal
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          const data = await response.json()
          const apiResponse: ApiResponse<T> = {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            cached: false,
            timestamp: Date.now()
          }

          // Cache successful GET responses
          if (finalConfig.method === 'GET' && finalConfig.cache) {
            await apiResponseCache.set(cacheKey, apiResponse, finalConfig.cacheDuration)
            console.log(`[API] Cached response for: ${fullURL}`)
          }

          return apiResponse
        } catch (error) {
          clearTimeout(timeoutId)
          throw error
        }
      },
      finalConfig.retryAttempts!,
      finalConfig.retryDelay!
    )

    return response
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'POST', body: data })
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PUT', body: data })
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' })
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PATCH', body: data })
  }

  /**
   * Clear API cache
   */
  async clearCache(): Promise<void> {
    await apiResponseCache.clear()
    console.log('[API] Cache cleared')
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return apiResponseCache.getStats()
  }
}

// Create singleton API client instance
export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL || '')

// API endpoints for the CV dashboard
export const apiEndpoints = {
  publications: '/api/publications',
  projects: '/api/projects',
  certifications: '/api/certifications',
  skills: '/api/skills',
  experience: '/api/experience',
  education: '/api/education'
}

// Predefined API functions
export const api = {
  // Publications
  async getPublications() {
    return apiClient.get(apiEndpoints.publications)
  },

  async getPublication(id: string) {
    return apiClient.get(`${apiEndpoints.publications}/${id}`)
  },

  // Projects
  async getProjects() {
    return apiClient.get(apiEndpoints.projects)
  },

  async getProject(id: string) {
    return apiClient.get(`${apiEndpoints.projects}/${id}`)
  },

  // Certifications
  async getCertifications() {
    return apiClient.get(apiEndpoints.certifications)
  },

  async getCertification(id: string) {
    return apiClient.get(`${apiEndpoints.certifications}/${id}`)
  },

  // Skills
  async getSkills() {
    return apiClient.get(apiEndpoints.skills)
  },

  // Experience
  async getExperience() {
    return apiClient.get(apiEndpoints.experience)
  },

  // Education
  async getEducation() {
    return apiClient.get(apiEndpoints.education)
  },

  // Cache management
  clearCache: () => apiClient.clearCache(),
  getCacheStats: () => apiClient.getCacheStats()
}

export default ApiClient