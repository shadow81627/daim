<template>
  <v-btn target="_blank" large text :href="href" rel="noopener">
    <font-awesome-icon v-if="icon" :icon="icon" fixed-width pull="left" />
    <slot></slot>
  </v-btn>
</template>

<script>
import mailgo from 'mailgo';
export default {
  props: {
    href: { type: String, required: true },
    icon: { type: [String, Object], default: null },
  },
  created() {
    if (process.client) {
      mailgo();
    }
  },
};
</script>
