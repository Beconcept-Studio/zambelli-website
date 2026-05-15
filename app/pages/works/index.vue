<script setup lang="ts">
definePageMeta({ layout: 'default' })
import { useWorksAnimation } from '@/composables/useWorksAnimation'

interface Immagine {
  url: string
  alternativeText: string | null
  width: number
  height: number
}
interface Project {
  id: number
  slug: string
  documentId: string
  titolo_progetto: string
  immagine_principale: Immagine
}
interface WorksPage {
  featured_work_one: Project | null
  featured_work_two: Project | null
}

const [{ data: projects }, { data: worksPage }] = await Promise.all([
  useFetch<Project[]>('/api/projects'),
  useFetch<WorksPage>('/api/pages/work'),
])

// const PADDING_OPTIONS = ['8px', '16px', '24px', '32px']
const PADDING_OPTIONS = ['0px' , '24px', '48px']

const orderedProjects = ref<(Project | null)[]>([])
const gridPaddings = ref<string[]>([])
const fw1Id = ref<number | null>(null)
const fw2Id = ref<number | null>(null)

const buildGrid = () => {
  // console.log('worksPage.value:', JSON.stringify(worksPage.value, null, 2))
  // console.log('projects.value length:', projects.value?.length)

  const all = projects.value ?? []
  const fw1Raw = worksPage.value?.featured_work_one as any
  const fw2Raw = worksPage.value?.featured_work_two as any

  console.log('worksPage.value completo:', JSON.stringify(worksPage.value, null, 2))
  console.log('fw1Raw:', fw1Raw)
  console.log('fw2Raw:', fw2Raw)

  const fw1: Project | null = fw1Raw?.id ? fw1Raw : (fw1Raw?.data ?? null)
  const fw2: Project | null = fw2Raw?.id ? fw2Raw : (fw2Raw?.data ?? null)

  fw1Id.value = fw1?.id ? Number(fw1.id) : null
  fw2Id.value = fw2?.id ? Number(fw2.id) : null

  const featuredIds = new Set([fw1Id.value, fw2Id.value].filter((id): id is number => id !== null))

  // console.log('fw1:', fw1)
  // console.log('fw2:', fw2)
  // console.log('featuredIds:', featuredIds)

  const others = [...all.filter(p => !featuredIds.has(Number(p.id)))]
    .sort(() => Math.random() - 0.5)

  const featuredCount = (fw1 ? 1 : 0) + (fw2 ? 1 : 0)
  const total = Math.ceil((others.length + featuredCount) / 4) * 4

  const grid: (Project | null)[] = new Array(total).fill(null)
  const middleRow = Math.floor((total / 4) / 2)

  if (fw1) grid[middleRow * 4 + 1] = fw1
  if (fw2) grid[middleRow * 4 + 2] = fw2

  const emptyCells = grid.filter(c => c === null).length
  const fillList: Project[] = []
  while (fillList.length < emptyCells) fillList.push(...others)
  const toFill = fillList.slice(0, emptyCells)

  let idx = 0
  for (let i = 0; i < total; i++) {
    if (grid[i] === null) grid[i] = toFill[idx++]
  }

  orderedProjects.value = grid

  gridPaddings.value = grid.map(() =>
    PADDING_OPTIONS[Math.floor(Math.random() * PADDING_OPTIONS.length)]
  )
}

if (process.client) {
  //console.log('worksPage al momento di buildGrid:', worksPage.value)
  buildGrid()
}

const { isDragging } = useWorksAnimation({
  rootSelector: '.zambelli-gallery-works',
  initialOffset: () => {
    const mainGrid = document.querySelector('.zambelli-gallery-works .content')
    if (!mainGrid) return { x: 0, y: 0 }

    const els = [
      fw1Id.value != null ? mainGrid.querySelector(`[data-to="${fw1Id.value}"]`) : null,
      fw2Id.value != null ? mainGrid.querySelector(`[data-to="${fw2Id.value}"]`) : null,
    ].filter(Boolean) as HTMLElement[]

    if (!els.length) return { x: 0, y: 0 }

    const rects = els.map(el => el.getBoundingClientRect())
    const left   = Math.min(...rects.map(r => r.left))
    const right  = Math.max(...rects.map(r => r.right))
    const top    = Math.min(...rects.map(r => r.top))
    const bottom = Math.max(...rects.map(r => r.bottom))

    const centerX = (left + right)  / 2
    const centerY = (top  + bottom) / 2

    console.log('featured els found:', els.length)
    console.log('centerX:', centerX, 'centerY:', centerY)
    console.log('offset x:', window.innerWidth / 2 - centerX, 'offset y:', window.innerHeight / 2 - centerY)

    return {
      x: window.innerWidth  / 2 - centerX,
      y: window.innerHeight / 2 - centerY,
    }
  },
})

const router = useRouter()

const isFeatured = (project: Project | null) => {
  if (!project) return false
  return Number(project.id) === fw1Id.value || Number(project.id) === fw2Id.value
}

const onProjClick = (event: MouseEvent, project: Project) => {
  if (isDragging.value) return
  router.push(`/works/${project.slug}`)
}
</script>

<template>
  <section class="page-wrapper zambelli-gallery-works overflow-hidden h-[100dvh] overscroll-none">
    <ClientOnly>
      <div class="container grid gap-[4vw] grid-cols-[repeat(2,1fr)] w-max will-change-transform">

        <div class="content grid w-max lg:grid-cols-[repeat(4,1fr)] grid-cols-[repeat(2,1fr)] gap-[4vw]">
          <template
            v-for="(project, i) in orderedProjects"
            :key="project ? project.id : `empty-${i}`"
          >
            <div
              v-if="project"
              :data-to="project.id"
              class="media lg:w-[25vw] w-[50vw] aspect-square select-none cursor-pointer space-y-2"
              :class="{ 'ring-2 ring-white/20': isFeatured(project) }"
              :style="{ padding: gridPaddings[i], willChange: 'transform' }"
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
              <div class="text-center opacity-60 text-sm font-inter">{{ project.titolo_progetto }}</div>
            </div>
          </template>
        </div>

        <div
          v-for="n in 3"
          :key="n"
          class="content grid w-max lg:grid-cols-[repeat(4,1fr)] grid-cols-[repeat(2,1fr)] gap-[4vw]"
        >
          <template
            v-for="(project, i) in orderedProjects"
            :key="`clone-${n}-${project ? project.id : i}`"
          >
            <div
              v-if="project"
              :data-to="project.id"
              class="media lg:w-[25vw] w-[50vw] aspect-square select-none cursor-pointer space-y-2"
              :style="{ padding: gridPaddings[i], willChange: 'transform' }"
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
              <div class="text-center opacity-60 text-sm font-inter">{{ project.titolo_progetto }}</div>
            </div>
          </template>
        </div>

      </div>
    </ClientOnly>
  </section>
</template>