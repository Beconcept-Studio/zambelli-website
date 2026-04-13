<script setup lang="ts">
definePageMeta({ layout: 'default' })

import { useWorksAnimation } from '@/composables/useWorksAnimation'

// Esponi pause dalla tua animazione (vedi nota sotto)
const { pause, isDragging } = useWorksAnimation({ rootSelector: '.zambelli-gallery-works' })
const { capture } = useProjectTransition()
const router = useRouter()

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

const onWorkClick = (event: MouseEvent, work: typeof works[0]) => {
  // Se l'utente stava trascinando, ignora il click
  if (isDragging.value) return

  const mediaEl = event.currentTarget as HTMLElement
  capture(mediaEl, work.image)
  pause()
  router.push(`/works/${work.id}`)
}
</script>

<template>
  <section class="page-wrapper zambelli-gallery-works overflow-hidden h-[100dvh] overscroll-none">
    <div class="container grid grid-cols-[repeat(2,1fr)] w-max will-change-transform">

      <!-- Primo .content: cliccabile -->
      <div class="content grid w-max grid-cols-[repeat(5,1fr)] gap-[5vw] p-[5vw]">
        <div
          v-for="work in works"
          :key="work.id"
          class="space-y-2 media w-[25vw] aspect-square select-none cursor-pointer"
          @click="onWorkClick($event, work)"
        >
          <img class="w-full object-contain h-full block pointer-events-none" :src="work.image" :alt="work.title" />
          <div class="text-center opacity-60 text-sm">{{ work.title }}</div>
        </div>
      </div>

      <!-- Copie: invariate, pointer-events-none + aria-hidden -->
      <div class="content grid w-max grid-cols-[repeat(5,1fr)] gap-[5vw] p-[5vw]" aria-hidden="true">
        <div v-for="work in works" :key="work.id" @click="onWorkClick($event, work)" class="media w-[25vw] space-y-2 aspect-square select-none">
          <img class="w-full object-contain h-full block" :src="work.image" :alt="work.title" />
          <div class="text-center opacity-60 text-sm">{{ work.title }}</div>
        </div>
      </div>
      <div class="content grid w-max grid-cols-[repeat(5,1fr)] gap-[5vw] p-[5vw]" aria-hidden="true">
        <div v-for="work in works" :key="work.id" @click="onWorkClick($event, work)" class="media w-[25vw] space-y-2 aspect-square select-none">
          <img class="w-full object-contain h-full block" :src="work.image" :alt="work.title" />
          <div class="text-center opacity-60 text-sm">{{ work.title }}</div>
        </div>
      </div>
      <div class="content grid w-max grid-cols-[repeat(5,1fr)] gap-[5vw] p-[5vw]" aria-hidden="true">
        <div v-for="work in works" :key="work.id" @click="onWorkClick($event, work)" class="media w-[25vw] space-y-2 aspect-square select-none">
          <img class="w-full object-contain h-full block" :src="work.image" :alt="work.title" />
          <div class="text-center opacity-60 text-sm">{{ work.title }}</div>
        </div>
      </div>

    </div>
  </section>
</template>