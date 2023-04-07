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
          <DataIterator :items="items" :loading="pending"></DataIterator>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { sortBy } from 'lodash-es';
import textLength from '~/utils/feature-text-length';
import priceSort from '~/utils/price-sort';
import DataIterator from '~/components/data-iterator.vue';
export default {
  components: { DataIterator },
  async setup() {
    const sorts = [priceSort, textLength, 'slug'];
    const route = useRoute();
    if (route.query.sort) {
      sorts.unshift(route.query.sort);
    }
    const {
      data: items,
      pending,
      refresh,
    } = await useLazyAsyncData(
      'tools',
      () =>
        queryContent('tools')
          .where({ deleted_at: { $exists: false } })
          // .limit(24)
          .find(),
      {
        transform(data) {
          // const filtered = data.filter((item) => !item.deleted_at);
          const sorted = sortBy(data, sorts).reverse();
          const items = sorted.map((item) => {
            const slug = item._path.replace('/tools/', '');
            return {
              ...item,
              id: slug,
              url: item.offers ? `/tools/${slug}` : item.url,
              image: `/img/tools/${slug}.png`,
              imageColor: item.color,
            };
          });
          return items;
        },
      },
    );
    return { items, pending, refresh };
  },
  data() {
    return {
      heading: 'Tools',
      description: 'Check out what we use to create awesome web apps.',
      defaultPlan: { unset: { price: 0 } },
    };
  },
  fetchKey: 'tools',
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
      if (this.refresh) {
        this.refresh();
      }
    },
  },
};
</script>
