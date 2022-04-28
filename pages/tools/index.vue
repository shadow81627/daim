<template>
  <div>
    <!-- Photo by <a href="https://unsplash.com/@hnhmarketing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hunter Haley</a> on <a href="https://unsplash.com/s/photos/tools?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> -->
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/tools.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col
          v-for="tool in tools"
          :key="tool.slug"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          class="d-flex flex-column"
        >
          {{ tool.deleted_at }}
          <Feature
            v-bind="{
              ...tool,
              url: tool.offers ? `/tools/${tool.slug}` : tool.url,
              image: `/img/tools/${tool.slug}.png`,
              imageColor: tool.color,
              iconColor: tool.iconColor,
              icon: tool.icon,
            }"
          >
            <PriceRange :items="tool.plans"></PriceRange>
          </Feature>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { sortBy, maxBy } from 'lodash-es';
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
    const tools = sortBy(
      (await $content('tools').fetch()).filter((tool) => !tool.deleted_at),
      [
        /**
         * Sort by largest price
         * @param {*} o item to sort
         */
        function (o) {
          const plans = sortBy(o?.plans ?? { free: { price: 0 } }, 'price');
          const max = maxBy(plans, 'price');
          return max.price;
        },
        textLength,
        'slug',
      ],
    ).reverse();
    return { tools };
  },
  data() {
    return {
      heading: 'Tools',
      description: 'Check out what we use to create awesome web apps.',
      tools: [],
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
