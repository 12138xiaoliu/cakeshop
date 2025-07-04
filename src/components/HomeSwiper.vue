<template>
  <div class="carousel-container">
    <a-carousel 
      autoplay
      :dots="true"
      :autoplaySpeed="3000"
      ref="carouselRef"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <div 
        v-for="(img, index) in images" 
        :key="index"
        class="slide-item"
        @click="handleImageClick(index)"
      >
        <img :src="getImageUrl(img)" :alt="'Slide ' + (index + 1)">
        <div class="hover-overlay">
          <span class="go-to-text">GO TO!</span>
        </div>
      </div>
      <template #customPaging="props">
        <div class="custom-dot" :class="{ 'active': props.current === props.i }"></div>
      </template>
    </a-carousel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CarouselProps } from 'ant-design-vue';

const autoplay = ref(true);
const carouselRef = ref<CarouselProps | null>(null);

// 使用正确的图片路径
const images = [
  'Swiperimg/1.jpg',
  'Swiperimg/2.jpg',
  'Swiperimg/3.jpg',
  'Swiperimg/4.jpg'
];

// 动态获取图片URL（适用于Vite）
const getImageUrl = (path: string) => {
  // Vite环境使用
  return new URL(`../static/${path}`, import.meta.url).href;
  
  // 非Vite环境使用（如Vue CLI）：
  // return require(`@/static/${path}`);
};

const handleImageClick = (index: number) => {
  console.log('点击了图片:', index + 1);
  // 这里可以添加点击事件逻辑
};
</script>

<style scoped>
.carousel-container {
  margin: 50px auto;
  width: 1200px;
  position: relative;
}

/* 弧形边框效果 */
:deep(.ant-carousel) {
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(248, 224, 239, 0.897);
  /* 景深效果 */
  transform: perspective(600px) rotateX(1deg);
}

.slide-item {
  position: relative;
  width: 100%;
  height: 400px;
  cursor: pointer;
  overflow: hidden;
}

.slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

/* 悬停效果 */
.hover-overlay {
  position: absolute;
  top: 20%;
  left: 90%;
  border-radius: 8px;
  background: rgba(199, 226, 252, 0.918);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  padding: 10px 20px;
  transform: translate(-50%, -50%);
}

.slide-item:hover .hover-overlay {
  opacity: 1;
}

.slide-item:hover img {
  transform: scale(1.05);
  filter: brightness(0.9);
}

/* 艺术字体样式 */
.go-to-text {
  font-family: 'Arial', sans-serif;
  font-size: 2rem;
  font-weight: 100;
  color: rgb(248, 163, 113);
  letter-spacing: 2px;
  transform: rotate(-5deg);
  opacity: 0.9;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: rotate(-5deg) scale(1); }
  50% { transform: rotate(-5deg) scale(1.1); }
  100% { transform: rotate(-5deg) scale(1); }
}

/* 自定义原点导航 */
:deep(.slick-dots) {
  bottom: -30px;
}

:deep(.slick-dots li) {
  margin: 0 5px;
}

.custom-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  border: 2px solid #ccc;
  opacity: 0.7;
  transition: all 0.3s;
  cursor: pointer;
}

.custom-dot.active {
  background: #ff6700;
  border-color: #ff6700;
  opacity: 1;
  transform: scale(1.2);
}

/* 响应式设计 */
@media (max-width: 1250px) {
  .carousel-container {
    width: 95%;
    max-width: 1000px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    margin: 30px auto;
    width: 95%;
  }
  
  .slide-item {
    height: 300px;
  }
  
  .hover-overlay {
    top: 50%;
    left: 50%;
    width: 80%;
    text-align: center;
  }
  
  .go-to-text {
    font-size: 1.5rem;
  }
}
</style>