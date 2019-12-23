<template>
  <header v-editable="blok">
    <v-parallax
      :src="require('~/assets/img/header-bg.jpg')"
      :style="{
        backgroundColor: require('~/assets/img/header-bg.jpg?lqip-colors')[0],
      }"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="mb-4 text-light text-shadow">
            {{ blok.headline }}
          </h1>
          <h2 class="subheading text-light text-shadow">
            {{ blok.desciption }}
          </h2>
        </v-col>
      </v-row>
    </v-parallax>
  </header>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>
