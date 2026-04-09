<script setup lang="ts">
    import { onMounted } from 'vue'
    import gsap from 'gsap'
    
    let incr = 0
    let handleWheel
    onMounted(() => {
        const root = document.querySelector('.zambelli-gallery-home')
        
        if (!root) return
        
        const imagesAll = []
        
        const classes = [
            'size-one',
            'size-two',
            'size-three',
            'size-four',
            'size-five',
            'size-six',
            'size-seven'
        ]
        
        const elements = root.querySelectorAll('.medias img')
        elements.forEach((image, index) => {
            imagesAll.push(image.getAttribute('src')  || '')
            const randomClass = classes[Math.floor(Math.random() * classes.length)]!
            image.classList.add(randomClass)
        })

        handleWheel = (e) => {
            incr += Math.abs(e.deltaY)
            if (incr > 600) {
            console.log('TRIGGER 🔥')
            // newImage()
            incr = 0
            }
        }
        root.addEventListener('wheel', handleWheel, { passive: true })

        
        const randomIndex = Math.floor(Math.random() * classes.length),
        image = document.createElement("img")
        image.setAttribute('src', images[currentIndex])
        image.classList.add(classes[randomIndex])
        root.appendChild(image);


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

<style>
    body, html {
        overflow: hidden;
        height: 100dvh;
    }
</style>