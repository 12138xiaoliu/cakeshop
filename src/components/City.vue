<template>
  <div class="city">
    <a-cascader  v-model:value="value" :options="options" placeholder="选择省份" style="width:100%; background-color: aquamarine;" >
      <!-- <template #suffixIcon><smile-outlined class="test" /></template> -->
      <CloseOutlined />
    </a-cascader>
  </div>
  
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import type { CascaderProps } from 'ant-design-vue';
  // import {CloseOutlined} from 'ant-design-vue/icons-vue'
  const options: CascaderProps['options'] = [
    {
      value: '全国',
      label: '全国',
      children: [
        {
          value: '浙江',
          label: '浙江',
          children: [
            {
              value: '杭州',
              label: '杭州',
            },
          ],
        },
        {
          value: '江苏',
          label: '江苏',
          children: [
            {
              value: '南京',
              label: '南京',        
            },
          ],
        },
        {
          value:'湖南',
          label:'湖南',
          children:[
            {
              value:'长沙',
              label:'长沙',
            }
          ]
        },
      ],
    },
    
  ];
  const value = ref<string[]>([]);
</script>
<style scoped>
  .city{
    background-color: rgb(255, 255, 255);
    margin: 30px auto;
    width: 500px;
  }
</style>
