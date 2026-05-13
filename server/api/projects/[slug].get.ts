export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  const res = await $fetch<{ data: any[] }>(
    `${config.public.strapiUrl}/projects`,
    {
      query: {
        'filters[slug][$eq]': slug,
        populate: '*',
      },
      headers: { Authorization: `Bearer ${config.strapiToken}` },
    }
  )
  // console.log('res', res)

  if (!res.data?.length) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  const raw = res.data[0]
  const a = raw.attributes ?? raw
  if(a.dynamic_body_progetto) {
    //console.log('dynamic_body_progetto', a.dynamic_body_progetto)
  }
  return {
    slug: a.slug as string,
    titolo_progetto: a.titolo_progetto as string ?? null,
    tipo_progetto: a.tipo_progetto as string ?? null,
    anno_progetto: a.anno_progetto as string ?? null,
    commissionario_progetto: a.commissionario_progetto as string ?? null,
    info_progetto: a.info_progetto as string ?? null,
    immagine_principale: a.immagine_principale ?? null,
  }
})
