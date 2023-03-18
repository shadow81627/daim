<template>
  <div :class="classes" class="pt-2">
    <BaseAvatar
      v-if="icon"
      :color="color"
      :dark="dark"
      :icon="icon"
      :outlined="outlined"
      :size="size"
      class="mb-3"
    ></BaseAvatar>

    <div :class="horizontal && title && 'ml-6'">
      <h3
        v-if="title"
        class="text-uppercase text-break text-h5 font-weight-medium"
        space="1"
        :itemprop="titleItemprop"
      >
        {{ title }}
      </h3>

      <BaseBody
        v-if="text || $slots.default"
        :space="horizontal || dense ? 0 : undefined"
        class="mx-auto"
        max-width="700"
      >
        <slot>
          {{ text }}
        </slot>
      </BaseBody>
    </div>
  </div>
</template>

<script>
// Mixins
import Heading from '@/mixins/heading';

import BaseAvatar from '~/components/base/Avatar';
import BaseBody from '~/components/base/Body';

export default {
  name: 'BaseAvatarCard',

  components: { BaseBody, BaseAvatar },

  mixins: [Heading],

  props: {
    align: {
      type: String,
      default: 'left',
    },
    color: { type: String, default: null },
    dark: Boolean,
    dense: Boolean,
    horizontal: Boolean,
    icon: { type: [String, Object], default: null },
    outlined: {
      type: Boolean,
      default: true,
    },
    space: {
      type: [Number, String],
      default: 8,
    },
    size: {
      type: [Number, String],
      default: 72,
    },
    text: { type: String, default: null },
    title: { type: String, default: null },
  },

  computed: {
    classes() {
      const classes = [`mb-${this.space}`];

      if (this.horizontal) {
        classes.push('d-flex');

        if (!this.$slots.default && !this.text) {
          classes.push('align-center');
        }
      }

      return classes;
    },
  },
};
</script>
