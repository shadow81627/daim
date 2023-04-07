<template>
  <div :class="classes" class="base-section-heading">
    <BaseAvatar
      v-if="icon"
      :icon="icon"
      :outlined="outlined"
      class="mb-4"
      color="primary"
      dark
    ></BaseAvatar>

    <h3 v-if="subtitle" space="1">{{ subtitle }}</h3>

    <h2 v-if="title" :align="align" class="text-uppercase text-h4" space="2">
      {{ title }}
    </h2>

    <BaseDivider :color="color"></BaseDivider>

    <BaseBody
      v-if="$slots.default || text"
      class="mx-auto px-2"
      max-width="700"
    >
      <slot>
        {{ text }}
      </slot>
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
