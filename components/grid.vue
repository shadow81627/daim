<template>
  <b-container v-editable="blok">
    <b-row>
      <component
        :is="column.component"
        v-for="column in blok.columns"
        :key="column._uid"
        :blok="column"
      ></component>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>
