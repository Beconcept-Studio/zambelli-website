<script setup lang="ts">
    const { headerClass } = useAppState()
</script>
<template>
    <div :class="headerClass" id="header-desktop" class="fixed z-[9999] bottom-10 p-2 bg-glassgray/20 rounded-full flex justify-between w-fit max-w-[580px] left-1/2 -translate-x-1/2 backdrop-blur-md">
        <div class="self-center w-fit flex items-center h-full">
            <AppNav />
        </div> 
    </div>
</template>