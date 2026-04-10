import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger)
export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(Observer)
  return {
    provide: {
      gsap,
      ScrollTrigger,
      Observer,
    },
  }
})