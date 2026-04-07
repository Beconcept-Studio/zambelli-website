export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  ssr: false,
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