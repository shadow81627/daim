<template>
  <v-col v-editable="blok">
    <component
      :is="child.component"
      v-for="child in blok.children"
      :key="child._uid"
      :blok="child"
    ></component>
  </v-col>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>
