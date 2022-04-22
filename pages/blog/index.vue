<template>
  <div itemtype="https://schema.org/Blog" itemscope>
    <BlogHero
      :title="heading"
      summary="Damien Robinson's personal blog"
    ></BlogHero>
    <v-container fluid style="max-width: 1785px">
      <v-row>
        <v-col
          v-for="{
            slug,
            title,
            description,
            date,
            body,
            image,
            color,
          } of items"
          :key="slug"
          class="d-flex flex-column"
          cols="12"
          md="6"
          lg="4"
        >
          <BlogCard
            v-bind="{ slug, title, description, date, body, image }"
            :image-color="color"
          ></BlogCard>
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
  async asyncData({ $content }) {
    const items = await $content('blog').sortBy('date', 'desc').fetch();
    return {
      items,
    };
  },
  data() {
    return {
      heading: 'Blog',
      total: 0,
      items: [],
    };
  },
  head() {
    return {
      title: this.heading,
    };
  },
};
</script>
