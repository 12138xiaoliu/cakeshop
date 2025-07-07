<template>
    <div class="nav">
        <Header></Header>
        <Search></Search> 
        <HomeSwiper></HomeSwiper>
        <goodList></goodList>
        <BackToTop @click="scrollToTop"></BackToTop>
    </div>
</template>
<script lang="ts" setup name="Home">
import { onMounted ,ref} from 'vue'
import goodList from '../components/goodList.vue';
import Header from '../components/Header.vue';
import HomeSwiper from '../components/HomeSwiper.vue';
import BackToTop from './BackToTop.vue';
import Search from '@/components/Search.vue';
// 滚动到顶部的函数
const scrollToTop = () => {
    console.log("@@@");
    // 滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
onMounted(() => {
    console.log("进入首页");
})
</script>
<style >
</style>