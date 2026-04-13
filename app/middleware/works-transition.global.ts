export default defineNuxtRouteMiddleware((to, from) => {
  const worksToDetail = from.path === '/works' && to.path.startsWith('/works/')
  const detailToWorks = from.path.startsWith('/works/') && to.path === '/works'
  const detailToEver = from.path.startsWith('/works/') && to.path !== '/works'

  if (worksToDetail) {
    to.meta.pageTransition = false
    from.meta.pageTransition = false
  }
  if (detailToWorks) {
    to.meta.pageTransition = true
    from.meta.pageTransition = true
  }
  if (detailToEver) {
    to.meta.pageTransition = true
    from.meta.pageTransition = true
  }
})