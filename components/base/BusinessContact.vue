<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card :title="title" color="primary">
        <slot></slot>
      </base-info-card>

      <template v-for="({ icon, text, title: t }, i) in business">
        <BaseAvatarCard
          :key="i"
          :icon="icon"
          :outlined="false"
          :title="!dense ? t : undefined"
          color="transparent"
          horizontal
          space="0"
        >
          {{ text }}
        </BaseAvatarCard>

        <v-divider
          v-if="i + 1 !== business.length"
          :key="`divider-${i}`"
          class="my-2"
        />
      </template>
    </div>
  </v-theme-provider>
</template>

<script>
import {
  faMapMarker,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
export default {
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
