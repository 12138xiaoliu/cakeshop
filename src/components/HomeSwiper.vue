<template>
  <a-carousel autoplay>
    <div><img src="../static/Swiperimg/1.jpg"></div>
    <div><img src="../static/Swiperimg/2.jpg"></div>
    <div><img src="../static/Swiperimg/3.jpg"></div>
    <div><img src="../static/Swiperimg/4.jpg"></div>
  </a-carousel>
</template>
<script lang="ts" setup>


</script>
<style scoped>
  /* For demo */ 
  .ant-carousel{
    margin: 5px auto;
    width: 800px;
    height: 400px;
    border-radius: 20px;
  }

  .ant-carousel :deep(.slick-slide) {
    width: 200px;
    height: 400px;
    background: #d3f6d5;
    overflow:hidden;
    border-radius: 20px;
  }

  .ant-carousel :deep(.slick-slide div) {
    border-radius: 20px;
    color: #0a0a0a;
  } 

  .ant-carousel img{
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: cover;
  }
</style>
