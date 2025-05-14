<template>
  <a-carousel autoplay dots="false">
    <div><img src="../static/Swiperimg/1.jpg"></div>
    <div><img src="../static/Swiperimg/2.jpg"></div>
    <div><img src="../static/Swiperimg/3.jpg"></div>
    <div><img src="../static/Swiperimg/4.jpg"></div>
  </a-carousel>
</template>
<script lang="ts" setup>


</script>
<style scoped>
  .ant-carousel {
    margin: 50px auto; /* 调整上下间距，居中显示 */
    width: 800px;
    height: 400px;
    border-radius: 20px; /* 圆角效果 */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
    overflow: hidden; /* 确保内容不溢出 */
  }

  .ant-carousel :deep(.slick-slide) {
    width: 100%; /* 确保滑块宽度适配容器 */
    height: 400px;
    background: #f5f5f5; /* 更柔和的背景色 */
    overflow: hidden;
    border-radius: 20px; /* 圆角效果 */
  }

  .ant-carousel :deep(.slick-slide div) {
    border-radius: 20px;
    background-color: #ffffff; /* 白色背景 */
  }

  .ant-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 确保图片自适应容器 */
    border-radius: 20px; /* 圆角效果 */
  }
</style>
