<script setup lang="ts">
  definePageMeta({ 
      layout: 'default',
  })
  const route = useRoute()
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
  const work = computed(() => works.find(w => w.slug === String(route.params.slug)))
  import { useGsapCommon } from '@/composables/useGsapCommon'
  useGsapCommon()
</script>
<template>
  <main class="page-wrapper min-h-[100dvh]">
    <div class="w-screen h-screen flex items-center div--container justify-center">
      <div class="hero w-full aspect-[2/.7] flex items-center justify-center">
        <img
          ref="heroRef"
          :src="work?.image"
          :alt="work?.title"
          class="max-h-full max-w-full h-full w-auto"
        />
      </div>
    </div>

    <div ref="contentRef" class="div--container-verysmall verticalspace space-bottom-double">
      <div class="gsap-fade space-y-1">
        <h1 class="h4">{{ work?.title }}</h1>
        <div class="text-black/60">Dove la luce diventa architettura</div>
      </div>
      <div class="gsap-fade space-y-4">
        <div class="h5">Skyne nasce da un cantiere privato. Alessandro stava ristrutturando il suo studio, un edificio rinascimentale nella campagna mantovana. Serviva portare corrente e luce senza aprire le pareti, senza cancellare quello che c'era già. L'impianto elettrico, da sempre pensato per sparire, questa volta doveva restare fuori.</div>
        <div class="text-black/60">E una volta fuori, doveva avere un senso. Skyne è un profilo in alluminio che fa due cose insieme: illumina e porta corrente. Un sistema LED lineare a bassa tensione che si combina con prese e interruttori standard. Si monta a parete, a soffitto, a pavimento, sospeso. La luce si può orientare, diretta o riflessa. Ogni modulo si connette al successivo, ognuno con la sua angolazione. Funziona dentro e fuori, con la stessa logica, lo stesso linguaggio.</div>
      </div>
      <div class="gsap-fade space-y-4">
        <div class="">
          <img src="/effect-one/1.jpg" class="w-full"/>
        </div>
        <div class="text-black/60 text-sm">E una volta fuori, doveva avere un senso.</div>
      </div>
      <div class="gsap-fade space-y-4">
        <div class="h5">Skyne nasce da un cantiere privato. Alessandro stava ristrutturando il suo studio, un edificio rinascimentale nella campagna mantovana. Serviva portare corrente e luce senza aprire le pareti, senza cancellare quello che c'era già. L'impianto elettrico, da sempre pensato per sparire, questa volta doveva restare fuori.</div>
        <div class="text-black/60">E una volta fuori, doveva avere un senso. Skyne è un profilo in alluminio che fa due cose insieme: illumina e porta corrente. Un sistema LED lineare a bassa tensione che si combina con prese e interruttori standard. Si monta a parete, a soffitto, a pavimento, sospeso. La luce si può orientare, diretta o riflessa. Ogni modulo si connette al successivo, ognuno con la sua angolazione. Funziona dentro e fuori, con la stessa logica, lo stesso linguaggio.</div>
        <div class="btn-container">
          <NuxtLink class="btn btn-fill-white">Scopri di più</NuxtLink>
          <NuxtLink class="btn btn-fill-white">Contattami per informazioni</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>