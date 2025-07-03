<template>
    <div class="nav">
        <Header></Header>
        <HomeSwiper></HomeSwiper>
        <goodList></goodList>
        <BackToTop></BackToTop>
    </div>
</template>
<script lang="ts" setup name="Home">
import { onMounted } from 'vue'
import goodList from './goodList.vue';
import Header from '../components/Header.vue';
import HomeSwiper from '../components/HomeSwiper.vue';
import BackToTop from './BackToTop.vue';
onMounted(() => {
    console.log("进入首页");
})
</script>
<style ></style>