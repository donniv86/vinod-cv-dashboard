/**
 * CSS Optimization Utility
 * Handles critical CSS inlining and PurgeCSS optimization
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

export interface CriticalCSSConfig {
  inline: boolean
  extractCritical: boolean
  minify: boolean
  preserveMediaQueries: boolean
  preserveFontFaces: boolean
  preserveKeyframes: boolean
}

export interface CSSRule {
  selector: string
  properties: Record<string, string>
  media?: string
  specificity: number
}

export interface CriticalCSSResult {
  critical: string
  nonCritical: string
  size: {
    original: number
    critical: number
    nonCritical: number
    savings: number
  }
}

class CSSOptimizer {
  private config: CriticalCSSConfig

  constructor(config: Partial<CriticalCSSConfig> = {}) {
    this.config = {
      inline: true,
      extractCritical: true,
      minify: true,
      preserveMediaQueries: true,
      preserveFontFaces: true,
      preserveKeyframes: true,
      ...config
    }
  }

  /**
   * Extract critical CSS from HTML content
   */
  async extractCriticalCSS(html: string, css: string): Promise<CriticalCSSResult> {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Get all visible elements
    const visibleElements = this.getVisibleElements(doc)

    // Parse CSS rules
    const cssRules = this.parseCSSRules(css)

    // Find critical rules
    const criticalRules = this.findCriticalRules(cssRules, visibleElements)
    const nonCriticalRules = cssRules.filter(rule => !criticalRules.includes(rule))

    // Generate critical and non-critical CSS
    const criticalCSS = this.generateCSS(criticalRules)
    const nonCriticalCSS = this.generateCSS(nonCriticalRules)

    // Calculate sizes
    const originalSize = new Blob([css]).size
    const criticalSize = new Blob([criticalCSS]).size
    const nonCriticalSize = new Blob([nonCriticalCSS]).size
    const savings = originalSize - criticalSize

    return {
      critical: this.config.minify ? this.minifyCSS(criticalCSS) : criticalCSS,
      nonCritical: this.config.minify ? this.minifyCSS(nonCriticalCSS) : nonCriticalCSS,
      size: {
        original: originalSize,
        critical: criticalSize,
        nonCritical: nonCriticalSize,
        savings
      }
    }
  }

  /**
   * Get visible elements from DOM
   */
  private getVisibleElements(doc: Document): Element[] {
    const elements: Element[] = []

    // Get elements in viewport
    const viewportElements = doc.querySelectorAll('*')
    viewportElements.forEach(element => {
      const style = window.getComputedStyle(element)
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        elements.push(element)
      }
    })

    return elements
  }

  /**
   * Parse CSS rules from stylesheet
   */
  private parseCSSRules(css: string): CSSRule[] {
    const rules: CSSRule[] = []

    // Simple CSS parser (for basic rules)
    const ruleRegex = /([^{}]+)\{([^{}]+)\}/g
    let match

    while ((match = ruleRegex.exec(css)) !== null) {
      const selector = match[1].trim()
      const properties = this.parseProperties(match[2])

      rules.push({
        selector,
        properties,
        specificity: this.calculateSpecificity(selector)
      })
    }

    return rules
  }

  /**
   * Parse CSS properties
   */
  private parseProperties(propertiesString: string): Record<string, string> {
    const properties: Record<string, string> = {}
    const propertyRegex = /([^:]+):([^;]+);/g
    let match

    while ((match = propertyRegex.exec(propertiesString)) !== null) {
      const property = match[1].trim()
      const value = match[2].trim()
      properties[property] = value
    }

    return properties
  }

  /**
   * Calculate CSS selector specificity
   */
  private calculateSpecificity(selector: string): number {
    let specificity = 0

    // Count IDs
    const idMatches = selector.match(/#[a-zA-Z0-9_-]+/g)
    if (idMatches) {
      specificity += idMatches.length * 100
    }

    // Count classes and attributes
    const classMatches = selector.match(/\.[a-zA-Z0-9_-]+/g)
    if (classMatches) {
      specificity += classMatches.length * 10
    }

    // Count elements
    const elementMatches = selector.match(/[a-zA-Z]+/g)
    if (elementMatches) {
      specificity += elementMatches.length
    }

    return specificity
  }

  /**
   * Find critical CSS rules
   */
  private findCriticalRules(rules: CSSRule[], elements: Element[]): CSSRule[] {
    const criticalRules: CSSRule[] = []
    const elementSelectors = new Set<string>()

    // Get all selectors from visible elements
    elements.forEach(element => {
      elementSelectors.add(element.tagName.toLowerCase())
      element.classList.forEach(cls => elementSelectors.add(`.${cls}`))
      if (element.id) {
        elementSelectors.add(`#${element.id}`)
      }
    })

    // Find matching rules
    rules.forEach(rule => {
      if (this.isRuleCritical(rule, elementSelectors)) {
        criticalRules.push(rule)
      }
    })

    return criticalRules.sort((a, b) => b.specificity - a.specificity)
  }

  /**
   * Check if a CSS rule is critical
   */
  private isRuleCritical(rule: CSSRule, elementSelectors: Set<string>): boolean {
    const selector = rule.selector.toLowerCase()

    // Check for exact matches
    if (elementSelectors.has(selector)) {
      return true
    }

    // Check for class matches
    const classMatches = selector.match(/\.[a-zA-Z0-9_-]+/g)
    if (classMatches) {
      return classMatches.some(cls => elementSelectors.has(cls))
    }

    // Check for element matches
    const elementMatches = selector.match(/[a-zA-Z]+/g)
    if (elementMatches) {
      return elementMatches.some(element => elementSelectors.has(element))
    }

    return false
  }

  /**
   * Generate CSS from rules
   */
  private generateCSS(rules: CSSRule[]): string {
    return rules.map(rule => {
      const properties = Object.entries(rule.properties)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join('\n')

      return `${rule.selector} {\n${properties}\n}`
    }).join('\n\n')
  }

  /**
   * Minify CSS
   */
  private minifyCSS(css: string): string {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/\s*}\s*/g, '}') // Remove spaces around braces
      .replace(/\s*:\s*/g, ':') // Remove spaces around colons
      .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
      .replace(/\s*,\s*/g, ',') // Remove spaces around commas
      .trim()
  }

  /**
   * Inline critical CSS in HTML
   */
  async inlineCriticalCSS(html: string, criticalCSS: string): Promise<string> {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Create style element for critical CSS
    const styleElement = doc.createElement('style')
    styleElement.textContent = criticalCSS
    styleElement.setAttribute('data-critical', 'true')

    // Insert critical CSS in head
    const head = doc.head
    if (head) {
      head.insertBefore(styleElement, head.firstChild)
    }

    return doc.documentElement.outerHTML
  }

  /**
   * Load non-critical CSS asynchronously
   */
  async loadNonCriticalCSS(cssUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssUrl
      link.media = 'print'
      link.onload = () => {
        link.media = 'all'
        resolve()
      }
      link.onerror = reject

      document.head.appendChild(link)
    })
  }

  /**
   * Preload critical CSS
   */
  async preloadCriticalCSS(cssUrl: string): Promise<void> {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = cssUrl
    link.as = 'style'
    link.onload = () => {
      link.rel = 'stylesheet'
    }

    document.head.appendChild(link)
  }

  /**
   * Extract font faces from CSS
   */
  extractFontFaces(css: string): string {
    const fontFaceRegex = /@font-face\s*\{[^}]+\}/g
    const matches = css.match(fontFaceRegex)
    return matches ? matches.join('\n') : ''
  }

  /**
   * Extract keyframes from CSS
   */
  extractKeyframes(css: string): string {
    const keyframeRegex = /@(?:keyframes|-webkit-keyframes|-moz-keyframes)\s+[^{]+\{[^}]+\}/g
    const matches = css.match(keyframeRegex)
    return matches ? matches.join('\n') : ''
  }

  /**
   * Extract media queries from CSS
   */
  extractMediaQueries(css: string): string {
    const mediaQueryRegex = /@media[^{]+\{[^}]+\}/g
    const matches = css.match(mediaQueryRegex)
    return matches ? matches.join('\n') : ''
  }

  /**
   * Get CSS size statistics
   */
  getCSSStats(css: string) {
    const size = new Blob([css]).size
    const rules = this.parseCSSRules(css)
    const selectors = new Set(rules.map(rule => rule.selector))

    return {
      size,
      rules: rules.length,
      selectors: selectors.size,
      averageRuleSize: size / rules.length
    }
  }
}

// Create singleton CSS optimizer instance
export const cssOptimizer = new CSSOptimizer()

export default CSSOptimizer