<script setup lang="ts">
  const { isFirstLoad } = useAppState()
  const route = useRoute()
  const isHome = computed(() => route.path === '/')
</script>
<template>
  <AppLoaderHome v-if="isHome , isFirstLoad" />
  <AppLoaderDefault v-else="!isHome , isFirstLoad" />
  <NuxtLayout>
    <NuxtPage :transition="isFirstLoad ? false : undefined" />
  </NuxtLayout>
</template>

