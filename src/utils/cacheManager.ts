/**
 * Cache Manager Utility
 * Handles intelligent caching for static assets and API responses
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

export interface CacheConfig {
  maxAge: number // Cache duration in milliseconds
  maxSize: number // Maximum number of items in cache
  strategy: 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB'
  version?: string // Cache version for invalidation
}

export interface CacheItem<T = any> {
  key: string
  value: T
  timestamp: number
  expiresAt: number
  version: string
  size: number
}

export interface CacheStats {
  hits: number
  misses: number
  size: number
  items: number
  hitRate: number
}

class CacheManager {
  private memoryCache = new Map<string, CacheItem>()
  private config: CacheConfig
  private stats = {
    hits: 0,
    misses: 0,
    size: 0,
    items: 0
  }

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      maxSize: 100,
      strategy: 'memory',
      version: '1.0.0',
      ...config
    }
  }

  /**
   * Generate cache key from URL and parameters
   */
  private generateKey(url: string, params?: Record<string, any>): string {
    const key = params ? `${url}?${JSON.stringify(params)}` : url
    return btoa(key).replace(/[^a-zA-Z0-9]/g, '')
  }

  /**
   * Get cache item size in bytes
   */
  private getItemSize(item: CacheItem): number {
    return new Blob([JSON.stringify(item)]).size
  }

  /**
   * Check if cache item is expired
   */
  private isExpired(item: CacheItem): boolean {
    return Date.now() > item.expiresAt
  }

  /**
   * Clean expired items from cache
   */
  private cleanExpired(): void {
    const now = Date.now()
    for (const [key, item] of this.memoryCache.entries()) {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key)
        this.stats.size -= item.size
        this.stats.items--
      }
    }
  }

  /**
   * Evict least recently used items if cache is full
   */
  private evictLRU(): void {
    if (this.memoryCache.size <= this.config.maxSize) return

    const items = Array.from(this.memoryCache.entries())
      .sort(([, a], [, b]) => a.timestamp - b.timestamp)

    const toRemove = items.slice(0, this.memoryCache.size - this.config.maxSize)

    for (const [key] of toRemove) {
      const item = this.memoryCache.get(key)
      if (item) {
        this.memoryCache.delete(key)
        this.stats.size -= item.size
        this.stats.items--
      }
    }
  }

  /**
   * Set item in cache
   */
  async set<T>(key: string, value: T, maxAge?: number): Promise<void> {
    const expiresAt = Date.now() + (maxAge || this.config.maxAge)
    const item: CacheItem<T> = {
      key,
      value,
      timestamp: Date.now(),
      expiresAt,
      version: this.config.version || '1.0.0',
      size: this.getItemSize({ key, value, timestamp: 0, expiresAt: 0, version: '', size: 0 })
    }

    // Clean expired items first
    this.cleanExpired()

    // Evict LRU items if needed
    this.evictLRU()

    // Store in appropriate cache
    switch (this.config.strategy) {
      case 'memory':
        this.memoryCache.set(key, item)
        this.stats.size += item.size
        this.stats.items++
        break

      case 'localStorage':
        try {
          localStorage.setItem(`cache_${key}`, JSON.stringify(item))
        } catch (error) {
          console.warn('localStorage cache failed:', error)
          // Fallback to memory cache
          this.memoryCache.set(key, item)
        }
        break

      case 'sessionStorage':
        try {
          sessionStorage.setItem(`cache_${key}`, JSON.stringify(item))
        } catch (error) {
          console.warn('sessionStorage cache failed:', error)
          // Fallback to memory cache
          this.memoryCache.set(key, item)
        }
        break

      case 'indexedDB':
        await this.setIndexedDB(key, item)
        break
    }
  }

  /**
   * Get item from cache
   */
  async get<T>(key: string): Promise<T | null> {
    let item: CacheItem<T> | null = null

    // Try to get from appropriate cache
    switch (this.config.strategy) {
      case 'memory':
        item = this.memoryCache.get(key) as CacheItem<T> || null
        break

      case 'localStorage':
        try {
          const stored = localStorage.getItem(`cache_${key}`)
          item = stored ? JSON.parse(stored) : null
        } catch (error) {
          console.warn('localStorage cache read failed:', error)
        }
        break

      case 'sessionStorage':
        try {
          const stored = sessionStorage.getItem(`cache_${key}`)
          item = stored ? JSON.parse(stored) : null
        } catch (error) {
          console.warn('sessionStorage cache read failed:', error)
        }
        break

      case 'indexedDB':
        item = await this.getIndexedDB<T>(key)
        break
    }

    if (!item) {
      this.stats.misses++
      return null
    }

    // Check if expired
    if (this.isExpired(item)) {
      this.delete(key)
      this.stats.misses++
      return null
    }

    // Check version
    if (item.version !== this.config.version) {
      this.delete(key)
      this.stats.misses++
      return null
    }

    this.stats.hits++
    return item.value
  }

  /**
   * Delete item from cache
   */
  async delete(key: string): Promise<void> {
    switch (this.config.strategy) {
      case 'memory':
        const item = this.memoryCache.get(key)
        if (item) {
          this.memoryCache.delete(key)
          this.stats.size -= item.size
          this.stats.items--
        }
        break

      case 'localStorage':
        try {
          localStorage.removeItem(`cache_${key}`)
        } catch (error) {
          console.warn('localStorage cache delete failed:', error)
        }
        break

      case 'sessionStorage':
        try {
          sessionStorage.removeItem(`cache_${key}`)
        } catch (error) {
          console.warn('sessionStorage cache delete failed:', error)
        }
        break

      case 'indexedDB':
        await this.deleteIndexedDB(key)
        break
    }
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    switch (this.config.strategy) {
      case 'memory':
        this.memoryCache.clear()
        this.stats.size = 0
        this.stats.items = 0
        break

      case 'localStorage':
        try {
          const keys = Object.keys(localStorage).filter(key => key.startsWith('cache_'))
          keys.forEach(key => localStorage.removeItem(key))
        } catch (error) {
          console.warn('localStorage cache clear failed:', error)
        }
        break

      case 'sessionStorage':
        try {
          const keys = Object.keys(sessionStorage).filter(key => key.startsWith('cache_'))
          keys.forEach(key => sessionStorage.removeItem(key))
        } catch (error) {
          console.warn('sessionStorage cache clear failed:', error)
        }
        break

      case 'indexedDB':
        await this.clearIndexedDB()
        break
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const total = this.stats.hits + this.stats.misses
    return {
      ...this.stats,
      hitRate: total > 0 ? (this.stats.hits / total) * 100 : 0
    }
  }

  /**
   * IndexedDB operations
   */
  private async setIndexedDB<T>(key: string, item: CacheItem<T>): Promise<void> {
    // Implementation for IndexedDB storage
    // This is a placeholder - implement based on your needs
    console.log('IndexedDB set:', key, item)
  }

  private async getIndexedDB<T>(key: string): Promise<CacheItem<T> | null> {
    // Implementation for IndexedDB retrieval
    // This is a placeholder - implement based on your needs
    console.log('IndexedDB get:', key)
    return null
  }

  private async deleteIndexedDB(key: string): Promise<void> {
    // Implementation for IndexedDB deletion
    // This is a placeholder - implement based on your needs
    console.log('IndexedDB delete:', key)
  }

  private async clearIndexedDB(): Promise<void> {
    // Implementation for IndexedDB clear
    // This is a placeholder - implement based on your needs
    console.log('IndexedDB clear')
  }
}

// Create singleton instances for different cache types
export const staticAssetCache = new CacheManager({
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxSize: 200,
  strategy: 'localStorage'
})

export const apiResponseCache = new CacheManager({
  maxAge: 5 * 60 * 1000, // 5 minutes
  maxSize: 50,
  strategy: 'memory'
})

export const userDataCache = new CacheManager({
  maxAge: 30 * 60 * 1000, // 30 minutes
  maxSize: 100,
  strategy: 'sessionStorage'
})

export default CacheManager