export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  // strapiUrl già include /api, quindi partiamo direttamente da /work
  const data = await $fetch(
    `${config.public.strapiUrl}/work?populate[featured_work_one][populate]=*&populate[featured_work_two][populate]=*`
  )

  // Log completo della risposta grezza
  //console.log('RAW STRAPI RESPONSE:', JSON.stringify(data, null, 2))


  const pageData = (data as any)?.data ?? {}

  const normalizeProject = (raw: any) => {
    if (!raw) return null
    return {
      id: raw.id,
      slug: raw.slug,
      titolo_progetto: raw.titolo_progetto,
      immagine_principale: raw.immagine_principale
        ? {
            url: raw.immagine_principale.url,
            alternativeText: raw.immagine_principale.alternativeText,
            width: raw.immagine_principale.width,
            height: raw.immagine_principale.height,
          }
        : null,
    }
  }

  return {
    featured_work_one: normalizeProject(pageData.featured_work_one),
    featured_work_two: normalizeProject(pageData.featured_work_two),
  }
})