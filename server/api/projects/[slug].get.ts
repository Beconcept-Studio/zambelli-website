import qs from 'qs'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')


  const res = await $fetch<{ data: any[] }>(
  `${config.public.strapiUrl}/projects`,
  {
    query: {
      'filters[slug][$eq]': slug,
      'populate[immagine_principale][populate]': '*',
      'populate[dynamic_body_progetto][populate]': '*',
    },
    headers: { Authorization: `Bearer ${config.strapiToken}` },
  }
)

  if (!res.data?.length) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  const raw = res.data[0]
  const a = raw.attributes ?? raw

  //console.log('dynamic_body_progetto', JSON.stringify(a.dynamic_body_progetto, null, 2))

  return {
    slug: a.slug as string,
    titolo_progetto: a.titolo_progetto as string ?? null,
    tipo_progetto: a.tipo_progetto as string ?? null,
    anno_progetto: a.anno_progetto as string ?? null,
    commissionario_progetto: a.commissionario_progetto as string ?? null,
    info_progetto: a.info_progetto as string ?? null,
    immagine_principale: a.immagine_principale ?? null,
    dynamic_body_progetto: a.dynamic_body_progetto ?? [],
    testo_link_esterno: a.testo_link_esterno ?? null,
    url_link_esterno: a.url_link_esterno ?? null,
  }
})