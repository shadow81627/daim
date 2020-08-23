<template>
  <section class="util__container">
    <hero heading="Damien Robinson" subheading="Web Development"></hero>
    <h2 class="text-center">Features</h2>
    <v-container>
      <v-row>
        <v-col
          v-for="{ icon, title, subtitle, list, text } in features"
          :key="title"
          sm="6"
          md="4"
          class="d-flex flex-column"
        >
          <v-card class="flex d-flex flex-column" min-width="240">
            <v-card-title>
              <span class="h3 text-break text-no-wrap text-truncate">
                <font-awesome-icon :icon="icon" class="grey--text" />
                {{ title }}
              </span>
            </v-card-title>
            <v-card-subtitle class="text--primary body-1"
              >{{ subtitle }} &nbsp;</v-card-subtitle
            >
            <div class="flex-grow-1">
              <v-card-text v-if="text" class="text--primary body-1 pt-0">
                {{ text }}
              </v-card-text>
              <v-card-text v-if="list" class="text--primary body-1 pt-0">
                <ul>
                  <li v-for="item in list" :key="item">{{ item }}</li>
                </ul>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import {
  faLock,
  faTachometerAlt,
  faCloudUploadAlt,
  faMousePointer,
  faMobileAlt,
  faGlobe,
  faBug,
  faClipboardList,
  faFileArchive,
} from '@fortawesome/free-solid-svg-icons';
export default {
  data() {
    return {
      features: [
        {
          icon: faLock,
          title: 'Secure',
          subtitle: 'Make sure your site can resist attacks.',
          list: [
            'Secure Domain Name Server (DNS)',
            'DDos protection',
            'Secure Sockets Layer (SSL)',
          ],
        },
        {
          icon: faTachometerAlt,
          title: 'Fast',
          subtitle:
            'Respond quickly to user interactions with silky smooth animations and no janky scrolling.',
        },
        {
          icon: faCloudUploadAlt,
          title: 'Reliable',
          subtitle:
            'Load instantly and never show the downasaur, even in uncertain network conditions.',
        },
        {
          icon: faMousePointer,
          title: 'Engaging',
          subtitle:
            'Feel like a natural app on the device, with an immersive user experience.',
        },
        {
          icon: faMobileAlt,
          title: 'Responsive',
          subtitle: 'Fit the screens of different devices automatically.',
        },
        {
          icon: faGlobe,
          title: 'Localization',
          subtitle: 'Serve multiple countries and languages.',
        },
        {
          icon: faBug,
          title: 'Monitoring',
          subtitle:
            'Our software team discover, triage, and prioritize errors in real-time.',
        },
        {
          icon: faClipboardList,
          title: 'Audits',
          subtitle:
            'Continuously find and fix vulnerabilities. Lighthouse audits for performance, accessibility, progressive web apps, SEO and more.',
        },
        {
          icon: faFileArchive,
          title: 'Save Bandwidth',
          subtitle:
            'Reduce bandwidth usage by over 75% with content compression.',
        },
      ],
    };
  },
};
</script>
