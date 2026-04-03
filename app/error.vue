<script setup lang="ts">
import type { NuxtError } from '#app'
// Ricevo i dettagli dell'errore da Nuxt
const props = defineProps<{error: NuxtError}>()
// Posso stampare l'errore in console per capire cosa è successo
console.error("Si è rotto qualcosa!", props.error)
</script>

<template class="h-screen w-screen overflow-hidden">
    <div class="h-screen w-screen p-4 flex flex-col gap-4 items-center justify-center">
        <div class="font-bold text-[40vw] text-center leading-[.8]">{{ error.status }}</div>
        <div class="text-center font-medium">{{ error.statusText }}</div>
        <NuxtLink class="rounded-full bg-black text-white px-6 py-3 text-sm hover:bg-gray-700 transition-all duration-300" to="/">Torna alla Home</NuxtLink>
    </div>
</template>