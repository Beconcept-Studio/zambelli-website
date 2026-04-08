export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const query = getQuery(event)
  const limit = query.limit ? Number(query.limit) : undefined

  const params = new URLSearchParams({
    'filters[publishedAt][$notNull]': 'true',
    populate: '*',
    'sort[0]': 'publishedAt:desc',
  })

  if (limit) params.set('pagination[limit]', String(limit))

  const res = await fetch(`${config.public.strapiUrl}/articles?${params}`, {
    headers: {
      Authorization: `Bearer ${config.strapiToken}`,
    },
  })

  if (!res.ok) throw createError({ statusCode: res.status, message: 'Strapi error' })

  const json = await res.json()
  return (json.data ?? []).map((raw: any) => raw.attributes ?? raw)
})
