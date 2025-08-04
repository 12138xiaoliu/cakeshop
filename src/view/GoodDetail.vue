<template>
  <div class="product-detail-container">
    <div class="product-detail-content">
      <!-- 商品图片 -->
      <div class="product-gallery">
        <div class="main-image">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="thumbnail-list">
          <div 
            v-for="(img, index) in product.images" 
            :key="index" 
            class="thumbnail"
            :class="{ active: activeImageIndex === index }"
            @click="activeImageIndex = index"
          >
            <img :src="img" :alt="'商品图' + (index + 1)">
          </div>
        </div>
      </div>
      
      <!-- 商品信息 -->
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <div class="product-meta">
          <div class="product-price">¥{{ product.price }}</div>
          <div class="product-sales">已售 {{ product.sales }} 件</div>
          <div class="product-rating">
            <a-rate :value="product.rating" allow-half disabled />
            <span>({{ product.reviews }}条评价)</span>
          </div>
        </div>
        
        <div class="product-specs">
          <h3>规格</h3>
          <div class="spec-options">
            <a-radio-group v-model:value="selectedSize">
              <a-radio-button v-for="size in product.sizes" :key="size" :value="size">
                {{ size }}
              </a-radio-button>
            </a-radio-group>
          </div>
        </div>
        
        <div class="product-quantity">
          <h3>数量</h3>
          <a-input-number v-model:value="quantity" :min="1" :max="10" />
        </div>
        
        <div class="product-actions">
          <a-button type="primary" size="large" @click="addToCart">
            <template #icon><ShoppingCartOutlined /></template>
            加入购物车
          </a-button>
          <a-button size="large" @click="goBack">
            <template #icon><ArrowLeftOutlined /></template>
            返回列表
          </a-button>
        </div>
      </div>
    </div>
    
    <!-- 商品描述 -->
    <div class="product-description">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="商品详情">
          <div class="description-content" v-html="product.description"></div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="用户评价">
          <div class="reviews">
            <div v-for="review in product.reviewsList" :key="review.id" class="review-item">
              <div class="review-header">
                <a-avatar :src="review.avatar" />
                <div class="review-user">
                  <div class="username">{{ review.username }}</div>
                  <div class="date">{{ review.date }}</div>
                </div>
                <div class="review-rating">
                  <a-rate :value="review.rating" disabled allow-half />
                </div>
              </div>
              <div class="review-content">
                {{ review.content }}
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    
    <!-- 相关商品推荐 -->
    <div class="related-products">
      <h2>推荐商品</h2>
      <div class="related-list">
        <div 
          v-for="related in relatedProducts" 
          :key="related.id" 
          class="related-item"
          @click="goToDetail(related.id)"
        >
          <img :src="related.image" :alt="related.name">
          <div class="related-info">
            <div class="name">{{ related.name }}</div>
            <div class="price">¥{{ related.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  ShoppingCartOutlined, 
  ArrowLeftOutlined 
} from '@ant-design/icons-vue';

// 获取路由参数
const route = useRoute();
const router = useRouter();
const productId = ref(route.params.id as string);

// 商品数据
const product = ref({
  id: '1',
  name: '草莓奶油蛋糕',
  price: 198,
  description: '<p>精选新鲜草莓与顶级动物奶油完美结合，口感绵密香甜。蛋糕胚采用日式戚风工艺，柔软湿润，入口即化。</p><p>配料：鲜草莓、动物奶油、面粉、鸡蛋、白砂糖</p><p>规格：6英寸（适合2-4人食用）</p><p>保存条件：冷藏保存，建议24小时内食用</p>',
  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80',
  images: [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80',
    'https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1092&q=80',
    'https://images.unsplash.com/photo-1611293388250-580b08c4a145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
  ],
  sales: 128,
  rating: 4.5,
  reviews: 36,
  sizes: ['6英寸', '8英寸', '10英寸'],
  reviewsList: [
    {
      id: 1,
      username: '甜蜜蜜',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      date: '2023-05-15',
      rating: 5,
      content: '蛋糕非常好吃，草莓新鲜，奶油不腻，家人都很喜欢！'
    },
    {
      id: 2,
      username: '美食达人',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2023-05-10',
      rating: 4,
      content: '味道不错，就是配送时间比预期晚了一点，但蛋糕品质很好。'
    }
  ]
});

// 相关商品数据
const relatedProducts = ref([
  {
    id: '2',
    name: '巧克力慕斯蛋糕',
    price: 228,
    image: 'https://images.unsplash.com/photo-1603532648955-a039f2e364da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    id: '3',
    name: '芒果千层蛋糕',
    price: 168,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80'
  },
  {
    id: '4',
    name: '提拉米苏',
    price: 158,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    id: '5',
    name: '红丝绒蛋糕',
    price: 198,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  }
]);

// 状态管理
const activeImageIndex = ref(0);
const selectedSize = ref(product.value.sizes[0]);
const quantity = ref(1);

// 模拟API加载
onMounted(() => {
  // 这里可以添加API请求，根据productId获取商品详情
  console.log(`加载商品ID: ${productId.value} 的详情`);
});

// 添加到购物车
const addToCart = () => {
  console.log(`添加到购物车: ${product.value.name}, 规格: ${selectedSize.value}, 数量: ${quantity.value}`);
  // 这里可以添加购物车逻辑
};

// 返回商品列表
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.product-detail-content {
  display: flex;
  margin-bottom: 40px;
  gap: 40px;
}

.product-gallery {
  flex: 1;
}

.main-image {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.thumbnail-list {
  display: flex;
  gap: 10px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s;
}

.thumbnail:hover, .thumbnail.active {
  opacity: 1;
  border-color: #ff6700;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
}

.product-meta {
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.product-price {
  font-size: 28px;
  color: #e63946;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-sales, .product-rating {
  color: #666;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.product-rating span {
  margin-left: 10px;
}

.product-specs, .product-quantity {
  margin: 25px 0;
}

.product-specs h3, .product-quantity h3 {
  margin-bottom: 15px;
  font-size: 18px;
}

.spec-options {
  margin-top: 10px;
}

.product-actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
}

.product-description {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}

.description-content {
  padding: 20px;
  line-height: 1.8;
  color: #555;
}

.reviews {
  padding: 20px;
}

.review-item {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.review-user {
  margin-left: 15px;
  flex-grow: 1;
}

.username {
  font-weight: bold;
}

.date {
  color: #999;
  font-size: 12px;
}

.review-content {
  color: #333;
  line-height: 1.6;
}

.related-products {
  margin-top: 40px;
}

.related-products h2 {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.related-products h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #ff6700;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.related-item {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.related-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.related-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.related-info {
  padding: 15px;
  text-align: center;
}

.related-info .name {
  font-weight: bold;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.related-info .price {
  color: #e63946;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .product-detail-content {
    flex-direction: column;
  }
  
  .related-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .related-list {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .product-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .related-list {
    grid-template-columns: 1fr;
  }
  
  .thumbnail-list {
    flex-wrap: wrap;
  }
}
</style>