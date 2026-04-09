<script setup lang="ts">
    import { useGalleryAnimation } from '@/composables/useHomeAnimation'
    useGalleryAnimation({
        rootSelector: '.zambelli-gallery-home',
        triggerDelta: 600
    })
</script>

<template>
    <section class="overflow-hidden h-[100dvh] zambelli-gallery-home">
        <div class="medias">
            <img src="/effect-one/1.jpg" alt="">
            <img src="/effect-one/2.jpg" alt="">
            <img src="/effect-one/3.jpg" alt="">
            <img src="/effect-one/4.jpg" alt="">
            <img src="/effect-one/5.jpg" alt="">
            <img src="/effect-one/6.jpg" alt="">
            <img src="/effect-one/7.jpg" alt="">
        </div>
    </section>
</template>