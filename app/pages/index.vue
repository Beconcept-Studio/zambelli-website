<script setup lang="ts">
import { useGalleryAnimation } from '@/composables/useHomeAnimation'

definePageMeta({
    layout: 'default',
})

interface Immagine {
    url: string
    alternativeText: string | null
    width: number
    height: number
}
interface Project {
    id: number
    slug: string
    titolo_progetto: string
    immagine_principale: Immagine
}
interface HomePage {
    home_projects: Project[]
}

const router = useRouter()
const { data: homePage } = await useFetch<HomePage>('/api/pages/home')
const projects = computed(() => homePage.value?.home_projects ?? [])

useGalleryAnimation({
    rootSelector: '.zambelli-gallery-home',
    triggerDelta: 400,
    onNavigate: (slug: string) => router.push(`/works/${slug}`),
})
</script>

<template>
    <section class="page-wrapper overflow-hidden h-[100dvh] overscroll-none zambelli-gallery-home flex items-center justify-center">
        <div class="intro-slogan relative font-medium">
            <div class="-translate-y-1/2 w-full h-full text-black font-inter">
                Dove la materia incontra l'anima
            </div>
            <div class="translate-y-1/2 absolute text-center inset-0 w-full font-inter text-sm h-full text-gray-400 uppercase">
                (Scroll to explore)
            </div>
        </div>
        <div class="medias">
            <div
                v-for="project in projects"
                :key="project.id"
                :data-slug="project.slug"
            >
                <img
                    v-if="project.immagine_principale"
                    :src="project.immagine_principale.url"
                    :alt="project.immagine_principale.alternativeText ?? project.titolo_progetto"
                />
            </div>
        </div>
    </section>
</template>