<template>
  <div :class="classes" class="base-section-heading">
    <BaseAvatar
      v-if="icon"
      :icon="icon"
      :outlined="outlined"
      class="mb-4"
      color="primary"
      dark
    />

    <BaseSubtitle v-if="subtitle" :title="subtitle" space="1" tag="h3" />

    <BaseSubheading
      v-if="title"
      :align="align"
      :title="title"
      class="text-uppercase"
      space="2"
    />

    <BaseDivider :color="color" />

    <BaseBody v-if="$slots.default || text" class="mx-auto" max-width="700">
      <slot v-if="$slots.default" />

      <template v-else>
        {{ text }}
      </template>
    </BaseBody>
  </div>
</template>

<script>
// Mixins
import Heading from '@/mixins/heading';

export default {
  name: 'BaseSectionHeading',

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
