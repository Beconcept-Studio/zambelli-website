<script setup lang="ts">
    const { headerClass } = useAppState()
</script>
<template>
    <div :class="headerClass" id="main-logo" class="fixed z-[9999] top-10 w-full max-w-[220px] left-1/2 -translate-x-1/2 ">
        <NuxtLink to="/" class="block w-full hover:opacity-50 duration-500 transition-opacity">
            <img src="/img/logoZambelli.png" class="block"/>
        </NuxtLink>
    </div>
</template>