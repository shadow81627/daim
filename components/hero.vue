<template>
  <v-container class="pa-0" style="max-width: 1785px;">
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <header>
          <v-img
            :lazy-src="lazySrc"
            :src="src"
            :src-set="srcSet"
            :height="height"
            width="1785"
            :style="{ backgroundColor }"
            sizes="(max-width: 1785px) 100vw, 1785px"
          >
            <v-container
              class="fill-height align-items-end justify-start"
              :style="{ backgroundColor: tint }"
              fluid
            >
              <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                  <v-card color="transparent" flat dark>
                    <h1 v-if="heading" class="mb-4 text-shadow">
                      {{ heading }}
                    </h1>
                    <h2 v-if="subheading" class="subheading text-shadow">
                      {{ subheading }}
                    </h2>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
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
    // image: { type: String, default: 'header-bg' },
    tint: { type: String, default: 'rgba(0, 0, 0, 0.6)' },
    height: { type: [Number, String], default: 500 },
  },
  computed: {
    lazySrc() {
      return require(`~/assets/img/header-bg.jpg?lqip`);
    },
    src() {
      return require(`~/assets/img/header-bg.jpg?resize&size=1785&placeholder`)
        .src;
    },
    srcSet() {
      return require(`~/assets/img/header-bg.jpg?resize&sizes[]=320&sizes[]=600&sizes[]=900&sizes[]=1785&sizes[]=4686&format=webp`)
        .srcSet;
    },
    backgroundColor() {
      return require(`~/assets/img/header-bg.jpg?lqip-colors`)[0];
    },
  },
};
</script>
