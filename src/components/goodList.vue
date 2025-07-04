<template>
  <div class="product-container">
    <span></span>
    <div class="product-grid">
      <div 
        v-for="(product, index) in visibleProducts" 
        :key="product.id || index"
        class="product-item"
      >
        <img 
          :src="product.image" 
          :alt="product.name"
          class="product-image"
          loading="lazy"
        >
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">¥{{ product.price }}</p>
        </div>
      </div>
      <div 
        v-if="loading"
        class="loading-indicator"
      >
        加载中...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick } from 'vue';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default defineComponent({
  name: 'ProductDisplay',
  props: {
    initialProducts: {
      type: Array as () => Product[],
      default: () => []
    }
  },
  setup(props) {
    const visibleProducts = ref<Product[]>([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = 6;
    const allProducts = ref<Product[]>([]);
    const resizeObserver = ref<ResizeObserver | null>(null);
    const containerWidth = ref(0);
    const debounceTimer = ref<number | null>(null);

    // 模拟API获取商品数据
    const fetchProducts = async (page: number): Promise<Product[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const newProducts: Product[] = Array.from({ length: itemsPerPage }, (_, i) => ({
            id: `prod-${page}-${i}`,
            name: `商品 ${page * itemsPerPage + i}`,
            price: Math.floor(Math.random() * 1000) + 100,
            image: `https://picsum.photos/200/200?random=${page * itemsPerPage + i}`
          }));
          resolve(newProducts);
        }, 800);
      });
    };

    // 防抖函数
    const debounce = (fn: Function, delay: number) => {
      return (...args: any[]) => {
        if (debounceTimer.value) {
          clearTimeout(debounceTimer.value);
        }
        debounceTimer.value = window.setTimeout(() => {
          fn(...args);
        }, delay);
      };
    };

    // 加载更多商品
    const loadMoreProducts = async () => {
      if (loading.value) return;
      
      loading.value = true;
      try {
        const newProducts = await fetchProducts(currentPage.value);
        allProducts.value = [...allProducts.value, ...newProducts];
        visibleProducts.value = allProducts.value;
        currentPage.value++;
      } finally {
        loading.value = false;
      }
    };

    // 检查是否需要加载更多
    const checkLoadMore = debounce(() => {
      const container = document.querySelector('.product-container');
      if (!container) return;

      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
      // 当滚动到接近底部时加载更多
      if (scrollHeight - (clientHeight + scrollTop) < 100 && !loading.value) {
        loadMoreProducts();
      }
    }, 200);

    // 初始化
    const init = async () => {
      if (props.initialProducts.length > 0) {
        allProducts.value = [...props.initialProducts];
        visibleProducts.value = allProducts.value;
      } else {
        await loadMoreProducts();
      }
      setupResizeObserver();
    };

    // 设置ResizeObserver监听容器宽度变化
    const setupResizeObserver = () => {
      nextTick(() => {
        const container = document.querySelector('.product-container');
        if (container && 'ResizeObserver' in window) {
          resizeObserver.value = new ResizeObserver(entries => {
            for (let entry of entries) {
              containerWidth.value = entry.contentRect.width;
            }
          });
          resizeObserver.value.observe(container);
        }
      });
    };

    onMounted(() => {
      init();
      window.addEventListener('scroll', checkLoadMore);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', checkLoadMore);
      if (resizeObserver.value) {
        resizeObserver.value.disconnect();
      }
      if (debounceTimer.value) {
        clearTimeout(debounceTimer.value);
      }
    });

    return {
      visibleProducts,
      loading
    };
  }
});
</script>

<style scoped>
.product-container {
  width: 100%;
  background-color: transparent;
  padding: 20px 0;
  margin-top: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  padding: 0 15px;
}

.product-item {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-info {
  padding: 10px;
}

.product-name {
  font-size: 14px;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 16px;
  color: #ff6700;
  font-weight: bold;
  margin: 0;
}

.loading-indicator {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
  padding: 20px 0;
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>