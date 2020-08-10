<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          Tools
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="feature in features"
        :key="feature.name"
        cols="12"
        sm="6"
        md="4"
        class="d-flex flex-column"
      >
        <Feature
          :blok="feature"
          xclass="flex d-flex flex-column xjustify-between xjustify-space-between align-stretch"
        ></Feature>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Feature from '~/components/feature';
export default {
  components: {
    Feature,
  },
  data() {
    return {
      features: [
        {
          icon: 'fas mountain',
          heading: 'Nuxt.js',
          href: 'https://nuxtjs.org',
          subheading: 'Progressive Vue.js Framework',
          text:
            'With Nuxt.js, your application will be optimized out of the box. We do our best to build performant applications by utilizing Vue.js and Node.js best practices. To squeeze every unnecessary bit out of your app Nuxt includes a bundle analyzer and lots of opportunities to fine-tune your app.',
        },
        {
          icon: 'fab vuejs',
          heading: 'Vue.js',
          href: 'https://vuejs.org/',
          subheading: 'Progressive JavaScript Framework',
          text:
            'Vue.js (commonly referred to as Vue; pronounced /vjuː/, like view) is an open-source Model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.',
        },
        {
          icon: 'fas server',
          heading: 'Surge',
          href: 'https://surge.sh',
          subheading: 'Content delivery network (CDN)',
          text: 'Free static web publishing',
        },
        {
          icon: 'fab bootstrap',
          heading: 'Bootstrap',
          href: 'https://getbootstrap.com/',
          subheading: 'Modern responsive component framework',
          text:
            "Responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library.",
        },
        {
          icon: 'fas mobile-alt',
          heading: 'Progressive Web Apps',
          href: 'https://developers.google.com/web/progressive-web-apps',
          subheading: 'Fast, reliable, engaging web apps',
          text:
            'Progressive Web Apps (PWA) are reliable, fast, and engaging, although there are many things that can take a PWA from a baseline to exemplary experience.',
        },
        {
          icon: 'fas shapes',
          heading: 'Vuetify',
          href: 'https://vuetifyjs.com/',
          subheading: 'Material Design Component Framework',
          text: 'UI Library with beautifully handcrafted Material Components.',
        },
        {
          icon: 'fas check-double',
          heading: 'VeeValidate',
          href: 'https://logaretm.github.io/vee-validate/',
          subheading: 'Template Based Form Validation Framework for Vue.js',
        },
        {
          icon: 'fab font-awesome',
          heading: 'Fontawesome',
          href: 'https://fontawesome.com/',
          subheading: 'Vector icons and social logos',
        },
        {
          icon: 'fas cloud',
          heading: 'Cloudflare',
          href: 'https://www.cloudflare.com/',
          subheading: 'Secure DNS, proxy, CDN, with DDos protection',
          text:
            'Trusted by over 20 million Internet properties. Cloudflare provides a scalable, easy-to-use, unified control plane to deliver security, performance, and reliability for on-premises, hybrid, cloud, and SaaS applications.',
        },
        {
          icon: 'fas images',
          heading: 'Cloudinary',
          href: 'https://cloudinary.com/',
          subheading: 'Optimization, moderation, transformation image CDN',
          text:
            'Automate the entire image-processing pipeline: from uploads to on-the-fly manipulations to optimization to dynamic delivery with any CDN.',
        },
        {
          icon: 'fas comment-alt',
          heading: 'Storyblok',
          href: 'https://www.storyblok.com/',
          subheading: 'Headless CMS with a Visual Editor',
        },
        {
          icon: 'fas lightbulb',
          heading: 'Lighthouse',
          href: 'https://github.com/GoogleChrome/lighthouse-ci',
          text:
            'Automate running Lighthouse for every commit, viewing the changes, and preventing regressions',
        },
        {
          icon: 'fas hard-hat',
          heading: 'Travis CI',
          href: 'https://travis-ci.com/',
          subheading: 'The simplest way to test and deploy your projects.',
        },
        {
          icon: 'fas paint-roller',
          heading: 'Renovate bot',
          href: 'https://github.com/renovatebot/renovate',
          subheading: 'Automated dependency updates',
        },
        {
          icon: 'fas dog',
          heading: 'Snyk',
          href: 'https://snyk.io/',
          subheading: 'Automated secutiry audits',
          text:
            'Snyk enables development teams to move quickly and securely by automatically finding and fixing issues faster than industry average.',
        },
        {
          icon: 'fas cubes',
          heading: 'Semantic Release',
          href: 'https://github.com/semantic-release/semantic-release',
          subheading:
            'Fully automated version management and package publishing',
        },
        {
          icon: 'fas code',
          heading: 'Eslint',
          href: 'https://eslint.org/',
          subheading: 'static code analysis',
        },
        {
          icon: 'fas file-code',
          heading: 'Prettier',
          href: 'https://prettier.io/',
          subheading: 'opinionated code formatter',
        },
        {
          icon: 'fab docker',
          heading: 'Docker',
          href: 'https://www.docker.com/',
          subheading: 'Debug your app, not your environment',
          text: 'Securely build, share and run any application, anywhere',
        },
      ],
    };
  },
};
</script>
