<script setup lang="ts">
definePageMeta({ layout: 'default' })
import gsap from 'gsap'
import { useWorksAnimation } from '@/composables/useWorksAnimation'

// Import progetti da strapi
interface Immagine {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}
interface Project {
  id: number;
  documentId: string;
  titolo_progetto: string;
  immagine_principale: Immagine;
}

const { data: projects } = await useFetch<Project[]>('/api/projects')

const { pause, isDragging } = useWorksAnimation({ rootSelector: '.zambelli-gallery-works' })
const router = useRouter()
const loadedIds = reactive(new Set<number>())
const onImageLoad = (id: number) => loadedIds.add(id)
const onProjClick = (event: MouseEvent, project: Project) => {
  if (isDragging.value) return        // drag → non navigare
  router.push(`/works/${slugify(project.titolo_progetto)}`)    // click pulito → naviga
}
</script>

<template>

  <section class="page-wrapper zambelli-gallery-works overflow-hidden h-[100dvh] overscroll-none">
    <div class="container grid grid-cols-[repeat(2,1fr)] w-max will-change-transform">

      <!-- Primo .content: cliccabile -->
      <div class="content grid w-max grid-cols-[repeat(4,1fr)] gap-[5vw] p-[5vw]">
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :data-to="project.id"
          class="media w-[25vw] aspect-square select-none cursor-pointer space-y-2"
          style="will-change: transform;"
          @click="onProjClick($event, project)"
        >
          <div class="w-full h-full relative overflow-hidden flex items-center justify-center">
            <img
              v-if="project.immagine_principale"
              class="max-h-full max-w-full transition-opacity duration-500"
              :src="`${project.immagine_principale.url}`"
              :alt="project.immagine_principale.alternativeText ?? project.titolo_progetto"
            />
          </div>
          <div class="text-center opacity-60 text-sm">{{ project.titolo_progetto }}</div>
        </NuxtLink>
      </div>

      <NuxtLink
        v-for="_ in 3"
        class="content grid w-max grid-cols-[repeat(4,1fr)] gap-[5vw] p-[5vw]"
      >
        <div
          v-for="project in projects"
          :key="project.id"
          :data-to="project.id"
          class="media w-[25vw] aspect-square space-y-2 select-none"
          @click="onProjClick($event, project)"
        >
          <div class="w-full h-full relative overflow-hidden flex items-center justify-center">
            <img
              v-if="project.immagine_principale"
              class="max-h-full max-w-full transition-opacity duration-500"
              :src="`${project.immagine_principale.url}`"
              :alt="project.immagine_principale.alternativeText ?? project.titolo_progetto"
            />
          </div>
          <div class="text-center opacity-60 text-sm">{{ project.titolo_progetto }}</div>
        </div>
      </NuxtLink>

    </div>
  </section>
</template>