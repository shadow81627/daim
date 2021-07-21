<template>
  <v-tooltip top>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        :href="link"
        target="_blank"
        rel="noopener"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="grey">{{ icons[icon] }}</v-icon>
        <span class="d-sr-only-focusable">{{ tooltip }}</span>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
import { mdiWeb, mdiGithub, mdiOpenInNew } from '@mdi/js';
const icons = { mdiWeb, mdiGithub, mdiOpenInNew };
export default {
  name: 'BaseTooltipButton',
  props: {
    icon: {
      type: String,
      default: 'mdiOpenInNew',
      validator: (value) => Object.keys(icons).includes(value),
    },
    link: { type: String, required: true },
    tooltip: { type: String, required: true },
    color: { type: String, default: 'grey' },
    size: { type: String, default: 'small' },
  },
  data: () => ({ icons }),
};
</script>
