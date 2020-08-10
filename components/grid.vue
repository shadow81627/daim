<template>
  <v-container v-editable="blok">
    <v-row>
      <template v-for="column in blok.columns">
        <v-col
          v-if="column.component !== 'column'"
          :key="column._uid"
          :sm="blok.sm"
          :md="blok.md"
          class="d-flex flex-column"
        >
          <component
            :is="column.component"
            :blok="column"
            class="flex d-flex flex-column justify-between"
          ></component>
        </v-col>
        <component
          :is="column.component"
          v-else
          :key="column._uid"
          :blok="column"
        ></component>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>
