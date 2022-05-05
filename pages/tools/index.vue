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
        <v-col>
          <DataIterator :items="tools"></DataIterator>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { sortBy, maxBy } from 'lodash-es';
import textLength from '~/utils/feature-text-length';
import DataIterator from '~/components/data-iterator.vue';
export default {
  components: { DataIterator },
  data() {
    return {
      heading: 'Tools',
      description: 'Check out what we use to create awesome web apps.',
      tools: [],
      defaultPlan: { unset: { price: 0 } },
    };
  },
  async fetch() {
    const data = sortBy(
      (await this.$content('tools').fetch()).filter((tool) => !tool.deleted_at),
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
    const items = data.map((tool) => ({
      ...tool,
      url: tool.offers ? `/tools/${tool.slug}` : tool.url,
      image: `/img/tools/${tool.slug}.png`,
      imageColor: tool.color,
    }));
    this.tools = items;
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
  watch: {
    '$route.query': '$fetch',
  },
};
</script>
