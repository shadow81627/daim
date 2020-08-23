<template>
  <header>
    <v-parallax
      :lazy-src="require(`~/assets/img/header-bg.jpg?lqip`)"
      :src="
        require('~/assets/img/header-bg.jpg?resize&size=1785&placeholder').src
      "
      :src-set="
        require(`~/assets/img/header-bg.jpg?resize&max=1785&min=320&steps=6`)
          .srcSet
      "
      :style="{
        backgroundColor: require('~/assets/img/header-bg.jpg?lqip-colors')[0],
      }"
      size="100vw"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 v-if="heading" class="mb-4 text-light text-shadow">
            {{ heading }}
          </h1>
          <h2 v-if="subheading" class="subheading text-light text-shadow">
            {{ subheading }}
          </h2>
        </v-col>
      </v-row>
    </v-parallax>
  </header>
</template>

<script>
export default {
  props: {
    heading: { type: String, required: false, default: null },
    subheading: { type: String, required: false, default: null },
  },
};
</script>
