<template>
  <v-app id="inspire" :dark="isDark" clipped-left>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      class="hidden-print-only"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="localePath(item.route ? item.route : {})"
          active-class="btn-primary pointer-events-none active"
          nuxt
          class="text-decoration-none"
        >
          <v-list-item-action>
            <v-icon>${{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      class="hidden-print-only navbar-dark bg-dark"
    >
      <v-app-bar-nav-icon
        aria-label="menu"
        dark
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title style="width: 256px" class="ml-0 pl-3">
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
      drawer: false,
      items: [
        {
          icon: 'home',
          text: 'Home',
          route: 'index',
        },
        {
          icon: 'info',
          text: 'Blog',
          route: 'blog',
        },
        {
          icon: 'account-tie',
          text: 'Resume',
          route: 'resume',
        },
      ],
    };
  },
  computed: {
    // items() {
    //   return [];
    // },
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
  font-family: 'Rouge Script', cursive;
  font-size: 2rem;
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
