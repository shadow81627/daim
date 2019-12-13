<template>
  <header v-editable="blok">
    <v-parallax :src="require('~/assets/img/header-bg.jpg')">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="display-1 font-weight-thin mb-4 text-light text-shadow text-capitalize brand"
          >
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
