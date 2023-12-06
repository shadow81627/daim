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
          <div class="text-body-1" itemprop="articleBody">
            <ContentDoc
              :path="path"
              class="prose mx-auto text-base prose-truegray xl:text-xl"
              itemprop="articleBody"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
  async setup() {
    const route = useRoute();
    const path = 'pitches/' + route.params.slug;
    try {
      const item = await queryContent(path).findOne();
      return { item, path };
    } catch {
      createError({ statusCode: 404 });
    }
  },
  data: () => ({
    item: {},
  }),
  head() {
    const img = useImage();
    const image = `${this.$config.public.BASE_URL}${img(
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
              url: `${this.$config.public.BASE_URL}${image.image}`,
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
