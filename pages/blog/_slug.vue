<template>
  <div>
    <BlogHero :title="item.title" :summary="item.description"></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <div class="body-1">
            <nuxt-content :document="item" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span class="font-italic"
            >Published
            <time :datetime="item.date">{{ formatDate(item.date) }}</time></span
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as dayjs from 'dayjs';
import BlogHero from '~/components/sections/BlogHero';
export default {
  components: { BlogHero },
  async asyncData({ $content, route, error }) {
    try {
      const item = await $content('blog', route.params.slug).fetch();
      return { item, ...item };
    } catch {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    item: {},
  }),
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
  },
};
</script>
