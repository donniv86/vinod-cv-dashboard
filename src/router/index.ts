import { createRouter, createWebHistory } from 'vue-router'
import CVDashboard from '../views/CVDashboard.vue'
import About from '../views/About.vue'
import Publications from '../views/Publications.vue'
import Certifications from '../views/Certifications.vue'
import GitHubProjects from '../views/GitHubProjects.vue'
import ProgressDemo from '../views/ProgressDemo.vue'
import TimelineDemo from '../views/TimelineDemo.vue'
import SkeletonDemo from '../views/SkeletonDemo.vue'
import FourZeroFour from '../views/Errors/FourZeroFour.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: CVDashboard,
      meta: {
        title: 'CV Dashboard',
        transition: 'slide-left',
        breadcrumb: 'Dashboard'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: 'About',
        transition: 'slide-left',
        breadcrumb: 'About'
      }
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications,
      meta: {
        title: 'Publications',
        transition: 'slide-left',
        breadcrumb: 'Publications'
      }
    },
    {
      path: '/certifications',
      name: 'certifications',
      component: Certifications,
      meta: {
        title: 'Certifications',
        transition: 'slide-left',
        breadcrumb: 'Certifications'
      }
    },
    {
      path: '/github-projects',
      name: 'github-projects',
      component: GitHubProjects,
      meta: {
        title: 'GitHub Projects',
        transition: 'slide-left',
        breadcrumb: 'GitHub Projects'
      }
    },
    {
      path: '/progress-demo',
      name: 'progress-demo',
      component: ProgressDemo,
      meta: {
        title: 'Progress Demo',
        transition: 'slide-left',
        breadcrumb: 'Progress Demo'
      }
    },
    {
      path: '/timeline-demo',
      name: 'timeline-demo',
      component: TimelineDemo,
      meta: {
        title: 'Timeline Demo',
        transition: 'slide-left',
        breadcrumb: 'Timeline Demo'
      }
    },
    {
      path: '/skeleton-demo',
      name: 'skeleton-demo',
      component: SkeletonDemo,
      meta: {
        title: 'Skeleton Loading Demo',
        transition: 'slide-left',
        breadcrumb: 'Skeleton Demo'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: FourZeroFour,
      meta: {
        title: '404 - Not Found',
        transition: 'fade',
        breadcrumb: 'Not Found'
      }
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Dr. Vinod Devaraji - CV Dashboard`
  next()
})
