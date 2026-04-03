<template>
  <main>
    <div id="grid" class="absolute top-0 left-0 grid">
        <div
        v-for="(cell, index) in cells"
        :key="index"
        class="bg-cover bg-center"
        :style="{ width: cellSize + 'px', height: cellSize + 'px', backgroundImage: `url(${cell})` }"
        ></div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'nofooter',
})
import { ref, onMounted, onBeforeUnmount } from "vue"
import { gsap } from "gsap"
import { useGsapPlugins } from "~/composables/useGsapPlugins"

const grid = ref(null)
const cellSize = 200
let rows = 5
let cols = 5

const cells = []
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    cells.push(`https://picsum.photos/${cellSize}?random=${x + y * cols}`)
  }
}
let posX = 0
let posY = 0
onMounted(() => {
  // imposta grid dinamicamente
  grid.value.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`
  grid.value.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`

  // scroll bidirezionale con mouse/trackpad
  window.addEventListener('wheel', (e) => {
    posX += e.deltaX
    posY += e.deltaY
    updateGrid()
  })

  // resize per griglia fullscreen
  window.addEventListener('resize', () => {
    rows = Math.ceil(window.innerHeight / cellSize) + 2
    cols = Math.ceil(window.innerWidth / cellSize) + 2
    grid.value.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`
    grid.value.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`
  })
})
function updateGrid() {
  const wrapX = gsap.utils.wrap(-cellSize, cellSize * cols)
  const wrapY = gsap.utils.wrap(-cellSize, cellSize * rows)
  gsap.set(grid.value, { x: wrapX(posX), y: wrapY(posY) })
}
onBeforeUnmount(() => {
  ctx?.revert()
})
</script>