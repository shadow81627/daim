<template>
  <div>
    <BlogHero
      :title="item.title"
      :summary="item.description"
      :src="item.image"
      :credit="item.image && item.credit ? item.credit : {}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <div class="body-1" itemprop="articleBody">
            <nuxt-content :document="item" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
export default {
  async asyncData({ route, error }) {
    try {
      const item = await queryContent('pitches/' + route.params.slug).findOne();
      return { item };
    } catch {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    item: {},
  }),
  head() {
    const image = `${this.$config.BASE_URL}${this.$img(
      this.item.image || '/img/blog.jpg',
      {
        width: 1280,
        height: 630,
      },
    )}`;
    return {
      title: this.item.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.item.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.item.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.item.description,
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
      ],
      script: [
        {
          json: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: this.item.title,
            description: this.item.description,
            image: {
              '@type': 'ImageObject',
              url: `${this.$config.BASE_URL}${image.image}`,
              width: image.width,
              height: image.height,
            },
            datePublished: this.item.date,
            dateModified: this.item.date,
          },
          type: 'application/ld+json',
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
  },
};
</script>
