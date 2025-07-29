import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import {createPinia} from 'pinia'
//创建pinia
const pinia=createPinia();
const app = createApp(App)
//安装插件
app.use(pinia)
app.use(router)
app.use(Antd)
app.mount('#app')
