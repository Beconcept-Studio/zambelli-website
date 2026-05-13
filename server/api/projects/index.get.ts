export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const res = await $fetch<{ data: unknown[] }>(
    `${config.public.strapiUrl}/projects`,
    {
      query: { populate: 'immagine_principale' },
      headers: { Authorization: `Bearer ${config.strapiToken}` },
    }
  )

  return res.data
})
