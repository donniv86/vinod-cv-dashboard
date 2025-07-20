/**
 * PurgeCSS Configuration
 * Removes unused CSS to optimize bundle size
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.html',
    './public/**/*.html'
  ],
  css: [
    './src/assets/main.css',
    './src/**/*.css'
  ],
  output: './dist/purged/',
  safelist: [
    // Vue transitions
    'fade-enter-active',
    'fade-leave-active',
    'fade-enter-from',
    'fade-leave-to',
    'slide-enter-active',
    'slide-leave-active',
    'slide-enter-from',
    'slide-leave-to',

    // Dynamic classes
    /^bg-/,
    /^text-/,
    /^border-/,
    /^shadow-/,
    /^hover:/,
    /^focus:/,
    /^active:/,
    /^disabled:/,

    // Utility classes
    'hidden',
    'block',
    'inline',
    'inline-block',
    'flex',
    'grid',
    'relative',
    'absolute',
    'fixed',
    'sticky',

    // Animation classes
    'animate-spin',
    'animate-pulse',
    'animate-bounce',
    'animate-ping',

    // Icon classes
    'icon',
    'svg-icon',

    // Component-specific classes
    'sidebar-open',
    'sidebar-closed',
    'theme-dark',
    'theme-light',
    'loading',
    'error',
    'success',
    'warning'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  fontFace: true,
  keyframes: true,
  variables: true,
  rejected: true,
  rejectedCandidates: true
}