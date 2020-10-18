<template>
  <div :class="classes" class="pt-2">
    <base-avatar
      v-if="icon"
      :color="color"
      :dark="dark"
      :icon="icon"
      :outlined="outlined"
      :size="size"
      class="mb-3"
    />

    <div :class="horizontal && title && 'ml-6'">
      <base-title
        v-if="title"
        :title="title"
        class="text-uppercase text-break"
        space="3"
      />

      <base-body
        v-if="text || $slots.default"
        :space="horizontal || dense ? 0 : undefined"
        class="mx-auto"
        max-width="700"
      >
        <slot>
          {{ text }}
        </slot>
      </base-body>
    </div>
  </div>
</template>

<script>
// Mixins
import Heading from '@/mixins/heading';

import BaseAvatar from '~/components/base/Avatar';
import BaseBody from '~/components/base/Body';
import BaseTitle from '~/components/base/Title';

export default {
  name: 'BaseAvatarCard',

  components: { BaseBody, BaseAvatar, BaseTitle },

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
