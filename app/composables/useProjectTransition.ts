export const useProjectTransition = () => {
  const rect = useState<DOMRect | null>('pt-rect', () => null)
  const src  = useState<string | null>('pt-src',  () => null)

  const capture = (mediaEl: HTMLElement, imgSrc: string) => {
    const img = mediaEl.querySelector('img')
    rect.value = img ? img.getBoundingClientRect() : mediaEl.getBoundingClientRect()
    src.value  = imgSrc
  }

  const clear = () => {
    rect.value = null
    src.value  = null
  }

  return { rect, src, capture, clear }
}