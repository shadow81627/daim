<template>
  <v-theme-provider :dark="dark">
    <v-container class="pa-0" v-bind="$attrs">
      <v-row :justify="justify" no-gutters>
        <v-col v-if="icon" :class="`text-${align}`" cols="12" class="mb-4">
          <BaseIcon :color="color" :icon="icon"></BaseIcon>
        </v-col>

        <v-col v-if="title || subtitle" :cols="callout ? 9 : 12">
          <BaseSubtitle
            v-if="subtitle"
            :title="subtitle"
            space="1"
          ></BaseSubtitle>

          <h3
            class="text-uppercase text-center text-h5 font-weight-medium"
            space="1"
            :itemprop="titleItemprop"
          >
            {{ title }}
          </h3>

          <BaseDivider :color="color"></BaseDivider>

          <BaseBody
            v-if="text || $slots.default"
            space="6"
            :itemprop="bodyItemprop"
          >
            <slot>
              {{ text }}
            </slot>
          </BaseBody>
        </v-col>

        <v-col v-if="callout" cols="2">
          <div class="text-h2 text-grey-lighten-4 font-weight-bold pr-8">
            {{ callout }}
          </div>
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
  inheritAttrs: false,

  props: {
    dark: Boolean,
    titleItemprop: {
      type: String,
      default: undefined,
    },
    bodyItemprop: {
      type: String,
      default: undefined,
    },
    callout: { type: String, default: null },
    color: {
      type: String,
      default: 'grey',
    },
    icon: { type: [String, Object], default: null },
    subtitle: { type: String, default: null },
    text: { type: String, default: null },
    title: { type: String, default: null },
    level: { type: Number, default: 3 },
  },
};
</script>
