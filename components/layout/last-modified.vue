<template>
  <client-only>
    <v-card v-if="lastModified" flat tile color="transparent">
      <v-card-text class="py-2">
        <span>Last modified</span>
        <v-tooltip top>
          <span>{{ relativeDate }}</span>
          <template v-slot:activator="{ on, attrs }">
            <time
              v-bind="attrs"
              itemprop="dateModified"
              :content="lastModified.toISOString()"
              :datetime="lastModified.toISOString()"
              v-on="on"
              >{{ lastModified.format(format) }}</time
            >
          </template>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </client-only>
</template>

<script>
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  props: {
    utc: Boolean,
    interval: { type: Number, default: 60000 },
    format: { type: String, default: 'ddd, DD MMM YYYY HH:mm:ss Z' },
  },
  data() {
    return {
      relativeDate: null,
      timer: null,
    };
  },
  computed: {
    lastModified() {
      return dayjs(this.$config.DATE_GENERATED);
    },
  },
  created() {
    this.toRelativeDate();
    this.timer = setInterval(this.toRelativeDate, this.interval);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    toRelativeDate() {
      this.relativeDate = this.lastModified.fromNow();
    },
  },
};
</script>
