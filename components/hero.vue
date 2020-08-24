<template>
  <v-container class="pa-0" style="max-width: 1785px;">
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <header>
          <v-parallax
            :lazy-src="lazySrc"
            :src="src"
            :src-set="srcSet"
            height="500"
            width="1785"
            :style="{
              backgroundColor,
            }"
            size="100vw"
            max-width="1785"
            style="max-width: 1785px;"
          >
            <v-row
              align="center"
              justify="center"
              :style="{ backgroundColor: tint }"
              style="margin: -1rem;"
            >
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    heading: { type: String, default: null },
    subheading: { type: String, default: null },
    image: { type: String, default: 'header-bg' },
    tint: { type: String, default: 'rgba(0, 0, 0, 0.6)' },
    height: { type: [Number, String], default: 500 },
  },
  computed: {
    lazySrc() {
      const image = `~/assets/img/header-bg.jpg`;
      return `${image}?lqip`;
    },
    src() {
      return require(`~/assets/img/header-bg.jpg?resize&size=1785&placeholder&format=webp`)
        .src;
    },
    srcSet() {
      return require(`~/assets/img/header-bg.jpg?resize&max=4686&min=320&steps=6&format=webp`)
        .srcSet;
    },
    backgroundColor() {
      return require(`~/assets/img/header-bg.jpg?lqip-colors`)[0];
    },
  },
};
</script>
