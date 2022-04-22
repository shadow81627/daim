<template>
  <v-img
    sizes="100vw"
    :src="$img(src, { quality, width, height })"
    :srcset="_srcset.srcset"
    height="100vh"
    width="100vw"
    eager
  >
    <v-container class="fill-height" fluid>
      <v-row class="align-self-center">
        <v-col align="center">
          <v-card id="message" max-width="360" class="text-left">
            <v-card-subtitle class="text--primary pb-0">
              <h2
                class="font-weight-bold text-subtitle-1"
                style="letter-spacing: 3px"
              >
                404
              </h2>
            </v-card-subtitle>
            <v-card-title class="pt-0">
              <h1 class="text-h5 font-weight-light" style="letter-spacing: 3px">
                {{ $t('error.404.heading') }}
              </h1>
            </v-card-title>

            <v-card-text
              class="text--primary font-weight-light"
              style="line-height: 140%; letter-spacing: 1px"
              >{{ $t('error.404.description') }}</v-card-text
            >
            <v-card-text>
              <v-btn :to="localePath('index')" color="primary" block x-large>
                {{ $t('layout.navigation.home') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return { src: '/img/404.jpg', quality: 25, width: 1200, height: 630 };
  },
  head() {
    const { quality, width, height } = this;
    return {
      title: this.$t('error.404.heading'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('error.404.description'),
        },
      ],
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: `${this.$config.BASE_URL}${this.$img(this.src, {
            width,
            height,
            quality,
          })}`,
          imagesrcset: this._srcset.srcset,
          imagesizes: '100vw',
        },
      ],
    };
  },
  computed: {
    _srcset() {
      const { quality, width, height } = this;
      return this.$img.getSizes(this.src, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'avif',
          quality,
          width,
          height,
        },
      });
    },
  },
};
</script>
