import { onMounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "gsap/SplitText"
import DrawSVGPlugin from "gsap/DrawSVGPlugin"
import MotionPathPlugin from "gsap/MotionPathPlugin"
let registered = false
export const useGsapPlugins = () => {
  onMounted(() => {
    if (!registered) {
      gsap.registerPlugin(
        ScrollTrigger,
        SplitText,
        DrawSVGPlugin,
        MotionPathPlugin
      )
      registered = true
      console.log("✅ GSAP plugins registered")
    }
  })
}