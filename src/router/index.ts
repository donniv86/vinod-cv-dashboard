import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/cv'
    },
    {
      path: '/cv',
      name: 'CV Dashboard',
      component: () => import('../views/CVDashboard.vue'),
      meta: {
        title: 'CV Dashboard',
      },
    },
    {
      path: '/publications',
      name: 'Publications',
      component: () => import('../views/Publications.vue'),
      meta: {
        title: 'Research Publications',
      },
    },
    {
      path: '/github-projects',
      name: 'GitHub Projects',
      component: () => import('../views/GitHubProjects.vue'),
      meta: {
        title: 'GitHub Projects & Technical Skills',
      },
    },
    {
      path: '/certifications',
      name: 'Certifications',
      component: () => import('../views/Certifications.vue'),
      meta: {
        title: 'Certifications & Online Courses',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
      meta: {
        title: 'About Me',
      },
    },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Dr. Vinod Devaraji - CV Dashboard`
  next()
})
