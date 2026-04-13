export default defineNuxtRouteMiddleware((to, from) => {
  const worksToDetail = from.path === '/works' && to.path.startsWith('/works/')
  const detailToWorks = from.path.startsWith('/works/') && to.path === '/works'

  if (worksToDetail || detailToWorks) {
    to.meta.pageTransition = false
    from.meta.pageTransition = false
  }
})