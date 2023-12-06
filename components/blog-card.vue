<template>
  <v-card
    class="flex d-flex flex-column justify-between flex-grow-1"
    itemprop="blogPost"
    itemscope
    itemtype="https://schema.org/BlogPosting"
    min-width="240"
  >
    <LazyNuxtPicture
      v-if="image"
      :src="image"
      :width="imageWidth"
      :height="imageHeight"
      :quality="imageQuality"
      class="flex-grow-0 max-w-full h-auto"
      crossorigin="anonymous"
      itemprop="image"
      fit="cover"
      loading="lazy"
      sizes="xs:100vw sm:50vw md:33vw lg:33vw xl:33vw"
      :img-attrs="{
        style: {
          'object-fit': 'cover',
          'max-width': '100%',
          height: 'auto',
          backgroundColor: imageColor,
        },
      }"
    ></LazyNuxtPicture>
    <v-card-title class="text-break text-wrap">
      <h2 itemprop="name">{{ name }}</h2>
    </v-card-title>
    <v-card-subtitle class="text-body-1">
      <time :datetime="date">{{ formatDate(date) }}</time>
      <span v-if="_readTime"> • </span>
      <time v-if="_readTime" :datetime="`${_readTime}m`"
        >{{ _readTime }} min read</time
      >
      <span style="display: none">{{ words(JSON.stringify(body)) }}</span>
    </v-card-subtitle>
    <v-card-text class="text-body-1 text--primary" itemprop="description">
      {{ description }}
    </v-card-text>

    <v-card-actions>
      <!-- add hidden content to set height to prevent page jank -->
      <v-btn style="visibility: hidden" aria-hidden="true" icon>
        <v-icon />
        &nbsp;
      </v-btn>

      <v-spacer></v-spacer>
      <BaseTooltipButton
        v-if="url && !_readTime"
        itemprop="url"
        v-bind="{
          link: url,
          tooltip: `Learn more about ${name}`,
          size: 'small',
        }"
      ></BaseTooltipButton>
      <BaseTooltipButton
        v-if="_readTime"
        itemprop="url"
        v-bind="{
          link: to,
          tooltip: `Learn more about ${name}`,
          size: 'small',
        }"
      ></BaseTooltipButton>
    </v-card-actions>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';
export default {
  inheritAttrs: false,
  props: {
    url: { type: String, default: null },
    slug: { type: String, default: null },
    name: { type: String, default: undefined },
    description: { type: String, default: null },
    body: { type: Object, default: () => {} },
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
    _readTime() {
      if (!this.body?.children?.length) {
        return undefined;
      }
      return this.readTime(JSON.stringify(this.body));
    },
    to() {
      return !this.url || this._readTime
        ? `/blog/${encodeURIComponent(this.slug)}`
        : undefined;
    },
    _date() {
      return this.formatDate(this.modified ?? this.date);
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
