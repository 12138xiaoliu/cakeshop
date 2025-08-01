<template>
  <div id="app">
    <RouterView />
  </div>
  
</template>
<script setup lang="ts">

import { RouterView, } from 'vue-router';

</script>

<style>
body {
  /* 在 App.vue 或全局样式中添加 */
  background-color: transparent !important;
  position: relative;
  overflow-x: hidden;
}
body::before, body::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  z-index: 0;
}
body::before {
  width: 400px;
  height: 400px;
  left: -120px;
  top: -120px;
  background: radial-gradient(circle, #f7cac9 60%, transparent 100%);
}
body::after {
  width: 300px;
  height: 300px;
  right: -100px;
  bottom: -100px;
  background: radial-gradient(circle, #b5ead7 60%, transparent 100%);
}
body::backdrop {
  content: '';
  position: absolute;
  left: 10vw;
  top: 60vh;
  width: 220px;
  height: 220px;
  background: url('./static/logo/logo.png') no-repeat center/contain;
  opacity: 0.08;
  z-index: 0;
  pointer-events: none;
}
body::cakeimg1 {
  content: '';
  position: absolute;
  right: 8vw;
  top: 18vh;
  width: 180px;
  height: 180px;
  background: url('./static/Swiperimg/2.jpg') no-repeat center/cover;
  opacity: 0.07;
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
}
body::cakeimg2 {
  content: '';
  position: absolute;
  left: 5vw;
  bottom: 10vh;
  width: 160px;
  height: 160px;
  background: url('./static/Swiperimg/4.jpg') no-repeat center/cover;
  opacity: 0.06;
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
}
/* 添加弹窗的全局遮罩样式 */
.ant-modal-mask {
  background-color: rgba(0, 0, 0, 0.45);
}

/* 弹窗标题样式 */
.ant-modal-title {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

/* 在 App.vue 的全局样式中 */
.ant-modal {
  top: 20vh !important;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}
</style>
