<template>
  <b-col v-if="blok" v-editable="blok" class="feature">
    <v-card>
      <v-card-text>
        <b-card-title class="text-nowrap">
          <font-awesome-icon
            v-if="blok.icon"
            :icon="blok.icon | split"
            title=""
          />
          {{ blok.name }}
        </b-card-title>
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
