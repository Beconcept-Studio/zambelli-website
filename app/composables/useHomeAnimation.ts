import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
interface UseGalleryAnimationOptions {
  rootSelector: string
  triggerDelta?: number
}

export function useGalleryAnimation({
  rootSelector,
  triggerDelta = 500
}: UseGalleryAnimationOptions) {
  const currentIndex = ref(0)
  let incr = 0
  let handleWheel: (e: WheelEvent) => void
  let root: HTMLElement | null = null
  let imagesAll: HTMLImageElement[] = []
  const appendedImages = ref<HTMLImageElement[]>([])

  const classes = [
    'size-one',
    'size-two',
    'size-three',
    'size-four',
    'size-five',
    'size-six',
  ]

  function newImage() {
    if (!imagesAll.length || !root) return

    
    const MAX_ELEMENTS = 6
    const realCount = Math.min(imagesAll.length, MAX_ELEMENTS)

    const image = imagesAll[currentIndex.value].cloneNode(true) as HTMLImageElement
    const randomClass = classes[Math.floor(Math.random() * classes.length)]
    image.classList.add(randomClass)
    root.appendChild(image)
    appendedImages.value.push(image)

    currentIndex.value = (currentIndex.value + 1) % imagesAll.length

    const tl = gsap.timeline()

    tl.fromTo(image, {
      xPercent: -50 + (Math.random() - 0.5) * 150,
      yPercent: -50 + (Math.random() - 0.5) * 30,
      rotation: (Math.random() - 0.5) * 20,
      scaleX: 1.025,
      scaleY: 1.1,
      filter: "blur(10px)",
    }, {
      scaleX: 1,
      scaleY: 1,
      filter: "blur(0px)",
      ease: 'power4.out',
      duration: 0.5
    })

    if (appendedImages.value.length > realCount) {
      const oldImage = appendedImages.value.shift()!
      tl.to(oldImage, {
        scaleX: 0.96,
        scaleY: 0.96,
        ease: 'power4.in',
        duration: 0.5,
        delay: 1,
        onComplete: () => root!.removeChild(oldImage)
      })
    }

    
    console.log(currentIndex.value)
  }

  // Aggiunge le classi quando la pagina è attiva
  useHead({
    htmlAttrs: { class: 'overscroll-none height-[100dvh]' },
    bodyAttrs: { class: 'overscroll-none height-[100dvh]' },
  })

  // Rimuove le classi PRIMA che la transizione di uscita parta
  onBeforeRouteLeave(() => {
    document.documentElement.classList.remove('overscroll-none' , 'height-[100dvh]')
    document.body.classList.remove('overscroll-none' , 'height-[100dvh]')
  })


  onMounted(() => {
    
    root = document.querySelector(rootSelector)
    if (!root) return

    const elements = root.querySelectorAll<HTMLImageElement>('.medias img')

    elements.forEach(img => {
      const src = img.getAttribute('src')
      if (!src) return

      const preloaded = new Image()
      preloaded.src = src
      imagesAll.push(preloaded)

      const randomClass = classes[Math.floor(Math.random() * classes.length)]
      img.classList.add(randomClass)
    })

    let ticking = false
    handleWheel = (e: WheelEvent) => {
      incr += Math.abs(e.deltaY)
      if (!ticking) {
        requestAnimationFrame(() => {
          if (incr > triggerDelta) {
            newImage()
            incr = 0
          }
          ticking = false
        })
        ticking = true
      }
    }

    root.addEventListener('wheel', handleWheel, { passive: true })
  })

  onUnmounted(() => {
    
    if (root && handleWheel) root.removeEventListener('wheel', handleWheel)
    gsap.killTweensOf("*")
  })
}