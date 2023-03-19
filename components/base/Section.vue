<template>
  <section v-bind="$attrs" :style="styles">
    <slot />
  </section>
</template>

<script>
// Components
// import Measurable from 'vuetify/lib/mixins/measurable';

export default {
  name: 'BaseSection',

  // mixins: [Measurable],

  props: {
    space: {
      type: [Number, String],
      default: 96 / 2,
    },
  },

  computed: {
    styles() {
      return {
        // ...this.measurableStyles,
        padding: `${this.space}px 0`,
      };
    },
  },
};
</script>
