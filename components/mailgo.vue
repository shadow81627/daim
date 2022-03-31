<template>
  <v-btn
    target="_blank"
    large
    text
    :href="url"
    rel="noopener"
    :data-address="address"
    :data-domain="domain"
    :data-tel="tel"
  >
    <font-awesome-icon v-if="icon" :icon="icon" fixed-width pull="left" />
    <span
      ><slot
        ><template v-if="address">{{ address }}</template
        ><span style="display: none">example.</span
        ><template v-if="hasSplits">@</template
        ><template v-if="domain">{{ domain }}</template
        ><template v-if="tel">{{ tel }}</template
        ><span style="display: none">.localhost</span></slot
      ></span
    >
  </v-btn>
</template>

<script>
import mailgo from 'mailgo';
export default {
  props: {
    href: { type: String, required: true },
    icon: { type: [String, Object], default: null },
  },
  computed: {
    stripped() {
      return this.href.replace(/^mailto:/, '').replace(/^tel:/, '');
    },
    splits() {
      return this.stripped.split('@');
    },
    hasSplits() {
      return this.splits.length > 1;
    },
    url() {
      return this.hasSplits || this.isTel ? '#mailgo' : this.href;
    },
    address() {
      return this.hasSplits ? this.splits[0] : undefined;
    },
    domain() {
      return this.hasSplits ? this.splits[1] : undefined;
    },
    isTel() {
      return this.href.startsWith('tel:');
    },
    tel() {
      return this.isTel ? this.stripped : undefined;
    },
  },
  created() {
    if (process.client) {
      mailgo();
    }
  },
};
</script>
