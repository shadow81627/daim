<template>
  <v-btn target="_blank" large text :href="href" rel="noopener">
    <font-awesome-icon v-if="icon" :icon="icon" fixed-width pull="left" />
    <span class="reverse"><slot></slot></span>
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

<style>
/**
  The reverse CSS will override the reading direction
  and present the text to the user in the correct order.
  https://stackoverflow.com/a/483239
 */
.reverse {
  unicode-bidi: bidi-override;
  direction: rtl;
}
</style>
