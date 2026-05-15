<template>
  <div class="space-y-4" v-html="rendered" />
</template>

<script setup>
import MarkdownIt from 'markdown-it'

const props = defineProps({
  content: { type: String, required: true }
})

const md = new MarkdownIt()

// Mappa H1→H2, H2→H4, ecc.
const headingMap = { 
    1: 'text-extra', 
    2: 'text-big', 
    3: 'text-large', 
    4: 'text-basic', 
    5: 'text-small', 
    6: 'text-small', 
}

md.renderer.rules.heading_open = (tokens, idx) => {
  const level = parseInt(tokens[idx].tag.slice(1))
  const mappedLevel = headingMap[level]
  return `<div class="${mappedLevel}">`
}

md.renderer.rules.heading_close = () => `</div>`

const rendered = computed(() => md.render(props.content))
</script>