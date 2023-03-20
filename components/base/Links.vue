<template>
  <v-list dense flat tile color="transparent" item-props>
    <v-list-item
      v-for="item in items"
      :key="item.title"
      :href="url(item.href)"
      rel="noopener"
      target="_blank"
      :data-address="address(item.href)"
      :data-domain="domain(item.href)"
      :data-tel="tel(item.href)"
      variant="plain"
      class="text-decoration-none"
    >
      <template #prepend>
        <v-list-item-action
          style="font-size: 2em; width: 32px; height: 32px; margin-right: 32px"
        >
          <BaseIcon :icon="item.icon"></BaseIcon>
        </v-list-item-action>
      </template>

      <slot :item="item">
        <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
          item.title
        }}</v-list-item-title>
        <v-list-item-subtitle v-if="item.subtitle">{{
          item.subtitle
        }}</v-list-item-subtitle>
      </slot>
    </v-list-item>
  </v-list>
</template>

<script>
import mailgo from 'mailgo';
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  created() {
    if (process.client) {
      mailgo();
    }
  },
  methods: {
    stripped(href = '') {
      return href.replace(/^mailto:/, '').replace(/^tel:/, '');
    },
    splits(href) {
      return this.stripped(href).split('@');
    },
    hasSplits(href) {
      return this.splits(href).length > 1;
    },
    url(href) {
      return this.hasSplits(href) || this.isTel(href) ? '#mailgo' : href;
    },
    address(href) {
      return this.hasSplits(href) ? this.splits(href)[0] : undefined;
    },
    domain(href) {
      return this.hasSplits(href) ? this.splits(href)[1] : undefined;
    },
    isTel(href = '') {
      return href.startsWith('tel:');
    },
    tel(href) {
      return this.isTel(href) ? this.stripped(href) : undefined;
    },
  },
};
</script>
