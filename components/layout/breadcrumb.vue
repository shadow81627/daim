<template>
  <v-toolbar flat height="65">
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
  </v-toolbar>
</template>

<script>
import { startCase } from 'lodash-es';
export default {
  computed: {
    breadcrumbs() {
      const segments = this.$route.path.split('/').slice(1);
      const breadcrumbs = [{ text: 'Home', to: '/' }];

      segments.forEach((segment, index) => {
        const text = startCase(segment);
        const to = '/' + segments.slice(0, index + 1).join('/');
        breadcrumbs.push({ text, to, exact: true });
      });

      return breadcrumbs;
    },
  },
};
</script>
