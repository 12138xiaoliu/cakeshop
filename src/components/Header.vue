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
            <div><router-link class="my-link" to="/city" tag="span">城市</router-link></div>
        </div>
    </div>
    <div class="search">
        <a-input-search v-model:value="value" placeholder="搜索" loading:false enter-button />
    </div>
</template>
<script setup lang="ts" name="Header">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router';
const value = ref<string>('');
const Router = useRouter()

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
        align-items: center; /* 垂直居中 */
        justify-content: space-between; /* 水平两端对齐 */
        position: fixed; /* 固定到顶部 */
        top: 0; /* 距离顶部 0 */
        left: 0;
        width: 100%;
        height: 60px; /* 调整高度 */
        padding: 0 20px; /* 添加内边距 */
        background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
        border-radius: 10px; /* 圆润风格 */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
        z-index: 1000; /* 确保导航栏在最上层 */
    }

    .nav span {
        font-family: 苍耳字体;
        font-size: 24px; /* 调整字体大小 */
        font-weight: bold; /* 加粗字体 */
    }

    .navFunc {
        display: flex;
        align-items: center; /* 垂直居中 */
        gap: 20px; /* 添加间距 */
        font-family: 苍耳字体;
        font-size: 18px; /* 调整字体大小 */
    }

    .search {
        top: 10px;
        margin: 0 auto; /* 居中对齐 */
        width: 400px; /* 调整宽度 */
        align-content: center;
    }

    .my-link {
        color: #000000; /* 未激活时的颜色，例如深灰色 */
        text-decoration: none; /* 移除默认的下划线 */
    }
</style>