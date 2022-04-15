<template>
  <div>
    <BlogHero
      :title="item.heading"
      :summary="item.description"
      :src="item.image"
      :credit="item.image && item.credit ? item.credit : {}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <h2>Services</h2>
          <div
            v-for="(category, categoryKey) of item.offers"
            :key="categoryKey"
            class="mb-6"
          >
            <h3 class="pb-1">{{ categoryKey }}</h3>
            <v-container>
              <v-row>
                <v-col
                  v-for="(offer, offerKey) of category"
                  :key="offerKey"
                  cols="12"
                  sm="6"
                  md="4"
                  class="d-flex flex-column"
                >
                  <Feature
                    v-bind="{ ...offer, title: offer.name, href: offer.url }"
                    class="mb-3"
                  >
                  </Feature>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import BlogHero from '~/components/sections/BlogHero';
import Feature from '~/components/feature';
export default {
  components: { BlogHero, Feature },
  async asyncData({ $content, route, error }) {
    try {
      const item = await $content('tools', route.params.slug).fetch();
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
      title: this.item.heading,
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
          },
          type: 'application/ld+json',
        },
      ],
    };
  },
};
</script>
