<template>
  <div class="timeline-demo">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Interactive Timeline Demo</h1>
        <p class="text-gray-600">Showcasing interactive timeline components for experience, education, and projects</p>
      </div>

      <!-- Experience Timeline -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Professional Experience</h2>
        <InteractiveTimeline
          :items="experienceItems"
          title="Career Journey"
          description="My professional experience and career milestones"
          variant="detailed"
          :show-filters="true"
          :show-navigation="true"
          :auto-expand="true"
          @item-click="handleItemClick"
          @item-expand="handleItemExpand"
          @filter-change="handleFilterChange"
        />
      </section>

      <!-- Education Timeline -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Education & Certifications</h2>
        <InteractiveTimeline
          :items="educationItems"
          title="Academic Journey"
          description="Educational background and certifications"
          variant="compact"
          :show-filters="true"
          :show-navigation="false"
          @item-click="handleItemClick"
        />
      </section>

      <!-- Project Timeline -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Project Timeline</h2>
        <InteractiveTimeline
          :items="projectItems"
          title="Project Portfolio"
          description="Key projects and achievements"
          variant="default"
          :show-filters="true"
          :show-navigation="true"
          @item-click="handleItemClick"
          @action-click="handleActionClick"
        />
      </section>

      <!-- Timeline Controls -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Timeline Controls</h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium text-gray-700 mb-4">Experience Timeline Controls</h3>
              <div class="space-y-3">
                <button @click="expandAllExperience" class="btn btn-primary">
                  Expand All Experience
                </button>
                <button @click="collapseAllExperience" class="btn btn-outline">
                  Collapse All Experience
                </button>
                <button @click="goToFirstExperience" class="btn btn-outline">
                  Go to First Experience
                </button>
                <button @click="goToLastExperience" class="btn btn-outline">
                  Go to Last Experience
                </button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-700 mb-4">Timeline Variants</h3>
              <div class="space-y-3">
                <button @click="setVariant('default')" class="btn btn-outline">
                  Default Variant
                </button>
                <button @click="setVariant('compact')" class="btn btn-outline">
                  Compact Variant
                </button>
                <button @click="setVariant('detailed')" class="btn btn-outline">
                  Detailed Variant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Log -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Event Log</h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="max-h-64 overflow-y-auto">
            <div v-for="(event, index) in eventLog" :key="index" class="mb-2 p-2 bg-gray-50 rounded">
              <span class="text-sm text-gray-500">{{ event.timestamp }}</span>
              <span class="ml-2">{{ event.message }}</span>
            </div>
          </div>
          <button @click="clearEventLog" class="btn btn-outline mt-4">
            Clear Log
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InteractiveTimeline from '../components/ui/InteractiveTimeline.vue'

// Event log
const eventLog = ref<Array<{ timestamp: string; message: string }>>([])

const addEvent = (message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLog.value.unshift({ timestamp, message })
  if (eventLog.value.length > 50) {
    eventLog.value = eventLog.value.slice(0, 50)
  }
}

const clearEventLog = () => {
  eventLog.value = []
}

// Experience timeline items
const experienceItems = ref([
  {
    id: 'senior-dev',
    title: 'Senior Software Developer',
    subtitle: 'TechCorp Inc.',
    description: 'Led development of enterprise applications using Vue.js, Node.js, and cloud technologies. Mentored junior developers and implemented best practices.',
    date: '2022 - Present',
    category: 'Development',
    tags: ['Vue.js', 'Node.js', 'AWS', 'Leadership'],
    links: [
      {
        text: 'Company Website',
        url: 'https://techcorp.com',
        external: true
      }
    ],
         actions: [
       {
         id: 'view-details',
         text: 'View Details',
         variant: 'primary' as const
       },
       {
         id: 'download-cv',
         text: 'Download CV',
         variant: 'secondary' as const
       }
     ],
    highlight: true
  },
  {
    id: 'full-stack-dev',
    title: 'Full Stack Developer',
    subtitle: 'StartupXYZ',
    description: 'Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality products.',
    date: '2020 - 2022',
    category: 'Development',
    tags: ['React', 'Python', 'PostgreSQL', 'Docker'],
    links: [
      {
        text: 'Project Portfolio',
        url: '/projects',
        external: false
      }
    ]
  },
  {
    id: 'junior-dev',
    title: 'Junior Developer',
    subtitle: 'Digital Solutions Ltd.',
    description: 'Started career as a junior developer, learning various technologies and contributing to team projects.',
    date: '2018 - 2020',
    category: 'Development',
    tags: ['JavaScript', 'HTML', 'CSS', 'Git']
  },
  {
    id: 'internship',
    title: 'Software Engineering Intern',
    subtitle: 'Innovation Labs',
    description: 'Completed internship program focusing on web development and software engineering principles.',
    date: '2017 - 2018',
    category: 'Internship',
    tags: ['Internship', 'Learning', 'Mentorship']
  }
])

// Education timeline items
const educationItems = ref([
  {
    id: 'masters',
    title: 'Master of Computer Science',
    subtitle: 'University of Technology',
    description: 'Specialized in Software Engineering with focus on distributed systems and cloud computing.',
    date: '2016 - 2018',
    category: 'Education',
    tags: ['Computer Science', 'Software Engineering', 'Distributed Systems'],
    highlight: true
  },
  {
    id: 'bachelors',
    title: 'Bachelor of Computer Science',
    subtitle: 'State University',
    description: 'Completed undergraduate studies with honors, focusing on programming and algorithms.',
    date: '2012 - 2016',
    category: 'Education',
    tags: ['Computer Science', 'Programming', 'Algorithms']
  },
  {
    id: 'aws-cert',
    title: 'AWS Certified Solutions Architect',
    subtitle: 'Amazon Web Services',
    description: 'Achieved professional certification in AWS cloud architecture and services.',
    date: '2021',
    category: 'Certification',
    tags: ['AWS', 'Cloud', 'Architecture'],
    links: [
      {
        text: 'Verify Certificate',
        url: 'https://aws.amazon.com/verification',
        external: true
      }
    ]
  },
  {
    id: 'vue-cert',
    title: 'Vue.js Developer Certification',
    subtitle: 'Vue.js Official',
    description: 'Completed official Vue.js certification program covering advanced concepts and best practices.',
    date: '2020',
    category: 'Certification',
    tags: ['Vue.js', 'Frontend', 'JavaScript']
  }
])

// Project timeline items
const projectItems = ref([
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    subtitle: 'Full-stack web application',
    description: 'Built a complete e-commerce platform with Vue.js frontend, Node.js backend, and PostgreSQL database. Features include user authentication, product management, and payment processing.',
    date: '2023',
    category: 'Web Development',
    tags: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    links: [
      {
        text: 'Live Demo',
        url: 'https://demo-ecommerce.com',
        external: true
      },
      {
        text: 'GitHub Repository',
        url: 'https://github.com/username/ecommerce-platform',
        external: true
      }
    ],
         actions: [
       {
         id: 'view-demo',
         text: 'View Demo',
         variant: 'primary' as const
       },
       {
         id: 'view-code',
         text: 'View Code',
         variant: 'secondary' as const
       }
     ],
    highlight: true
  },
  {
    id: 'task-manager',
    title: 'Task Management System',
    subtitle: 'Team collaboration tool',
    description: 'Developed a comprehensive task management system for team collaboration with real-time updates and project tracking.',
    date: '2022',
    category: 'Web Development',
    tags: ['React', 'Socket.io', 'MongoDB', 'Real-time'],
    links: [
      {
        text: 'GitHub Repository',
        url: 'https://github.com/username/task-manager',
        external: true
      }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Fitness Tracking Mobile App',
    subtitle: 'React Native application',
    description: 'Created a mobile fitness tracking application with workout planning, progress tracking, and social features.',
    date: '2021',
    category: 'Mobile Development',
    tags: ['React Native', 'Firebase', 'Health APIs', 'Social Features'],
         actions: [
       {
         id: 'download-app',
         text: 'Download App',
         variant: 'primary' as const
       }
     ]
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization Dashboard',
    subtitle: 'Analytics platform',
    description: 'Built an interactive data visualization dashboard for business analytics with real-time data processing.',
    date: '2020',
    category: 'Data Science',
    tags: ['D3.js', 'Python', 'Pandas', 'Real-time Data'],
    links: [
      {
        text: 'View Dashboard',
        url: '/analytics',
        external: false
      }
    ]
  }
])

// Event handlers
const handleItemClick = (item: any) => {
  addEvent(`Clicked on: ${item.title}`)
}

const handleItemExpand = (item: any) => {
  addEvent(`Expanded: ${item.title}`)
}

const handleFilterChange = (filters: string[]) => {
  addEvent(`Filters changed to: ${filters.join(', ') || 'All'}`)
}

const handleActionClick = (action: any, item: any) => {
  addEvent(`Action "${action.text}" clicked for: ${item.title}`)
}

// Timeline controls
const expandAllExperience = () => {
  addEvent('Expanded all experience items')
}

const collapseAllExperience = () => {
  addEvent('Collapsed all experience items')
}

const goToFirstExperience = () => {
  addEvent('Navigated to first experience item')
}

const goToLastExperience = () => {
  addEvent('Navigated to last experience item')
}

const setVariant = (variant: string) => {
  addEvent(`Timeline variant changed to: ${variant}`)
}

// Lifecycle
onMounted(() => {
  addEvent('Timeline demo page loaded')
})
</script>

<style scoped>
.timeline-demo {
  min-height: 100vh;
  background: #f9fafb;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-outline {
  background-color: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-outline:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}
</style>