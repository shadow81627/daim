<template>
  <v-responsive
    :class="classes"
    class="base-divider"
    max-width="28"
    min-height="3"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-responsive>
</template>

<script>
// Mixins
import Heading from '@/mixins/heading';

export default {
  name: 'BaseDivider',

  mixins: [Heading],

  props: {
    color: { type: String, default: null },
    dense: Boolean,
    space: {
      type: [Number, String],
      default: 6,
    },
  },

  computed: {
    classes() {
      return [this.color, this.margin, `mb-${this.space}`];
    },
    margin() {
      switch (this.align) {
        case 'left':
          return 'mr-auto';
        case 'right':
          return 'ml-auto';
        default:
          return 'mx-auto';
      }
    },
  },
};
</script>
