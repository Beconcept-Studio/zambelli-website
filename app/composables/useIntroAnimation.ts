import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

export const useIntroAnimation = () => {
  const { isFirstLoad, markLoaded } = useAppState()
  const { overlayRef } = useIntroOverlay() // ← singleton, niente inject

  const playHomeIntro = (): Promise<void> => {
    return new Promise((resolve) => {
      const el = overlayRef.value
      if (!el) return resolve()

      const logoItem = document.querySelector<HTMLElement>('#main-logo')
      const navItem = document.querySelector<HTMLElement>('#header-desktop')
      const titleEl = el.querySelector<HTMLElement>('.intro-slogan')
      const textEl = el.querySelector<HTMLElement>('.intro-text')
      const maskEl = el.querySelector<HTMLElement>('.intro-mask')
      const scrollEl = el.querySelector<HTMLElement>('.intro-scroll')
      if (!titleEl) return resolve()
      if (!textEl) return resolve()
      if (!maskEl) return resolve()
      if (!scrollEl) return resolve()

      const blurFrom = 6
      const blurStep = 5

      const tl = gsap.timeline({ onComplete: resolve })

      tl.set(logoItem, {
        y: -100,
        autoAlpha: 0,
      })
      tl.set(navItem, {
        y: 100,
        autoAlpha: 0,
      })
      
      tl.set(titleEl, {
        filter: `blur(${blurFrom}px)`,
      })
      tl.set(maskEl, {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
      })
      tl.to(titleEl, {
        autoAlpha: 1,
        duration: .5,
        ease: 'power3.out',
        delay: 1,
      })

      for (let i = 1; i <= blurStep; i++) {
        const percent = (i / blurStep) * 100
        const newBlur = blurFrom - (i / blurStep) * blurFrom
        tl.to(maskEl, {
          clipPath: `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`,
          duration: .75,
          ease: "expo.inOut",
        }, '>')
        tl.to(titleEl, {
          filter: `blur(${newBlur}px)`,
          duration: .75,
          ease: "expo.inOut",
        } , '<')
      }
      
      tl.to(textEl, {
        autoAlpha:0,
        duration: 0,
        ease: 'power3.out',
      })
      tl.to(maskEl, {
        yPercent: -50,
        duration: 1,
        ease: 'power3.out',
      }, '<')
      tl.to(scrollEl, {
        autoAlpha: 1,
        yPercent: 50,
        duration: 1,
        ease: 'power3.out',
      }, '<')
      
      
      
      tl.to(logoItem, {
        y: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power4.inOut',
      })
      tl.to(navItem, {
        y: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power4.inOut',
      } , '<')

      .to(el, {
        autoAlpha: 0,
        duration: 1,
        ease: 'power2.in',
        onComplete: function () {
          el.remove();
        }
      })
    })
  }

  const playDefaultIntro = (): Promise<void> => {
    return new Promise((resolve) => {
      const el = overlayRef.value
      if (!el) return resolve()

      const logoItem = document.querySelector<HTMLElement>('#main-logo')
      const navItem = document.querySelector<HTMLElement>('#header-desktop')
      const titleEl = el.querySelector<HTMLElement>('.intro-slogan')
      const textEl = el.querySelector<HTMLElement>('.intro-text')
      const maskEl = el.querySelector<HTMLElement>('.intro-mask')
      
      if (!titleEl) return resolve()
      if (!textEl) return resolve()
      if (!maskEl) return resolve()
      

      const blurFrom = 6
      const blurStep = 3

      const tl = gsap.timeline({ onComplete: resolve })

      tl.set(logoItem, {
        y: -100,
        autoAlpha: 0,
      })
      tl.set(navItem, {
        y: 100,
        autoAlpha: 0,
      })
      
      tl.set(titleEl, {
        filter: `blur(${blurFrom}px)`,
      })
      tl.set(maskEl, {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
      })
      tl.to(titleEl, {
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
      })

      for (let i = 1; i <= blurStep; i++) {
        const percent = (i / blurStep) * 100
        const newBlur = blurFrom - (i / blurStep) * blurFrom // scala da 6 → 0
        tl.to(maskEl, {
          clipPath: `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`,
          duration: .65,
          ease: 'power4.inOut',
        }, '>')
        tl.to(titleEl, {
          filter: `blur(${newBlur}px)`, // ← backtick
          duration: .5,
          ease: 'power4.inOut',
        } , '<')
      }
      
      tl.to(logoItem, {
        y: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power4.inOut',
      }, '>+=1')
      tl.to(navItem, {
        y: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power4.inOut',
      } , '<')

      .to(el, {
        autoAlpha: 0,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.in',
        onComplete: function () {
          el.remove();
          resolve
        }  
      }, '<')
    })
  }

  const runIntro = async (path: string): Promise<void> => {
    if (!isFirstLoad.value) return
    path === '/' ? await playHomeIntro() : await playDefaultIntro()
    markLoaded()
  }

  return { runIntro }
}