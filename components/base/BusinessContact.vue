<template>
  <v-theme-provider :dark="dark">
    <div>
      <BaseInfoCard :title="title" color="primary" :level="2">
        <slot></slot>
      </BaseInfoCard>

      <template v-for="({ icon, text, title: t, type, href }, i) in business">
        <BaseAvatarCard
          :key="i"
          :xicon="$vuetify.breakpoint.mdAndUp ? icon : undefined"
          :outlined="false"
          :title="!dense ? t : undefined"
          color="transparent"
          :horizontal="$vuetify.breakpoint.mdAndUp"
          dense
          space="0"
          style="overflow: hidden"
        >
          <mailgo v-if="type" :href="`${type}:${text}`" class="px-0"></mailgo>
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
              v-if="icon"
              :icon="icon"
              fixed-width
              pull="left"
            />
            {{ text || `Visit ${t}` }}
            <BaseIcon :icon="mdiOpenInNew" color="grey"></BaseIcon>
          </v-btn>
          <span v-else>{{ text }}</span>
        </BaseAvatarCard>

        <v-divider
          v-if="i + 1 !== business.length && !dense"
          :key="`divider-${i}`"
          class="my-2"
        />
      </template>
    </div>
  </v-theme-provider>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js';
import {
  faMapMarker,
  faPhone,
  faEnvelope,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  // faTwitter,
  // faYoutube,
  // faFacebook,
  // faNpm,
} from '@fortawesome/free-brands-svg-icons';
import Mailgo from '@/components/mailgo.vue';
export default {
  components: {
    Mailgo,
  },
  props: {
    dark: Boolean,
    dense: { type: Boolean, default: true },
    title: { type: String, default: null },
  },
  data: () => ({
    faArrowRight,
    mdiOpenInNew,
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
        text: 'contact@daim.dev',
        type: 'mailto',
      },
      {
        icon: faLinkedin,
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/company/daim-digital',
      },
      {
        icon: faGithub,
        title: 'GitHub',
        href: 'https://github.com/daim-dev',
      },
    ],
  }),
};
</script>
