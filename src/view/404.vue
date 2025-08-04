<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <p>网页不见了...</p>
      <p>您访问的页面可能已被移除或暂时不可用</p>
      <a-button type="primary" @click="goHome">返回首页</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style lang="css" scoped>
@font-face {
  font-family: "苍耳字体";
  src: url("../static/font/仓耳舒圆体W03.ttf");
  font-weight: normal;
  font-style: normal;
} 

/* 禁用整个页面的滚动条 */
body, html {
  overflow: hidden !important;
  height: 100%;
  margin: 0;
  padding: 0;
}

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 使用视口高度 */
  width: 100vw; /* 使用视口宽度 */
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden; /* 确保容器内无滚动 */
}

.not-found-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  animation: fadeIn 0.8s ease-out;
}

h1 {
  font-size: 120px;
  font-weight: 800;
  margin: 0;
  color: #ff6b6b;
  line-height: 1;
  font-family: "苍耳字体", sans-serif;
  text-shadow: 5px 5px 0 rgba(255, 107, 107, 0.2);
}

p {
  font-family: "苍耳字体", sans-serif;
  font-size: 28px;
  color: #333;
  margin: 20px 0;
}

p:first-of-type {
  font-size: 32px;
  font-weight: bold;
  margin-top: 30px;
}

a-button {
  margin-top: 30px;
  font-family: "苍耳字体", sans-serif;
  font-size: 18px;
  height: 50px;
  padding: 0 40px;
  border-radius: 25px;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  h1 {
    font-size: 80px;
  }
  
  p {
    font-size: 22px;
  }
  
  p:first-of-type {
    font-size: 26px;
  }
  
  .not-found-content {
    padding: 30px 20px;
    width: 85%;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 60px;
  }
  
  p {
    font-size: 18px;
  }
  
  p:first-of-type {
    font-size: 22px;
  }
  
  .not-found-content {
    padding: 20px 15px;
  }
}
</style>