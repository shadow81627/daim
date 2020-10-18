<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card :title="title" color="primary">
        <slot></slot>
      </base-info-card>

      <template v-for="({ icon, text, title: t, type, href }, i) in business">
        <BaseAvatarCard
          :key="i"
          :icon="$vuetify.breakpoint.mdAndUp ? icon : undefined"
          :outlined="false"
          :title="!dense ? t : undefined"
          color="transparent"
          :horizontal="$vuetify.breakpoint.mdAndUp"
          dense
          space="0"
          style="overflow: hidden"
        >
          <mailgo
            v-if="type"
            :href="`${type}:${text}`"
            class="px-0"
            :icon="!$vuetify.breakpoint.mdAndUp ? icon : undefined"
          >
            <span>{{ text }}</span>
          </mailgo>
          <v-btn
            v-else-if="href"
            target="_blank"
            large
            text
            :href="href"
            rel="noopener"
            class="px-0"
          >
            <font-awesome-icon
              v-if="!$vuetify.breakpoint.mdAndUp && icon"
              :icon="icon"
              fixed-width
              pull="left"
            />
            {{ text }}
          </v-btn>
          <span v-else>{{ text }}</span>
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
import Mailgo from '@/components/mailgo.vue';
export default {
  components: {
    Mailgo,
  },
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
        href: `https://www.google.com.au/maps/search/?api=1&query=${encodeURIComponent(
          'New Farm, Australia',
        )}`,
      },
      {
        icon: faPhone,
        title: 'Phone',
        text: '+61-437-606-977',
        type: 'tel',
      },
      {
        icon: faEnvelope,
        title: 'Email',
        text: 'damien.robinson@daim.dev',
        type: 'mailto',
      },
    ],
  }),
};
</script>
