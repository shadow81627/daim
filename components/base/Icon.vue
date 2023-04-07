<template>
  <Icon
    style="font-size: 2em; width: 32px; height: 32px"
    :style="{ color: color }"
    :name="icon"
  ></Icon>
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
    inline: { type: Boolean, default: null },
  },
};
</script>
