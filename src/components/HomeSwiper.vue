<template>
  <div class="carousel-container">
    <a-carousel 
      autoplay
      :dots=true
      :autoplaySpeed="3000"
      ref="carouselRef"
      @mouseenter="() => autoplay = false"
      @mouseleave="() => autoplay = true"
    >
      <div 
        v-for="(img, index) in images" 
        :key="index"
        class="slide-item"
        @click="handleImageClick(index)"
      >
        <img :src=img :alt="'Slide ' + (index + 1)">
        <!-- <div class="hover-overlay">
          <span class="go-to-text">GO TO!</span>
        </div> -->
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

const images = [
  '../static/Swiperimg/1.jpg',
  '../static/Swiperimg/2.jpg',
  '../static/Swiperimg/3.jpg',
  '../static/Swiperimg/4.jpg'
];

// const customDots: CarouselProps['dots'] = {
//   className: 'custom-dots-container'
// };

const handleImageClick = (index: number) => {
  console.log('点击了图片:', index + 1);
  // 这里可以添加点击事件逻辑
};
</script>

<style scoped>
.carousel-container {
  margin: 50px auto;
  width: 800px;
  position: relative;
}

/* 弧形边框效果 */
:deep(.ant-carousel) {
  border-radius: 50% 50% 20px 20px / 30% 30% 20px 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: perspective(500px) rotateX(1deg);
}

.slide-item {
  position: relative;
  width: 100%;
  height: 400px;
  cursor: pointer;
}

.slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* 悬停效果 */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.slide-item:hover .hover-overlay {
  opacity: 1;
}

.slide-item:hover img {
  transform: scale(1.05);
}

/* 艺术字体样式 */
.go-to-text {
  font-family: 'Arial', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
:deep(.custom-dots-container) {
  bottom: -30px;
}

:deep(.custom-dots-container li) {
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
  background: #1890ff;
  border-color: #1890ff;
  opacity: 1;
  transform: scale(1.2);
}
</style>