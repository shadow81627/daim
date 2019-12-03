<template>
  <v-app id="inspire" :dark="isDark" clipped-left>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      class="hidden-print-only"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    ><nuxt-link
                      :to="localePath(item.route ? item.route : {})"
                      >{{ item.text }}</nuxt-link
                    ></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i">
              <v-list-item-action v-if="child.icon">
                <v-icon>${{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  <nuxt-link :to="localePath(item.route ? item.route : {})">{{
                    child.text
                  }}</nuxt-link></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
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
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      fixed
      class="hidden-print-only"
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
        <span class="brand xd-none d-sm-inline">Daim</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
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
