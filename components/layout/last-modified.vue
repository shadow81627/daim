<template>
  <client-only>
    <v-col v-if="lastModified" cols="auto">
      <v-card flat tile color="transparent">
        <v-card-text class="py-2">
          <span>Last modified</span>
          <v-tooltip top>
            <span>{{ relativeDate }}</span>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{
                utc
                  ? new Date(lastModified).toUTCString()
                  : DateTime.fromISO(lastModified).toRFC2822()
              }}</span>
            </template>
          </v-tooltip>
        </v-card-text>
      </v-card>
    </v-col>
  </client-only>
</template>

<script>
import { DateTime } from 'luxon';
export default {
  props: {
    utc: Boolean,
  },
  data() {
    return {
      DateTime,
      relativeDate: DateTime.fromISO(this.lastModified).toRelative(),
      timer: null,
    };
  },
  computed: {
    lastModified() {
      const lastModified = process.client ? document.lastModified : null;
      return new Date(
        lastModified || this.$config.DATE_GENERATED,
      ).toISOString();
    },
  },
  created() {
    this.timer = setInterval(this.toRelativeDate, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    toRelativeDate() {
      const lastModified = DateTime.fromISO(this.lastModified);
      this.relativeDate = lastModified.toRelative();
    },
  },
};
</script>
