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
      routes: ['/', '/blog', '/effect-one', '/single-post'],
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
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //additionalData: '@use "~/assets/scss/_variables.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
      ]
    }
  },
  googleFonts: {
    families: {
      Roboto: true,
    }
  }
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