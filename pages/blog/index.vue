<template>
  <div itemtype="https://schema.org/Blog" itemscope>
    <BlogHero :title="heading" :summary="description"></BlogHero>
    <v-container fluid style="max-width: 1785px">
      <v-row>
        <v-col
          v-for="item of items"
          :key="item.slug"
          class="d-flex flex-column"
          cols="12"
          md="6"
          lg="4"
        >
          <BlogCard v-bind="item" :image-color="item.color"></BlogCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import BlogCard from '~/components/blog-card.vue';
export default {
  components: {
    BlogCard,
  },
  async setup() {
    // const route = useRoute();
    // const draft = Boolean(route?.query?.draft);
    const { data: items } = await useAsyncData(
      'blog',
      () =>
        queryContent('blog')
          .where({ deleted_at: { $exists: false } })
          .sort({ date: -1 })
          .find(),
      {
        transform(data) {
          // const filtered = data.filter((item) => {
          //   return draft || !item.draft;
          // });
          return data.map((item) => {
            const slug = item._path.replace('/blog/', '');
            return {
              ...item,
              slug,
            };
          });
        },
      },
    );
    return {
      items,
    };
  },
  data() {
    return {
      heading: 'Articles',
      description: 'Repository of interesting articles',
      total: 0,
    };
  },
};
</script>
