export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: true,
  runtimeConfig: {
    strapiToken: process.env.STRAPI_TOKEN,
    public: {
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1338/api',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true, 
      routes: ['/', '/blog', '/single-post'],
    },
    preset: 'static' // oppure puoi ometterlo, viene rilevato da `nuxt generate`
  },
  hooks: {
    async 'nitro:config'(nitroConfig) {
      try {
        const routes = await fetchStrapiRoutes()
        console.log('Prerendering routes:', routes)

        nitroConfig.prerender ??= {}

        // routes potrebbe essere undefined: inizializzalo come array
        if (!Array.isArray(nitroConfig.prerender.routes)) {
          nitroConfig.prerender.routes = []
        }

        nitroConfig.prerender.routes.push(...routes)
      } catch (error) {
        console.error('Error fetching routes for prerendering:', error)
      }
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Alessandro Zambelli - Dove la materia incontra l\'anima', // default fallback title
      htmlAttrs: {
        lang: 'it',
      },
      meta: [
        { name: 'description', content: 'My amazing site.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/zambelli-fav.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' }
      ],
    },
  },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts' , 'nuxt-locomotive-scroll' , 'nuxt-swiper'],
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'global-builtin']
        },
      },
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/SplitText',
        'gsap/Observer',
        'marked',
      ]
    },
    plugins: [require('vite-svg-loader')()]
  },
})

async function fetchStrapiRoutes() {
  const res = await fetch(`${process.env.STRAPI_URL}/articles?fields=slug`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
  })
  const { data } = await res.json()
  console.log('Fetched routes from Strapi:', data)
  return data.map((item: any) => `/articles/${item.slug}`)

}