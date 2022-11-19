<template>
  <v-data-iterator
    :items="items"
    :search="query.search"
    :footer-props="{ itemsPerPageOptions }"
    :options.sync="query"
    :loading="loading"
  >
    <template #header>
      <v-toolbar class="mb-1" flat>
        <v-text-field
          :value="query.search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          @input="search"
        ></v-text-field>
      </v-toolbar>
    </template>
    <template #default="props">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.slug"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="d-flex flex-column"
          >
            <Feature v-bind="item"></Feature>
          </v-col>
        </v-row>
        <v-row>
          <v-card v-intersect="infiniteScrolling"></v-card>
        </v-row>
      </v-container>
    </template>
  </v-data-iterator>
</template>
<script>
import { debounce, omitBy } from 'lodash-es';
import qs from 'query-string';
export default {
  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: null },
  },
  data() {
    return {
      itemsPerPageOptions: [24, 48, 72, 96, -1],
      filter: {},
      defaultQuery: {
        search: '',
        itemsPerPage: 24,
        page: 1,
        sortDesc: false,
        mustSort: false,
        multiSort: false,
      },
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.query.itemsPerPage);
    },
    query: {
      get() {
        const foundQuery =
          this.$route && this.$route.fullPath
            ? qs.parse(qs.extract(this.$route.fullPath), {
                parseNumbers: true,
                parseBooleans: true,
              }) ?? {}
            : {};

        const query = JSON.parse(
          JSON.stringify({
            ...this.defaultQuery,
            ...foundQuery,
          }),
        );
        return query;
      },
      set(value) {
        const _value = JSON.parse(JSON.stringify(value));
        /**
         * Set items per page to a multiple of default per page
         */
        if (
          _value.itemsPerPage &&
          _value.itemsPerPage !== -1 &&
          _value.itemsPerPage % 24 !== 0
        ) {
          _value.itemsPerPage =
            this.defaultQuery.itemsPerPage *
            Math.ceil(_value.itemsPerPage / this.defaultQuery.itemsPerPage);
        }
        if (
          (_value.itemsPerPage && !Number.isInteger(_value.itemsPerPage)) ||
          (_value.itemsPerPage === -1 &&
            this.items.length < this.defaultQuery.itemsPerPage)
        ) {
          _value.itemsPerPage = this.defaultQuery.itemsPerPage;
        }
        const query = this.cleanQuery(_value);
        if (this.$route.path) {
          this.$router.push({ path: this.$route.path, query });
        }
      },
    },
  },
  methods: {
    cleanQuery(value) {
      const query = omitBy(value, function (v, k) {
        const isBlank = v === undefined || v === null || v === '';
        const isDefault = v === this.defaultQuery[k];
        return isBlank || isDefault;
      });
      return query;
    },
    search: debounce(function (value) {
      const search = value;
      this.query = { ...this.query, search };
    }, 1000),
    nextPage() {
      if (this.query.page + 1 <= this.numberOfPages) {
        const page = (this.query.page += 1);
        this.query = { ...this.query, page };
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    infiniteScrolling(_1, _2, isIntersecting) {
      if (isIntersecting) {
        const next =
          this.query.itemsPerPage !== -1
            ? this.query.itemsPerPage + 24
            : this.query.itemsPerPage;
        const itemsPerPage = next >= this.items.length ? -1 : next;
        if (this.query.itemsPerPage !== itemsPerPage) {
          this.query = {
            ...this.query,
            page: 1,
            itemsPerPage,
          };
        }
      }
    },
  },
};
</script>
