<template>
  <v-toolbar flat height="65" color="transparent" :absolute="absolute">
    <v-breadcrumbs
      :items="breadcrumbs"
      class="pa-0"
      itemprop="breadcrumb"
      itemtype="https://schema.org/BreadcrumbList"
      itemscope
    >
      <template #item="{ item }">
        <v-breadcrumbs-item v-bind="item" itemprop="itemListElement">
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-toolbar>
</template>

<script>
import { startCase } from 'lodash-es';
import titleCase from '@/utils/title-case';
export default {
  props: {
    dark: { type: Boolean, default: false },
    absolute: { type: Boolean, default: false },
  },
  computed: {
    breadcrumbs() {
      // trim leading and trailing slash from pathname and split into segments array
      const segments = this.$route.path.replace(/^\/+|\/+$/g, '').split('/');
      const breadcrumbs = [{ text: 'Home', to: '/' }];

      segments.forEach((segment, index) => {
        const text = titleCase(startCase(segment));
        const to = '/' + segments.slice(0, index + 1).join('/');
        breadcrumbs.push({
          text,
          to,
          exact: true,
        });
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
