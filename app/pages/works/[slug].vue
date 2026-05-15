<script setup lang="ts">
  import OpenIcon from '@/assets/svg/open.svg'
  import CloseIcon from '@/assets/svg/close.svg'
  import { marked } from 'marked'
  marked.setOptions({ breaks: true })
  definePageMeta({ 
      layout: 'default',
  })
  const route = useRoute()
  
  import { useGsapCommon } from '@/composables/useGsapCommon'
  useGsapCommon()
  
  interface Immagine {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  }
  interface CitazioneCentrata {
    __component: 'shared.citazione-centrata'
    id: number
    attiva_sezione: boolean | null
    attiva_icone: boolean | null
    testo: string
  }

  interface MediaFile {
    url: string
    alternativeText: string | null
    width: number
    height: number
    formats: Record<string, { url: string; width: number; height: number }>
  }

  interface SingleMedia {
    __component: 'shared.media'
    id: number
    attiva_sezione: boolean
    estendi_sezione: boolean
    posizione_contenuto: 'left' | 'center' | 'right'
    didascalia: string | null
    file: MediaFile
  }

  interface MediaSide {
    __component: 'shared.immagini-affiancate'
    id: number
    attiva_sezione: boolean
    allineamento_contenuto: 'top' | 'middle' | 'bottom'
    didascalia_uno: string | null
    didascalia_due: string | null
    immagine_uno: Immagine
    immagine_due: Immagine
  }
  
  interface VideoComponent {
    __component: 'shared.video'
    id: number
    attiva_sezione: boolean
    fonte_video: 'youtube' | 'vimeo' | 'asset'
    video_mp4: Immagine | null   // ← non string
    video_webm: Immagine | null  // ← non string
    video_cover: Immagine | null
    didascalia: string | null
    url_vimeo: string | null
    url_youtube: string | null
  }
  function extractYoutubeId(url: string): string {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    )
    return match?.[1] ?? url
  }

  function extractVimeoId(url: string): string {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    return match?.[1] ?? url
  }

  interface MediaContent {
    __component: 'shared.immagine-testo'
    id: number
    attiva_sezione: boolean
    posizione_media: 'left' | 'right'
    immagine: Immagine
    testo: string
    testo_bottone: string | null
    link_bottone: string | null
    icona_bottone: string | null
    blank_bottone: boolean
    shape_bottone: string | null
    skin_bottone: string | null
  }

  interface ComposerContenuto {
    id: number
    attiva_sezione: boolean
    skin_contenuto: string
    contenuto: string
  }

  interface BottoneContenuto {
    id: number
    testo_bottone: string
    link_bottone: string
    icona_bottone: string
    blank_bottone: boolean
    shape_bottone: string
    skin_bottone: string
  }

  interface BloccoContenuto {
    __component: 'shared.blocco-di-contenuto'
    id: number
    composer_contenuto: ComposerContenuto[]
    bottone_contenuto: BottoneContenuto[]
  }

  type DynamicBlock = CitazioneCentrata | SingleMedia | MediaSide | BloccoContenuto | MediaContent | VideoComponent
  
  interface CurrProject {
    id: number
    documentId: string
    titolo_progetto: string
    tipo_progetto: string
    anno_progetto: string
    commissionario_progetto: string
    slug: string
    immagine_principale: Immagine
    dynamic_body_progetto: DynamicBlock[]  // ← aggiungi questo
    info_progetto: string
    testo_link_esterno: string
    url_link_esterno: string
  }
  const slug = computed(() => route.params.slug as string)
  const { data: project } = await useFetch<CurrProject>(
    () => `/api/projects/${slug.value}`,  // ← funzione reattiva
    { key: `project-${slug.value}` }
  )

  const renderedFoorerInfo = computed(() =>
    project.value?.info_progetto ? marked.parse(project.value.info_progetto) : ''
  )

  
  
</script>
<template>
  <main class="page-wrapper min-h-[100dvh]">
    <div class="w-screen h-screen flex items-center div--container justify-center">
      <div class="hero w-full flex-col gap-5 aspect-[2/.65] flex items-center justify-center">
        <img
          v-if="project?.immagine_principale"
          :src="project.immagine_principale.url"
          :alt="project.titolo_progetto"
          class="max-h-full max-w-full h-full w-auto"
        />
        <div class="space-y-3 text-center">
          <h1 v-if="project?.titolo_progetto" class="h3small">{{ project?.titolo_progetto }}</h1>
          <div class="flex gap-4 text-sm text-black/60">
            <span v-if="project?.tipo_progetto" class="group flex gap-4">
              <span>{{project?.tipo_progetto}}</span>
              <span class="group-last:hidden">/</span>
            </span>  
            <span v-if="project?.commissionario_progetto" class="group flex gap-4">
              <span>{{project?.commissionario_progetto}}</span>
              <span class="group-last:hidden">/</span>
            </span>  
            <span v-if="project?.anno_progetto" class="group flex gap-4">
              <span>{{project?.anno_progetto}}</span>
              <span class="group-last:hidden">/</span>
            </span>  
          </div>
        </div>
      </div>
    </div>
    <div ref="contentRef" class="div--container-proj verticalspaceproj space-bottom-double">
      <div v-for="(block, i) in project?.dynamic_body_progetto" :key="i">
        <div
          v-if="block.__component === 'shared.citazione-centrata' && block.attiva_sezione"
          class="component-citazione-centrata gsap-fade grid grid-cols-4 gap-[2px]"
        >
          <div class="lg:col-span-2 lg:col-start-2 col-span-4 relative">
            <div v-if="block.attiva_icone" class="absolute top-0 -left-8">
              <OpenIcon class="w-4" />
            </div>
            <div
              class="text-black custom-mark-content opacity-80"
              v-html="marked.parse(block.testo ?? '')"
            />
            <div v-if="block.attiva_icone" class="absolute top-0 -right-8">
              <CloseIcon class="w-4" />
            </div>
          </div>
        </div>
        <div
          v-else-if="block.__component === 'shared.immagini-affiancate' && block.attiva_sezione"
          class="component-immagini_affiancate gsap-fade grid grid-cols-4 gap-24"
        >
          <div
            :class="[
              'lg:col-span-2 col-span-4 space-y-2',
                 block.allineamento_contenuto === 'top'   ? 'self-start'
                : block.allineamento_contenuto === 'middle'  ? 'self-center'
                : block.allineamento_contenuto === 'bottom'  ? 'self-end'
                : 'self-start'
            ]"
          >
            <img
              v-if="block.immagine_uno"
              :src="block.immagine_uno.url"
              :alt="block.immagine_uno.alternativeText ?? ''"
              :width="block.immagine_uno.width"
              :height="block.immagine_uno.height"
              class="w-full"
            />
            <div v-if="block.didascalia_uno" class="text-sm">{{ block.didascalia_uno }}</div>
          </div>
          <div
            :class="[
              'lg:col-span-2 col-span-4 space-y-2',
                 block.allineamento_contenuto === 'top'   ? 'self-start'
                : block.allineamento_contenuto === 'middle'  ? 'self-center'
                : block.allineamento_contenuto === 'bottom'  ? 'self-end'
                : 'self-start'
            ]"
          >
            <img
              v-if="block.immagine_due"
              :src="block.immagine_due.url"
              :alt="block.immagine_due.alternativeText ?? ''"
              :width="block.immagine_due.width"
              :height="block.immagine_due.height"
              class="w-full"
            />
            <div v-if="block.didascalia_due" class="text-sm">{{ block.didascalia_due }}</div>
          </div>
        </div> 
        <div
          v-else-if="block.__component === 'shared.media' && block.attiva_sezione"
          class="component-immagine gsap-fade grid grid-cols-4 gap-24"
        >
          <div
            :class="[
              'space-y-2',
              block.estendi_sezione
                ? 'col-span-4'
                : block.posizione_contenuto === 'left'   ? 'lg:col-span-2 col-span-4'
                : block.posizione_contenuto === 'right'  ? 'lg:col-span-2 lg:col-start-3 col-span-4'
                : block.posizione_contenuto === 'center'  ? 'lg:col-span-2 lg:col-start-2 col-span-4'
                : block.posizione_contenuto === 'center-small'  ? 'lg:col-span-2 lg:col-start-2 col-span-4 space-top space-bottom maxed-img'
                : 'col-span-4'
            ]"
          >
            <img
              v-if="block.file"
              :src="block.file.url"
              :alt="block.file.alternativeText ?? ''"
              :width="block.file.width"
              :height="block.file.height"
              class="w-full"
            />
            <div v-if="block.didascalia" class="text-sm">{{ block.didascalia }}</div>
          </div>
        </div>
        <div
          v-else-if="block.__component === 'shared.video' && block.attiva_sezione"
          class="component-video gsap-fade grid grid-cols-4 gap-[2px]"
        >
          <div class="col-span-4 space-y-2">

            <!-- Asset (mp4 / webm) -->
            <video
              v-if="block.fonte_video === 'asset'"
              :poster="block.video_cover?.url ?? undefined"
              controls
              playsinline
              class="w-full object-contain"
            >
              <source v-if="block.video_webm" :src="block.video_webm.url" type="video/webm" />
              <source v-if="block.video_mp4"  :src="block.video_mp4.url"  type="video/mp4"  />
            </video>

            <!-- YouTube -->
            <div
              v-else-if="block.fonte_video === 'youtube' && block.url_youtube"
              class="relative w-full aspect-video"
            >
              <iframe
                :src="`https://www.youtube.com/embed/${extractYoutubeId(block.url_youtube)}`"
                class="absolute inset-0 w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>

            <!-- Vimeo -->
            <div
              v-else-if="block.fonte_video === 'vimeo' && block.url_vimeo"
              class="relative w-full aspect-video"
            >
              <iframe
                :src="`https://player.vimeo.com/video/${extractVimeoId(block.url_vimeo)}`"
                class="absolute inset-0 w-full h-full"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
              />
            </div>

            <!-- Didascalia -->
            <div v-if="block.didascalia" class="text-sm">
              {{ block.didascalia }}
            </div>

          </div>
        </div>
        <div
          v-else-if="block.__component === 'shared.blocco-di-contenuto'"
          class="component-blocco-di-contenuto gsap-fade grid grid-cols-4 gap-[2px]"
        >
          <div class="lg:col-span-2 lg:col-start-2 col-span-4 space-y-8">
            <template v-for="(contenuto, j) in block.composer_contenuto" :key="j">
              <MarkdownRenderCustom
                v-if="contenuto.attiva_sezione"
                :content="contenuto.contenuto ?? ''"
              />
            </template>
            <div v-if="block.bottone_contenuto?.length" class="btn-container">
              <NuxtLink
                v-for="(btn, k) in block.bottone_contenuto"
                :key="k"
                :to="btn.link_bottone"
                :target="btn.blank_bottone ? '_blank' : '_self'"
                :class="[
                  btn.shape_bottone === 'fill' &&  btn.skin_bottone === 'black'  ? 'btn btn-fill-black'
                  : btn.shape_bottone === 'fill' &&  btn.skin_bottone === 'white'  ? 'btn btn-fill-white'
                  : btn.shape_bottone === 'outline' &&  btn.skin_bottone === 'black'  ? 'btn-icon btn-outline-black'
                  : btn.shape_bottone === 'outline' &&  btn.skin_bottone === 'white'  ? 'btn-icon btn-outline-white'
                  : 'btn btn-fill-black'
                ]"
              >
                <span style="--icon-fill: 0; --icon-weight: 300 ; --icon-font-size: 20px" v-if="btn.icona_bottone" class="material-symbols-outlined">{{ btn.icona_bottone }}</span>
                <span>{{ btn.testo_bottone }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          v-else-if="block.__component === 'shared.immagine-testo' && block.attiva_sezione"
          class="component-immagine-testo gsap-fade grid grid-cols-4 gap-24"
        >
          <div 
          :class="[
              'lg:col-span-2 col-span-4',
              block.posizione_media === 'left'  ? 'lg:order-1 order-1'
              : block.posizione_media === 'right' ? 'lg:order-2 order-1'
              : ''
            ]"
          >
            <img
              :src="block.immagine.url"
              :alt="block.immagine.alternativeText ?? ''"
              :width="block.immagine.width"
              :height="block.immagine.height"
              class="w-full"
            />
          </div>
          <div 
            :class="[
              'lg:col-span-2 col-span-4 space-y-4',
              block.posizione_media === 'left'  ? 'lg:order-2 order-1'
              : block.posizione_media === 'right' ? 'lg:order-1 order-1'
              : ''
            ]"
          >
            
            <MarkdownRenderCustom v-if="block.testo" :content="block.testo"></MarkdownRenderCustom>
            
            <div v-if="block.testo_bottone" class="btn-container">
              <NuxtLink
                :to="block.link_bottone ?? ''"
                :target="block.blank_bottone ? '_blank' : '_self'"
                :class="[
                  block.shape_bottone === 'fill'    && block.skin_bottone === 'black'  ? 'btn btn-fill-black'
                  : block.shape_bottone === 'fill'  && block.skin_bottone === 'white'  ? 'btn btn-fill-white'
                  : block.shape_bottone === 'outline' && block.skin_bottone === 'black' ? 'btn-icon btn-outline-black'
                  : block.shape_bottone === 'outline' && block.skin_bottone === 'white' ? 'btn-icon btn-outline-white'
                  : 'btn btn-fill-black'
                ]"
              >
                <span v-if="block.icona_bottone" style="--icon-fill: 0; --icon-weight: 300 ; --icon-font-size: 20px" class="material-symbols-outlined">{{ block.icona_bottone }}</span>
                <span>{{ block.testo_bottone }}</span>
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>
      
      <div
        class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="lg:col-span-2 lg:col-start-2 col-span-4 space-y-2">
          <h3 class="h4">{{ project?.titolo_progetto }}</h3>
          <div v-if="renderedFoorerInfo" class="styled-content text-small opacity-80" v-html="renderedFoorerInfo" />
          
          <div v-if="project?.testo_link_esterno" class="btn-container">
            <NuxtLink
              :to="project.url_link_esterno ?? ''"
              target="_blank"
              class="btn-icon btn-outline-black"
            >
              <span style="--icon-fill: 0; --icon-weight: 300; --icon-font-size: 20px" class="material-symbols-outlined">arrow_outward</span>
              <span>{{ project.testo_link_esterno }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    
    </div>
  </main>
</template>