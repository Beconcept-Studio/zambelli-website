export const useAppState = () => {
  const isFirstLoad = useState<boolean>('app:isFirstLoad', () => true)
  const markLoaded = () => {
    isFirstLoad.value = false
  }
  const headerClass = computed(() => ({
    'opacity-0': isFirstLoad.value,
    'invisible': isFirstLoad.value,
  }))


  return { isFirstLoad, markLoaded, headerClass }
}