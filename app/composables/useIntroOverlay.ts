// Ref singleton — condiviso tra app.vue e il composable
const overlayRef = shallowRef<HTMLElement | null>(null)

export const useIntroOverlay = () => {
  return { overlayRef }
}