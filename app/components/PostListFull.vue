<script setup lang="ts">
const config = useRuntimeConfig()

const { data: articlesData } = await useFetch(
  `${config.public.strapiUrl}/articles`,
  {
    query: {
      'filters[publishedAt][$notNull]': true,
      populate: '*',
      'sort[0]': 'publishedAt:desc',
    },
    headers: {
      Authorization: `Bearer ${config.strapiToken}`,
    },
    key: 'articles-list-full',
  }
)

const articles = computed(() => {
  const list = articlesData.value?.data
  if (!list) return []
  return list.map((raw: any) => raw.attributes ?? raw)
})
console.log('Fetched articles for PostListFull:', articles.value)

const strapiBase = config.public.strapiUrl.replace('/api', '')

function getCoverUrl(article: any): string | null {
  // Strapi v5
  const urlV5 = article.cover?.url
  if (urlV5) return urlV5.startsWith('http') ? urlV5 : `${strapiBase}${urlV5}`
  // Strapi v4
  const urlV4 = article.cover?.data?.attributes?.url
  if (urlV4) return urlV4.startsWith('http') ? urlV4 : `${strapiBase}${urlV4}`
  return null
}
</script>
<template>
    <section id="post-list" class="verticalspace-small">
        <div class="div--container">
            <div class="space-y-3">
                <h3 class="h4">Latest blog posts</h3>
                <div class="">Sed gravida dui velit, et dictum erat convallis tincidunt. Etiam dictum vel ipsum ac ultrices. Morbi eu mollis eros, nec ultricies felis.
            </div>
          </div>
        </div>
        <div class="div--container">
            <div class="common--grid">
                <div class="lg:col-span-4 col-span-12" v-for="article in articles" :key="article.slug">
                    <NuxtLink :to="`/articles/${article.slug}`" class="block border border-solid border-gray-200 rounded overflow-hidden h-full">
                        <div
                          class="aspect-[2/1] bg-gray-300 w-full bg-cover bg-center"
                          :style="getCoverUrl(article) ? `background-image: url('${getCoverUrl(article)}')` : ''"
                        ></div>
                        <div class="space-y-3 p-3">
                            <h5 class="uppercase font-medium">{{ article.title }}</h5>
                            <div class="text-sm text-gray-600">{{ article.excerpt ?? article.description }}</div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
