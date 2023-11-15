import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Albo from '../views/Albo.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/albo',
    name: 'albo',
    component: Albo
  },
  {
    path: '/modifica/:index',
    name: 'modifica',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ModifyComponent.vue')
  },
  {
    path: '/toDoList',
    name: 'toDoList',
    component: () => import(/* webpackChunkName: "about" */ '../components/ToDoListComponent.vue')
  },
  {
    path: '/archivia',
    name: 'archivia',
    component: () => import(/* webpackChunkName: "about" */ '../components/CompletedComponent.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
