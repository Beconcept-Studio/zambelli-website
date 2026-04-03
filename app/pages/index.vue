<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { gsap } from "gsap"
import { useGsapPlugins } from "~/composables/useGsapPlugins"
const box = ref<HTMLElement | null>(null)
let ctx: any
useGsapPlugins()
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(box.value, { 
      opacity: 0, 
      y: 50, 
      duration: 1,
      scrollTrigger: {
        trigger: box.value,
        markers:true,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
      }
     })
  })
})
onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <main>
    <div id="images"></div>
    <div class="h-[100vh] bg-blue-300"></div>
    <div ref="box" class="py-3 max-w-2xl mx-auto">
      <h1 class="text-5xl">Hello World</h1>
      <div class="text-lg ">They see me animating</div>
    </div>
    <div class="h-[100vh] bg-red-300"></div>
    <div class="h-[100vh] bg-green-300"></div>
  </main>
</template>