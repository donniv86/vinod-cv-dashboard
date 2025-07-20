/**
 * Image Optimization Utility
 * Handles WebP format support, responsive images, and lazy loading
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

export interface ImageSizes {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

export interface OptimizedImageOptions {
  src: string
  alt: string
  sizes?: ImageSizes
  quality?: number
  format?: 'webp' | 'avif' | 'original'
  lazy?: boolean
  placeholder?: string
  className?: string
}

export class ImageOptimizer {
  public static readonly DEFAULT_QUALITY = 85
  public static readonly DEFAULT_SIZES: ImageSizes = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }

  /**
   * Check if WebP is supported
   */
  static isWebPSupported(): boolean {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }

  /**
   * Check if AVIF is supported
   */
  static isAVIFSupported(): boolean {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
  }

  /**
   * Get optimal image format based on browser support
   */
  static getOptimalFormat(): 'webp' | 'avif' | 'original' {
    if (this.isAVIFSupported()) {
      return 'avif'
    } else if (this.isWebPSupported()) {
      return 'webp'
    }
    return 'original'
  }

  /**
   * Generate responsive image srcset
   */
  static generateSrcSet(
    src: string,
    sizes: ImageSizes = this.DEFAULT_SIZES,
    format: 'webp' | 'avif' | 'original' = 'original'
  ): string {
    const srcset: string[] = []

    Object.entries(sizes).forEach(([breakpoint, width]) => {
      if (width) {
        const optimizedSrc = this.getOptimizedImageUrl(src, width, format)
        srcset.push(`${optimizedSrc} ${width}w`)
      }
    })

    return srcset.join(', ')
  }

  /**
   * Generate sizes attribute for responsive images
   */
  static generateSizes(sizes: ImageSizes = this.DEFAULT_SIZES): string {
    const sizeStrings: string[] = []

    Object.entries(sizes).forEach(([breakpoint, width]) => {
      if (width) {
        const mediaQuery = this.getMediaQuery(breakpoint)
        sizeStrings.push(`${mediaQuery} ${width}px`)
      }
    })

    return sizeStrings.join(', ')
  }

  /**
   * Get optimized image URL
   */
  static getOptimizedImageUrl(
    src: string,
    width: number,
    format: 'webp' | 'avif' | 'original' = 'original',
    quality: number = this.DEFAULT_QUALITY
  ): string {
    // For development, return original image
    if (import.meta.env.DEV) {
      return src
    }

    // For production, use image optimization service
    // This is a placeholder - you can integrate with services like:
    // - Cloudinary
    // - ImageKit
    // - Cloudflare Images
    // - Vite's built-in image optimization

    const baseUrl = import.meta.env.VITE_IMAGE_OPTIMIZATION_URL || ''

    if (baseUrl) {
      const params = new URLSearchParams({
        url: src,
        w: width.toString(),
        q: quality.toString(),
        f: format === 'original' ? 'auto' : format
      })

      return `${baseUrl}?${params.toString()}`
    }

    // Fallback to original image
    return src
  }

  /**
   * Generate placeholder image
   */
  static generatePlaceholder(width: number, height: number, text?: string): string {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f3f4f6')
    gradient.addColorStop(1, '#e5e7eb')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add text if provided
    if (text) {
      ctx.fillStyle = '#9ca3af'
      ctx.font = '14px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, width / 2, height / 2)
    }

    return canvas.toDataURL()
  }

  /**
   * Preload critical images
   */
  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error(`Failed to preload image: ${src}`))
      img.src = src
    })
  }

  /**
   * Get media query for breakpoint
   */
  private static getMediaQuery(breakpoint: string): string {
    const breakpoints: Record<string, string> = {
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)',
      '2xl': '(min-width: 1536px)'
    }

    return breakpoints[breakpoint] || ''
  }

  /**
   * Optimize image dimensions
   */
  static optimizeDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight

    let width = maxWidth
    let height = width / aspectRatio

    if (height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }

    return {
      width: Math.round(width),
      height: Math.round(height)
    }
  }

  /**
   * Get image metadata
   */
  static getImageMetadata(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        })
      }
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = src
    })
  }

  /**
   * Convert image to WebP format
   */
  static async convertToWebP(
    file: File,
    quality: number = this.DEFAULT_QUALITY
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      const img = new Image()
      img.onload = () => {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to convert image to WebP'))
            }
          },
          'image/webp',
          quality / 100
        )
      }

      img.onerror = () => reject(new Error('Failed to load image for conversion'))
      img.src = URL.createObjectURL(file)
    })
  }

  /**
   * Generate image hash for cache busting
   */
  static generateImageHash(src: string): string {
    let hash = 0
    for (let i = 0; i < src.length; i++) {
      const char = src.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }
}

/**
 * Composable for image optimization
 */
export function useImageOptimization() {
  const isWebPSupported = ImageOptimizer.isWebPSupported()
  const isAVIFSupported = ImageOptimizer.isAVIFSupported()
  const optimalFormat = ImageOptimizer.getOptimalFormat()

  const optimizeImage = (options: OptimizedImageOptions) => {
    const {
      src,
      alt,
      sizes = ImageOptimizer.DEFAULT_SIZES,
      quality = ImageOptimizer.DEFAULT_QUALITY,
      format = optimalFormat,
      lazy = true,
      placeholder,
      className = ''
    } = options

    const srcset = ImageOptimizer.generateSrcSet(src, sizes, format)
    const sizesAttr = ImageOptimizer.generateSizes(sizes)
    const optimizedSrc = ImageOptimizer.getOptimizedImageUrl(src, sizes.lg || 1024, format, quality)

    return {
      src: optimizedSrc,
      srcset,
      sizes: sizesAttr,
      alt,
      loading: lazy ? 'lazy' : 'eager',
      placeholder: placeholder || ImageOptimizer.generatePlaceholder(400, 300, 'Loading...'),
      className: `optimized-image ${className}`.trim()
    }
  }

  const preloadCriticalImages = async (images: string[]) => {
    const promises = images.map(src => ImageOptimizer.preloadImage(src))
    await Promise.allSettled(promises)
  }

  return {
    isWebPSupported,
    isAVIFSupported,
    optimalFormat,
    optimizeImage,
    preloadCriticalImages,
    ImageOptimizer
  }
}