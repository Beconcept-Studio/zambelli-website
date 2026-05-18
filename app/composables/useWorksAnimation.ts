import { onMounted, onUnmounted } from 'vue'

interface UseWorksAnimationOptions {
  rootSelector: string
  initialOffset?: () => { x: number; y: number }  // ← ora è una funzione, chiamata dopo il layout
}

export function useWorksAnimation({ rootSelector, initialOffset }: UseWorksAnimationOptions) {
  const { $gsap: gsap, $Observer: Observer } = useNuxtApp()

  let container: HTMLElement | null = null
  let root: HTMLElement | null = null
  let observer: ReturnType<typeof Observer.create> | null = null

  const isDragging = ref(false)
  let dragDistance = 0

  onBeforeRouteLeave(() => {
    document.documentElement.classList.remove('overflow-hidden', 'h-[100dvh]')
    document.body.classList.remove('overflow-hidden', 'h-[100dvh]')
  })

  onMounted(async () => {
    await nextTick()

    root = document.querySelector(rootSelector)
    if (!root) return

    container = root.querySelector('.container') as HTMLElement
    const content = container.querySelector('.content') as HTMLElement

    // Attendi layout reale
    await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())))

    root.style.touchAction = 'none'           // ← dice al browser "non gestire tu il touch"
    root.style.userSelect  = 'none'           // ← evita selezione testo durante drag
    root.style.webkitUserSelect = 'none'      // ← Safari

    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overscrollBehavior            = 'none'

    const contentWidth  = content.clientWidth  + parseFloat(getComputedStyle(container).columnGap)
    const contentHeight = content.clientHeight + parseFloat(getComputedStyle(container).rowGap)

    const wrapX = gsap.utils.wrap(-contentWidth, 0)
    const wrapY = gsap.utils.wrap(-contentHeight, 0)

    const xTo = gsap.quickTo(container, 'x', {
      duration: 1.5,
      ease: 'power4',
      modifiers: { x: gsap.utils.unitize(wrapX) },
    })

    const yTo = gsap.quickTo(container, 'y', {
      duration: 1.5,
      ease: 'power4',
      modifiers: { y: gsap.utils.unitize(wrapY) },
    })

    // Chiamiamo initialOffset QUI, dopo il double RAF, quando il DOM è stabile
    const offset = initialOffset ? initialOffset() : null

    const rawX = offset ? offset.x : (window.innerWidth  - contentWidth)  / 2
    const rawY = offset ? offset.y : (window.innerHeight - contentHeight) / 2

    let incrX = wrapX(rawX)
    let incrY = wrapY(rawY)

    gsap.set(container, { x: incrX, y: incrY })

    observer = Observer.create({
      target: root,
      type: 'wheel,touch,pointer',
      preventDefault: true,

      onPress: () => {
        dragDistance = 0
        isDragging.value = false
      },

      onChangeX: (self) => {
        dragDistance += Math.abs(self.deltaX)
        if (dragDistance > 6) isDragging.value = true
        incrX += self.event.type === 'wheel' ? -self.deltaX : self.deltaX * 2
        xTo(incrX)
      },

      onChangeY: (self) => {
        dragDistance += Math.abs(self.deltaY)
        if (dragDistance > 6) isDragging.value = true
        incrY += self.event.type === 'wheel' ? -self.deltaY : self.deltaY * 2
        yTo(incrY)
      },

      onRelease: () => {
        setTimeout(() => {
          isDragging.value = false
          dragDistance = 0
        }, 50)
      },
    })
  })

  onUnmounted(() => {
    observer?.kill()
    if (root) {
      root.style.touchAction = ''
      root.style.userSelect  = ''
    }
    document.documentElement.style.overscrollBehavior = ''
    document.body.style.overscrollBehavior            = ''
  })

  return {
    isDragging,
    pause:  () => observer && (observer.enabled = false),
    resume: () => observer && (observer.enabled = true),
  }
}