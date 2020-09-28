<template>
  <div>
    <BlogHero
      :title="item.title"
      :summary="item.description"
      :src="item.image"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <div class="body-1">
            <nuxt-content :document="item" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-column justify-center">
          <span class="font-italic"
            >Published
            <time :datetime="item.date">{{ formatDate(item.date) }}</time></span
          >
        </v-col>
        <v-col sm="auto" cols="12">
          <v-btn
            icon
            color="#757575"
            target="_blank"
            rel="noopener"
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              item.title,
            )}%0A%0A${encodeURIComponent(
              item.description,
            )}&url=https://daim.dev${$route.path}`"
          >
            <v-icon>{{ mdiTwitter }}</v-icon>
          </v-btn>
          <v-btn
            icon
            color="#757575"
            target="_blank"
            rel="noopener"
            :href="`https://www.linkedin.com/shareArticle/?mini=true&url=https://daim.dev${$route.path}`"
          >
            <v-icon>{{ mdiLinkedin }}</v-icon>
          </v-btn>
          <v-btn
            icon
            color="#757575"
            target="_blank"
            rel="noopener"
            :href="`https://www.facebook.com/sharer/sharer.php?u=https://daim.dev${$route.path}&display=page`"
          >
            <v-icon>{{ mdiFacebook }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
import { mdiFacebook, mdiTwitter, mdiLinkedin } from '@mdi/js';
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
    mdiFacebook,
    mdiTwitter,
    mdiLinkedin,
  }),
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
  },
  head() {
    return {
      title: this.item.title,
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
    };
  },
};
</script>
