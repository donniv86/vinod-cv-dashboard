<template>
  <admin-layout>
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div class="space-y-8">
        <!-- Hero Section with Enhanced Dynamic Background Effects -->
        <div v-if="showContent" class="relative overflow-hidden gradient-card animate-fade-in-up" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
          <!-- Animated Background Particles -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="particles-container">
              <div v-for="i in 20" :key="i"
                   class="particle"
                   :style="{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     animationDelay: `${Math.random() * 3}s`,
                     animationDuration: `${3 + Math.random() * 4}s`
                   }">
              </div>
            </div>

            <!-- Floating Geometric Shapes -->
            <div class="floating-shapes">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
              <div class="shape shape-4"></div>
            </div>

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          </div>

          <!-- Main Content -->
          <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between">
            <div class="text-center lg:text-left">
              <!-- Animated Name with Typewriter Effect -->
              <h1 class="text-4xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg typewriter-text"
                  style="text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); color: white !important;">
                Dr. Vinod Devaraji
              </h1>

              <!-- Animated Role with Fade-in -->
              <p class="text-xl lg:text-2xl mb-6 text-yellow-300 font-medium animate-fade-in-up"
                 style="animation-delay: 0.5s; animation-fill-mode: both;">
                Senior Scientist at Schrödinger
              </p>

              <!-- Animated Expertise with Staggered Animation -->
              <p class="text-lg mb-8 text-sky-300 font-light animate-fade-in-up"
                 style="animation-delay: 0.8s; animation-fill-mode: both;">
                Computational Drug Discovery • AI/ML • Molecular Modeling • CADD Expert
              </p>

              <!-- Enhanced CTA Buttons with Hover Effects -->
              <div class="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up"
                   style="animation-delay: 1.1s; animation-fill-mode: both;">
                <a href="https://github.com/donniv86" target="_blank"
                   class="modern-btn bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 hover:shadow-lg transition-all duration-300 transform">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.6); color: white !important;">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/vinod-d-ph-d-8bb57a36/" target="_blank"
                   class="modern-btn bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 hover:shadow-lg transition-all duration-300 transform">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.6); color: white !important;">LinkedIn</span>
                </a>

                <!-- New CV Download Button -->
                <a href="/cv-download"
                   class="modern-btn bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 hover:bg-yellow-400/30 hover:scale-105 hover:shadow-lg transition-all duration-300 transform">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.6); color: white !important;">Download CV</span>
                </a>
              </div>
            </div>

            <!-- Animated Experience Counter -->
            <div class="text-center lg:text-right mt-8 lg:mt-0 animate-fade-in-up"
                 style="animation-delay: 1.4s; animation-fill-mode: both;">
              <div class="text-6xl lg:text-8xl font-black text-yellow-300 mb-2 counter-animation">13+</div>
              <div class="text-xl text-sky-300 font-medium">Years Experience</div>
            </div>
          </div>
        </div>

        <!-- Hero Skeleton -->
        <SkeletonLoader v-if="!showContent" variant="profile" size="large" :is-animated="true" />

        <!-- Quick Stats with Modern Cards -->
        <div v-if="showContent" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(stat, index) in stats" :key="stat.label"
               class="modern-card animate-fade-in-up"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl font-black text-transparent bg-clip-text"
                     :style="{ backgroundImage: stat.gradient }">{{ stat.value }}</div>
                <div class="text-sm text-sky-300 font-medium">{{ stat.label }}</div>
              </div>
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                   :style="{ background: stat.iconBg }">
                <component :is="stat.icon" class="w-8 h-8 text-white" style="text-shadow: 0 0 10px rgba(255, 255, 255, 0.7); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));" />
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Skeleton -->
        <div v-if="!showContent" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonLoader v-for="i in 4" :key="i" variant="card" size="medium" :is-animated="true" />
        </div>

        <!-- Content Sections -->
        <div v-if="showContent">
          <!-- CADD Modalities with Modern Design -->
          <Card title="CADD Modalities">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div v-for="(modality, index) in caddModalities" :key="modality.name"
                   class="group cursor-pointer">
                <div class="bg-gray-800/50 backdrop-blur-sm p-4 text-center transition-all duration-300 hover:scale-105 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-gray-700/50">
                  <div class="text-sm font-bold text-white mb-1" style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);">{{ modality.name }}</div>
                  <div class="text-xs text-cyan-300 mt-1" style="text-shadow: 0 0 5px rgba(34, 211, 238, 0.4);">{{ modality.desc }}</div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Computational Techniques with Modern Design -->
          <Card title="Computational Techniques">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div v-for="tech in computationalTechniques" :key="tech.title"
                   class="group cursor-pointer">
                <div class="bg-gray-800/50 backdrop-blur-sm p-4 text-center transition-all duration-300 hover:scale-105 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-gray-700/50">
                  <div class="text-sm font-bold text-white mb-1" style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);">{{ tech.title }}</div>
                  <div class="text-xs text-cyan-300" style="text-shadow: 0 0 5px rgba(34, 211, 238, 0.4);">{{ tech.subtitle }}</div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Recent GitHub Activity -->
          <Card title="Recent GitHub Activity">
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id"
                   class="modern-card p-4 border-l-4 transition-all duration-300 hover:scale-105"
                   :style="{ borderLeftColor: activity.color }">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <div class="font-bold text-yellow-300 mb-1">{{ activity.title }}</div>
                    <div class="text-sm text-sky-300">{{ activity.description }}</div>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <span v-for="tech in activity.technologies" :key="tech"
                            class="bg-cyan-600/30 px-3 py-1 rounded-full text-xs text-cyan-100 font-medium">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-cyan-100 bg-cyan-600/40 px-3 py-1 rounded-full font-medium">{{ activity.date }}</div>
                    <a :href="activity.url" target="_blank"
                       class="text-xs text-cyan-300 hover:text-cyan-200 mt-1 block font-medium">
                      View →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Therapeutic Areas & Molecular Targets -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Therapeutic Areas">
              <div class="space-y-4">
                <div v-for="area in therapeuticAreas" :key="area.title"
                     class="modern-card p-4 border-l-4 transition-all duration-300 hover:scale-105"
                     :style="{ borderLeftColor: area.color }">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-bold text-yellow-300 mb-1">{{ area.title }}</div>
                      <div class="text-sm text-sky-300">{{ area.subtitle }}</div>
                    </div>
                    <div class="text-xs text-cyan-100 bg-cyan-600/40 px-3 py-1 rounded-full font-medium">{{ area.years }}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Molecular Targets">
              <div class="space-y-4">
                <div v-for="target in molecularTargets" :key="target.title"
                     class="modern-card p-4 border-l-4 transition-all duration-300 hover:scale-105"
                     :style="{ borderLeftColor: target.color }">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-bold text-yellow-300 mb-1">{{ target.title }}</div>
                      <div class="text-sm text-sky-300">{{ target.subtitle }}</div>
                    </div>
                    <div class="text-xs text-cyan-100 bg-cyan-600/40 px-3 py-1 rounded-full font-medium">{{ target.context }}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <!-- Main Categories Grid with Modern Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="cat in categories" :key="cat.title" class="group">
              <router-link :to="cat.link" class="block">
                <div class="modern-card hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div class="flex items-center justify-between mb-4">
                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                         :style="{ background: cat.iconBg }">
                      <component :is="cat.icon" class="w-8 h-8 text-white" style="text-shadow: 0 0 10px rgba(255, 255, 255, 0.7); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));" />
                    </div>
                    <svg class="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-yellow-300 mb-2">{{ cat.title }}</h3>
                  <p class="text-sm text-sky-300 mb-4">{{ cat.description }}</p>
                  <div class="flex items-center text-sm text-cyan-300 font-medium">
                    <span>{{ cat.cta }}</span>
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <div v-if="!showContent" class="space-y-8">
          <Card title="CADD Modalities">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <SkeletonLoader v-for="i in 6" :key="i" variant="card" size="small" :is-animated="true" />
            </div>
          </Card>

          <Card title="Computational Techniques">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <SkeletonLoader v-for="i in 8" :key="i" variant="card" size="small" :is-animated="true" />
            </div>
          </Card>

          <Card title="Recent GitHub Activity">
            <div class="space-y-4">
              <SkeletonLoader v-for="i in 4" :key="i" variant="list-item" size="medium" :is-animated="true" />
            </div>
          </Card>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Therapeutic Areas">
              <div class="space-y-4">
                <SkeletonLoader v-for="i in 4" :key="i" variant="list-item" size="small" :is-animated="true" />
              </div>
            </Card>

            <Card title="Molecular Targets">
              <div class="space-y-4">
                <SkeletonLoader v-for="i in 3" :key="i" variant="list-item" size="small" :is-animated="true" />
              </div>
            </Card>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkeletonLoader v-for="i in 4" :key="i" variant="card" size="medium" :is-animated="true" />
          </div>
        </div>

        <!-- Development Tools (only in development mode) -->
        <div v-if="isDevelopment" class="space-y-6">
          <Card title="Performance Optimization Tools">
            <div class="space-y-4">
              <CriticalCSS />
              <CacheMonitor />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import Card from '../components/ui/Card.vue'
import CriticalCSS from '../components/ui/CriticalCSS.vue'
import CacheMonitor from '../components/ui/CacheMonitor.vue'
import SkeletonLoader from '../components/ui/SkeletonLoader.vue'
import { useSkeletonLoading } from '../composables/useSkeletonLoading'
import {
  ArchiveIcon, BarChartIcon, BoxCubeIcon,
  DocsIcon, PieChartIcon, UserCircleIcon, CheckIcon
} from '../icons'

const isDevelopment = computed(() => import.meta.env.DEV)

// Simple test: Show content immediately without skeleton loading
const showContent = ref(true)

// Skeleton loading states - simplified approach
const heroLoading = useSkeletonLoading({ delay: 0, minDuration: 200 })
const statsLoading = useSkeletonLoading({ delay: 0, minDuration: 200 })
const contentLoading = useSkeletonLoading({ delay: 0, minDuration: 200 })

// Initialize loading states
onMounted(() => {
  console.log('CVDashboard mounted')

  // For testing: Show content immediately
  showContent.value = true
  console.log('Content should be visible now')
})

const stats = [
  {
    value: '31',
    label: 'Publications',
    icon: DocsIcon,
    iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    value: '1,247',
    label: 'Citations',
    icon: BarChartIcon,
    iconBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    value: '16',
    label: 'H-Index',
    icon: PieChartIcon,
    iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    value: '6',
    label: 'CADD Modalities',
    icon: BoxCubeIcon,
    iconBg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
]

const caddModalities = [
  { name: 'Small Molecule', desc: 'Traditional drugs', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Peptide', desc: 'Protein-based', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Organometallic', desc: 'Metal complexes', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Macrocycle', desc: 'Ring structures', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { name: 'PROTAC', desc: 'Protein degraders', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Antibody Drug Conjugate', desc: 'Targeted delivery', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
]

const computationalTechniques = [
  { title: 'AI/Deep Learning', subtitle: 'Machine Learning', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: 'RAG Systems', subtitle: 'Retrieval-Augmented Generation', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { title: 'Large Language Models', subtitle: 'LLM Applications', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { title: 'Cheminformatics', subtitle: 'Molecular Informatics', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { title: 'Quantum Mechanics', subtitle: 'QM Calculations', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { title: 'Molecular Mechanics', subtitle: 'Force Fields', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { title: 'Enhanced Sampling MD', subtitle: 'FEP+, Umbrella Sampling', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: 'Targeted MD', subtitle: 'Advanced Dynamics', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
]

const therapeuticAreas = [
  { title: 'Oncology', subtitle: 'Tumor inhibition, PAR2 signaling', years: '2013-2014', color: '#ef4444' },
  { title: 'Cardiovascular', subtitle: 'Antihypertensive mechanisms', years: '2015', color: '#3b82f6' },
  { title: 'Genotoxicity/DNA Therapy', subtitle: 'Groove binding, DNA damage', years: '2014-2015', color: '#10b981' },
  { title: 'Signal Transduction', subtitle: 'PAR receptors, breast cancer', years: '2014-2015', color: '#8b5cf6' },
]

const molecularTargets = [
  { title: 'DNA', subtitle: 'Groove binding, structural modulation', context: 'Primary', color: '#6366f1' },
  { title: 'PAR2 Receptor', subtitle: 'Signal transduction, breast cancer', context: 'Key Target', color: '#ec4899' },
  { title: 'Plasma Carrier Protein', subtitle: 'Drug-protein binding mechanisms', context: 'Binding', color: '#14b8a6' },
]

const recentActivity = [
  {
    id: 1,
    title: "Tox2020Analysis",
    description: "Advanced toxicity data analysis and modeling",
    technologies: ["Python", "Data Analysis", "Toxicology"],
    date: "July 2025",
    color: "#ef4444",
    url: "https://github.com/donniv86/Tox2020Analysis"
  },
  {
    id: 2,
    title: "Chembyl_processing",
    description: "Chemical data processing and cheminformatics workflows",
    technologies: ["Python", "Cheminformatics", "Data Processing"],
    date: "July 2025",
    color: "#3b82f6",
    url: "https://github.com/donniv86/Chembyl_processing"
  },
  {
    id: 3,
    title: "chemgan-learning",
    description: "Generative Adversarial Networks for chemical compounds",
    technologies: ["Python", "GAN", "Deep Learning", "Drug Discovery"],
    date: "June 2025",
    color: "#10b981",
    url: "https://github.com/donniv86/chemgan-learning"
  },
  {
    id: 4,
    title: "RAG_CHROMA_DB",
    description: "Retrieval-Augmented Generation with ChromaDB",
    technologies: ["Python", "RAG", "ChromaDB", "LLM"],
    date: "June 2025",
    color: "#8b5cf6",
    url: "https://github.com/donniv86/RAG_CHROMA_DB"
  }
]

const categories = [
  {
    title: 'Research Publications',
    description: '31 peer-reviewed papers with 1,247+ citations',
    link: '/publications',
    icon: DocsIcon,
    iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cta: 'View all publications'
  },
  {
    title: 'GitHub Projects',
    description: '11 repositories showcasing AI/ML, RAG, and computational chemistry',
    link: '/github-projects',
    icon: ArchiveIcon,
    iconBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    cta: 'View all projects'
  },
  {
    title: 'Certifications',
    description: '21 courses from Coursera and DataCamp',
    link: '/certifications',
    icon: CheckIcon,
    iconBg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    cta: 'View all certifications'
  },
  {
    title: 'About Me',
    description: 'Experience, education, and contact details',
    link: '/about',
    icon: UserCircleIcon,
    iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cta: 'Learn more'
  },
]
</script>

<style scoped>
/* Animated Background Effects */
.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

/* Floating Geometric Shapes */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.shape {
  position: absolute;
  opacity: 0.1;
  animation: float-shape 8s ease-in-out infinite;
}

.shape-1 {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  border-radius: 8px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  border-radius: 50%;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #43e97b, #38f9d7);
  border-radius: 12px;
  top: 40%;
  right: 30%;
  animation-delay: 6s;
}

@keyframes float-shape {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-30px) rotate(180deg) scale(1.1);
    opacity: 0.3;
  }
}

/* Typewriter Effect */
.typewriter-text {
  overflow: hidden;
  border-right: 3px solid rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  animation: typewriter 3s steps(20) 0.5s both, blink-caret 0.75s step-end infinite;
}

@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: rgba(255, 255, 255, 0.8);
  }
}

/* Counter Animation */
.counter-animation {
  animation: count-up 2s ease-out 1.4s both;
}

@keyframes count-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Enhanced Button Hover Effects */
.modern-btn {
  position: relative;
  overflow: hidden;
}

.modern-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.modern-btn:hover::before {
  left: 100%;
}

/* Fade-in Animation */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .particle {
    width: 3px;
    height: 3px;
  }

  .shape {
    transform: scale(0.7);
  }

  .typewriter-text {
    animation: none;
    border-right: none;
    white-space: normal;
  }
}
</style>