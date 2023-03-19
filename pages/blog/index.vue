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
    const { data: items } = await useAsyncData(
      'blog',
      () => queryContent('blog').sort({ date: -1 }).find(),
      {
        transform(data) {
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
      heading: 'Blog',
      description: "Damien Robinson's personal blog",
      total: 0,
    };
  },
  head() {
    return {
      title: this.heading,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        { hid: 'og:title', property: 'og:title', content: this.heading },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
      ],
    };
  },
};
</script>
