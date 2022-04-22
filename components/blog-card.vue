<template>
  <v-card
    :to="`/blog/${encodeURIComponent(slug)}`"
    class="flex d-flex flex-column justify-between"
    itemprop="blogPost"
    itemscope
    itemtype="https://schema.org/BlogPosting"
    min-width="240"
  >
    <v-img
      :lazy-src="lazy"
      :src="img"
      class="flex-grow-0"
      :srcset="_srcset.srcset"
      :sizes="_srcset.size"
      :height="imageHeight"
      itemprop="image"
      contain
    ></v-img>
    <v-card-title class="text-break text-wrap">
      <h2 itemprop="name">{{ title }}</h2>
    </v-card-title>
    <v-card-subtitle class="body-1">
      <time :datetime="date">{{ formatDate(date) }}</time
      ><span> • </span
      ><time :datetime="`${readTime(JSON.stringify(body))}m`"
        >{{ readTime(JSON.stringify(body)) }} min read</time
      >
      <span style="display: none">{{ words(JSON.stringify(body)) }}</span>
    </v-card-subtitle>
    <v-card-text class="body-1 text--primary" itemprop="description">
      {{ description }}
    </v-card-text>
  </v-card>
</template>

<script>
import * as dayjs from 'dayjs';
export default {
  props: {
    slug: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    body: { type: String, default: null },
    image: { type: String, default: '/img/blog.jpg' },
    date: { type: String, default: null },
    modified: { type: String, default: null },
    imageWidth: { type: Number, default: 571 },
    imageQuality: { type: Number, default: 70 },
    imageHeight: { type: Number, default: 260 },
    imageColor: { type: String, default: '#808080' },
    wordsPerMinute: { type: Number, default: 50 },
  },
  computed: {
    _date() {
      return this.formatDate(this.modified ?? this.date);
    },
    lazy() {
      const svg = Buffer.from(
        `<svg xmlns='http://www.w3.org/2000/svg'
      viewBox='00512512'>
      <rect width="100%" height="100%" fill="${this.imageColor}"/>
      </svg>`,
      ).toString('base64');
      return `data:image/svg+xml;base64,${svg}`;
    },
    img() {
      return this.$img(this.image, {
        quality: this.imageQuality,
        width: this.imageWidth,
        height: this.imageHeight,
        enlarge: undefined,
        fit: 'cover',
        trim: undefined,
        position: 'center',
      });
    },
    _srcset() {
      return this.$img.getSizes(this.image, {
        sizes: 'xs:100vw sm:50vw md:33vw lg:33vw xl:33vw',
        modifiers: {
          format: 'webp',
          quality: this.imageQuality,
          width: this.imageWidth,
          height: this.imageHeight,
          enlarge: undefined,
          fit: 'cover',
          trim: undefined,
          position: 'center',
        },
      });
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
    words(content = '') {
      return content.split(' ').length;
    },
    readTime(content = '', wordsPerMinute = 50) {
      return Math.ceil(this.words(content) / wordsPerMinute);
    },
  },
};
</script>
