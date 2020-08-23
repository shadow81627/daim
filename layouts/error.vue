<template>
  <v-container class="nuxt-error pa-0" fluid>
    <v-row no-gutters class="pa-0">
      <v-col class="pa-0">
        <component :is="errorPage" :error="error" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import error404 from '@/components/error/404.vue';
import error500 from '@/components/error/500.vue';

export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return error404;
      }
      // catch everything else
      return error500;
    },
  },
};
</script>
