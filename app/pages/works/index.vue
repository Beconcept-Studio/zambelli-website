<script setup lang="ts">
  definePageMeta({ layout: 'default' })
  import { useWorksAnimation } from '@/composables/useWorksAnimation'

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
    immagine_principale: Immagine | null;
  }

  const config = useRuntimeConfig()
  const projects = ref<Project[]>([])
  const fetchProjects = async () => {
    const res = await $fetch<{ data: Project[] }>('/api/projects')
    projects.value = res.data
  }
  await fetchProjects()
  onMounted(() => fetchProjects())


  const { isDragging } = useWorksAnimation({ rootSelector: '.zambelli-gallery-works' })
  const router = useRouter()
  const onProjClick = (event: MouseEvent, project: Project) => {
    if (isDragging.value) return
    router.push(`/works/${slugify(project.titolo_progetto)}`)
  }
</script>

<template>
  <section class="page-wrapper zambelli-gallery-works overflow-hidden h-[100dvh] overscroll-none">
    <div class="container grid grid-cols-[repeat(2,1fr)] w-max will-change-transform">

      <div class="content grid w-max grid-cols-[repeat(4,1fr)] gap-[5vw] p-[5vw]">
        <div
          v-for="project in projects"
          :key="project.id"
          class="media w-[25vw] aspect-square select-none cursor-pointer space-y-2"
          style="will-change: transform;"
          @click="onProjClick($event, project)"
        >
          <div class="w-full h-full relative overflow-hidden flex items-center justify-center">
            <img
              v-if="project.immagine_principale"
              class="max-h-full max-w-full transition-opacity duration-500"
              :src="project.immagine_principale.url"
              :alt="project.immagine_principale.alternativeText ?? project.titolo_progetto"
            />
          </div>
          <div class="text-center opacity-60 text-sm">{{ project.titolo_progetto }}</div>
        </div>
      </div>

      <div
        v-for="_ in 3"
        :key="_"
        class="content grid w-max grid-cols-[repeat(4,1fr)] gap-[5vw] p-[5vw]"
      >
        <div
          v-for="project in projects"
          :key="project.id"
          class="media w-[25vw] aspect-square space-y-2 select-none"
          @click="onProjClick($event, project)"
        >
          <div class="w-full h-full relative overflow-hidden flex items-center justify-center">
            <img
              v-if="project.immagine_principale"
              class="max-h-full max-w-full transition-opacity duration-500"
              :src="project.immagine_principale.url"
              :alt="project.immagine_principale.alternativeText ?? project.titolo_progetto"
            />
          </div>
          <div class="text-center opacity-60 text-sm">{{ project.titolo_progetto }}</div>
        </div>
      </div>

    </div>
  </section>
</template>