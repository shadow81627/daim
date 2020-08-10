<template>
  <v-card
    v-editable="blok"
    class="flex d-flex flex-column justify-between"
    min-width="240"
  >
    <div>
      <v-card-title>
        <span class="h3 text-break text-no-wrap text-truncate">
          <font-awesome-icon
            v-if="blok.icon"
            :icon="blok.icon | split"
            title=""
            style="color: grey;"
          />
          {{ blok.name || blok.heading }}
        </span>
      </v-card-title>
    </div>

    <v-card-subtitle v-if="blok.subheading">{{
      blok.subheading
    }}</v-card-subtitle>
    <v-card-text class="flex-grow-1 text--primary">{{ blok.text }}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="blok.href"
        :href="blok.href"
        target="_blank"
        rel="noopener"
        size="sm"
        text
      >
        <span>Learn more</span>
        <!-- <span>{{ blok.heading }}</span> -->
        <font-awesome-icon
          :icon="['fas', 'angle-right']"
          style="color: grey;"
        />
      </v-btn>
    </v-card-actions>
  </v-card>
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
