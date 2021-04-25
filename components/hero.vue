<template>
  <v-container class="pa-0 hidden-print-only" fluid>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <v-card :color="color" flat dark tile>
          <v-img
            :lazy-src="$img(src, { width: 10, quality: 70 })"
            :src="$img(src, { quality: 70 })"
            :srcset="_srcset.srcset"
            :height="height"
            :sizes="_srcset.size"
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
    alt: { type: String, default: '' },
    gradient: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)',
    },
    width: { type: [Number, String], default: 1200 },
    height: { type: [Number, String], default: 500 },
    color: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      default: '/img/header-bg.jpg',
    },
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${this.$config.BASE_URL}${this.$img(this.src, {
            width: 1200,
            height: 630,
          })}`,
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: 1200,
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: 630,
        },
      ],
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: `${this.$config.BASE_URL}${this.$img(this.src, {
            width: 1200,
            height: 630,
          })}`,
          imagesrcset: this._srcset.srcset,
          imagesizes: '(max-width: 1785px) 100vw, 1785px',
        },
      ],
    };
  },
  computed: {
    _srcset() {
      return this.$img.getSizes(this.src, {
        sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
        },
      });
    },
  },
};
</script>
