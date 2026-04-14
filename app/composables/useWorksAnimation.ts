// composables/useWorksAnimation.ts
import { onMounted, onUnmounted } from 'vue'

interface UseWorksAnimationOptions {
  rootSelector: string
}

export function useWorksAnimation({ rootSelector }: UseWorksAnimationOptions) {
  const { $gsap: gsap, $Observer: Observer } = useNuxtApp()
  
  let container: HTMLElement | null = null
  let root: HTMLElement | null = null
  let observer: ReturnType<typeof Observer.create> | null = null

  // Flag per distinguere drag da click
  const isDragging = ref(false)
  let dragDistance = 0

  // useHead({
  //   htmlAttrs: { class: 'overflow-hidden h-[100dvh]' },
  //   bodyAttrs: { class: 'overflow-hidden h-[100dvh]' },
  // })

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

    const contentWidth = content.clientWidth
    const wrapX = gsap.utils.wrap(-contentWidth, 0)
    const xTo = gsap.quickTo(container, 'x', {
      duration: 1.5,
      ease: 'power4',
      modifiers: { x: gsap.utils.unitize(wrapX) },
    })

    const contentHeight = content.clientHeight
    const wrapY = gsap.utils.wrap(-contentHeight, 0)
    const yTo = gsap.quickTo(container, 'y', {
      duration: 1.5,
      ease: 'power4',
      modifiers: { y: gsap.utils.unitize(wrapY) },
    })

    let incrX = (window.innerWidth - contentWidth) / 2
    let incrY = (window.innerHeight - contentHeight) / 2
    gsap.set(container, { x: incrX, y: incrY })

    observer = Observer.create({
      target: root,
      type: 'wheel,touch,pointer',

      // Resetta il drag ad ogni nuovo pointer down
      onPress: () => {
        dragDistance = 0
        isDragging.value = false
      },

      onChangeX: (self) => {
        dragDistance += Math.abs(self.deltaX)
        // Soglia: 6px di movimento = è un drag, non un click
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

      // Reset al rilascio — ma con un tick di delay
      // così il @click del .media può leggere isDragging prima del reset
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
  })

  return {
    isDragging,
    pause:  () => observer && (observer.enabled = false),
    resume: () => observer && (observer.enabled = true),
  }
}