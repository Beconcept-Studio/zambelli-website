<script setup lang="ts">
    const { overlayRef } = useIntroOverlay()
    const overlayEl = useTemplateRef('overlayEl')
    const route = useRoute()
    const { runIntro } = useIntroAnimation()

    onMounted(async () => {
        overlayRef.value = overlayEl.value
        await runIntro(route.path)
    })
</script>
<template>
    <div ref="overlayEl" class="intro-overlay fixed inset-0 z-[999] bg-white flex items-center justify-center text-center">
        <div class="">
            <div class="intro-slogan relative opacity-0 invisible font-medium">
                <div class="intro-text text-gray-500">Dove la materia incontra l'anima</div>
                <div class="intro-mask absolute inset-0 w-full h-full text-black">Dove la materia incontra l'anima</div>
            </div>
        </div>
    </div>
</template>