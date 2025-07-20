#!/usr/bin/env node

/**
 * Image Conversion Script
 * Converts existing images to WebP format for better performance
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images'),
  formats: ['webp', 'avif'],
  quality: 85,
  sizes: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200
  },
  supportedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
}

/**
 * Check if file is an image
 */
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase()
  return CONFIG.supportedExtensions.includes(ext)
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath)
  return stats.size
}

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Convert image to different formats and sizes
 */
async function convertImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath))
  const results = []

  try {
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    console.log(`\n🖼️  Processing: ${path.basename(inputPath)}`)
    console.log(`   Original size: ${metadata.width}x${metadata.height}`)

    // Convert to different formats
    for (const format of CONFIG.formats) {
      const outputPath = path.join(outputDir, `${filename}.${format}`)

      try {
        await image
          .webp({ quality: CONFIG.quality })
          .toFile(outputPath)

        const originalSize = getFileSize(inputPath)
        const convertedSize = getFileSize(outputPath)
        const savings = ((originalSize - convertedSize) / originalSize * 100).toFixed(1)

        results.push({
          format,
          path: outputPath,
          originalSize,
          convertedSize,
          savings: parseFloat(savings)
        })

        console.log(`   ✅ ${format.toUpperCase()}: ${formatFileSize(convertedSize)} (${savings}% smaller)`)
      } catch (error) {
        console.error(`   ❌ Failed to convert to ${format}:`, error.message)
      }
    }

    // Generate responsive sizes
    for (const [sizeName, width] of Object.entries(CONFIG.sizes)) {
      for (const format of CONFIG.formats) {
        const outputPath = path.join(outputDir, `${filename}-${sizeName}.${format}`)

        try {
          await image
            .resize(width, null, { withoutEnlargement: true })
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath)

          const convertedSize = getFileSize(outputPath)
          console.log(`   ✅ ${format.toUpperCase()} ${sizeName}: ${formatFileSize(convertedSize)}`)
        } catch (error) {
          console.error(`   ❌ Failed to create ${sizeName} ${format}:`, error.message)
        }
      }
    }

  } catch (error) {
    console.error(`   ❌ Failed to process image:`, error.message)
  }

  return results
}

/**
 * Process all images in directory recursively
 */
async function processDirectory(dir) {
  const items = fs.readdirSync(dir)
  let totalSavings = 0
  let processedCount = 0

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      const subResults = await processDirectory(fullPath)
      totalSavings += subResults.totalSavings
      processedCount += subResults.processedCount
    } else if (isImageFile(item)) {
      // Process image file
      const results = await convertImage(fullPath, dir)
      processedCount++

      // Calculate total savings
      for (const result of results) {
        if (result.savings > 0) {
          totalSavings += result.savings
        }
      }
    }
  }

  return { totalSavings, processedCount }
}

/**
 * Generate image optimization report
 */
function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    totalImages: results.processedCount,
    averageSavings: results.totalSavings / results.processedCount,
    totalSavings: results.totalSavings,
    recommendations: []
  }

  if (results.averageSavings > 50) {
    report.recommendations.push('Excellent compression achieved! Consider using WebP as primary format.')
  } else if (results.averageSavings > 30) {
    report.recommendations.push('Good compression achieved. WebP format is recommended.')
  } else if (results.averageSavings > 10) {
    report.recommendations.push('Moderate compression achieved. Consider adjusting quality settings.')
  } else {
    report.recommendations.push('Low compression achieved. Images may already be optimized.')
  }

  return report
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting image conversion process...')
  console.log(`📁 Input directory: ${CONFIG.inputDir}`)
  console.log(`📁 Output directory: ${CONFIG.outputDir}`)
  console.log(`🎯 Target formats: ${CONFIG.formats.join(', ')}`)
  console.log(`⚙️  Quality setting: ${CONFIG.quality}%`)

  // Check if input directory exists
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.error(`❌ Input directory does not exist: ${CONFIG.inputDir}`)
    process.exit(1)
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true })
  }

  try {
    const startTime = Date.now()
    const results = await processDirectory(CONFIG.inputDir)
    const endTime = Date.now()

    console.log('\n📊 Conversion Summary:')
    console.log(`   Total images processed: ${results.processedCount}`)
    console.log(`   Average size reduction: ${results.averageSavings.toFixed(1)}%`)
    console.log(`   Total processing time: ${((endTime - startTime) / 1000).toFixed(2)}s`)

    // Generate and save report
    const report = generateReport(results)
    const reportPath = path.join(__dirname, '../image-conversion-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

    console.log(`\n📄 Detailed report saved to: ${reportPath}`)

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:')
      report.recommendations.forEach(rec => console.log(`   • ${rec}`))
    }

    console.log('\n✅ Image conversion completed successfully!')

  } catch (error) {
    console.error('\n❌ Conversion failed:', error.message)
    process.exit(1)
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}