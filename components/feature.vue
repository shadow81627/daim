<template>
  <b-col v-editable="blok" class="feature">
    <v-card>
      <v-card-text>
        <h3 class="text-nowrap">
          <font-awesome-icon
            v-if="blok.icon"
            :icon="blok.icon | split"
            title=""
          />
          {{ blok.name }}
        </h3>
      </v-card-text>
    </v-card>
  </b-col>
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
