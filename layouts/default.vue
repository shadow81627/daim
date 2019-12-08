<template>
  <v-app id="inspire" :dark="isDark" clipped-left>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      class="hidden-print-only navbar-dark bg-dark"
    >
      <v-toolbar-title style="width: 256px" class="ml-0 pl-3">
        <!-- <v-app-bar-nav-icon aria-label="menu" @click.stop="drawer = !drawer" /> -->
        <!-- <b-img-lazy
          :src="$icon(32)"
          width="32"
          height="32"
          class="rounded"
          alt="PocketPasta"
          onerror="javascript:this.style.display = 'none'"
        /> -->
        <span class="brand navbar-brand">Daim</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content role="main">
      <nuxt style="min-height: 100vh;" />
      <the-footer />
    </v-content>
  </v-app>
</template>

<script>
import TheFooter from '@/components/layout/the-footer.vue';
export default {
  components: {
    TheFooter,
  },
  data() {
    return {
      dialog: false,
      drawer: false,
    };
  },
  computed: {
    items() {
      return [];
    },
    isDark() {
      return false;
      // return this.$store.getters.getCurrentTheme().dark;
    },
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo();
    return {
      htmlAttrs: {
        ...i18nSeo.htmlAttrs,
      },
      meta: [...i18nSeo.meta],
      link: [...i18nSeo.link],
    };
  },
};
</script>

<style>
.brand {
  font-family: 'Comic Neue', sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  vertical-align: middle;
}

/* no pointer events */
.pointer-events-none {
  pointer-events: none;
}

/* navbar links no underline, can't add class to a element since it is added in js */
.text-decoration-none a {
  text-decoration: none !important;
}
</style>
