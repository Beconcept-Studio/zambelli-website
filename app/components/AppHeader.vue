<script setup lang="ts">
    const { headerClass } = useAppState()
</script>
<template>
    <div :class="headerClass" id="header-desktop" class="fixed z-[9999] bottom-10 flex justify-between w-fit max-w-[580px] left-1/2 -translate-x-1/2">
        <div class="self-center w-fit flex items-center h-full">
            <AppNav />
        </div> 
    </div>
</template>