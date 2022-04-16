<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="{ ...attrs, ...btnAttrs }" v-on="on">
        <v-icon color="grey" :small="size === 'small'">{{
          icons[icon]
        }}</v-icon>
        <span class="d-sr-only-focusable">{{ tooltip }}</span>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
import { mdiWeb, mdiGithub, mdiOpenInNew } from '@mdi/js';
const icons = { mdiWeb, mdiGithub, mdiOpenInNew };
const defaultIcon = 'mdiOpenInNew';

export default {
  name: 'BaseTooltipButton',
  props: {
    icon: {
      type: String,
      default: defaultIcon,
      validator: (value) => Object.keys(icons).includes(value),
    },
    link: { type: String, required: true },
    tooltip: { type: String, required: true },
    color: { type: String, default: 'grey' },
    size: { type: String, default: null },
  },
  data: () => ({ icons, defaultIcon }),
  computed: {
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
