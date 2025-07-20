<template>
  <div class="glassmorphism-card relative overflow-hidden">
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

    <!-- Floating Elements -->
    <div class="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
    <div class="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-lg animate-pulse" style="animation-delay: 1s;"></div>

    <div class="relative z-10 p-8">
      <div class="flex flex-col lg:flex-row items-start gap-8">
        <!-- Enhanced Profile Picture with Glassmorphism -->
        <div class="flex-shrink-0 relative group lg:mt-2">
          <!-- Glowing Ring Effect -->
          <div class="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>

          <!-- Glassmorphism Container -->
          <div class="relative bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-2xl">
            <div class="profile-image-container w-40 h-40">
              <LazyImage
                src="/vinod.png"
                alt="Vinod Devaraji"
                width="160px"
                height="160px"
                image-class="profile-image w-40 h-40 rounded-full shadow-xl border-4 border-white/30 hover:scale-105 transition-all duration-500 group-hover:border-cyan-400/50"
              />
            </div>

            <!-- Status Indicator -->
            <div class="absolute bottom-4 right-4 w-6 h-6 bg-green-400 border-4 border-white rounded-full shadow-lg animate-pulse"></div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span class="text-white text-sm font-medium">View Profile</span>
            </div>
          </div>

          <!-- Floating Badge -->
          <div class="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-bounce">
            Available
          </div>
        </div>

        <!-- Enhanced Personal Details -->
        <div class="flex-1 text-center lg:text-left lg:pl-4 personal-details">
          <!-- Animated Name with Gradient Text -->
          <h2 class="text-4xl lg:text-5xl font-black mb-3 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent animate-fade-in-up"
              style="animation-delay: 0.2s; animation-fill-mode: both;">
            {{ personalInfo.name }}
          </h2>

          <!-- Animated Title -->
          <p class="text-xl lg:text-2xl text-yellow-300 mb-4 font-semibold animate-fade-in-up"
             style="animation-delay: 0.4s; animation-fill-mode: both;">
            {{ personalInfo.title }}
          </p>

          <!-- Location with Icon -->
          <p class="text-sky-300 mb-6 flex items-center justify-center lg:justify-start animate-fade-in-up"
             style="animation-delay: 0.6s; animation-fill-mode: both;">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {{ personalInfo.location }}
          </p>

          <!-- Enhanced Summary with Better Typography -->
          <div class="text-white/90 leading-relaxed mb-6 animate-fade-in-up"
               style="animation-delay: 0.8s; animation-fill-mode: both;">
            <p class="text-lg mb-4 font-medium">
              {{ personalInfo.summary }}
            </p>
          </div>

          <!-- Enhanced CTA Buttons -->
          <div class="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up"
               style="animation-delay: 1s; animation-fill-mode: both;">
            <button class="glassmorphism-btn bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center font-semibold">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Contact Me
            </button>
          </div>
        </div>

        <!-- Enhanced Contact Info with Glassmorphism -->
        <div class="flex-shrink-0 lg:mt-2 contact-panel">
          <div class="glassmorphism-panel p-6 rounded-2xl border border-white/20 backdrop-blur-md">
            <h3 class="text-lg font-bold text-white mb-4 text-center">Contact Information</h3>
            <div class="space-y-3">
              <a :href="`mailto:${personalInfo.email}`"
                 class="contact-link group">
                <div class="contact-icon bg-gradient-to-r from-cyan-500 to-blue-600">
                  <MailIcon class="w-4 h-4" />
                </div>
                <span class="contact-text">{{ personalInfo.email }}</span>
              </a>

              <a :href="`tel:${personalInfo.phone}`"
                 class="contact-link group">
                <div class="contact-icon bg-gradient-to-r from-green-500 to-emerald-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span class="contact-text">{{ personalInfo.phone }}</span>
              </a>

              <a :href="`https://${personalInfo.linkedin}`" target="_blank"
                 class="contact-link group">
                <div class="contact-icon bg-gradient-to-r from-blue-500 to-indigo-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span class="contact-text">LinkedIn Profile</span>
              </a>

              <a :href="`https://orcid.org/${personalInfo.orcid}`" target="_blank"
                 class="contact-link group">
                <div class="contact-icon bg-gradient-to-r from-orange-500 to-red-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"/>
                  </svg>
                </div>
                <span class="contact-text">ORCID Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MailIcon } from '../../icons'
import LazyImage from '../ui/LazyImage.vue'
import { useExternalData } from '../../composables/useExternalData'

// Use external data for consistent information
const {
  publicationCount,
  citationCount,
  hIndex,
  repositoryCount,
  experienceYears,
  isLoading: dataLoading
} = useExternalData()

const personalInfo = ref({
  name: "Dr. Vinod Devaraji",
  title: "Senior Scientist II at Schrödinger",
  location: "Bangalore, India",
  email: "vinod.devaraji@schrodinger.com",
  phone: "+91-XXXXXXXXXX",
  linkedin: "https://www.linkedin.com/in/vinod-devaraji",
  github: "https://github.com/donniv86",
  googleScholar: "https://scholar.google.com/citations?user=YOUR_ID",
  orcid: "0000-0002-9355-3995",
  summary: `Dr. Vinod D is a distinguished computational drug discovery scientist with nearly ${experienceYears.value} years of expertise in computer-aided drug discovery (CADD) and therapeutic innovation. Holding a Ph.D. in Biotechnology from Vellore Institute of Technology, his research integrates computational drug design, herbal therapeutics, and formulation studies to identify breakthrough therapeutic strategies. As a recognized thought leader and sought-after speaker across the Asia-Pacific region, he delivers cutting-edge workshops on emerging scientific technologies and their transformative impact on drug discovery challenges. His pioneering research explores the convergence of computational formulation, artificial intelligence (AI), machine learning (ML), and physics-based molecular modeling to accelerate drug discovery pipelines and optimize lead identification processes. With approximately ${publicationCount.value} publications in leading international journals and ${citationCount.value}+ citations (H-index: ${hIndex.value}), he has made significant contributions spanning diverse computational techniques and innovative drug design methodologies. Currently serving as Senior Scientist II at Schrödinger, he provides strategic scientific consultation across the APAC region and collaborates with top-tier academic and industry researchers to drive innovation in computational drug discovery and pharmaceutical development.`,
  expertise: [
    "Computational Drug Discovery",
    "Molecular Modeling & Simulation",
    "Machine Learning in Drug Design",
    "QSAR & Molecular Dynamics",
    "Bioinformatics & Protein Analysis",
    "Python Programming",
    "Automated Workflows",
    "Toxicology Analysis"
  ],
  currentRole: {
    position: "Senior Scientist II",
    company: "Schrödinger",
    location: "Bangalore, India",
    duration: "Current",
    highlights: [
      "Providing strategic scientific consultation across APAC region",
      "Leading computational drug discovery and formulation projects",
      "Delivering cutting-edge workshops on emerging technologies",
      "Collaborating with top-tier academic and industry researchers",
      "Driving innovation in computational drug discovery pipelines"
    ]
  }
})
</script>

<style scoped>
/* Glassmorphism Card */
.glassmorphism-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

/* Glassmorphism Panel */
.glassmorphism-panel {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

/* Glassmorphism Button */
.glassmorphism-btn {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.glassmorphism-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.glassmorphism-btn:hover::before {
  left: 100%;
}

/* Contact Link Styles */
.contact-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}

.contact-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: white;
  flex-shrink: 0;
}

.contact-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

.contact-link:hover .contact-text {
  color: white;
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

/* Floating Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Pulse Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

/* Bounce Animation */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Profile Image Cropping */
.profile-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: all 0.5s ease;
}

/* Alternative positioning options for different image types */
.profile-image-face {
  object-position: center 25%;
}

.profile-image-shoulders {
  object-position: center 15%;
}

.profile-image-full {
  object-position: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .glassmorphism-card {
    border-radius: 16px;
    padding: 1rem;
  }

  .glassmorphism-panel {
    margin-top: 1rem;
  }

  .contact-link {
    padding: 10px 12px;
  }

  .contact-icon {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }

  .contact-text {
    font-size: 13px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .glassmorphism-card,
  .glassmorphism-panel {
    border: 2px solid white;
  }

  .contact-link {
    border: 2px solid white;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-pulse,
  .animate-bounce {
    animation: none;
  }

  .glassmorphism-btn::before {
    display: none;
  }
}

/* Layout and Alignment Improvements */
.personal-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.personal-details h2 {
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.personal-details p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Contact Panel Improvements */
.contact-panel {
  min-width: 280px;
  max-width: 320px;
}

.contact-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}
</style>