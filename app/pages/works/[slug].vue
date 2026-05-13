<script setup lang="ts">
  import OpenIcon from '@/assets/svg/open.svg'
  import CloseIcon from '@/assets/svg/close.svg'
  definePageMeta({ 
      layout: 'default',
  })
  const route = useRoute()
  const works = [
    { id: 1,  image: '/effect-one/fila.jpg',  title: 'Flia',       slug: 'flia' },
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

  const swiperindexRef = ref(null)
  const swiperIndex = useSwiper(swiperindexRef, {
    loop: false,
    spaceBetween: 8,
    slidesPerView: 'auto',
    speed: 1000,
    grabCursor: true,
  })
  const { data: project } = await useFetch(
    `/api/projects/${route.params.slug}`,
    { key: `project-${route.params.slug}` }
  )
  // console.log('project', project)

</script>
<template>
  <main class="page-wrapper min-h-[100dvh]">
    <div class="w-screen h-screen flex items-center div--container justify-center">
      <div class="hero w-full flex-col gap-5 aspect-[2/.65] flex items-center justify-center">
        <img
          ref="heroRef"
          :src="work?.image"
          :alt="work?.title"
          class="max-h-full max-w-full h-full w-auto "
        />
        <div class="space-y-1 text-center">
          <h1 class="h4">{{ work?.title }}</h1>
          <div class="flex gap-1 text-sm text-black/60">
            <span>Product</span>  
            <span>/</span>
            <span>Luceplan</span>
            <span>/</span>
            <span>2022</span>
          </div>
        </div>
      </div>
    </div>

    <div ref="contentRef" class="div--container-proj verticalspaceproj space-bottom-double">
      <!-- Blocco: Citazione centrale -->
      <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="lg:col-span-2 lg:col-start-2 col-span-4 relative">
          <div class="absolute top-0 -left-14">
            <OpenIcon class="w-8 h-8" />
          </div>
          <div class="text-black italic text-center">
            <p>I tried to imagine a <mark>nomadic lamp</mark> that could adapt to multiple spaces and diverse needs, allowing the same degree of interaction both <mark>indoors and outdoors.</mark></p>
            <p>A versatile product designed to free itself from architectural boundaries and inspire new usage scenarios.</p>
          </div>
          <div class="absolute top-0 -right-14">
            <CloseIcon class="w-8 h-8" />
          </div>
        </div>
      </div>
      
      <!-- Blocco: Immagine boxata -->
       <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="lg:col-span-2 lg:col-start-2 col-span-4 space-y-2">
          <img src="/effect-one/1.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
      </div>
      
      <!-- Blocco: Immagine full -->
       <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="col-span-4 space-y-2">
          <img src="/effect-one/full.jpg" class="w-full"/>
          <div class="text-sm">Immagine fullsize</div>
        </div>
      </div>

      <!-- Blocco: Contenuto testuale -->
      <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="lg:col-span-2 lg:col-start-2 col-span-4 relative space-y-8">
          <div class="text-big">E una volta fuori, doveva avere un senso. Skyne è un profilo in alluminio che fa due cose insieme: illumina e porta corrente. Un sistema LED lineare a bassa tensione che si combina con prese e interruttori standard. Si monta a parete, a soffitto, a pavimento, sospeso. La luce si può orientare, diretta o riflessa. Ogni modulo si connette al successivo, ognuno con la sua angolazione. Funziona dentro e fuori, con la stessa logica, lo stesso linguaggio.</div>
          <div class="text-large">E una volta fuori, doveva avere un senso. Skyne è un profilo in alluminio che fa due cose insieme: illumina e porta corrente. Un sistema LED lineare a bassa tensione che si combina con prese e interruttori standard. Si monta a parete, a soffitto, a pavimento, sospeso. La luce si può orientare, diretta o riflessa. Ogni modulo si connette al successivo, ognuno con la sua angolazione. Funziona dentro e fuori, con la stessa logica, lo stesso linguaggio.</div>
          <div class="text-basic">E una volta fuori, doveva avere un senso. Skyne è un profilo in alluminio che fa due cose insieme: illumina e porta corrente. Un sistema LED lineare a bassa tensione che si combina con prese e interruttori standard. Si monta a parete, a soffitto, a pavimento, sospeso. La luce si può orientare, diretta o riflessa. Ogni modulo si connette al successivo, ognuno con la sua angolazione. Funziona dentro e fuori, con la stessa logica, lo stesso linguaggio.</div>
          <div class="text-small">E una volta fuori, doveva avere un senso. Skyne è un profilo in alluminio che fa due cose insieme: illumina e porta corrente. Un sistema LED lineare a bassa tensione che si combina con prese e interruttori standard. Si monta a parete, a soffitto, a pavimento, sospeso. La luce si può orientare, diretta o riflessa. Ogni modulo si connette al successivo, ognuno con la sua angolazione. Funziona dentro e fuori, con la stessa logica, lo stesso linguaggio.</div>
          
          <NuxtLink class="btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            <span>Scopri di più</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Blocco: Immagini con allineamento top -->
       <div class="gsap-fade grid grid-cols-4 gap-10">
        <div class="lg:col-span-2 col-span-4 space-y-2 self-start">
          <img src="/effect-one/9.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
        <div class="lg:col-span-2 col-span-4 space-y-2 self-start">
          <img src="/effect-one/2.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
      </div>
      
      <!-- Blocco: Immagini con allineamento middle -->
       <div class="gsap-fade grid grid-cols-4 gap-10">
        <div class="lg:col-span-2 col-span-4 space-y-2 self-center">
          <img src="/effect-one/4.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
        <div class="lg:col-span-2 col-span-4 space-y-2 self-center">
          <img src="/effect-one/7.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
      </div>
      
      <!-- Blocco: Immagini con allineamento bottom -->
       <div class="gsap-fade grid grid-cols-4 gap-10">
        <div class="lg:col-span-2 col-span-4 space-y-2 self-end">
          <img src="/effect-one/6.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
        <div class="lg:col-span-2 col-span-4 space-y-2 self-end">
          <img src="/effect-one/8.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
      </div>

      <!-- Blocco: Immagine e contenuto -->
       <div class="gsap-fade grid grid-cols-4 gap-10">
        <div class="lg:col-span-2 col-span-4">
          <img src="/effect-one/5.jpg" class="w-full"/>
        </div>
        <div class="lg:col-span-2 col-span-4 space-y-4">
          <div class="text-extra">Lorem ipsum dolor sit amet.</div>
          <div class="text-big">Lorem ipsum dolor sit amet. Ea nostrum laudantium est rerum optio ea velit dolorem est sint voluptate. Hic quas explicabo qui eveniet ullam quo impedit modi et similique dicta, ex tenetur ipsa et voluptas voluptatem et odio facere aut unde veritatis.</div>
          <div class="text-basic">Lorem ipsum dolor sit amet.<br/>Ea nostrum laudantium est rerum optio ea velit dolorem est sint voluptate? Hic quas explicabo qui eveniet ullam quo impedit modi et similique dicta? Ex tenetur ipsa et voluptas voluptatem et odio facere aut unde veritatis.</div>
          <div class="text-small">Ea nostrum laudantium est rerum optio ea velit dolorem est sint voluptate? Hic quas explicabo qui eveniet ullam quo impedit modi et similique dicta? Ex tenetur ipsa et voluptas voluptatem et odio facere aut unde veritatis.</div>
          
          <div class="btn-container">
            <NuxtLink class="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              <span>Scopri di più</span>
            </NuxtLink>
            <NuxtLink class="btn btn-fill-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              <span>Scopri di più</span>
            </NuxtLink>
          </div>

          <div class="text-basic">Lorem ipsum dolor sit amet.<br/>Ea nostrum laudantium est rerum optio ea velit dolorem est sint voluptate? Hic quas explicabo qui eveniet ullam quo impedit modi et similique dicta? Ex tenetur ipsa et voluptas voluptatem et odio facere aut unde veritatis.</div>

        </div>
      </div>
      
      <!-- Blocco: Immagine 1/2 a sinistra -->
       <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="lg:col-span-2 col-span-4 space-y-2">
          <img src="/effect-one/2.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
      </div>
      
      <!-- Blocco: Immagine 1/2 a destra -->
       <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="lg:col-span-2 lg:col-start-3 col-span-4 space-y-2">
          <img src="/effect-one/3.jpg" class="w-full"/>
          <div class="text-sm">Immagine boxata</div>
        </div>
      </div>

      <!-- Swiper index -->
      <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="col-span-4 space-y-2">
          <h3 class="h5">Index</h3>
          <ClientOnly>
            <swiper-container ref="swiperindexRef" class="w-full overflow-visible">
              <swiper-slide class="!w-fit"><img src="/effect-one/1.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/2.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/3.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/4.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/5.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/6.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/7.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/8.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/9.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
              <swiper-slide class="!w-fit"><img src="/effect-one/10.jpg" class="w-auto max-h-[160px] h-full"/></swiper-slide>
            </swiper-container>
          </ClientOnly>
        </div>
      </div>
        

      
      <!-- Project Footer content -->
      <div class="gsap-fade grid grid-cols-4 gap-[2px]">
        <div class="lg:col-span-2 lg:col-start-2 col-span-4 space-y-2">
          <h3 class="h5">{{ work?.title }}</h3>
          <div class="styled-content">
            <div>Made in 2022</div>
            <div>Commissioned by <NuxtLink target="_blank" to="#">Luceplan</NuxtLink></div>
          </div>
          <div class="styled-content">
            <div>Photo credits: <NuxtLink target="_blank" to="#">Marco Rossi</NuxtLink>, Achille Morandi, Francesca Taglioli</div>
          </div>
        </div>
      </div>
      
      
      
    </div>
  </main>
</template>