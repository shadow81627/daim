<template>
  <!-- <v-icon :size="size" v-bind="$attrs" v-on="$listeners">
    {{ icon }}
  </v-icon> -->
  <font-awesome-icon
    size="2x"
    :icon="icon"
    :class="[`${color}--text`]"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'BaseIcon',

  props: {
    icon: { type: [String, Object], default: null },
    color: { type: String, default: 'grey' },
    size: {
      type: [Number, String],
      default: 56,
    },
  },
};
</script>
