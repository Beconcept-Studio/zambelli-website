export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: true,
  runtimeConfig: {
    strapiToken: '',
    public: {
      strapiUrl: 'http://localhost:1338/api',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/contact', '/articles', '/api/articles'],
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      try {
        const slugs = await fetchPublishedSlugs()
        console.log('Prerendering routes:', slugs)

        nitroConfig.prerender ??= {}
        if (!Array.isArray(nitroConfig.prerender.routes)) {
          nitroConfig.prerender.routes = []
        }

        for (const slug of slugs) {
          nitroConfig.prerender.routes.push(`/articles/${slug}`)
          nitroConfig.prerender.routes.push(`/api/articles/${slug}`)
        }
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

async function fetchPublishedSlugs(): Promise<string[]> {
  const base = process.env.STRAPI_URL ?? 'http://localhost:1338/api'
  const res = await fetch(`${base}/articles?fields=slug&filters[publishedAt][$notNull]=true`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
  })
  const { data } = await res.json()
  return data.map((item: any) => item.slug ?? item.attributes?.slug)
}