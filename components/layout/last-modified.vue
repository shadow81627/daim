<template>
  <span v-if="lastModified">
    <span>Last modified</span>
    <v-tooltip location="top">
      <time
        itemprop="dateModified"
        :content="lastModified.toISOString()"
        :datetime="lastModified.toISOString()"
        >{{ lastModified.fromNow() }}</time
      >
      <template #activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">{{ lastModified.format(format) }}</span>
      </template>
    </v-tooltip>
  </span>
</template>

<script>
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

export default {
  props: {
    utc: Boolean,
    interval: { type: Number, default: 60000 },
    format: { type: String, default: 'ddd, DD MMM YYYY HH:mm:ss Z' },
  },
  setup() {
    const config = useRuntimeConfig();
    const lastModified = dayjs(config.DATE_GENERATED);
    return { lastModified };
  },
};
</script>
