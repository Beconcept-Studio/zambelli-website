<script setup lang="ts">
import { gsap } from 'gsap'

definePageMeta({ 
    layout: 'default',
})

const { rect, src, clear } = useProjectTransition()
const route = useRoute()

const heroRef = ref<HTMLImageElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const works = [
  { id: 1,  image: '/effect-one/1.jpg',  title: 'Forma Urbana' },
  { id: 2,  image: '/effect-one/2.jpg',  title: 'Lago Silenzio' },
  { id: 3,  image: '/effect-one/3.jpg',  title: 'Architettura Viva' },
  { id: 4,  image: '/effect-one/4.jpg',  title: 'Margine Sottile' },
  { id: 5,  image: '/effect-one/5.jpg',  title: 'Materia Grezza' },
  { id: 6,  image: '/effect-one/6.jpg',  title: 'Vuoto Abissale' },
  { id: 7,  image: '/effect-one/7.jpg',  title: 'Luce Diffusa' },
  { id: 8,  image: '/effect-one/8.jpg',  title: 'Struttura Aperta' },
  { id: 9,  image: '/effect-one/9.jpg',  title: 'Campo Visivo' },
  { id: 10, image: '/effect-one/10.jpg', title: 'Tensione Cromatica' },
]

const work = computed(() => works.find(w => w.id === Number(route.params.id)))

onMounted(() => {
  if (!heroRef.value) return

  // Nascondi subito il testo
  gsap.set(contentRef.value, { autoAlpha: 0 })

  const sourceRect = rect.value

  if (sourceRect) {
    // --- FLIP ---
    const destRect = heroRef.value.getBoundingClientRect()
    const dx     = sourceRect.left + sourceRect.width  / 2 - (destRect.left + destRect.width  / 2)
    const dy     = sourceRect.top  + sourceRect.height / 2 - (destRect.top  + destRect.height / 2)

    gsap.timeline({ onComplete: clear })
      .from(heroRef.value, {
        x: dx, y: dy,
        transformOrigin: 'center center',
        ease: 'power4.inOut',
        duration: 0.75,
      })
      .to(contentRef.value, {
        autoAlpha: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.4,
      }, '-=0.25')
  } else {
    // Accesso diretto all'URL — nessun FLIP, semplice fade
    gsap.to(contentRef.value, { autoAlpha: 1, y: 0, duration: 0.4 })
  }
})
</script>

<template>
  <main class="page-wrapper min-h-[100dvh]">
    <div class="w-screen h-screen flex items-center div--container justify-center bg-red-500">
      <div class="hero w-full aspect-[2/.7] bg-green-300 overflow-hidden flex items-center justify-center">
        <img
          ref="heroRef"
          :src="work?.image"
          :alt="work?.title"
          class="max-h-full"
        />
        
      </div>
    </div>

    <div ref="contentRef" class="p-[5vw]">
      <h1 class="text-4xl font-bold">{{ work?.title }}</h1>
    </div>
  </main>
</template>