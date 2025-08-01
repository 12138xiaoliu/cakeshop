// router/index

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const Home = () => import('../view/Home.vue')
const login = () => import('../view/login.vue')
const register = () => import('../view/register.vue')
//路由规则
const routes: Array<RouteRecordRaw> = [
    {path:'/',redirect:'/login'},
    {path: '/', name: 'default', component: login },
    {path: '/home', name: 'Home', component: Home,},
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
]
//路由模式
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router









