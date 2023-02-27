<template>
  <span v-if="lastModified">
    <span>Last modified </span>
    <v-tooltip location="top">
      <time
        itemprop="dateModified"
        :content="lastModified.toISOString()"
        :datetime="lastModified.toISOString()"
        >{{ lastModified.fromNow() }}</time
      >
      <template #activator="{ props }">
        <span v-bind="props" class="text-grey-darken-1" style="cursor: pointer">{{
          lastModified.format(format)
        }}</span>
      </template>
    </v-tooltip>
  </span>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

// eslint-disable-next-line import/no-named-as-default-member
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
