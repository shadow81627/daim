<template>
  <BaseSection id="features">
    <BaseSectionHeading :title="title"></BaseSectionHeading>
    <v-container>
      <v-row>
        <v-col
          v-for="feature in features"
          :key="feature.name"
          cols="12"
          :md="features.length % 2 === 0 ? 6 : 4"
        >
          <BaseAvatarCard v-bind="feature" align="left" horizontal>
            {{ feature.subtitle }}
          </BaseAvatarCard>
        </v-col>
      </v-row>
    </v-container>
  </BaseSection>
</template>

<script>
export default {
  data: () => ({
    title: 'Website Features',
    features: [
      {
        icon: 'carbon:locked',
        title: 'Secure',
        subtitle:
          'Make sure your site can resist attacks. With Secure Domain Name Server (DNS), DDos protection, Secure Sockets Layer (SSL)',
      },
      {
        icon: 'ic:baseline-speed',
        title: 'Fast',
        subtitle:
          'Respond quickly to user interactions with silky smooth animations and no janky scrolling.',
      },
      {
        icon: 'carbon:cloud-upload',
        title: 'Reliable',
        subtitle:
          'Load instantly and never show the downasaur, even in uncertain network conditions.',
      },
      {
        icon: 'lucide:mouse-pointer-click',
        title: 'Engaging',
        subtitle:
          'Feel like a natural app on the device, with an immersive user experience.',
      },
      {
        icon: 'mdi:responsive',
        title: 'Responsive',
        subtitle: 'Fit the screens of different devices automatically.',
      },
      {
        icon: 'clarity:network-globe-line',
        title: 'Localized',
        subtitle: 'Serve multiple countries and languages.',
      },
      {
        icon: 'ic:outline-monitor-heart',
        title: 'Monitored',
        subtitle:
          'Our software team discover, triage, and prioritize errors in real-time.',
      },
      {
        icon: 'ant-design:audit-outlined',
        title: 'Audited',
        subtitle:
          'Continuously find and fix vulnerabilities. Lighthouse audits for performance, accessibility, progressive web apps, SEO and more.',
      },
      {
        icon: 'mdi:open-source-initiative',
        title: 'Open Source',
        subtitle: `Our code is open source which allows anyone to use, study, change, and share the software in modified and unmodified form.`,
      },
      // {
      //   icon: faFileArchive,
      //   title: 'Save Bandwidth',
      //   subtitle:
      //     'Reduce bandwidth usage by over 75% with content compression.',
      // },
    ],
  }),
};
</script>
