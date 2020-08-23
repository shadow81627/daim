<template>
  <v-card
    v-editable="blok"
    class="flex d-flex flex-column justify-between"
    min-width="240"
  >
    <v-card-title>
      <span class="h3 text-break text-no-wrap text-truncate">
        <font-awesome-icon
          v-if="blok.icon"
          :icon="blok.icon | split"
          class="grey--text"
        />
        {{ blok.name || blok.heading }}
      </span>
    </v-card-title>

    <v-card-subtitle v-if="blok.subheading">{{
      blok.subheading
    }}</v-card-subtitle>
    <v-card-text class="flex-grow-1 text--primary">{{ blok.text }}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="blok.href"
        :href="blok.href"
        target="_blank"
        rel="noopener"
        text
        small
      >
        <span>Learn more</span>
        <span class="d-sr-only-focusable"> about {{ blok.heading }}</span>
        <v-icon color="grey" small>{{ mdiOpenInNew }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js';
export default {
  filters: {
    split(value, sep = ' ') {
      if (!value) return '';
      value = value.toString();
      return value.split(sep);
    },
  },
  props: { blok: { type: Object, required: true } },
  data() {
    return {
      mdiOpenInNew,
    };
  },
};
</script>
