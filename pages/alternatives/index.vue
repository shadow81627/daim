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
          <DataIterator :items="items" :loading="pending"></DataIterator>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { sortBy, maxBy } from 'lodash-es';
import textLength from '~/utils/feature-text-length';
export default {
  async setup() {
    // const { description } = await queryContent('pages/about').find();
    const description = 'Compare digital agencies';
    const { data: items, pending } = await useAsyncData(
      'alternatives',
      () => queryContent('alternatives').find(),
      {
        transform(data) {
          const sorted = sortBy(data, [
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
          ]).reverse();
          const filtered = sorted.filter((item) => !item.deleted_at);
          const items = filtered.map((item) => {
            const slug = item._path.replace('/alternatives/', '');
            return {
              ...item,
              id: slug,
              url: item.offers ? `/alternatives/${slug}` : item.url,
              image: `/img/alternatives/${slug}.png`,
              imageColor: item.color,
            };
          });
          return items;
        },
      },
    );
    return { items, pending, description };
  },
  data() {
    return {
      heading: 'Alternatives',
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
  watch: {
    '$route.query': function () {
      this.refresh();
    },
  },
};
</script>
