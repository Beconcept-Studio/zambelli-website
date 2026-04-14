<script setup lang="ts">
definePageMeta({ layout: 'default' })
import gsap from 'gsap'
import { useWorksAnimation } from '@/composables/useWorksAnimation'

const { pause, isDragging } = useWorksAnimation({ rootSelector: '.zambelli-gallery-works' })
const router = useRouter()

const works = [
  { id: 1,  image: '/effect-one/1.jpg',  title: 'Forma Urbana',       slug: 'forma-urbana' },
  { id: 2,  image: '/effect-one/2.jpg',  title: 'Lago Silenzio',      slug: 'lago-silenzio' },
  { id: 3,  image: '/effect-one/3.jpg',  title: 'Architettura Viva',  slug: 'architettura-viva' },
  { id: 4,  image: '/effect-one/4.jpg',  title: 'Margine Sottile',    slug: 'margine-sottile' },
  { id: 5,  image: '/effect-one/5.jpg',  title: 'Materia Grezza',     slug: 'materia-grezza' },
  { id: 6,  image: '/effect-one/6.jpg',  title: 'Vuoto Abissale',     slug: 'vuoto-abissale' },
  { id: 7,  image: '/effect-one/7.jpg',  title: 'Luce Diffusa',       slug: 'luce-diffusa' },
  { id: 8,  image: '/effect-one/8.jpg',  title: 'Struttura Aperta',   slug: 'struttura-aperta' },
  { id: 9,  image: '/effect-one/9.jpg',  title: 'Campo Visivo',       slug: 'campo-visivo' },
  { id: 10, image: '/effect-one/10.jpg', title: 'Tensione Cromatica', slug: 'tensione-cromatica' },
]

const loadedIds = reactive(new Set<number>())
const onImageLoad = (id: number) => loadedIds.add(id)

const onWorkClick = (event: MouseEvent, work: typeof works[0]) => {
  if (isDragging.value) return        // drag → non navigare
  router.push(`/works/${work.slug}`)    // click pulito → naviga
}
</script>

<template>
  <section class="page-wrapper zambelli-gallery-works overflow-hidden h-[100dvh] overscroll-none">
    <div class="container grid grid-cols-[repeat(2,1fr)] w-max will-change-transform">

      <!-- Primo .content: cliccabile -->
      <div class="content grid w-max grid-cols-[repeat(5,1fr)] gap-[5vw] p-[5vw]">
        <NuxtLink
          :to="`/works/${work.id}`"
          v-for="work in works"
          :key="work.id"
          class="media w-[25vw] aspect-square select-none cursor-pointer space-y-2"
          style="will-change: transform;"
          @click="onWorkClick($event, work)"
        >
          <div class="w-full h-full relative overflow-hidden flex items-center justify-center">
            <img
              class="max-h-full max-w-full transition-opacity duration-500"
              :src="work.image"
              :alt="work.title"
            />
          </div>
          <div class="text-center opacity-60 text-sm">{{ work.title }}</div>
        </NuxtLink>
      </div>

      <NuxtLink
        v-for="_ in 3"
        class="content grid w-max grid-cols-[repeat(5,1fr)] gap-[5vw] p-[5vw]"
      >
        <div
          v-for="work in works"
          :key="work.id"
          :to="`/works/${work.id}`"
          class="media w-[25vw] aspect-square space-y-2 select-none"
          @click="onWorkClick($event, work)"
        >
          <div class="w-full h-full relative overflow-hidden flex items-center justify-center">
            <img
              class="max-h-full max-w-full transition-opacity duration-500" 
              :src="work.image"
              :alt="work.title"
            />
          </div>
          <div class="text-center opacity-60 text-sm">{{ work.title }}</div>
        </div>
      </NuxtLink>

    </div>
  </section>
</template>