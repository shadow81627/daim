<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row class="align-self-center">
        <v-col align="center">
          <v-card id="message" max-width="360" class="text-left">
            <v-card-subtitle class="text--primary pb-0">
              <h2
                class="font-weight-bold text-subtitle-1"
                style="letter-spacing: 3px"
              >
                500
              </h2>
            </v-card-subtitle>
            <v-card-title class="pt-0">
              <h1 class="text-h5 font-weight-light" style="letter-spacing: 3px">
                {{ $t('error.500.heading') }}
              </h1>
            </v-card-title>

            <v-card-text
              class="text--primary font-weight-light"
              style="line-height: 140%; letter-spacing: 1px"
              >{{ $t('error.500.description') }}</v-card-text
            >
            <v-card-text>
              <video
                autoplay
                width="640"
                data-alt="Baboon pounding on laptop keyboard"
                src="https://media.gettyimages.com/videos/medium-shot-baboon-pounding-on-laptop-keyboard-video-id712-54"
                muted
                loop
                style="width: 100%; height: auto"
              />
            </v-card-text>
            <v-card-text>
              <v-row no-gutters>
                <v-col>
                  <v-btn
                    href="javascript:location.reload();"
                    color="primary"
                    block
                    x-large
                    >Try again</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    :to="localePath('index')"
                    color="primary"
                    block
                    x-large
                  >
                    {{ $t('layout.navigation.home') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      // title: this.$t('error.500.heading'),
      meta: [
        // {
        //   hid: 'description',
        //   name: 'description',
        //   content: this.$t('error.500.description'),
        // },
      ],
    };
  },
};
</script>
