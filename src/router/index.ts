// router/index

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const Home = () => import('../view/Home.vue')
const login = () => import('../view/login.vue')
const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: Home },
    {
        path: '/home', name: 'Home', component: Home,
    },
    { path: '/login', name: 'login', component: login },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router









