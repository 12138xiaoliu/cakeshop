// router/index

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const Home = () => import('../view/Home.vue')
const login = () => import('../view/login.vue')
const city = () => import('../components/City.vue')
const register = () => import('../view/register.vue')
const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'default', component: login },
    {
        path: '/home', name: 'Home', component: Home,
    },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    { path: '/city', name: 'city', component: city }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router









