<template>
  <Hero :src="src">
    <Breadcrumb absolute dark></Breadcrumb>
    <v-row class="fill-height mx-0 pa-4" no-gutters>
      <v-col
        class="d-flex text-left align-end justify-start"
        cols="12"
        sm="auto"
      >
        <v-card color="transparent" flat>
          <v-card-title class="text-break">
            <h1 class="mb-0">{{ title }}</h1>
          </v-card-title>
          <v-card-subtitle v-if="summary">{{ summary }}</v-card-subtitle>
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
            class="white--text"
            >{{ credit.by.text }}</a
          >
          on
          <a
            :href="credit.on.href"
            rel="noopener"
            target="_blank"
            class="white--text"
            >{{ credit.on.text }}</a
          >
        </span>
      </v-col>
    </v-row>
  </Hero>
</template>

<script>
export default {
  props: {
    src: { type: String, default: './blog.jpg' },
    title: { type: String, required: true },
    summary: { type: String, default: null },
    credit: {
      type: Object,
      default: () => ({
        by: {
          text: 'Patrick Fore',
          href:
            'https://unsplash.com/@patrickian4?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
        },
        on: {
          text: 'Unsplash',
          href:
            'https://unsplash.com/s/photos/blog?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText',
        },
      }),
    },
  },
};
</script>
