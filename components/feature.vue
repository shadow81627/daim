<template>
  <b-card v-editable="blok" class="h-100 xtext-center">
    <b-card-title class="" title-tag="h3">
      <font-awesome-icon
        v-if="blok.icon"
        :icon="blok.icon | split"
        title=""
        class="text-muted"
      />
      {{ blok.name || blok.heading }}
    </b-card-title>
    <b-card-sub-title v-if="blok.subheading" class="mb-2">{{
      blok.subheading
    }}</b-card-sub-title>
    <b-card-text v-if="blok.text">{{ blok.text }}</b-card-text>
    <b-button
      v-if="blok.href"
      :href="blok.href"
      target="_blank"
      rel="noopener"
      variant="link"
      size="sm"
      class="text-decoration-none"
    >
      <span>Learn more about</span>
      <span>{{ blok.heading }}</span>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="text-muted" />
    </b-button>
    <!-- <template v-slot:footer>
      <small class="text-muted">Last updated 3 mins ago</small>
    </template> -->
  </b-card>
</template>

<script>
export default {
  filters: {
    split(value, sep = ' ') {
      if (!value) return '';
      value = value.toString();
      return value.split(sep);
    },
  },
  props: { blok: { type: Object, required: true } },
};
</script>
