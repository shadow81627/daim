<template>
  <div>
    <BlogHero
      :title="item.title"
      :summary="item.description"
      :src="item.image"
      :credit="item.image && item.credit ? item.credit : {}"
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
          <v-tooltip
            v-for="{ icon, network, url } in networks"
            :key="network"
            bottom
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                icon
                color="#757575"
                target="_blank"
                rel="noopener"
                :href="url"
                v-on="on"
              >
                <v-icon>{{ icon }}</v-icon>
              </v-btn>
            </template>
            Share on {{ network }}
          </v-tooltip>
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
      return { item };
    } catch {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    item: {},
  }),
  head() {
    const image = this.image(`${this.item.image || './blog.jpg'}`);
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
      script: [
        {
          json: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: this.item.title,
            description: this.item.description,
            image: {
              '@type': 'ImageObject',
              url: `${this.$config.BASE_URL}${image.src}`,
              width: image.width,
              height: image.height,
            },
            datePublished: this.item.date,
            dateModified: this.item.date,
          },
          type: 'application/ld+json',
        },
      ],
    };
  },
  computed: {
    networks() {
      return [
        {
          icon: mdiTwitter,
          network: 'Twitter',
          url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            this.item.title,
          )}%0A%0A${encodeURIComponent(this.item.description)}&url=${
            this.$config.BASE_URL
          }${this.$route.path}`,
        },
        {
          icon: mdiLinkedin,
          network: 'Linkedin',
          url: `https://www.linkedin.com/sharing/share-offsite/?url=${this.$config.BASE_URL}${this.$route.path}`,
        },
        {
          icon: mdiFacebook,
          network: 'Facebook',
          url: `https://www.facebook.com/sharer/sharer.php?u=${this.$config.BASE_URL}${this.$route.path}&display=page`,
        },
      ];
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
    image: require.context(
      `~/assets/img?resize&size=1200&format=jpg`,
      true,
      /\.(png|jpe?g).*$/,
    ),
  },
};
</script>
