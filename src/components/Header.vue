<template>
    <div class="nav">
        <span>好利来蛋糕</span>
        <div class="navFunc">
            <div>首页</div>
            <div>产品</div>
            <div>蛋糕系列</div>
            <div>零售糕点</div>
            <div>购物车</div>
            <router-link class="my-link" to="/login" tag="button">
                <div>登录注册</div>
            </router-link>
            <div>
                <!-- 添加城市显示 -->
                <span class="my-link" @click="openCityModal">
                  <environment-outlined style="margin-right: 5px;" />
                  {{ currentCity }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="Header">
import { ref ,onMounted} from 'vue'
import { RouterLink, useRouter } from 'vue-router';
import {useHaderStore} from '@/store/HeaderStore'
const HaderStroreData=useHaderStore()
// 当前城市状态
const currentCity = ref('城市')
// 打开城市选择弹窗的方法
const openCityModal = () => {
    const event = new CustomEvent('open-city-modal', { detail: true })
    window.dispatchEvent(event)
}

// 监听城市更新事件
onMounted(() => {
  // 从本地存储获取上次选择的城市
  const savedCity = localStorage.getItem('currentCity');
  if (savedCity) {
    currentCity.value = savedCity;
  }
  
  window.addEventListener('update-city', (e: any) => {
    currentCity.value = e.detail;
    // 保存到本地存储
    localStorage.setItem('currentCity', e.detail);
  })
})

const value = ref<string>('');
const Router = useRouter()
onMounted(()=>{
    console.log("@@@");
    console.log(HaderStroreData);   
})
</script>

<style scoped>
    @font-face {
        font-family: "苍耳字体";
        src: url("../static/font/仓耳舒圆体W03.ttf");
        font-weight: normal;
        font-style: normal;
    }

    .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        padding: 0 20px;
        background-color: rgba(255, 255, 255, 0.95); /* 增加不透明度 */
        border-radius: 0 0 10px 10px; /* 只圆角底部 */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* 增强阴影 */
        z-index: 1000;
        /* 添加底部间距 */
        margin-bottom: 20px; /* 新增：增加与搜索栏的间距 */
    }

    .nav span {
        font-family: 苍耳字体;
        font-size: 26px; /* 增大字体 */
        font-weight: bold;
        color: #333; /* 添加品牌色 */
    }

    .navFunc {
        display: flex;
        align-items: center;
        gap: 25px; /* 增大间距 */
        font-family: 苍耳字体;
        font-size: 18px;
    }

    .navFunc > div {
        padding: 5px 10px;
        border-radius: 5px;
        transition: all 0.3s ease;
    }

    .navFunc > div:hover {
        background-color: rgba(245, 87, 39, 0.1);
        transform: translateY(-2px);
        cursor: pointer;
    }

    .my-link {
        color: #333;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .my-link:hover {
        color: #568bff; /* 使用品牌色 */
    }
</style>