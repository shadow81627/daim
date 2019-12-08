<template>
  <div v-editable="blok" class="page">
    <component
      :is="body.component"
      v-for="body in blok.body"
      :key="body._uid"
      :blok="body"
    ></component>
  </div>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },

  head() {
    return {};
  },
};
</script>
