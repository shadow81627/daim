<template>
  <Hero v-bind="{ subheading: summary, heading: title, src }">
    <Breadcrumb absolute dark class="pa-4"></Breadcrumb>
    <v-row class="fill-height mx-0 pa-4" no-gutters>
      <v-col
        class="d-flex text-left align-end justify-start"
        cols="12"
        sm="auto"
      >
        <v-card color="transparent" flat>
          <v-card-title class="break-words whitespace-normal">
            <h1 class="mb-0 text-uppercase" itemprop="name">{{ title }}</h1>
          </v-card-title>
          <v-card-subtitle
            v-if="summary"
            itemprop="description"
            class="break-words whitespace-normal text-slate-200 opacity-100"
            >{{ summary }}</v-card-subtitle
          >
        </v-card>
      </v-col>
      <v-col
        v-if="credit && credit.by"
        class="d-flex text-right align-end justify-end"
      >
        <span>
          Photo by
          <a
            :href="credit.by.href"
            rel="noopener"
            target="_blank"
            class="text-white"
            >{{ credit.by.text }}</a
          >
          on
          <a
            :href="credit.on.href"
            rel="noopener"
            target="_blank"
            class="text-white"
            >{{ credit.on.text }}</a
          >
        </span>
      </v-col>
      <v-col
        v-if="_attributions?.length"
        class="d-flex flex-col text-right align-end justify-end font-mono"
      >
        <div v-for="attribution of _attributions" :key="attribution.key">
          {{ attribution.typeText }}
          <a
            :href="attribution.by.url"
            rel="noopener"
            target="_blank"
            class="text-white"
            >{{ attribution.by.text }}</a
          >
          <template v-if="attribution.on.text && attribution.by.text">
            on
          </template>
          <a
            :href="attribution.on.url"
            rel="noopener"
            target="_blank"
            class="text-white"
            >{{ attribution.on.text }}</a
          >
        </div>
      </v-col>
    </v-row>
  </Hero>
</template>

<script>
const attributionTypes = { writing: 'Written by', photo: 'Photo by' };
export default {
  props: {
    src: { type: String, default: '/img/blog.jpg' },
    title: { type: String, required: true },
    summary: { type: String, required: false, default: null },
    attributions: { type: Array, default: () => [] },
    credit: {
      type: Object,
      default: () => ({
        by: {
          text: 'Patrick Fore',
          href: 'https://unsplash.com/@patrickian4?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
        },
        on: {
          text: 'Unsplash',
          href: 'https://unsplash.com/s/photos/blog?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
        },
      }),
    },
  },
  computed: {
    _attributions() {
      const _attributions = this.attributions
        .map((attribution) => {
          const typeText = attributionTypes[attribution.type];
          if (!attribution.by) {
            attribution.by = {};
          }
          if (!attribution.on) {
            attribution.on = {};
          }
          return {
            ...attribution,
            typeText,
            key: [
              typeText,
              attribution.by.text,
              attribution.by.text && attribution.on.text ? 'on' : '',
              attribution.on.text,
            ]
              .join(' ')
              .replace(/\s+/g, ' '),
          };
        })
        .sort((a, b) => {
          const test = a.key.length - b.key.length;
          return test;
        });

      return _attributions;
    },
  },
};
</script>
