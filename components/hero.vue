<template>
  <v-container class="pa-0 hidden-print-only" fluid>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <v-card :color="color || backgroundColor(src)[0]" flat dark tile>
          <v-img
            :lazy-src="_src(src).placeholder"
            :src="_src(src).src"
            :srcset="_src(src).srcSet"
            :height="height"
            sizes="(max-width: 1785px) 100vw, 1785px"
            :gradient="gradient"
          >
            <slot>
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
            </slot>
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
      default: null,
    },
    src: {
      type: String,
      default: './header-bg.jpg',
    },
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.$config.BASE_URL}${this.cover(`${this.src}`).src}`,
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: this.cover(`${this.src}`).width,
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: this.cover(`${this.src}`).height,
        },
      ],
    };
  },
  methods: {
    backgroundColor: require.context(
      '~/assets/img?lqip-colors',
      true,
      /\.(png|jpe?g).*$/,
    ),
    _src: require.context(
      `~/assets/img?resize&sizes[]=320&sizes[]=600&sizes[]=900&sizes[]=1785&sizes[]=4686&placeholder&format=webp`,
      true,
      /\.(png|jpe?g).*$/,
    ),
    cover: require.context(
      `~/assets/img?resize&size=1200&format=jpg`,
      true,
      /\.(png|jpe?g).*$/,
    ),
  },
};
</script>
