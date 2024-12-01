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
            :items="data?.data"
            :loading="status === 'pending'"
            :total="data?.meta?.pagination?.total"
          ></DataIterator>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
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
    const { data, status } = await useFetch('/api/content/tools', {
      lazy: true,
      // server: false,
      // pick: [
      //   'location',
      //   'dark',
      //   'acronym',
      //   'image',
      //   'url',
      //   'icon',
      //   'name',
      //   'subheading',
      //   'description',
      //   'list',
      //   'links',
      //   'plans',
      //   'startDate',
      //   'endDate',
      //   'imageHeight',
      //   'imageWidth',
      //   'imageQuality',
      //   'imageColor',
      //   'imageBackgroundColor',
      //   'backgroundImage',
      //   'imageFit',
      //   'iconColor',
      // ],
      query: { page: route.query.page ?? 1 },
      watch: [route.query.page],
    });
    return { data, status };
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
};
</script>
