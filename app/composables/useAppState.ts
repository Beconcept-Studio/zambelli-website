export const useAppState = () => {
  const isFirstLoad = useState<boolean>('app:isFirstLoad', () => true)
  const markLoaded = () => {
    isFirstLoad.value = false
  }
  return { isFirstLoad, markLoaded }
}