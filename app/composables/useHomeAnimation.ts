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
  let root: HTMLElement | null = null
  let imagesAll: HTMLImageElement[] = []
  const appendedImages = ref<HTMLImageElement[]>([])

  let handleWheel: (e: WheelEvent) => void
  let handleTouchStart: (e: TouchEvent) => void
  let handleTouchMove: (e: TouchEvent) => void

  let touchStartX = 0
  let touchStartY = 0
  let ticking = false

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

    const MAX_ELEMENTS = 12
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
      filter: 'blur(10px)',
    }, {
      scaleX: 1,
      scaleY: 1,
      filter: 'blur(0px)',
      ease: 'power4.out',
      duration: 0.5,
    })

    if (appendedImages.value.length > realCount) {
      const oldImage = appendedImages.value.shift()!
      tl.to(oldImage, {
        scaleX: 0.96,
        scaleY: 0.96,
        ease: 'power4.in',
        duration: 0.5,
        delay: 1,
        onComplete: () => root!.removeChild(oldImage),
      })
    }
  }

  // Logica accumulatore condivisa tra wheel e touch
  function accumulate(delta: number) {
    incr += delta

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

  useHead({
    htmlAttrs: { class: 'overscroll-none height-[100dvh]' },
    bodyAttrs: { class: 'overscroll-none height-[100dvh]' },
  })

  onBeforeRouteLeave(() => {
    document.documentElement.classList.remove('overscroll-none', 'height-[100dvh]')
    document.body.classList.remove('overscroll-none', 'height-[100dvh]')
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

    handleWheel = (e: WheelEvent) => {
      accumulate(Math.abs(e.deltaY))
    }

    handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }

    handleTouchMove = (e: TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - touchStartX)
      const dy = Math.abs(e.touches[0].clientY - touchStartY)

      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY

      accumulate(Math.max(dx, dy))
    }

    root.addEventListener('wheel', handleWheel, { passive: true })
    root.addEventListener('touchstart', handleTouchStart, { passive: true })
    root.addEventListener('touchmove', handleTouchMove, { passive: true })
  })

  onUnmounted(() => {
    if (root && handleWheel)      root.removeEventListener('wheel', handleWheel)
    if (root && handleTouchStart) root.removeEventListener('touchstart', handleTouchStart)
    if (root && handleTouchMove)  root.removeEventListener('touchmove', handleTouchMove)
    gsap.killTweensOf('*')
  })
}