<template>
  <v-theme-provider :dark="dark">
    <base-info-card :title="title" color="primary">
      <slot></slot>
    </base-info-card>

    <template v-for="({ icon, text, title: t }, i) in business">
      <base-avatar-card
        :key="i"
        :icon="icon"
        :outlined="false"
        :title="!dense ? t : undefined"
        color="transparent"
        horizontal
        space="0"
      >
        {{ text }}
      </base-avatar-card>

      <v-divider
        v-if="i + 1 !== business.length"
        :key="`divider-${i}`"
        class="my-2"
      />
    </template>
  </v-theme-provider>
</template>

<script>
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
export default {
  name: 'BaseBusinessContact',
  props: {
    dark: Boolean,
    dense: Boolean,
    title: { type: String, default: null },
  },
  data: () => ({
    business: [
      {
        icon: faMapMarker,
        title: 'Location',
        text: 'New Farm, Australia',
      },
      {
        icon: faPhone,
        title: 'Phone',
        text: '0437 606 977',
      },
      {
        icon: faEnvelope,
        title: 'Email',
        text: 'damien.robinson@daim.dev',
      },
    ],
  }),
};
</script>
