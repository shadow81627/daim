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
                {{ error.statusCode }}
              </h2>
            </v-card-subtitle>
            <v-card-title class="pt-0">
              <h1 class="text-h5 font-weight-light" style="letter-spacing: 3px">
                <template v-if="error.statusCode === 404">
                  Page Not Found
                </template>
                <template v-else>
                  {{ error.statusMessage }}
                </template>
              </h1>
            </v-card-title>

            <v-card-text
              v-if="
                error.statusMessage !== error.message ||
                error.statusCode === 404
              "
              class="text--primary font-weight-light"
              style="line-height: 140%; letter-spacing: 1px"
            >
              <template v-if="error.statusCode === 404">
                The specified file was not found on this website. Please check
                the URL for mistakes and try again.
              </template>
              <template v-else>
                {{ error.message }}
              </template>
            </v-card-text>
            <v-card-text>
              <v-row v-if="error.statusCode !== 404" no-gutters>
                <v-col>
                  <v-btn
                    color="primary"
                    block
                    size="x-large"
                    @click="clearError()"
                    >Try again</v-btn
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    color="primary"
                    block
                    size="x-large"
                    @click="clearError({ redirect: '/' })"
                  >
                    Home
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

<!-- <script>
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
</script> -->

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => {},
  },
});
</script>
