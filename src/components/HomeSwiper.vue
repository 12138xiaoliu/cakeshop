<template>
  <a-carousel autoplay>
    <div><h3><img src="../static/Swiperimg/1.jpg"></h3></div>
    <div><h3><img src="../static/Swiperimg/2.jpg"></h3></div>
    <div><h3><img src="../static/Swiperimg/3.jpg"></h3></div>
    <div><h3><img src="../static/Swiperimg/4.jpg"></h3></div>
  </a-carousel>
</template>

<style scoped>
/* For demo */ 
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 400px;
  background: #d7a9a9;
  overflow: hidden;
  border-radius: 5px;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #000000;
} 

.ant-carousel img{
    width: 100%;
    height: 100%;
}
</style>
