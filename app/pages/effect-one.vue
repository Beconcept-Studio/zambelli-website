<script setup lang="ts">
    import { onMounted, onUnmounted } from 'vue'
    import gsap from 'gsap'

    let currentIndex = 0
    let incr = 0
    let handleWheel: (e: WheelEvent) => void

    onMounted(() => {
        // Blocca scroll della pagina
        document.documentElement.classList.add('overflow-hidden', 'h-[100dvh]')
        document.body.classList.add('overflow-hidden', 'h-[100dvh]')

        const root = document.querySelector('.zambelli-gallery-home')
        if (!root) return

        // Preload immagini e assegna classi casuali agli elementi esistenti
        const classes = [
            'size-one',
            'size-two',
            'size-three',
            'size-four',
            'size-five',
            'size-six',
            'size-seven'
        ]

        const elements = root.querySelectorAll<HTMLImageElement>('.medias img')
        const imagesAll: HTMLImageElement[] = []

        elements.forEach(img => {
            const src = img.getAttribute('src')
            if (!src) return
            const preloaded = new Image()
            preloaded.src = src
            imagesAll.push(preloaded)
            const randomClass = classes[Math.floor(Math.random() * classes.length)]
            img.classList.add(randomClass)
        })

        // Funzione per creare e animare nuova immagine
        function newImage() {
            if (!imagesAll.length) return

            const image = imagesAll[currentIndex].cloneNode(true) as HTMLImageElement
            const randomClass = classes[Math.floor(Math.random() * classes.length)]
            image.classList.add(randomClass)
            root.appendChild(image)

            // Timeline GSAP
            const tl = gsap.timeline({
            onComplete: () => root.removeChild(image)
            })

            tl.fromTo(image, {
            xPercent: -50 + (Math.random() - 0.5) * 150,
            yPercent: -50 + (Math.random() - 0.5) * 30,
            rotation: (Math.random() - 0.5) * 20,
            scaleX: 1.05,
            scaleY: 1.2
            }, {
            scaleX: 1,
            scaleY: 1,
            ease: 'power4.out',
            duration: 0.15
            })
            .to(image, {
            scaleX: 0.96,
            scaleY: 0.96,
            ease: 'power4.in',
            duration: 0.15,
            delay: 2
            })

            // Aggiorna indice corrente
            currentIndex = (currentIndex + 1) % imagesAll.length
        }

        // Scroll handler ottimizzato con requestAnimationFrame
        let ticking = false
        handleWheel = (e: WheelEvent) => {
            incr += Math.abs(e.deltaY)
            if (!ticking) {
            requestAnimationFrame(() => {
                if (incr > 600) {
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
        document.documentElement.classList.remove('overflow-hidden', 'h-[100dvh]')
        document.body.classList.remove('overflow-hidden', 'h-[100dvh]')

        const root = document.querySelector('.zambelli-gallery-home')
        if (root && handleWheel) root.removeEventListener('wheel', handleWheel)

        // Rimuove eventuali animazioni ancora in corso
        gsap.killTweensOf("*")
    })
</script>

<template>
    <section class="overflow-hidden h-[100dvh] zambelli-gallery-home">
        <div class="medias">
            <img src="/effect-one/1.jpg" alt="">
            <img src="/effect-one/2.jpg" alt="">
            <img src="/effect-one/3.jpg" alt="">
            <img src="/effect-one/4.jpg" alt="">
            <img src="/effect-one/5.jpg" alt="">
            <img src="/effect-one/6.jpg" alt="">
            <img src="/effect-one/7.jpg" alt="">
        </div>
    </section>
</template>