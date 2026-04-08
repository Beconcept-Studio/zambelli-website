<script setup lang="ts">
const route = useRoute()

const { data: article, error } = await useFetch(
  `/api/articles/${route.params.slug}`,
  { key: `article-${route.params.slug}` }
)
</script>
<template>
  <main class="verticalspace space-bottom">
    <section id="hero" class="">
      <div class="w-full bg-gray-200 min-h-[440px] flex items-center justify-center">
        <div class="div--container space-y-3">
          <div class="max-w-[820px] space-y-3">
            <h1 class="h3">{{ article?.title }}</h1>
            <div class="h5">Sed gravida dui velit, et dictum erat convallis tincidunt.
              Etiam dictum vel ipsum ac ultrices. Morbi eu mollis eros, nec ultricies felis. 
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="verticalspace-small">
      <div class="div--container-small">
        <div class="space-y-4">
          <h1 class="h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <div>
             Sed gravida dui velit, et dictum erat convallis tincidunt.
             Etiam dictum vel ipsum ac ultrices. Morbi eu mollis eros, nec ultricies felis. 
             Nam finibus rutrum ultricies. Vestibulum a nisl tincidunt ligula viverra accumsan eu vitae sapien. 
             Donec ac dignissim arcu. Curabitur dolor urna, convallis sed lectus tincidunt, congue ornare lacus. 
             Cras augue ligula, cursus a mi ut, tempor molestie magna. 
             Mauris tincidunt, sapien et rutrum sollicitudin, lacus purus suscipit quam, sed maximus erat metus in odio. 
             Sed non nibh sed lacus tincidunt vestibulum. Mauris laoreet vel lorem vel vulputate. 
             Vestibulum dapibus ullamcorper lorem non hendrerit.
          </div>
        </div>
      </div>
      <div class="div--container-small">
        <div class="space-y-4">
          <h1 class="h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <div>
             Sed gravida dui velit, et dictum erat convallis tincidunt.
             Etiam dictum vel ipsum ac ultrices. Morbi eu mollis eros, nec ultricies felis. 
             Nam finibus rutrum ultricies. Vestibulum a nisl tincidunt ligula viverra accumsan eu vitae sapien. 
             Donec ac dignissim arcu. Curabitur dolor urna, convallis sed lectus tincidunt, congue ornare lacus. 
             Cras augue ligula, cursus a mi ut, tempor molestie magna. 
             Mauris tincidunt, sapien et rutrum sollicitudin, lacus purus suscipit quam, sed maximus erat metus in odio. 
             Sed non nibh sed lacus tincidunt vestibulum. Mauris laoreet vel lorem vel vulputate. 
             Vestibulum dapibus ullamcorper lorem non hendrerit.
          </div>
        </div>
      </div>
      <div class="div--container-small">
        <div class="space-y-4">
          <h1 class="h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <div>
             Sed gravida dui velit, et dictum erat convallis tincidunt.
             Etiam dictum vel ipsum ac ultrices. Morbi eu mollis eros, nec ultricies felis. 
             Nam finibus rutrum ultricies. Vestibulum a nisl tincidunt ligula viverra accumsan eu vitae sapien. 
             Donec ac dignissim arcu. Curabitur dolor urna, convallis sed lectus tincidunt, congue ornare lacus. 
             Cras augue ligula, cursus a mi ut, tempor molestie magna. 
             Mauris tincidunt, sapien et rutrum sollicitudin, lacus purus suscipit quam, sed maximus erat metus in odio. 
             Sed non nibh sed lacus tincidunt vestibulum. Mauris laoreet vel lorem vel vulputate. 
             Vestibulum dapibus ullamcorper lorem non hendrerit.
          </div>
        </div>
      </div>
      <div class="div--container-small">
        <div class="space-y-4">
          <h1 class="h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <div>
             Sed gravida dui velit, et dictum erat convallis tincidunt.
             Etiam dictum vel ipsum ac ultrices. Morbi eu mollis eros, nec ultricies felis. 
             Nam finibus rutrum ultricies. Vestibulum a nisl tincidunt ligula viverra accumsan eu vitae sapien. 
             Donec ac dignissim arcu. Curabitur dolor urna, convallis sed lectus tincidunt, congue ornare lacus. 
             Cras augue ligula, cursus a mi ut, tempor molestie magna. 
             Mauris tincidunt, sapien et rutrum sollicitudin, lacus purus suscipit quam, sed maximus erat metus in odio. 
             Sed non nibh sed lacus tincidunt vestibulum. Mauris laoreet vel lorem vel vulputate. 
             Vestibulum dapibus ullamcorper lorem non hendrerit.
          </div>
        </div>
      </div>
    </section>
  </main>
</template>