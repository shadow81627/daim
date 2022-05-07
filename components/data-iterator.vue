<template>
  <v-data-iterator
    :items="items"
    :search="query.search"
    :footer-props="{ itemsPerPageOptions }"
    :options.sync="query"
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
            <Feature v-bind="item">
              <PriceRange :items="item.plans"></PriceRange>
            </Feature>
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
        if (!Number.isInteger(_value.itemsPerPage)) {
          _value.itemsPerPage = this.defaultQuery.itemsPerPage;
        }
        const query = this.cleanQuery(value);
        if (this.$route.path) {
          this.$router.push({ path: this.$route.path, query });
        }
      },
    },
  },
  methods: {
    cleanQuery(value) {
      const vm = this;
      const query = omitBy(value, function (v, k) {
        const isBlank = v === undefined || v === null || v === '';
        const isDefault = v === vm.defaultQuery[k];
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
    infiniteScrolling(entries, observer, isIntersecting) {
      setTimeout(() => {
        const itemsPerPage = this.query.itemsPerPage + 24;
        if (itemsPerPage <= this.items.length + 24) {
          this.query = {
            ...this.query,
            page: 1,
            itemsPerPage,
          };
        }
      }, 500);
    },
  },
};
</script>
