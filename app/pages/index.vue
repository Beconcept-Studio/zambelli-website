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
    <section class="page-wrapper overflow-hidden h-[100dvh] overscroll-none zambelli-gallery-home flex items-center justify-center">
        <div class="intro-slogan relative font-medium">
            <div class="-translate-y-1/2 w-full h-full text-black">Dove la materia incontra l'anima</div>
            <div class="translate-y-1/2 absolute text-center inset-0 w-full text-sm h-full text-gray-400 uppercase">(Scroll to explore)</div>
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