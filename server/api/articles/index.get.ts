export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { limit } = getQuery(event)

  const query: Record<string, unknown> = {
    'filters[publishedAt][$notNull]': true,
    populate: '*',
    'sort[0]': 'publishedAt:desc',
  }
  if (limit) query['pagination[limit]'] = limit

  const res = await $fetch<{ data: any[] }>(
    `${config.public.strapiUrl}/articles`,
    {
      query,
      headers: { Authorization: `Bearer ${config.strapiToken}` },
    }
  )

  const strapiBase = config.public.strapiUrl.replace('/api', '')

  return res.data.map((raw) => {
    const a = raw.attributes ?? raw
    const rawUrl = a.cover?.url ?? a.cover?.data?.attributes?.url ?? null
    const coverUrl = rawUrl
      ? (rawUrl.startsWith('http') ? rawUrl : `${strapiBase}${rawUrl}`)
      : null

    return {
      slug: a.slug as string,
      title: a.title as string,
      excerpt: (a.excerpt ?? a.description ?? null) as string | null,
      coverUrl: coverUrl as string | null,
    }
  })
})
