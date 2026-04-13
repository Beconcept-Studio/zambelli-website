<script setup lang="ts">
    definePageMeta({
        layout: 'default',
    })
    import { useGalleryAnimation } from '@/composables/useHomeAnimation'
    useGalleryAnimation({
        rootSelector: '.zambelli-gallery-home',
        triggerDelta:   400
    })
</script>

<template>
    <section class="overflow-hidden h-[100dvh] overscroll-none zambelli-gallery-home ">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60">
          Scroll to discover
        </div>
        <div class="medias">
            <img src="/effect-one/1.jpg" alt="">
            <img src="/effect-one/2.jpg" alt="">
            <img src="/effect-one/3.jpg" alt="">
            <img src="/effect-one/4.jpg" alt="">
            <img src="/effect-one/5.jpg" alt="">
            <img src="/effect-one/6.jpg" alt="">
            <img src="/effect-one/1.jpg" alt="">
            <img src="/effect-one/2.jpg" alt="">
            <img src="/effect-one/3.jpg" alt="">
            <img src="/effect-one/4.jpg" alt="">
            <img src="/effect-one/5.jpg" alt="">
            <img src="/effect-one/6.jpg" alt="">
        </div>
    </section>
</template>