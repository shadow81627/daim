<template>
  <v-container class="pa-0 hidden-print-only" fluid>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" align-self="center">
        <v-card
          :color="color"
          variant="flat"
          theme="dark"
          rounded="0"
          :style="{ backgroundColor: color }"
        >
          <v-responsive :height="height" :gradient="gradient">
            <template #additional>
              <NuxtPicture
                preload
                :src="src"
                :height="height"
                alt=""
                itemprop="image"
                fit="cover"
                :img-attrs="{ style: imageStyle }"
                :style="imageStyle"
                crossorigin="anonymous"
              ></NuxtPicture>
              <div
                style="
                  background-repeat: no-repeat;
                  z-index: -1;
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                "
                :style="{ backgroundImage: `linear-gradient(${gradient})` }"
              ></div>
            </template>
            <slot>
              <v-container
                class="fill-height align-items-end justify-start"
                fluid
              >
                <v-row align="center" justify="center">
                  <v-col class="text-center" cols="12">
                    <slot name="heading">
                      <h1
                        v-if="heading"
                        class="mb-4 text-shadow text-h3 font-weight-medium"
                        itemprop="name"
                      >
                        {{ heading }}
                      </h1>
                    </slot>
                    <h2
                      v-if="subheading"
                      class="subheading text-shadow text-h4 text-uppercase"
                      itemprop="description"
                    >
                      {{ subheading }}
                    </h2>
                  </v-col>
                </v-row>
              </v-container>
            </slot>
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    heading: { type: String, default: undefined },
    subheading: { type: String, default: undefined },
    description: { type: String, default: undefined },
    alt: { type: String, default: '' },
    gradient: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)',
    },
    width: { type: [Number, String], default: 1280 },
    height: { type: [Number, String], default: 500 },
    color: {
      type: String,
      default: '#575757',
    },
    src: {
      type: String,
      default: '/img/header-bg.jpg',
    },
  },
  setup(props) {
    const imageStyle = `z-index: -1;
    object-fit: cover;
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;`;
    const $img = useImage();
    const ogImage = $img(props.src, {
      width: 1200,
      height: 630,
      fit: 'cover',
      format: 'png',
    });
    useServerSeoMeta({
      title: props.heading,
      ogTitle: props.heading,
      description: props.description ?? props.subheading,
      ogDescription: props.description ?? props.subheading,
      // ogImage,
      ogImageHeight: props.height,
      ogImageWidth: props.width,
    });
    defineOgImageStatic({
      component: 'CustomBanner',
      backgroundImage: ogImage,
    });
    return { imageStyle };
  },
};
</script>
