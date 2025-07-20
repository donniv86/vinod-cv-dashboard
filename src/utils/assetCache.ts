/**
 * Static Asset Cache Utility
 * Handles caching of static assets like images, fonts, and other resources
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { staticAssetCache } from './cacheManager'

export interface AssetCacheConfig {
  maxAge: number
  maxSize: number
  preloadCritical: boolean
  compression: boolean
}

export interface AssetInfo {
  url: string
  type: 'image' | 'font' | 'script' | 'style' | 'other'
  size: number
  cached: boolean
  timestamp: number
}

class AssetCache {
  private config: AssetCacheConfig
  private criticalAssets: Set<string> = new Set()

  constructor(config: Partial<AssetCacheConfig> = {}) {
    this.config = {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      maxSize: 50 * 1024 * 1024, // 50MB
      preloadCritical: true,
      compression: true,
      ...config
    }
  }

  /**
   * Add critical asset for preloading
   */
  addCriticalAsset(url: string): void {
    this.criticalAssets.add(url)
  }

  /**
   * Remove critical asset
   */
  removeCriticalAsset(url: string): void {
    this.criticalAssets.delete(url)
  }

  /**
   * Get asset type from URL
   */
  private getAssetType(url: string): AssetInfo['type'] {
    const extension = url.split('.').pop()?.toLowerCase()

    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'webp':
      case 'avif':
        return 'image'

      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'eot':
        return 'font'

      case 'js':
        return 'script'

      case 'css':
        return 'style'

      default:
        return 'other'
    }
  }

  /**
   * Cache static asset
   */
  async cacheAsset(url: string): Promise<AssetInfo> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch asset: ${response.status}`)
      }

      const blob = await response.blob()
      const assetInfo: AssetInfo = {
        url,
        type: this.getAssetType(url),
        size: blob.size,
        cached: true,
        timestamp: Date.now()
      }

      // Store in cache
      await staticAssetCache.set(url, {
        blob,
        info: assetInfo
      }, this.config.maxAge)

      console.log(`[AssetCache] Cached: ${url} (${this.formatSize(blob.size)})`)
      return assetInfo
    } catch (error) {
      console.error(`[AssetCache] Failed to cache asset: ${url}`, error)
      throw error
    }
  }

  /**
   * Get cached asset
   */
  async getCachedAsset(url: string): Promise<Blob | null> {
    try {
      const cached = await staticAssetCache.get<{ blob: Blob; info: AssetInfo }>(url)
      if (cached) {
        console.log(`[AssetCache] Cache hit: ${url}`)
        return cached.blob
      }
      return null
    } catch (error) {
      console.error(`[AssetCache] Failed to get cached asset: ${url}`, error)
      return null
    }
  }

  /**
   * Preload critical assets
   */
  async preloadCriticalAssets(): Promise<void> {
    if (!this.config.preloadCritical) return

    console.log('[AssetCache] Preloading critical assets...')

    const promises = Array.from(this.criticalAssets).map(async (url) => {
      try {
        await this.cacheAsset(url)
      } catch (error) {
        console.warn(`[AssetCache] Failed to preload critical asset: ${url}`, error)
      }
    })

    await Promise.allSettled(promises)
    console.log('[AssetCache] Critical assets preloaded')
  }

  /**
   * Preload image with different formats
   */
  async preloadImage(url: string, formats: string[] = ['webp', 'original']): Promise<void> {
    const promises = formats.map(async (format) => {
      const formatUrl = format === 'original' ? url : url.replace(/\.[^.]+$/, `.${format}`)
      try {
        await this.cacheAsset(formatUrl)
      } catch (error) {
        // Silently fail for format variants
        console.debug(`[AssetCache] Failed to preload ${format} variant: ${formatUrl}`)
      }
    })

    await Promise.allSettled(promises)
  }

  /**
   * Get asset URL with cache busting
   */
  getAssetUrl(url: string, version?: string): string {
    if (!version) return url

    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}v=${version}`
  }

  /**
   * Format file size for display
   */
  private formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return staticAssetCache.getStats()
  }

  /**
   * Clear asset cache
   */
  async clear(): Promise<void> {
    await staticAssetCache.clear()
    console.log('[AssetCache] Cache cleared')
  }

  /**
   * Get cached assets info
   */
  async getCachedAssets(): Promise<AssetInfo[]> {
    // This would need to be implemented based on the cache strategy
    // For now, return empty array
    return []
  }
}

// Create singleton asset cache instance
export const assetCache = new AssetCache()

// Predefined critical assets for the CV dashboard
export const criticalAssets = [
  '/images/logo/logo.png',
  '/images/logo/vinod-cv-logo.svg',
  '/images/user/owner.jpg',
  '/images/shape/grid-01.svg',
  '/favicon.ico'
]

// Add critical assets to preload list
criticalAssets.forEach(asset => assetCache.addCriticalAsset(asset))

export default AssetCache