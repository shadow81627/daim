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
          <BlogCard v-bind="item"></BlogCard>
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
      'pitches',
      () => queryContent('pitches').find(),
      {
        transform(data) {
          return data.map((item) => {
            const slug = item._path.replace('/pitches/', '');
            return {
              ...item,
              name: item.title,
              imageColor: item.color,
              path: '/pitches/',
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
      heading: 'Pitches',
      description: "Damien Robinson's pitches",
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
