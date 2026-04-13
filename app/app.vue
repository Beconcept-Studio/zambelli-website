<script setup lang="ts">
  const { isFirstLoad } = useAppState()
  const route = useRoute()
  const isHome = computed(() => route.path === '/')
</script>
<template>
  <AppLoaderHome v-if="isFirstLoad && isHome" />
  <AppLoaderDefault v-else-if="isFirstLoad && !isHome" />
  <NuxtLayout>
    <NuxtPage :transition="isFirstLoad ? false : undefined" />
  </NuxtLayout>
</template>

