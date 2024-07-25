<template>
  <RouterView />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
onMounted(() => {
  const Router = useRouter()
  Router.push('/home')
})
</script>

<style>
 *{
  background-color: rgb(222, 253, 213);
 }
</style>
