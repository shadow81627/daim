<template>
  <v-card class="flex d-flex flex-column justify-between" min-width="240">
    <v-card-title>
      <span class="h3 text-break text-no-wrap text-truncate">
        <font-awesome-icon
          v-if="blok.icon"
          :icon="blok.icon"
          class="grey--text"
        />
        {{ blok.name || blok.heading }}
      </span>
    </v-card-title>

    <v-card-subtitle v-if="blok.subheading">{{
      titleCase(blok.subheading)
    }}</v-card-subtitle>

    <div class="flex-grow-1">
      <v-card-text v-if="blok.description" class="text--primary body-1 pt-0">
        {{ blok.description }}
      </v-card-text>
      <v-card-text v-if="blok.list" class="text--primary body-1 pt-0">
        <ul>
          <li v-for="item in blok.list" :key="item">{{ item }}</li>
        </ul>
      </v-card-text>
    </div>

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
import titleCase from '@/utils/title-case';
export default {
  props: { blok: { type: Object, required: true } },
  data() {
    return {
      mdiOpenInNew,
    };
  },
  methods: {
    titleCase,
  },
};
</script>
