<script setup lang="ts">
const { data: articles } = await useFetch('/api/articles', {
  query: { limit: 3 },
  key: 'articles-list',
})
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
                <div class="lg:col-span-4 col-span-12" v-for="article in (articles ?? [])" :key="article.slug">
                    <NuxtLink :to="`/articles/${article.slug}`" class="block border border-solid border-gray-200 rounded overflow-hidden h-full">
                        <div class="aspect-[2/1] bg-gray-300 w-full"></div>
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
