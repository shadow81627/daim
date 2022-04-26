<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/alternatives.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.slug"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          class="d-flex flex-column"
        >
          <Feature
            v-bind="{
              ...item,
              url: item.offers ? `/alternatives/${item.slug}` : item.url,
              image: `/img/alternatives/${item.slug}.png`,
              imageColor: item.color,
              iconColor: item.iconColor,
              icon: item.icon,
            }"
          >
            <PriceRange
              v-if="item.plans"
              :items="item.plans"
              :margin="0"
            ></PriceRange>
          </Feature>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { sortBy } from 'lodash-es';
import ImageSources from '@/mixins/srcset';
import Feature from '~/components/feature';
import PriceRange from '~/components/price-range';
import textLength from '~/utils/feature-text-length';
export default {
  components: {
    Feature,
    PriceRange,
  },
  mixins: [ImageSources],
  async asyncData({ $content }) {
    const items = sortBy(
      (await $content('alternatives').fetch()).filter(
        (item) => !item.deleted_at,
      ),
      [textLength, 'slug'],
    ).reverse();
    return { items };
  },
  data() {
    return {
      heading: 'Alternatives',
      description:
        'Compare alternative digital agencies and find the best one for your business.',
      items: [],
      defaultPlan: { unset: { price: 0 } },
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
      ],
    };
  },
};
</script>
