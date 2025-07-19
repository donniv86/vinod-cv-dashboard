#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes the build output to identify optimization opportunities
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const DIST_DIR = 'dist'
const ANALYSIS_FILE = 'bundle-analysis.json'

function analyzeBundle() {
  console.log('🔍 Analyzing bundle size...')

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found. Run "npm run build" first.')
    process.exit(1)
  }

  const analysis = {
    timestamp: new Date().toISOString(),
    totalSize: 0,
    files: [],
    chunks: {},
    recommendations: []
  }

  // Analyze JavaScript files
  const jsFiles = findFiles(DIST_DIR, '.js')
  let totalJsSize = 0

  jsFiles.forEach(file => {
    const stats = fs.statSync(file)
    const size = stats.size
    const sizeKB = (size / 1024).toFixed(2)
    totalJsSize += size

    const relativePath = path.relative(DIST_DIR, file)
    analysis.files.push({
      path: relativePath,
      size: size,
      sizeKB: parseFloat(sizeKB),
      type: 'js'
    })

    // Group by chunk name
    const chunkName = getChunkName(relativePath)
    if (!analysis.chunks[chunkName]) {
      analysis.chunks[chunkName] = {
        size: 0,
        files: []
      }
    }
    analysis.chunks[chunkName].size += size
    analysis.chunks[chunkName].files.push(relativePath)
  })

  // Analyze CSS files
  const cssFiles = findFiles(DIST_DIR, '.css')
  let totalCssSize = 0

  cssFiles.forEach(file => {
    const stats = fs.statSync(file)
    const size = stats.size
    const sizeKB = (size / 1024).toFixed(2)
    totalCssSize += size

    const relativePath = path.relative(DIST_DIR, file)
    analysis.files.push({
      path: relativePath,
      size: size,
      sizeKB: parseFloat(sizeKB),
      type: 'css'
    })
  })

  analysis.totalSize = totalJsSize + totalCssSize

  // Generate recommendations
  generateRecommendations(analysis)

  // Save analysis
  fs.writeFileSync(ANALYSIS_FILE, JSON.stringify(analysis, null, 2))

  // Print summary
  printSummary(analysis)
}

function findFiles(dir, extension) {
  const files = []

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir)

    items.forEach(item => {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        traverse(fullPath)
      } else if (item.endsWith(extension)) {
        files.push(fullPath)
      }
    })
  }

  traverse(dir)
  return files
}

function getChunkName(filePath) {
  const match = filePath.match(/([^/]+)-[a-f0-9]+\.js$/)
  return match ? match[1] : 'unknown'
}

function generateRecommendations(analysis) {
  const recommendations = []

  // Check for large chunks
  Object.entries(analysis.chunks).forEach(([name, chunk]) => {
    const sizeKB = (chunk.size / 1024).toFixed(2)
    if (chunk.size > 500 * 1024) { // 500KB
      recommendations.push({
        type: 'large-chunk',
        severity: 'warning',
        message: `Chunk "${name}" is large (${sizeKB}KB). Consider splitting.`,
        chunk: name,
        size: chunk.size
      })
    }
  })

  // Check for duplicate libraries
  const libraries = analysis.files
    .filter(f => f.type === 'js')
    .map(f => f.path)
    .filter(path => path.includes('vendor'))

  if (libraries.length > 3) {
    recommendations.push({
      type: 'vendor-splitting',
      severity: 'info',
      message: 'Consider further splitting vendor chunks for better caching.'
    })
  }

  analysis.recommendations = recommendations
}

function printSummary(analysis) {
  console.log('\n📊 Bundle Analysis Summary')
  console.log('========================')

  const totalSizeKB = (analysis.totalSize / 1024).toFixed(2)
  console.log(`Total Bundle Size: ${totalSizeKB}KB`)

  console.log('\n📁 Chunks:')
  Object.entries(analysis.chunks).forEach(([name, chunk]) => {
    const sizeKB = (chunk.size / 1024).toFixed(2)
    console.log(`  ${name}: ${sizeKB}KB`)
  })

  if (analysis.recommendations.length > 0) {
    console.log('\n💡 Recommendations:')
    analysis.recommendations.forEach(rec => {
      const icon = rec.severity === 'warning' ? '⚠️' : 'ℹ️'
      console.log(`  ${icon} ${rec.message}`)
    })
  }

  console.log(`\n📄 Detailed analysis saved to: ${ANALYSIS_FILE}`)
}

// Run analysis
analyzeBundle()