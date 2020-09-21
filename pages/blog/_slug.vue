<template>
  <div>
    <breadcrumb></breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <v-card flat>
            <v-card-title>
              <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-subtitle class="body-1">
              {{ formatDate(date) }}
            </v-card-subtitle>
            <v-card-text class="body-1">
              {{ description }}
            </v-card-text>
            <v-card-text class="body-1">
              <nuxt-content :document="body" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Breadcrumb from '@/components/layout/breadcrumb';
import * as dayjs from 'dayjs';
export default {
  components: {
    Breadcrumb,
  },
  asyncData({ $content, route, error }) {
    try {
      return $content('blog', route.params.slug).fetch();
    } catch {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    title: null,
    description: null,
    date: null,
    body: null,
  }),
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
  },
};
</script>
