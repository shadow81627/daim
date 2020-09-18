<template>
  <v-footer class="hidden-print-only" height="auto">
    <v-container>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text>
              <span>{{ $config.VERSION }}</span>
              <span v-if="$config.COMMIT">{{ shortHash($config.COMMIT) }}</span>
              <span v-if="$config.VERSION && $config.COMMIT">|</span>
              <nuxt-link :to="localePath('releases')">
                <span>Changelog</span>
              </nuxt-link>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-card flat color="transparent">
            <v-card-text>
              <span>This site is protected by reCAPTCHA and the Google</span>
              <a href="https://policies.google.com/privacy">Privacy Policy</a>
              <span>and</span>
              <a href="https://policies.google.com/terms">Terms of Service</a>
              <span>apply.</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-card flat tile color="transparent">
            <v-card-text class="py-2">
              <font-awesome-icon
                :icon="faMapMarker"
                title="location"
                fixed-width
              />
              <span>New Farm, Australia</span>
              <span>© <time datetime="2019">2019</time> | Damien Robinson</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <last-modified v-bind="{ utc }" />
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import lastModified from './last-modified';
export default {
  components: {
    lastModified,
  },
  data: () => ({
    utc: false,
    faMapMarker,
  }),
  methods: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
};
</script>
