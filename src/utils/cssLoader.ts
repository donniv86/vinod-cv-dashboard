/**
 * CSS Loader Utility
 * Dynamically loads CSS files to reduce initial bundle size
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

interface CSSLoaderOptions {
  id?: string
  media?: string
  disabled?: boolean
}

class CSSLoader {
  private loadedStylesheets = new Set<string>()

  /**
   * Load a CSS file dynamically
   */
  async loadCSS(href: string, options: CSSLoaderOptions = {}): Promise<void> {
    if (this.loadedStylesheets.has(href)) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href

      if (options.id) link.id = options.id
      if (options.media) link.media = options.media
      if (options.disabled) link.disabled = options.disabled

      link.onload = () => {
        this.loadedStylesheets.add(href)
        resolve()
      }

      link.onerror = () => {
        reject(new Error(`Failed to load CSS: ${href}`))
      }

      document.head.appendChild(link)
    })
  }

  /**
   * Load multiple CSS files
   */
  async loadMultipleCSS(files: string[]): Promise<void> {
    const promises = files.map(file => this.loadCSS(file))
    await Promise.all(promises)
  }

  /**
   * Check if a CSS file is already loaded
   */
  isLoaded(href: string): boolean {
    return this.loadedStylesheets.has(href)
  }

  /**
   * Remove a loaded CSS file
   */
  unloadCSS(href: string): void {
    const link = document.querySelector(`link[href="${href}"]`)
    if (link) {
      link.remove()
      this.loadedStylesheets.delete(href)
    }
  }
}

// Create singleton instance
export const cssLoader = new CSSLoader()

// Predefined CSS bundles for common libraries
export const CSS_BUNDLES = {
  swiper: [
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination'
  ],
  flatpickr: ['flatpickr/dist/flatpickr.css'],
  jsvectormap: ['jsvectormap/dist/jsvectormap.css'],
  fullcalendar: [
    '@fullcalendar/core/main.css',
    '@fullcalendar/daygrid/main.css',
    '@fullcalendar/timegrid/main.css',
    '@fullcalendar/list/main.css'
  ]
} as const

// Utility functions for common CSS loading patterns
export const loadSwiperCSS = () => cssLoader.loadMultipleCSS([...CSS_BUNDLES.swiper])
export const loadFlatpickrCSS = () => cssLoader.loadCSS(CSS_BUNDLES.flatpickr[0])
export const loadJsVectorMapCSS = () => cssLoader.loadCSS(CSS_BUNDLES.jsvectormap[0])
export const loadFullCalendarCSS = () => cssLoader.loadMultipleCSS([...CSS_BUNDLES.fullcalendar])