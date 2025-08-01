<template>
  <a-modal
    v-model:visible="visible"
    title="选择城市"
    :width="600"
    :footer="null"
    :maskClosable="true"
    :keyboard="true"
    centered
  >
    <div class="city-modal">
      <a-cascader 
        v-model:value="selectedKeys"
        :options="options"
        placeholder="请选择省份/城市"
        style="width: 100%;"
        :field-names="{ label: 'name', value: 'code', children: 'children' }"
        @change="handleCityChange"
        expand-trigger="hover"
        change-on-select
      >
        <template #suffixIcon><CloseSquareFilled /></template>
      </a-cascader>
      
      <div class="recent-cities">
        <h3>最近访问</h3>
        <div class="city-tags">
          <a-tag 
            v-for="(city, index) in recentCities" 
            :key="index"
            @click="selectRecentCity(city)"
            class="city-tag"
          >
            {{ city.fullName }}
          </a-tag>
        </div>
      </div>
      
      <div class="selected-city" v-if="selectedCity">
        <h3>已选择</h3>
        <div class="city-info">
          <span class="city-name">{{ selectedCity.fullName }}</span>
          <a-button type="primary" @click="confirmSelection">确认选择</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
import { CloseSquareFilled } from '@ant-design/icons-vue';

const visible = ref(false);
const recentCities = ref<any[]>([]);
const selectedKeys = ref<string[]>([]);
const selectedCity = ref<any>(null);

// 更完整的城市数据结构
const options: CascaderProps['options'] = [
  {
    code: 'zhejiang',
    name: '浙江省',
    children: [
      { 
        code: 'hangzhou', 
        name: '杭州市',
        fullName: '浙江-杭州'
      },
      { 
        code: 'ningbo', 
        name: '宁波市',
        fullName: '浙江-宁波'
      },
      { 
        code: 'wenzhou', 
        name: '温州市',
        fullName: '浙江-温州'
      },
    ],
  },
  {
    code: 'jiangsu',
    name: '江苏省',
    children: [
      { 
        code: 'nanjing', 
        name: '南京市',
        fullName: '江苏-南京'
      },
      { 
        code: 'suzhou', 
        name: '苏州市',
        fullName: '江苏-苏州'
      },
      { 
        code: 'wuxi', 
        name: '无锡市',
        fullName: '江苏-无锡'
      },
    ],
  },
  {
    code: 'hunan',
    name: '湖南省',
    children: [
      { 
        code: 'changsha', 
        name: '长沙市',
        fullName: '湖南-长沙'
      },
      { 
        code: 'zhuzhou', 
        name: '株洲市',
        fullName: '湖南-株洲'
      },
      { 
        code: 'yueyang', 
        name: '岳阳市',
        fullName: '湖南-岳阳'
      },
    ]
  },
  {
    code: 'guangdong',
    name: '广东省',
    children: [
      { 
        code: 'guangzhou', 
        name: '广州市',
        fullName: '广东-广州'
      },
      { 
        code: 'shenzhen', 
        name: '深圳市',
        fullName: '广东-深圳'
      },
      { 
        code: 'dongguan', 
        name: '东莞市',
        fullName: '广东-东莞'
      },
    ]
  },
  {
    code: 'beijing',
    name: '北京市',
    children: [
      { 
        code: 'beijing', 
        name: '北京市',
        fullName: '北京'
      }
    ]
  },
  {
    code: 'shanghai',
    name: '上海市',
    children: [
      { 
        code: 'shanghai', 
        name: '上海市',
        fullName: '上海'
      }
    ]
  },
];

// 初始化打开弹窗
const openModal = () => {
  visible.value = true;
};

// 监听打开弹窗事件
onMounted(() => {
  window.addEventListener('open-city-modal', () => {
    visible.value = true;
  });
  
  // 从本地存储加载最近访问城市
  const savedCities = localStorage.getItem('recentCities');
  if (savedCities) {
    recentCities.value = JSON.parse(savedCities);
  }
});

// 处理城市选择
const handleCityChange = (keys: string[], selectedOptions: any[]) => {
  // 获取最后选择的选项
  const lastSelected = selectedOptions[selectedOptions.length - 1];
  
  // 如果选择了城市级别的选项
  if (lastSelected && lastSelected.children === undefined) {
    selectedCity.value = {
      code: lastSelected.code,
      name: lastSelected.name,
      fullName: lastSelected.fullName,
      province: selectedOptions[0]?.name || ''
    };
  } else {
    selectedCity.value = null;
  }
};

// 确认选择
const confirmSelection = () => {
  if (selectedCity.value) {
    // 保存到最近访问
    saveRecentCity(selectedCity.value);
    
    // 更新当前城市
    updateCurrentCity(selectedCity.value.fullName);
    
    // 关闭弹窗
    visible.value = false;
    
    // 重置选择
    selectedKeys.value = [];
    selectedCity.value = null;
  }
};

// 选择最近访问的城市
const selectRecentCity = (city: any) => {
  updateCurrentCity(city.fullName);
  visible.value = false;
};

// 保存到最近访问
const saveRecentCity = (city: any) => {
  // 移除重复项
  const updatedCities = [city, ...recentCities.value.filter(c => c.code !== city.code)];
  
  // 只保留最近5个
  recentCities.value = updatedCities.slice(0, 5);
  
  // 保存到本地存储
  localStorage.setItem('recentCities', JSON.stringify(recentCities.value));
};

// 更新当前城市
const updateCurrentCity = (city: string) => {
  // 触发自定义事件
  const event = new CustomEvent('update-city', { detail: city });
  window.dispatchEvent(event);
};
</script>

<style scoped>
.city-modal {
  padding: 20px;
}

.recent-cities {
  margin-top: 30px;
}

.recent-cities h3 {
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
}

.city-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.city-tag {
  padding: 6px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
  background-color: #f0f2f5;
  border: 1px solid #d9d9d9;
}

.city-tag:hover {
  background-color: #e6f7ff;
  border-color: #91d5ff;
  transform: translateY(-2px);
}

.selected-city {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.selected-city h3 {
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
}

.city-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.city-name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
</style>