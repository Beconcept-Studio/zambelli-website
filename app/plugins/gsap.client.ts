import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger)
export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(Observer)
  return {
    provide: {
      gsap,
      ScrollTrigger,
      Observer,
      SplitText,
    },
  }
})