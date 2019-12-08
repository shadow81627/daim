<template>
  <div v-editable="blok" class="grid">
    <component
      :is="blok.component"
      v-for="content in blok.columns"
      :key="content._uid"
      :blok="content"
    ></component>
  </div>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>
