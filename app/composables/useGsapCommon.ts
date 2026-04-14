import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function useGsapCommon() {
  const initFade = () => {
    const elements = document.querySelectorAll('.gsap-fade')
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { 
            opacity: 0,
            filter: 'blur(4px)', 
            y: 32 
        },
        {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)', 
            duration: 3,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: el,
                //markers:true,
                start: 'top 75%',
            },
        }
      )
    })
  }
  const destroyFade = () => {
    ScrollTrigger.getAll().forEach((st) => st.kill())
  }
  onMounted(() => initFade())
  onUnmounted(() => destroyFade())
}