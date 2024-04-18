// Composables
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'



// const routes = [
//   {
//     path: '/',
//     component: () => import('@/layouts/default/Default.vue'),
//     children: [
//       {
//         path: '',
//         name: 'Menu',
//         // route level code-splitting
//         // this generates a separate chunk (about.[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () => import(/* webpackChunkName: "home" */ '@/views/Menu.vue'),
//       },
//     ],
//   },
//   {
//     path: '/directo',
//     component: () => import('@/layouts/default/Default.vue'),
//     children: [
//       {
//         path: '',
//         name: 'Home',
//         // route level code-splitting
//         // this generates a separate chunk (about.[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
//       },
//     ],
//   },
// ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu
    },
    {
      path: '/directo',
      name: 'directo',
      component: Home
    },

  ]
})

export default router
