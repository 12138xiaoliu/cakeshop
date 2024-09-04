<template>
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
onMounted(() => {
  const Router = useRouter()
  Router.push('/')
})
</script>

<style>
body {
  background-color: rgb(230, 222, 219);
}
</style>
