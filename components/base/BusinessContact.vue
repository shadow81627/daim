<template>
  <v-theme-provider :dark="dark">
    <div>
      <BaseInfoCard :title="title" color="primary" :level="2">
        <slot></slot>
      </BaseInfoCard>

      <template
        v-for="({ icon, text, title: t, type, href, ...item }, i) in business"
      >
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
          <LocationButton
            v-if="type === 'location'"
            v-bind="item.location"
          ></LocationButton>
          <mailgo v-else-if="type" :href="`${type}:${text}`"></mailgo>
          <v-btn
            v-else-if="href"
            target="_blank"
            large
            text
            :href="href"
            rel="noopener"
          >
            <BaseIcon
              v-if="icon && typeof icon === 'string'"
              :icon="icon"
              style="width: 14px; margin-right: 0.3em"
              color="black"
            ></BaseIcon>
            <font-awesome-icon
              v-else-if="icon"
              :icon="icon"
              fixed-width
              pull="left"
            />
            {{ text || `Visit ${t}` }}
            <BaseIcon
              icon="mdi:open-in-new"
              style="width: 14px; margin-left: 0.3em"
              color="grey"
            ></BaseIcon>
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
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import LocationButton from '../LocationButton.vue';
import Mailgo from '@/components/mailgo.vue';
export default {
  components: {
    Mailgo,
    LocationButton,
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
        icon: 'fa:phone',
        title: 'Phone',
        text: '+61-437-606-977',
        type: 'tel',
      },
      {
        icon: 'fa:envelope',
        title: 'Email',
        text: 'contact@daim.dev',
        type: 'mailto',
      },
      {
        type: 'location',
        icon: 'fa:map-marker',
        title: 'Location',
        text: 'New Farm, Australia',
        location: {
          streetAddress: 'Salt Space 1/888 Brunswick Street',
          city: 'New Farm',
          countryCode: 'AU',
          country: 'Australia',
          postalCode: '4005',
          region: 'Queensland',
        },
      },
      {
        icon: 'fa:linkedin',
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/company/daim-digital',
      },
      {
        icon: 'fa:github',
        title: 'GitHub',
        href: 'https://github.com/daim-dev',
      },
      {
        icon: 'mdi:car-clutch',
        title: 'Clutch',
        href: 'https://clutch.co/profile/daim-digital',
      },
    ],
  }),
};
</script>
