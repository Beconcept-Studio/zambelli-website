import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

interface UseGalleryAnimationOptions {
  rootSelector: string
  triggerDelta?: number
  onNavigate?: (slug: string) => void
}

export function useGalleryAnimation({
  rootSelector,
  triggerDelta = 400,
  onNavigate,
}: UseGalleryAnimationOptions) {
  const currentIndex = ref(0)
  let incr = 0
  let root: HTMLElement | null = null
  let imagesAll: HTMLDivElement[] = []
  const appendedImages = ref<HTMLDivElement[]>([])

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

    const clone = imagesAll[currentIndex.value].cloneNode(true) as HTMLDivElement
    const randomClass = classes[Math.floor(Math.random() * classes.length)]
    clone.classList.add(randomClass , 'single-medias')
    clone.style.visibility = 'visible'
    clone.style.pointerEvents = 'auto'
    clone.style.cursor = 'pointer'

    // Naviga al click usando il data-slug del clone
    if (onNavigate) {
      clone.addEventListener('click', () => {
        const slug = clone.dataset.slug
        if (slug) onNavigate(slug)
      })
    }

    root.appendChild(clone)
    appendedImages.value.push(clone)

    currentIndex.value = (currentIndex.value + 1) % imagesAll.length

    const tl = gsap.timeline()

    const isMobile = window.innerWidth < 768
    tl.fromTo(clone, {
      xPercent: -50 + (Math.random() - 0.5) * (isMobile ? 75 : 150),
      yPercent: -50 + (Math.random() - 0.5) * (isMobile ? 20 : 30),
      scaleX: 0.975,
      scaleY: 0.975,
    }, {
      scaleX: 1,
      scaleY: 1,
      ease: 'power4.out',
      duration: 0.25,
    })

    if (appendedImages.value.length > realCount) {
      const old = appendedImages.value.shift()!
      tl.to(old, {
        scaleX: 0.96,
        scaleY: 0.96,
        ease: 'power4.in',
        duration: 0.5,
        delay: 1,
        onComplete: () => root!.removeChild(old),
      })
    }
  }

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

    const elements = root.querySelectorAll<HTMLDivElement>('.medias > div')
    elements.forEach(el => imagesAll.push(el))

    handleWheel = (e: WheelEvent) => accumulate(Math.abs(e.deltaY))

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

    // Killa solo i tween degli elementi che abbiamo appendato
    appendedImages.value.forEach(el => gsap.killTweensOf(el))
    appendedImages.value = []
  })
}