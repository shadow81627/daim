<template>
  <v-theme-provider :dark="dark">
    <v-container class="pa-0">
      <v-row :justify="justify" no-gutters>
        <v-col v-if="icon" :class="`text-${align}`" cols="12" class="mb-4">
          <BaseIcon :color="color" :icon="icon"></BaseIcon>
        </v-col>

        <v-col v-if="title || subtitle" :cols="callout ? 9 : 12">
          <BaseSubtitle v-if="subtitle" :title="subtitle" space="1" />

          <BaseTitle :title="title" class="text-uppercase" space="1" />

          <BaseDivider :color="color" />

          <BaseBody v-if="text || $slots.default" :text="text" space="6">
            <slot />
          </BaseBody>
        </v-col>

        <v-col v-if="callout" cols="2">
          <div
            class="display-3 grey--text text--lighten-4 font-weight-bold pr-8"
            v-text="callout"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
// Mixins
import Heading from '@/mixins/heading';

export default {
  name: 'BaseInfoCard',

  mixins: [Heading],

  props: {
    dark: Boolean,
    callout: { type: String, default: null },
    color: {
      type: String,
      default: 'grey',
    },
    icon: { type: [String, Object], default: null },
    subtitle: { type: String, default: null },
    text: { type: String, default: null },
    title: { type: String, default: null },
  },
};
</script>
