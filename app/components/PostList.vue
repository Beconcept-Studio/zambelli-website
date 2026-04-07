<script setup lang="ts">
    import { ref } from 'vue'
    const items = ref([
            { title: 'Post uno' , exc: 'Sed gravida dui velit, et dictum erat convallis tincidunt. Morbi eu mollis eros, nec ultricies felis. Nam finibus rutrum ultricies. Etiam dictum vel ipsum ac ultrices.' },
            { title: 'Post due' , exc: 'Morbi eu mollis eros, nec ultricies felis. Nam finibus rutrum ultricies. Sed gravida dui velit, et dictum erat convallis tincidunt. Nam finibus rutrum ultricies.' },
            { title: 'Post tre' , exc: 'Sed gravida dui velit, et dictum erat convallis tincidunt. Vestibulum a nisl tincidunt ligula viverra accumsan eu vitae sapien. Morbi eu mollis eros, nec ultricies felis.' },
        ])
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
                <div class="lg:col-span-4 col-span-12" v-for="item in items">
                    <a href="#" class="block border border-solid border-gray-200 rounded overflow-hidden h-full">
                        <div class="aspect-[2/1] bg-gray-300 w-full"></div>
                        <div class="space-y-3 p-3">
                            <h5 class="uppercase font-medium">{{ item.title }}</h5>
                            <div class="text-sm text-gray-600">{{ item.exc }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>