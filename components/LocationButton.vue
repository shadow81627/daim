<template>
  <v-btn
    target="_blank"
    large
    text
    :href="`https://www.google.com.au/maps/search/?api=1&query=${encodeURIComponent(
      `${city || ''} ${region || ''} ${postcode || ''} ${country || ''}`,
    )}`"
    rel="noreferrer"
    itemprop="address"
    itemscope
    itemtype="https://schema.org/PostalAddress"
  >
    <font-awesome-icon
      :icon="faMapMarker"
      title="location"
      fixed-width
      pull="left"
    />
    <span v-if="city" itemprop="addressLocality">{{ city }}</span>
    <span v-show="!city" itemprop="addressRegion">{{ region }}</span>
    <span v-show="false" v-if="postcode" itemprop="postalCode">{{
      postcode
    }}</span>
    <span>{{ country ? ',' : '' }}&nbsp;</span>
    <span itemprop="addressCountry">{{ country }}</span>
  </v-btn>
</template>

<script>
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
export default {
  props: {
    city: { type: String, default: null },
    region: { type: String, default: null },
    postcode: { type: String, default: null },
    country: { type: String, default: null },
  },
  data: () => ({
    faMapMarker,
  }),
};
</script>
