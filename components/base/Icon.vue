<template>
  <!-- <v-icon :size="size" v-bind="$attrs" v-on="$listeners">
    {{ icon }}
  </v-icon> -->
  <font-awesome-icon
    v-if="isFontAwesomeIcon"
    size="2x"
    :icon="icon"
    :class="[`${color}--text`]"
  />
  <Icon
    v-else
    style="font-size: 2em; width: 32px; height: 32px"
    :style="{ color: color }"
    v-bind="{ icon, inline }"
  ></Icon>
</template>

<script>
import fetch from 'cross-fetch';
import { Icon, _api } from '@iconify/vue2';
export default {
  name: 'BaseIcon',
  components: {
    Icon,
  },

  props: {
    icon: { type: [String, Object], default: null },
    color: { type: String, default: 'grey' },
    size: {
      type: [Number, String],
      default: 56,
    },
    inline: { type: Boolean, default: null },
  },
  head() {
    if (!this.isFontAwesomeIcon) {
      const href = 'https://api.iconify.design';
      return {
        link: [
          // https://api.iconify.design
          {
            rel: 'preconnect',
            href,
            hid: `preconnect-${href}`,
            crossorigin: 'anonymous',
            once: true,
          },
        ],
      };
    }
  },
  computed: {
    isFontAwesomeIcon() {
      return typeof this.icon === 'object';
    },
  },
  created() {
    _api.setFetch(fetch);
  },
};
</script>
