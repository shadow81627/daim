<template>
  <div>
    <BlogHero :title="heading"></BlogHero>
    <v-container fluid style="max-width: 1785px">
      <v-row>
        <v-col
          v-for="{ slug, title, description, date, body, image } of items"
          :key="slug"
          class="d-flex flex-column"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card
            :to="`/blog/${encodeURIComponent(slug)}`"
            class="flex d-flex flex-column justify-between"
          >
            <v-img
              :lazy-src="$img(image || src, { width: 10, quality: 70 })"
              :src="$img(image || src, { quality: 70 })"
              :srcset="_srcset(image || src).srcset"
              :sizes="_srcset.size"
              :aspect-ratio="16 / 9"
            ></v-img>
            <v-card-title class="text-break text-wrap">
              <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-subtitle class="body-1">
              <time :datetime="date">{{ formatDate(date) }}</time
              ><span> • </span
              ><time :datetime="`${readTime(JSON.stringify(body))}m`"
                >{{ readTime(JSON.stringify(body)) }} min read</time
              >
            </v-card-subtitle>
            <v-card-text class="body-1 text--primary">
              {{ description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
export default {
  async asyncData({ $content }) {
    const items = await $content('blog').sortBy('date', 'desc').fetch();
    return {
      items,
    };
  },
  data() {
    return {
      heading: "Damien Robinson's Blog",
      total: 0,
      items: [],
      src: '/img/blog.jpg',
    };
  },
  head() {
    return {
      title: this.heading,
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
    readTime(content = '', wordsPerMinute = 50) {
      const words = content.split(' ').length;
      return Math.ceil(words / wordsPerMinute);
    },
    _srcset(src) {
      return this.$img.getSizes(src, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
        },
      });
    },
  },
};
</script>
