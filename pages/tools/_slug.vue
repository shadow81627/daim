<template>
  <div>
    <BlogHero
      :title="item.heading"
      :summary="item.subheading"
      :description="item.description"
      :src="item.image"
      :credit="item.image && item.credit ? item.credit : {}"
    ></BlogHero>
    <v-container>
      <v-row tag="section">
        <v-col cols="12">
          <v-card flat>
            <v-card-title>
              <h2 class="h2 text-break">Summary</h2>
            </v-card-title>
            <v-card-text class="text--primary body-1 pt-0">
              {{ item.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row tag="section">
        <v-col cols="12"><h2>Plans</h2></v-col>
        <v-col
          v-for="(plan, planKey) of item.plans"
          :key="planKey"
          cols="12"
          sm="6"
          md="4"
          class="d-flex flex-column"
        >
          <Feature v-bind="plan" :title="plan.name" :href="plan.url">
            {{ price(plan.price) }} {{ plan.currency
            }}<template v-if="plan.interval"> / {{ plan.interval }}</template>
          </Feature>
        </v-col>
      </v-row>
      <v-row tag="section">
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
import { sortBy } from 'lodash-es';
import BlogHero from '~/components/sections/BlogHero';
import Feature from '~/components/feature';
export default {
  components: { BlogHero, Feature },
  async asyncData({ $content, route, error }) {
    try {
      const item = await $content('tools', route.params.slug).fetch();
      // price phycology: largest first, end in 99 rather than 00
      item.plans = sortBy(item.plans, 'price').reverse();
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
  methods: {
    price(cost, currency = 'USD') {
      const margin = cost * 2;
      const nines = margin === 0 || margin % 1 !== 0 ? margin : margin - 0.01;
      const price = nines;
      return price.toLocaleString('en-US', {
        style: 'currency',
        currency,
      });
    },
  },
};
</script>
