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
          :key="item.name"
          :to="localePath(item.route ? item.route : {})"
          nuxt
          class="text-decoration-none"
        >
          <v-list-item-action>
            <BaseIcon :icon="item.icon"></BaseIcon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
              item.name
            }}</v-list-item-title>
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
        <a href="/" title="Home" aria-label="Home">
          <img
            :src="require('~/assets/img/logo.svg?inline')"
            class="navbar-brand"
            height="24"
            width="60"
            alt="Daim"
          />
        </a>
      </v-toolbar-title>
      <v-spacer />
      <v-tabs class="hidden-sm-and-down" optional right>
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          v-for="{ name, route } in items"
          :key="route"
          :to="localePath(route ? route : {})"
          text
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
        >
          {{ name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main
      role="main"
      itemprop="mainContentOfPage"
      itemscope
      itemtype="https://schema.org/WebPageElement"
    >
      <nuxt style="min-height: 100vh" keep-alive></nuxt>
      <the-footer></the-footer>
    </v-main>
  </v-app>
</template>

<script>
import { sortBy } from 'lodash-es';
import TheFooter from '@/components/layout/the-footer.vue';
import fractionToDecimal from '~/utils/fraction-to-decimal';
export default {
  components: {
    TheFooter,
  },
  data() {
    return {
      drawer: false,
      items: [],
    };
  },
  async fetch() {
    const items = (await this.$content('pages').fetch()).map((item) => ({
      ...item,
      pos: fractionToDecimal(item.pos),
    }));
    this.items = sortBy(items, ['pos']);
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    const { href: canonical } = i18nHead.link.find(
      ({ hid }) => hid === 'i18n-can',
    );
    return {
      htmlAttrs: {
        itemscope: '',
        itemtype: 'https://schema.org/WebPage',
        ...i18nHead.htmlAttrs,
      },
      meta: [
        ...i18nHead.meta,
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: canonical,
        },
      ],
      link: [...i18nHead.link],
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
