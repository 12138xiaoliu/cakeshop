<template>
    <div class="nav">
        <span>好利来蛋糕</span>
        <div class="navFunc">
            <div>首页</div>
            <div>产品</div>
            <div>蛋糕系列</div>
            <div>零售糕点</div>
            <div>购物车</div>
            <router-link to="/login">
                <div>登录注册</div>
            </router-link>
            <div>城市</div>
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
    height: 50px;
    width: 100%;
    margin-left: 20%;
    background-color: transparent;
}

.nav span {
    margin-bottom: 10px;
    margin-left: 30px;
    font-family: 苍耳字体;
    font-size: 20px;
}

.navFunc {
    width: 800px;
    margin-left: 30px;
    font-family: 苍耳字体;
    font-size: 30px;
    display: flex;
    justify-content: space-between;
}

.search {
    display: block;
    margin: 10px;
    margin-left: 30%;
    width: 400px;
    align-content: center;
}

/* 设置默认的 router-link 链接颜色 */
.router-link {
    color: #b44141;
    /* 未激活时的颜色，例如深灰色 */
    text-decoration: none;
    /* 移除默认的下划线 */
}
</style>