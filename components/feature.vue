<template>
  <div v-editable="blok" class="column feature">
    <font-awesome-icon v-if="blok.icon" :icon="blok.icon | split" title="" />
    {{ blok.name }}
  </div>
</template>

<script>
export default {
  filters: {
    split(value, sep = ' ') {
      if (!value) return '';
      value = value.toString();
      return value.split(sep);
    },
  },
  props: { blok: { type: Object, required: true } },
};
</script>
