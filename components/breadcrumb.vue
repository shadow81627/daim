<template>
  <v-toolbar flat height="65" color="transparent" :absolute="absolute">
    <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
  </v-toolbar>
</template>

<script>
import { startCase } from 'lodash-es';
export default {
  props: {
    dark: { type: Boolean, default: false },
    absolute: { type: Boolean, default: false },
  },
  computed: {
    breadcrumbs() {
      const segments = this.$route.path.split('/').slice(1);
      const breadcrumbs = [{ text: 'Home', to: '/' }];

      segments.forEach((segment, index) => {
        const text = startCase(segment);
        const to = this.localePath(
          '/' + segments.slice(0, index + 1).join('/'),
        );
        breadcrumbs.push({ text, to, exact: true });
      });

      return breadcrumbs;
    },
  },
};
</script>

<style>
.v-application .v-breadcrumbs__item {
  color: white;
}
</style>
