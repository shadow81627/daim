<template>
  <div v-editable="blok" class="grid">
    <component
      :is="column.component"
      v-for="column in blok.columns"
      :key="column._uid"
      :blok="column"
    ></component>
  </div>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>
