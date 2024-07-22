<template>
    <div class="nav">
        <Header></Header>
        <HomeSwiper></HomeSwiper>
    </div>
</template>
<script lang="ts" setup name="Home">
import { onMounted } from 'vue'
import Header from '../components/Header.vue';
import HomeSwiper from '../components/HomeSwiper.vue';
onMounted(() => {
    console.log("进入首页");
})
</script>
<style ></style>