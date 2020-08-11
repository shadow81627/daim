<template>
  <v-app :dark="isDark" clipped-left>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      class="hidden-print-only"
      disable-resize-watcher
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
            <v-icon>{{ item.icon }}</v-icon>
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
      color="#343a40"
      dark
      class="hidden-print-only"
      height="64"
    >
      <v-app-bar-nav-icon
        aria-label="menu"
        dark
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title class="ml-0 pl-3">
        <img
          :src="require('~/assets/img/logo.svg')"
          class="navbar-brand"
          height="24"
          contain
          alt="Daim"
        />
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main role="main">
      <nuxt style="min-height: 100vh;" />
      <the-footer />
    </v-main>
  </v-app>
</template>

<script>
import { mdiHome, mdiAccountTie, mdiToolbox } from '@mdi/js';
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
          icon: mdiHome,
          text: 'Home',
          route: 'index',
        },
        {
          icon: '$info',
          text: 'Blog',
          route: 'blog',
        },
        {
          icon: mdiAccountTie,
          text: 'Resume',
          route: 'resume',
        },
        {
          icon: mdiToolbox,
          text: 'Tools',
          route: 'tools',
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
  mounted() {
    const vm = this;
    const beforePrint = function () {
      console.log('Functionality to run before printing.');
      vm.drawer = false;
    };
    const afterPrint = function () {
      console.log('Functionality to run after printing');
    };

    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
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

<style lang="scss">
// @import '~/assets/scss/custom.scss';
@import '~/assets/css/print.css' print;
</style>
