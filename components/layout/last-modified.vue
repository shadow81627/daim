<template>
  <client-only>
    <v-card v-if="lastModified" flat tile color="transparent">
      <v-card-text class="py-2">
        <span>Last modified</span>
        <v-tooltip top>
          <time
            itemprop="dateModified"
            :content="lastModified.toISOString()"
            :datetime="lastModified.toISOString()"
            >{{ lastModified.fromNow() }}</time
          >
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{
              lastModified.format(format)
            }}</span>
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
};
</script>
