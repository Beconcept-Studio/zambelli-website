import { onMounted, onUnmounted, ref } from 'vue'
interface UseWorksAnimationOptions {
  rootSelector: string
}
export function useWorksAnimation({
  rootSelector,
}: UseWorksAnimationOptions) {
    let container: HTMLElement | null = null
    let root: HTMLElement | null = null
    const { $gsap: gsap, $Observer: Observer } = useNuxtApp()
    let observer;

    // Aggiunge le classi quando la pagina è attiva
    useHead({
        htmlAttrs: { class: 'overflow-hidden h-[100dvh]' },
        bodyAttrs: { class: 'overflow-hidden h-[100dvh]' },
    })

    // Rimuove le classi PRIMA che la transizione di uscita parta
    onBeforeRouteLeave(() => {
        document.documentElement.classList.remove('overflow-hidden', 'h-[100dvh]')
        document.body.classList.remove('overflow-hidden', 'h-[100dvh]')
    })

    onMounted( async () => {
        await nextTick()
        const { $gsap: gsap, $Observer: Observer } = useNuxtApp()

        root = document.querySelector(rootSelector)
        if (!root) return

        container = root.querySelector('.container')as HTMLElement
        const content = container.querySelector('.content') as HTMLElement
        
        const contentWidth = content.clientWidth
        const wrapX = gsap.utils.wrap(-contentWidth, 0)

        const xTo = gsap.quickTo(container, 'x', {
            duration: 1.5, // Will change over 1.5s
            ease: "power4", // Non-linear
            modifiers: {
                x: gsap.utils.unitize(wrapX)
            }
        })
        
        const contentHeight = content.clientHeight
        const wrapY = gsap.utils.wrap(-contentHeight, 0)
        const yTo = gsap.quickTo(container, 'y', {
            duration: 1.5, // Will change over 1.5s
            ease: "power4", // Non-linear
            modifiers: {
                y: gsap.utils.unitize(wrapY)
            }
        })

        let incrX = 0, incrY = 0;
    
        observer = Observer.create({
            target: root,
            type: "wheel,touch,pointer", // Handles wheel, touch, and drag
            onChangeX: (self) => {
                if(self.event.type === "wheel")
                    incrX -= self.deltaX
                else
                    incrX += self.deltaX * 2

                xTo(incrX) // smoothly animate to the new x position
            },
            onChangeY: (self) => {
                if(self.event.type === "wheel")
                    incrY -= self.deltaY // Update incrY based on the vertical movement
                else 
                    incrY += self.deltaY * 2

                yTo(incrY) // Smoothly animate to the new y position
            }
        })
        
    

    })
    onUnmounted(() => {
      observer?.kill()
    })

};