/**
 * Critical CSS Extraction and Inlining Script
 * Extracts critical CSS and inlines it in HTML for faster rendering
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')
const { minify } = require('csso')

class CriticalCSSExtractor {
  constructor(options = {}) {
    this.options = {
      width: 1200,
      height: 900,
      deviceScaleFactor: 1,
      ...options
    }
  }

  /**
   * Extract critical CSS from HTML file
   */
  async extractCriticalCSS(htmlPath, cssPath, outputPath) {
    try {
      console.log(`Extracting critical CSS from ${htmlPath}`)

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })

      const page = await browser.newPage()

      // Set viewport
      await page.setViewport({
        width: this.options.width,
        height: this.options.height,
        deviceScaleFactor: this.options.deviceScaleFactor
      })

      // Load HTML file
      const htmlContent = fs.readFileSync(htmlPath, 'utf8')
      await page.setContent(htmlContent)

      // Load CSS file
      if (cssPath && fs.existsSync(cssPath)) {
        const cssContent = fs.readFileSync(cssPath, 'utf8')
        await page.addStyleTag({ content: cssContent })
      }

      // Extract critical CSS using Puppeteer
      const criticalCSS = await page.evaluate(() => {
        const styleSheets = Array.from(document.styleSheets)
        let css = ''

        styleSheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules)
            rules.forEach(rule => {
              if (rule.cssText) {
                css += rule.cssText + '\n'
              }
            })
          } catch (e) {
            console.warn('Could not access stylesheet:', e.message)
          }
        })

        return css
      })

      // Get visible elements to determine critical rules
      const visibleElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*')
        const visible = []

        elements.forEach(element => {
          const style = window.getComputedStyle(element)
          if (style.display !== 'none' && style.visibility !== 'hidden') {
            visible.push({
              tagName: element.tagName.toLowerCase(),
              className: element.className,
              id: element.id
            })
          }
        })

        return visible
      })

      // Filter critical CSS based on visible elements
      const filteredCSS = this.filterCriticalCSS(criticalCSS, visibleElements)

      // Minify CSS
      const minifiedCSS = minify(filteredCSS).css

      // Inline critical CSS in HTML
      const inlinedHTML = this.inlineCriticalCSS(htmlContent, minifiedCSS)

      // Write output files
      if (outputPath) {
        fs.writeFileSync(outputPath, inlinedHTML)
        console.log(`Critical CSS inlined in ${outputPath}`)
      }

      // Write critical CSS file
      const criticalCSSPath = path.join(path.dirname(outputPath), 'critical.css')
      fs.writeFileSync(criticalCSSPath, minifiedCSS)
      console.log(`Critical CSS saved to ${criticalCSSPath}`)

      // Calculate stats
      const stats = this.calculateStats(htmlContent, minifiedCSS, criticalCSS)
      console.log('CSS Optimization Stats:', stats)

      await browser.close()

      return {
        criticalCSS: minifiedCSS,
        inlinedHTML,
        stats
      }

    } catch (error) {
      console.error('Error extracting critical CSS:', error)
      throw error
    }
  }

  /**
   * Filter CSS to only include critical rules
   */
  filterCriticalCSS(css, visibleElements) {
    const elementSelectors = new Set()

    // Build set of selectors from visible elements
    visibleElements.forEach(element => {
      elementSelectors.add(element.tagName)
      if (element.className) {
        element.className.split(' ').forEach(cls => {
          if (cls) elementSelectors.add(`.${cls}`)
        })
      }
      if (element.id) {
        elementSelectors.add(`#${element.id}`)
      }
    })

    // Simple CSS parser to extract rules
    const rules = this.parseCSSRules(css)
    const criticalRules = []

    rules.forEach(rule => {
      if (this.isRuleCritical(rule, elementSelectors)) {
        criticalRules.push(rule)
      }
    })

    return criticalRules.map(rule => rule.cssText).join('\n')
  }

  /**
   * Parse CSS rules
   */
  parseCSSRules(css) {
    const rules = []
    const ruleRegex = /([^{}]+)\{([^{}]+)\}/g
    let match

    while ((match = ruleRegex.exec(css)) !== null) {
      rules.push({
        selector: match[1].trim(),
        properties: match[2].trim(),
        cssText: match[0]
      })
    }

    return rules
  }

  /**
   * Check if a CSS rule is critical
   */
  isRuleCritical(rule, elementSelectors) {
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
   * Inline critical CSS in HTML
   */
  inlineCriticalCSS(html, criticalCSS) {
    // Create style element for critical CSS
    const styleElement = `<style data-critical="true">${criticalCSS}</style>`

    // Insert critical CSS in head
    const headRegex = /<head[^>]*>/i
    if (headRegex.test(html)) {
      return html.replace(headRegex, `$&${styleElement}`)
    } else {
      // If no head tag, add one
      return html.replace(/<html[^>]*>/i, `$&<head>${styleElement}</head>`)
    }
  }

  /**
   * Calculate optimization stats
   */
  calculateStats(originalHTML, criticalCSS, fullCSS) {
    const originalSize = Buffer.byteLength(originalHTML, 'utf8')
    const criticalSize = Buffer.byteLength(criticalCSS, 'utf8')
    const fullCSSSize = Buffer.byteLength(fullCSS, 'utf8')
    const savings = fullCSSSize - criticalSize

    return {
      originalSize,
      criticalSize,
      fullCSSSize,
      savings,
      savingsPercentage: ((savings / fullCSSSize) * 100).toFixed(2)
    }
  }

  /**
   * Process multiple HTML files
   */
  async processMultipleFiles(files) {
    const results = []

    for (const file of files) {
      try {
        const result = await this.extractCriticalCSS(
          file.html,
          file.css,
          file.output
        )
        results.push({ file: file.html, ...result })
      } catch (error) {
        console.error(`Error processing ${file.html}:`, error)
        results.push({ file: file.html, error: error.message })
      }
    }

    return results
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.log('Usage: node critical-css.js <html-file> <css-file> [output-file]')
    process.exit(1)
  }

  const htmlFile = args[0]
  const cssFile = args[1]
  const outputFile = args[2] || htmlFile.replace('.html', '.critical.html')

  const extractor = new CriticalCSSExtractor()

  extractor.extractCriticalCSS(htmlFile, cssFile, outputFile)
    .then(result => {
      console.log('Critical CSS extraction completed successfully!')
      console.log('Stats:', result.stats)
    })
    .catch(error => {
      console.error('Critical CSS extraction failed:', error)
      process.exit(1)
    })
}

module.exports = CriticalCSSExtractor