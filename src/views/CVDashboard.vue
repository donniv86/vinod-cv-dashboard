<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Dr. Vinod Devaraji</h1>
            <p class="text-xl mb-4">Senior Scientist at Schrödinger</p>
            <p class="text-blue-100 mb-6">Computational Drug Discovery • AI/ML • Molecular Modeling • CADD Expert</p>
            <div class="flex space-x-4">
              <a href="https://github.com/donniv86" target="_blank" class="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/vinod-d-ph-d-8bb57a36/" target="_blank" class="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold mb-2">13+</div>
            <div class="text-blue-100">Years Experience</div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold text-gray-800 dark:text-white">31</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Publications</div>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold text-gray-800 dark:text-white">1,247</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Citations</div>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold text-gray-800 dark:text-white">16</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">H-Index</div>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-2xl font-bold text-gray-800 dark:text-white">6</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">CADD Modalities</div>
            </div>
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- CADD Expertise Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6">CADD Modalities & Computational Expertise</h2>

        <!-- CADD Modalities -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
            CADD Modalities
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <div class="text-sm font-semibold text-blue-800 dark:text-blue-300">Small Molecule</div>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div class="text-sm font-semibold text-green-800 dark:text-green-300">Peptide</div>
            </div>
            <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div class="text-sm font-semibold text-purple-800 dark:text-purple-300">Organometallic</div>
            </div>
            <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div class="text-sm font-semibold text-orange-800 dark:text-orange-300">Macrocycle</div>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <div class="text-sm font-semibold text-red-800 dark:text-red-300">PROTAC</div>
            </div>
            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <div class="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Antibody Drug Conjugate</div>
            </div>
          </div>
        </div>

        <!-- Computational Techniques -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Computational Techniques
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">AI/Deep Learning</div>
              <div class="text-xs opacity-90">Machine Learning</div>
            </div>
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">Large Language Models</div>
              <div class="text-xs opacity-90">LLM Applications</div>
            </div>
            <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">Cheminformatics</div>
              <div class="text-xs opacity-90">Molecular Informatics</div>
            </div>
            <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">Quantum Mechanics</div>
              <div class="text-xs opacity-90">QM Calculations</div>
            </div>
            <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">Molecular Mechanics</div>
              <div class="text-xs opacity-90">Force Fields</div>
            </div>
            <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">Enhanced Sampling MD</div>
              <div class="text-xs opacity-90">FEP+, Umbrella Sampling</div>
            </div>
            <div class="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">Targeted MD</div>
              <div class="text-xs opacity-90">Advanced Dynamics</div>
            </div>
            <div class="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-lg">
              <div class="text-sm font-semibold">Biologics Formulations</div>
              <div class="text-xs opacity-90">Protein Therapeutics</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Therapeutic Areas & Molecular Targets -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Therapeutic Areas -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            Therapeutic Areas
          </h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div>
                <div class="font-semibold text-red-800 dark:text-red-300">Oncology</div>
                <div class="text-sm text-red-600 dark:text-red-400">Tumor inhibition, PAR2 signaling</div>
              </div>
              <div class="text-xs text-red-500">2013-2014</div>
            </div>
            <div class="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div>
                <div class="font-semibold text-blue-800 dark:text-blue-300">Cardiovascular</div>
                <div class="text-sm text-blue-600 dark:text-blue-400">Antihypertensive mechanisms</div>
              </div>
              <div class="text-xs text-blue-500">2015</div>
            </div>
            <div class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <div class="font-semibold text-green-800 dark:text-green-300">Genotoxicity/DNA Therapy</div>
                <div class="text-sm text-green-600 dark:text-green-400">Groove binding, DNA damage</div>
              </div>
              <div class="text-xs text-green-500">2014-2015</div>
            </div>
            <div class="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div>
                <div class="font-semibold text-purple-800 dark:text-purple-300">Signal Transduction</div>
                <div class="text-sm text-purple-600 dark:text-purple-400">PAR receptors, breast cancer</div>
              </div>
              <div class="text-xs text-purple-500">2014-2015</div>
            </div>
          </div>
        </div>

        <!-- Molecular Targets -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
            Molecular Targets
          </h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div>
                <div class="font-semibold text-indigo-800 dark:text-indigo-300">DNA</div>
                <div class="text-sm text-indigo-600 dark:text-indigo-400">Groove binding, structural modulation</div>
              </div>
              <div class="text-xs text-indigo-500">Primary</div>
            </div>
            <div class="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <div>
                <div class="font-semibold text-pink-800 dark:text-pink-300">PAR2 Receptor</div>
                <div class="text-sm text-pink-600 dark:text-pink-400">Signal transduction, breast cancer</div>
              </div>
              <div class="text-xs text-pink-500">Key Target</div>
            </div>
            <div class="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <div>
                <div class="font-semibold text-teal-800 dark:text-teal-300">Plasma Carrier Protein</div>
                <div class="text-sm text-teal-600 dark:text-teal-400">Drug-protein binding mechanisms</div>
              </div>
              <div class="text-xs text-teal-500">Binding</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Research Publications -->
        <router-link to="/publications" class="group">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Research Publications</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">31 peer-reviewed papers with 1,247+ citations</p>
            <div class="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <span>View all publications</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- GitHub Projects -->
        <router-link to="/github-projects" class="group">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">GitHub Projects</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">10 repositories showcasing technical skills</p>
            <div class="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <span>View all projects</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- Certifications -->
        <router-link to="/certifications" class="group">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Certifications</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">21 courses from Coursera and DataCamp</p>
            <div class="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <span>View all certifications</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- About Me -->
        <router-link to="/about" class="group">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">About Me</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Experience, education, and contact details</p>
            <div class="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <span>Learn more</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
</script>