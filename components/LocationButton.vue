<template>
  <v-btn
    target="_blank"
    size="large"
    variant="text"
    :href="`https://www.google.com.au/maps/search/?api=1&query=${encodeURIComponent(
      `${streetAddress || ''} ${city || ''} ${region || ''} ${postcode || ''} ${
        country || ''
      }`,
    )}`"
    rel="noreferrer"
    itemprop="address"
    itemscope
    itemtype="https://schema.org/PostalAddress"
  >
    <BaseIcon icon="fa:map-marker"></BaseIcon>
    <span v-if="streetAddress" v-show="false" itemprop="streetAddress">{{
      streetAddress
    }}</span>
    <span v-if="city" itemprop="addressLocality">{{ city }}</span>
    <span v-show="!city" itemprop="addressRegion">{{ region }}</span>
    <span v-show="false" v-if="postcode" itemprop="postalCode">{{
      postcode
    }}</span>
    <span
      >{{
        (country || countryCode) && (postcode || city || region) ? ',' : ''
      }}&nbsp;</span
    >
    <span itemprop="addressCountry">{{ country || countryCode }}</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    streetAddress: { type: String, default: null },
    city: { type: String, default: null },
    region: { type: String, default: null },
    postcode: { type: String, default: null },
    country: { type: String, default: null },
    countryCode: { type: String, default: null },
  },
};
</script>
