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
  console.log('res', res)

  if (!res.data?.length) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  const raw = res.data[0]
  const a = raw.attributes ?? raw
  if(a.dynamic_body_progetto) {
    console.log('dynamic_body_progetto', a.dynamic_body_progetto)
  }
  return {
    slug: a.slug as string,
    title: a.title as string,
    excerpt: (a.excerpt ?? a.description ?? null) as string | null,
  }
})
