<template>
  <transition name="fade">
    <div 
      v-if="isVisible"
      class="back-to-top"
      @click="handleClick"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="arrow-icon">
        <path d="M12 4l-8 8h5v8h6v-8h5z"/>
      </svg>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'BackToTop',
  emits: ['click'],
  setup(props, { emit }) {
    const isVisible = ref(false);

    const checkScroll = () => {
      isVisible.value = window.scrollY > 300;
    };

    const handleClick = () => {
      emit('click');
    };

    onMounted(() => {
      window.addEventListener('scroll', checkScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', checkScroll);
    });

    return {
      isVisible,
      handleClick
    };
  }
});
</script>

<style scoped>
/* 保持之前的样式不变 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 999;
}
/* 其他样式保持不变... */
</style>