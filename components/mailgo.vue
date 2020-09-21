<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        target="_blank"
        v-bind="attrs"
        large
        text
        :href="href"
        rel="noopener"
        class="pl-0"
        v-on="on"
      >
        <font-awesome-icon v-if="icon" :icon="icon" fixed-width pull="left" />
        <slot></slot>
      </v-btn>
    </template>
    <span>Reach out and contact with me now</span>
  </v-tooltip>
</template>

<script>
import mailgo from 'mailgo';
export default {
  props: {
    href: { type: String, required: true },
    icon: { type: [String, Object], required: true },
  },
  created() {
    if (process.client) {
      mailgo();
    }
  },
};
</script>

<style></style>
