<template>
  <!-- <v-icon :size="size" v-bind="$attrs" v-on="$listeners">
    {{ icon }}
  </v-icon> -->
  <font-awesome-icon
    v-if="typeof icon === 'object'"
    size="2x"
    :icon="icon"
    :class="[`${color}--text`]"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <Icon
    v-else
    style="font-size: 2em"
    :icon="icon"
    :class="[`${color}--text`]"
    v-bind="$attrs"
    v-on="$listeners"
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
  },

  created() {
    _api.setFetch(fetch);
  },
};
</script>
