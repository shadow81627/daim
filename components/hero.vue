<template>
  <v-container class="pa-0" style="max-width: 1785px">
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <v-card :color="color" flat dark tile>
          <v-img
            :lazy-src="src.placeholder"
            :src="src.src"
            :srcset="src.srcSet"
            :height="height"
            width="1785"
            sizes="(max-width: 1785px) 100vw, 1785px"
            :gradient="gradient"
            alt=""
          >
            <v-container
              class="fill-height align-items-end justify-start"
              fluid
            >
              <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                  <h1 v-if="heading" class="mb-4 text-shadow">
                    {{ heading }}
                  </h1>
                  <h2 v-if="subheading" class="subheading text-shadow">
                    {{ subheading }}
                  </h2>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    heading: { type: String, default: null },
    subheading: { type: String, default: null },
    gradient: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)',
    },
    height: { type: [Number, String], default: 500 },
    color: {
      type: String,
      default: require(`~/assets/img/header-bg.jpg?lqip-colors`)[0],
    },
  },
  computed: {
    src() {
      return require(`~/assets/img/header-bg.jpg?resize&sizes[]=320&sizes[]=600&sizes[]=900&sizes[]=1785&sizes[]=4686&placeholder&format=webp`);
    },
  },
};
</script>
