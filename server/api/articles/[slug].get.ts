export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  const params = new URLSearchParams({
    'filters[slug][$eq]': slug!,
    populate: '*',
  })

  const res = await fetch(`${config.public.strapiUrl}/articles?${params}`, {
    headers: {
      Authorization: `Bearer ${config.strapiToken}`,
    },
  })

  if (!res.ok) throw createError({ statusCode: res.status, message: 'Strapi error' })

  const json = await res.json()
  const list = json.data ?? []
  if (list.length === 0) throw createError({ statusCode: 404, message: 'Article not found' })

  const raw = list[0]
  return raw.attributes ?? raw
})
