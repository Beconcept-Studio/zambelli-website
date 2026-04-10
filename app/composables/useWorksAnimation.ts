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
    
    onMounted(() => {
        document.documentElement.classList.add('overflow-hidden')
        document.body.classList.add('overflow-hidden')
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
            target: window,
            type: "wheel,touch,pointer", // Handles wheel, touch, and drag
            onChangeX: (self) => {
                if(self.event.type === "wheel")
                    incrX -= self.deltaX
                else
                    incrX += self.deltaX * 2

                xTo(incrX) // smoothly animate to the new x position

                console.log('incrX', incrX);
            },
            onChangeY: (self) => {
                if(self.event.type === "wheel")
                    incrY -= self.deltaY // Update incrY based on the vertical movement
                else 
                    incrY += self.deltaY * 2

                yTo(incrY) // Smoothly animate to the new y position

                console.log('incrY', incrY);
            }
        })
        
    

    })
    onUnmounted(() => {
      document.documentElement.classList.remove('overflow-hidden')
      document.body.classList.remove('overflow-hidden')
      observer?.kill()
    })

};