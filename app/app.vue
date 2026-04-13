<template>
  
  <AppLoaderHome/>

  <NuxtLayout>
    <NuxtPage :transition="isFirstLoad ? false : undefined" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { isFirstLoad } = useAppState()
</script>