<template>
  <div>
    <BlogHero :title="heading"></BlogHero>
    <v-container>
      <v-row>
        <v-col v-for="{ slug, title, description, date } of items" :key="slug">
          <v-card :to="`/blog/${slug}`" flat>
            <v-card-title>
              <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-subtitle class="body-1">
              {{ formatDate(date) }}
            </v-card-subtitle>
            <v-card-text class="body-1">
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
    const items = await $content('blog').fetch();

    return {
      items,
    };
  },
  data() {
    return { heading: "Damien Robinson's Blog", total: 0, items: [] };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
  },
  head() {
    return {
      title: this.heading,
    };
  },
};
</script>
