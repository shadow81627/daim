<template>
  <div :class="classes" class="base-section-heading">
    <base-avatar
      v-if="icon"
      :icon="icon"
      :outlined="outlined"
      class="mb-4"
      color="primary"
      dark
    />

    <base-subtitle v-if="subtitle" :title="subtitle" space="1" tag="h2" />

    <base-subheading
      v-if="title"
      :align="align"
      :title="title"
      class="text-uppercase"
      space="2"
    />

    <base-divider :color="color" />

    <base-body v-if="$slots.default || text" class="mx-auto" max-width="700">
      <slot v-if="$slots.default" />

      <template v-else>
        {{ text }}
      </template>
    </base-body>
  </div>
</template>

<script>
// Mixins
import Heading from '@/mixins/heading';

import BaseAvatar from '~/components/base/Avatar';
import BaseSubheading from '~/components/base/Subheading';
import BaseBody from '~/components/base/Body';
import BaseDivider from '~/components/base/Divider';

export default {
  name: 'BaseSectionHeading',

  components: { BaseBody, BaseDivider, BaseAvatar, BaseSubheading },

  mixins: [Heading],

  props: {
    align: {
      type: String,
      default: 'center',
    },
    color: {
      type: String,
      default: 'primary',
    },
    icon: { type: [String, Object], default: null },
    outlined: Boolean,
    space: {
      type: [Number, String],
      default: 12,
    },
    subtitle: { type: String, default: null },
    text: { type: String, default: null },
    title: { type: String, default: null },
  },

  computed: {
    classes() {
      return [`text-${this.align}`, `mb-${this.space}`];
    },
  },
};
</script>
