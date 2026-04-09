<script setup lang="ts">
    import HomeIcon from '@/assets/svg/home-icon.svg'
</script>
<template>
    <nav>
        <ul class="flex items-center gap-2 w-fit uppercase font-medium">
            <li class="flex items-center justify-center"><NuxtLink class="aspect-square bg-red-100 p-3 rounded-full flex items-center justify-center text-black" exactActiveClass="" to="/">
                <HomeIcon class="w-3 h-3" />
            </NuxtLink></li>
            <li class="flex items-center justify-center"><NuxtLink class="px-4 py-1 rounded-full" exactActiveClass="bg-black text-white" to="/blog">Blog</NuxtLink></li>
            <li class="flex items-center justify-center"><NuxtLink class="px-4 py-1 rounded-full" exactActiveClass="bg-black text-white" to="/single-post">Single Post</NuxtLink></li>
            <li class="flex items-center justify-center"><NuxtLink class="px-4 py-1 rounded-full" exactActiveClass="bg-black text-white" to="/effect-one">Anim. #1</NuxtLink></li>
        </ul>
    </nav>
</template>