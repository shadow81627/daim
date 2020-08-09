<template>
  <b-container v-editable="blok">
    <b-row>
      <template v-for="column in blok.columns">
        <b-col
          v-if="column.component !== 'column'"
          :key="column._uid"
          :sm="blok.sm"
          :md="blok.md"
        >
          <component :is="column.component" :blok="column"></component>
        </b-col>
        <component
          :is="column.component"
          v-else
          :key="column._uid"
          :blok="column"
        ></component>
      </template>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>
