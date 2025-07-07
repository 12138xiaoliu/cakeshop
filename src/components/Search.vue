<template>
  <div class="search-section">
    <div class="search-container">
      <a-input-search
        v-model:value="searchQuery"
        placeholder="搜索蛋糕、糕点、新品..."
        enter-button="搜索"
        size="large"
        @search="handleSearch"
        class="search-input"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref('');

const handleSearch = (value: string) => {
  console.log('搜索内容:', value);
};
</script>

<style scoped>
/* 新增：搜索区域容器 */
.search-section {
  padding-top: 80px; /* 增加与Header的间距 */
  padding-bottom: 30px;
  /* background: linear-gradient(to bottom, #fff, #0f0f0f); 渐变背景 */
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 80%;
  max-width: 700px;
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.15); /* 使用品牌色阴影 */
  border-radius: 30px;
  overflow: hidden;
}

/* 输入框样式 - 匹配品牌色 */
.search-input :deep(.ant-input) {
  height: 46px;
  border-radius: 30px 0 0 30px;
  border: 1px solid #f0d6d9;
  padding-left: 24px;
  font-size: 16px;
  font-family: "苍耳字体", sans-serif;
}

.search-input :deep(.ant-input):focus {
  border-color: #e63946;
  box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2);
}

/* 搜索按钮样式 - 匹配品牌色 */
.search-input :deep(.ant-input-search-button) {
  height: 46px;
  border-radius: 0 30px 30px 0;
  background-color: #e63946;
  border-color: #e63946;
  font-size: 16px;
  font-weight: 500;
  font-family: "苍耳字体", sans-serif;
}

.search-input :deep(.ant-input-search-button:hover) {
  background-color: #ff6b7c;
  border-color: #ff6b7c;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .search-section {
    padding-top: 70px;
    padding-bottom: 20px;
  }
  
  .search-input {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .search-section {
    padding-top: 60px;
  }
  
  .search-input {
    width: 95%;
  }
}
</style>