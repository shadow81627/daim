<template>
  <div :class="classes" class="base-avatar d-inline-flex">
    <v-avatar
      :color="color || 'white'"
      :size="size"
      class="base-avatar__avatar"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <base-icon v-if="icon" :dark="dark" :size="size / 2" :icon="icon">
      </base-icon>
    </v-avatar>
  </div>
</template>

<script>
import BaseIcon from '~/components/base/Icon.vue';
export default {
  name: 'BaseAvatar',

  components: { BaseIcon },

  props: {
    color: { type: String, default: null },
    dark: Boolean,
    icon: { type: [String, Object], default: null },
    outlined: Boolean,
    size: {
      type: [Number, String],
      default: 56,
    },
  },

  data: () => ({
    multiply: 6,
  }),

  computed: {
    classes() {
      return [this.outlined && 'base-avatar--outlined'];
    },
    outlineSize() {
      return Number(this.size) + this.size / this.multiply;
    },
    styles() {
      const margin = this.size / (this.multiply * 2);

      return {
        // Aligns the outline content with the content
        margin: `-${margin}px 0 0 -${margin}px`,
      };
    },
  },
};
</script>
