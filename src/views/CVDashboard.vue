<template>
  <admin-layout>
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div class="space-y-8">
        <!-- Hero Section with Modern Design -->
        <div class="gradient-card animate-fade-in-up" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg">
                Dr. Vinod Devaraji
              </h1>
              <p class="text-xl lg:text-2xl mb-6 text-white/90 font-medium">
                Senior Scientist at Schrödinger
              </p>
              <p class="text-lg mb-8 text-white/80 font-light">
                Computational Drug Discovery • AI/ML • Molecular Modeling • CADD Expert
              </p>
              <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="https://github.com/donniv86" target="_blank"
                   class="modern-btn bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/vinod-d-ph-d-8bb57a36/" target="_blank"
                   class="modern-btn bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div class="text-center lg:text-right mt-8 lg:mt-0">
              <div class="text-6xl lg:text-8xl font-black text-white/90 mb-2">13+</div>
              <div class="text-xl text-white/80 font-medium">Years Experience</div>
            </div>
          </div>
        </div>

        <!-- Quick Stats with Modern Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(stat, index) in stats" :key="stat.label"
               class="modern-card animate-fade-in-up"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl font-black text-transparent bg-clip-text"
                     :style="{ backgroundImage: stat.gradient }">{{ stat.value }}</div>
                <div class="text-sm text-gray-300 font-medium">{{ stat.label }}</div>
              </div>
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                   :style="{ background: stat.iconBg }">
                <component :is="stat.icon" class="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- CADD Modalities with Modern Design -->
        <Card title="CADD Modalities">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div v-for="(modality, index) in caddModalities" :key="modality.name"
                 class="group cursor-pointer">
              <div class="modern-card p-4 text-center transition-all duration-300 hover:scale-105"
                   :style="{ background: modality.gradient }">
                <div class="text-sm font-bold text-white">{{ modality.name }}</div>
                <div class="text-xs text-white/80 mt-1">{{ modality.desc }}</div>
              </div>
            </div>
          </div>
        </Card>

        <!-- Computational Techniques with Gradient Cards -->
        <Card title="Computational Techniques">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="tech in computationalTechniques" :key="tech.title"
                 class="gradient-card cursor-pointer group"
                 :style="{ background: tech.gradient }">
              <div class="text-sm font-bold text-white mb-1">{{ tech.title }}</div>
              <div class="text-xs text-white/80">{{ tech.subtitle }}</div>
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
                    <div class="font-bold text-white mb-1">{{ area.title }}</div>
                    <div class="text-sm text-gray-300">{{ area.subtitle }}</div>
                  </div>
                  <div class="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">{{ area.years }}</div>
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
                    <div class="font-bold text-white mb-1">{{ target.title }}</div>
                    <div class="text-sm text-gray-300">{{ target.subtitle }}</div>
                  </div>
                  <div class="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">{{ target.context }}</div>
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
                    <component :is="cat.icon" class="w-8 h-8 text-white" />
                  </div>
                  <svg class="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">{{ cat.title }}</h3>
                <p class="text-sm text-gray-300 mb-4">{{ cat.description }}</p>
                <div class="flex items-center text-sm text-blue-400 font-medium">
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
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import Card from '../components/ui/Card.vue'
import {
  ArchiveIcon, BarChartIcon, BellIcon, BoxCubeIcon,
  DocsIcon, PieChartIcon, UserCircleIcon, MailIcon, ChatIcon, CheckIcon
} from '../icons'

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
  { title: 'Large Language Models', subtitle: 'LLM Applications', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { title: 'Cheminformatics', subtitle: 'Molecular Informatics', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { title: 'Quantum Mechanics', subtitle: 'QM Calculations', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { title: 'Molecular Mechanics', subtitle: 'Force Fields', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { title: 'Enhanced Sampling MD', subtitle: 'FEP+, Umbrella Sampling', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { title: 'Targeted MD', subtitle: 'Advanced Dynamics', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { title: 'Biologics Formulations', subtitle: 'Protein Therapeutics', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
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
    description: '10 repositories showcasing technical skills',
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