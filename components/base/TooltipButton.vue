<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="{ ...$attrs, ...attrs, ...btnAttrs }"
        :class="buttonClass"
        v-on="on"
      >
        <BaseIcon color="grey" :icon="_icon"></BaseIcon>
        <span class="d-sr-only-focusable">{{ tooltip }}</span>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'BaseTooltipButton',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: null,
    },
    buttonClass: {
      type: String,
      default: null,
    },
    link: { type: String, required: true },
    tooltip: { type: String, required: true },
    color: { type: String, default: 'grey' },
    size: { type: String, default: null },
  },
  computed: {
    _icon() {
      if (this.icon) {
        return this.icon;
      }
      return this.isExternal ? 'mdi:open-in-new' : 'mdi-light:arrow-right';
    },
    isExternal() {
      return this.link.startsWith('http');
    },
    linkAttribute() {
      return this.isExternal ? 'href' : 'to';
    },
    btnAttrs() {
      return {
        [this.linkAttribute]: this.link,
        target: this.isExternal ? '_blank' : undefined,
        rel: this.isExternal ? 'noopener' : undefined,
      };
    },
  },
};
</script>
