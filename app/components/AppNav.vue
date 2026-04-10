<script setup lang="ts">
    import HomeIcon from '@/assets/svg/home-icon.svg'
</script>
<template>


    <nav class="flex items-center gap-1 w-fit font-normal text-[#646464]">
        <NuxtLink class="aspect-square p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white" exactActiveClass="bg-white" to="/">
            <HomeIcon class="w-3 h-3" />
        </NuxtLink>
        <NuxtLink class="px-3 py-1 h-9 rounded-full flex items-center justify-center text-center leading-none transition-all duration-300 hover:bg-white" exactActiveClass="bg-white" to="/works">Works</NuxtLink>
        <NuxtLink class="px-3 py-1 h-9 rounded-full flex items-center justify-center text-center leading-none transition-all duration-300 hover:bg-white" exactActiveClass="bg-white" to="/studio">Studio</NuxtLink>
        <NuxtLink class="px-3 py-1 h-9 rounded-full flex items-center justify-center text-center leading-none transition-all duration-300 hover:bg-white" exactActiveClass="bg-white" to="/news">News</NuxtLink>
        <NuxtLink class="px-3 py-1 h-9 rounded-full flex items-center justify-center text-center leading-none transition-all duration-300 hover:bg-white" exactActiveClass="bg-white" to="/contacts">Contact</NuxtLink>
    </nav>
</template>