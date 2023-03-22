<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/portfolio/scuber.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <DataIterator :items="items" :loading="pending"></DataIterator>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
const heading = 'Portfolio';
const description = 'Explore demos and code for my projects.';
const route = useRoute();
const draft = route?.query?.draft;
const { data: items, pending } = await useAsyncData(
  'projects',
  () => queryContent('projects').sort({ startDate: -1 }).find(),
  {
    transform(data) {
      const filtered = data.filter((item) => {
        return !item.deletedAt && (item.startDate || draft);
      });
      const pageSlug = 'portfolio';
      const items = filtered.map((item) => {
        const slug = item._path?.replace('/projects/', '');
        return {
          ...item,
          id: item.slug,
          slug,
          url: item.offers ? `/${pageSlug}/${slug}` : item.url,
          image: `/img/${pageSlug}/${slug}.png`,
          imageColor: item.color,
          links: item.links.reverse(),
        };
      });
      // Move placeholder to start
      const last = 'placeholder';
      items.sort(function (x, y) {
        return x.slug === last ? 1 : y.slug === last ? -1 : 0;
      });
      return items;
    },
  },
);
</script>
