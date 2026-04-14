<script setup lang="ts">
    import HomeIcon from '@/assets/svg/home-icon.svg'

    const route = useRoute()
    const headerEl = useTemplateRef('headerEl')
    const dynamicSelector = useTemplateRef('dynamicSelector')
    const dynamicSelectorActive = useTemplateRef('dynamicSelectorActive')

    const selectorStyle = ref({ left: '0px', width: '0px' })
    const selectorActiveStyle = ref({ left: '0px', width: '0px' })

    const links = [
        { to: '/', label: null },  // home con icona
        { to: '/works', label: 'Works' },
        { to: '/studio', label: 'Studio' },
        { to: '/news', label: 'News' },
        { to: '/contacts', label: 'Contacts' },
    ]

    const getActiveLink = (): HTMLElement | null => {
    if (!headerEl.value) return null

    // match ESATTO
    let el = headerEl.value.querySelector<HTMLElement>(
        `[data-to="${route.path}"]`
    )

    if (el) return el

    // fallback: match parziale (per nested route)
    return Array.from(
        headerEl.value.querySelectorAll<HTMLElement>('[data-to]')
    ).find(el => {
        const to = el.dataset.to
        return to !== '/' && route.path.startsWith(to!)
    }) || null
    }

    const moveSelectorHover = (el: HTMLElement) => {
        const nav = headerEl.value
        const selector = dynamicSelector.value
        if (!nav || !selector) return

        const navRect = nav.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()

        selectorStyle.value = {
            left: `${elRect.left - navRect.left}px`,
            width: `${elRect.width}px`,
        }
    }

    const moveSelectorActive = (el: HTMLElement, animate = true) => {
        const nav = headerEl.value
        const selectorActive = dynamicSelectorActive.value
        if (!nav || !selectorActive) return

        const navRect = nav.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()

        if (!animate) {
            selectorActive.style.transition = 'none'
            selectorActiveStyle.value = {
                left: `${elRect.left - navRect.left}px`,
                width: `${elRect.width}px`,
            }
            
            nextTick(() => {
                selectorActive.style.transition = ''
            })
        } else {
            selectorActiveStyle.value = {
                left: `${elRect.left - navRect.left}px`,
                width: `${elRect.width}px`,
            }
        }
    }

    

    const onMouseEnter = (e: MouseEvent) => {
        moveSelectorHover(e.currentTarget as HTMLElement)
    }

    const onMouseLeave = () => {
        const active = getActiveLink()
        if (active) moveSelectorHover(active)
    }

    onMounted(() => {
        nextTick(() => {
            const active = getActiveLink()
            if (active) {
            moveSelectorHover(active)
            moveSelectorActive(active, false)
            }
        })
    })

    watch(() => route.path, () => {
    requestAnimationFrame(() => {
        const active = getActiveLink()
        if (!active) return

        moveSelectorActive(active)
    })
    })
</script>

<template>
  <nav
    ref="headerEl"
    class="flex items-center gap-1 relative w-fit font-normal text-black/60"
    @mouseleave="onMouseLeave"
  >
    <div
      ref="dynamicSelector"
      class="absolute h-full rounded-full bg-white/40 transition-all duration-300 ease-out pointer-events-none"
      :style="selectorStyle"
    />
    <div
      ref="dynamicSelectorActive"
      class="absolute h-full rounded-full bg-white transition-all duration-300 ease-out pointer-events-none"
      :style="selectorActiveStyle"
    />

    <NuxtLink
        v-for="link in links"
        :key="link.to"
        :data-to="link.to"
        :class="[
            link.to === '/'
            ? 'aspect-square p-3'
            : 'px-3 py-1 h-9',
            'rounded-full flex items-center justify-center relative z-10 leading-none'
        ]"
        :to="link.to"
        @mouseenter="onMouseEnter"
        >
        <HomeIcon v-if="link.to === '/'" class="w-3 h-3" />
        <span v-else>{{ link.label }}</span>
        </NuxtLink>
  </nav>
</template>