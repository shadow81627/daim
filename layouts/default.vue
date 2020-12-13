<template>
  <v-app clipped-left>
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
      <v-toolbar-title class="ml-0 px-3 d-flex align-center">
        <img
          :src="require('~/assets/img/logo.svg?inline')"
          class="navbar-brand"
          height="24"
          width="60"
          alt="Daim"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-tabs class="hidden-sm-and-down" optional right>
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          v-for="{ text, route } in items"
          :key="route"
          :to="localePath(route ? route : {})"
          text
        >
          {{ text }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main role="main">
      <nuxt style="min-height: 100vh" keep-alive></nuxt>
      <the-footer></the-footer>
    </v-main>
  </v-app>
</template>

<script>
import {
  mdiHome,
  mdiAccountTie,
  mdiToolbox,
  mdiFolder,
  mdiInformation,
  mdiAndroidMessages,
} from '@mdi/js';
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
          icon: mdiInformation,
          text: 'Blog',
          route: 'blog',
        },
        {
          icon: mdiAccountTie,
          text: 'Resume',
          route: 'resume',
        },
        {
          icon: mdiFolder,
          text: 'Portfolio',
          route: 'portfolio',
        },
        {
          icon: mdiToolbox,
          text: 'Tools',
          route: 'tools',
        },
        {
          icon: mdiAndroidMessages,
          text: 'Contact',
          route: 'contact',
        },
      ],
    };
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
};
</script>
