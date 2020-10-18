<template>
  <div>
    <hero heading="Damien Robinson" subheading="Web Development"></hero>
    <Features></Features>
    <Services></Services>
    <ContactUs></ContactUs>
  </div>
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
  name: 'HomePage',
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
