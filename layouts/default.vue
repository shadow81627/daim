<template>
  <v-app clipped-left>
    <v-navigation-drawer
      v-model="drawer"
      class="hidden-print-only"
      disable-resize-watcher
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.name"
          :to="item.route"
          exact
          class="text-decoration-none"
        >
          <template #prepend>
            <v-list-item-action style="margin-right: 32px">
              <BaseIcon :icon="item.icon"></BaseIcon>
            </v-list-item-action>
          </template>
          <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
            item.name
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="#343a40"
      class="hidden-print-only"
      height="64"
      theme="dark"
      :order="-1"
    >
      <v-app-bar-nav-icon aria-label="menu" dark @click="drawer = !drawer">
        <v-icon icon="$menu"></v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="ml-0 px-3 d-flex align-center">
        <a href="/" title="Home" aria-label="Home">
          <img
            :src="logo"
            class="navbar-brand"
            height="24"
            width="60"
            alt="Daim"
          />
        </a>
      </v-toolbar-title>
      <v-spacer />
      <v-tabs class="hidden-sm-and-down" optional right>
        <v-tab
          v-for="item in (items || []).filter((item) => item.show_tab)"
          :key="item.route"
          :to="item.route"
          exact
          text
          itemscope
          itemtype="https://schema.org/SiteNavigationElement"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main
      style="padding-top: 64px"
      role="main"
      itemprop="mainContentOfPage"
      itemscope
      itemtype="https://schema.org/WebPageElement"
    >
      <slot style="min-height: 100vh" keep-alive></slot>
      <the-footer></the-footer>
    </v-main>
  </v-app>
</template>

<script>
import { sortBy } from 'lodash-es';
import TheFooter from '@/components/layout/the-footer.vue';
import fractionToDecimal from '~/utils/fraction-to-decimal';
import logo from '~/assets/img/logo.svg?url';
export default {
  components: {
    TheFooter,
  },
  async setup() {
    const { data: items } = await useAsyncData(
      'layout-pages',
      () => queryContent('pages').find(),
      {
        // server: false,
        transform(data) {
          const items = data.map((item) => ({
            ...item,
            pos: fractionToDecimal(item.pos),
          }));
          return sortBy(items, ['show_tab', 'pos']);
        },
      },
    );
    const drawer = ref(false);
    return { items, drawer, logo };
  },
  mounted() {
    const beforePrint = function () {
      console.log('Functionality to run before printing.');
      this.drawer = false;
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

<style>
.v-tab:not(.v-tab--selected) .v-btn__content {
  color: hsla(0, 0%, 100%, 0.6) !important;
}
</style>
