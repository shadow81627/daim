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
    <BaseIcon
      :icon="_icon"
      style="width: 14px; margin-right: 0.3em"
      color="black"
    ></BaseIcon>
    <slot>
      <span style="display: none">info.</span>
      <span v-if="address && domain" itemprop="email">{{ stripped }}</span>
      <span style="display: none">.localhost</span>
      <span v-if="tel" itemprop="telephone">{{ tel }}</span>
    </slot>
  </v-btn>
</template>

<script>
import mailgo from 'mailgo';
export default {
  props: {
    href: { type: String, required: true },
    icon: { type: [String, Object], default: null },
    noIcon: { type: Boolean, default: false },
  },
  computed: {
    _icon() {
      if (this.noIcon) return;
      if (this.icon) return this.icon;
      return this.isTel ? 'fa:phone' : 'fa:envelope';
    },
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
