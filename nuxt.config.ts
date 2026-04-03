export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'v-gsap-nuxt'],
  css: ['~/assets/scss/main.scss'],
  googleFonts: {
    families: {
      "Space Grotesk": [400, 500, 600, 700]
    },
    display: 'swap'
  },
  logLevel: 'silent',
  app: {
    head: {
      title: 'Beconcept Nuxt Development',
      htmlAttrs: {
        lang: 'it',
      },
      meta: [
        { name: 'description', content: 'This is a Beconcept Nuxt development website made by Andrea Contesini. Shut the fuck up!' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
      ],
      bodyAttrs: {
        class: 'beconcept-body',
      },
    },
    pageTransition: { 
      name: 'fade', 
      mode: 'out-in',
      onLeave() {
        // kill eventuali trigger rimasti
        ScrollTrigger.getAll().forEach(t => t.kill())
      },

      onEnter() {
        // ricalcolo scroll
        ScrollTrigger.refresh()
      }
    },
    //layoutTransition: { name: 'slide', mode: 'out-in' },
  },

})