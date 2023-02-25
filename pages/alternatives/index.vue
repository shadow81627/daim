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
        <v-col>
          <DataIterator
            :items="items"
            :loading="$fetchState.pending"
          ></DataIterator>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { sortBy, maxBy } from 'lodash-es';
import textLength from '~/utils/feature-text-length';
export default {
  data() {
    return {
      heading: 'Alternatives',
      description: null,
      items: [],
      defaultPlan: { unset: { price: 0 } },
    };
  },
  async fetch() {
    const { description } = await queryContent('pages/about').find();
    this.description = description;
    const data = sortBy(
      (await queryContent('alternatives').find()).filter(
        (item) => !item.deleted_at,
      ),
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
    const items = data.map((item) => ({
      ...item,
      id: item.slug,
      url: item.offers ? `/alternatives/${item.slug}` : item.url,
      image: `/img/alternatives/${item.slug}.png`,
      imageColor: item.color,
    }));
    this.items = items;
  },
  fetchKey: 'alternatives',
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
