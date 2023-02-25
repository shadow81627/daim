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
import { sortBy } from 'lodash-es';
import textLength from '~/utils/feature-text-length';
import priceSort from '~/utils/price-sort';
import DataIterator from '~/components/data-iterator.vue';
export default {
  components: { DataIterator },
  data() {
    return {
      heading: 'Tools',
      description: 'Check out what we use to create awesome web apps.',
      items: [],
      defaultPlan: { unset: { price: 0 } },
    };
  },
  async fetch() {
    const sorts = [priceSort, textLength, 'slug'];
    if (this.$route.query.sort) {
      sorts.unshift(this.$route.query.sort);
    }
    const data = sortBy(
      (await queryContent('tools').find()).filter((item) => !item.deleted_at),
      sorts,
    ).reverse();
    const items = data.map((item) => ({
      ...item,
      id: item.slug,
      url: item.offers ? `/tools/${item.slug}` : item.url,
      image: `/img/tools/${item.slug}.png`,
      imageColor: item.color,
    }));
    this.items = items;
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
    '$route.query': '$fetch',
  },
};
</script>
