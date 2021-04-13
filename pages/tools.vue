<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Tools</h1>
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
        <Feature :blok="feature"></Feature>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  faMountain,
  faLightbulb,
  faMobileAlt,
  faImages,
  faDog,
  faShapes,
  faServer,
  faCheckDouble,
  faPaintRoller,
  faCubes,
  faCode,
  faFileCode,
  faBug,
  faAlignLeft,
  faDatabase,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import {
  faVuejs,
  faBootstrap,
  faGithub,
  faDocker,
  faFontAwesome,
  faLaravel,
  faCloudflare,
  faAlgolia,
} from '@fortawesome/free-brands-svg-icons';
import Feature from '~/components/feature';
export default {
  components: {
    Feature,
  },
  data() {
    return {
      features: [
        {
          icon: faMountain,
          heading: 'Nuxt.js',
          href: 'https://nuxtjs.org',
          subheading: 'Progressive Vue.js Framework',
          text:
            'With Nuxt.js, your application will be optimized out of the box. We do our best to build performant applications by utilizing Vue.js and Node.js best practices. To squeeze every unnecessary bit out of your app Nuxt includes a bundle analyzer and lots of opportunities to fine-tune your app.',
        },
        {
          icon: faVuejs,
          heading: 'Vue.js',
          href: 'https://vuejs.org/',
          subheading: 'Progressive JavaScript Framework',
          text:
            'Vue.js (commonly referred to as Vue; pronounced /vjuː/, like view) is an open-source Model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.',
        },
        {
          icon: faBootstrap,
          heading: 'Bootstrap',
          href: 'https://getbootstrap.com/',
          subheading: 'Modern responsive component framework',
          text:
            "Responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library.",
        },
        {
          icon: faLaravel,
          heading: 'Laravel',
          href: 'https://laravel.com/',
          subheading: 'Web Application Framework',
          text:
            'Expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:',
          list: [
            'Simple, fast routing engine',
            'Powerful dependency injection container',
            'Multiple back-ends for sessions and cache storage',
            'Expressive, intuitive database ORM',
            'Database agnostic schema migrations',
            'Robust background job processing',
            'Real-time event broadcasting',
          ],
        },
        {
          icon: faLightbulb,
          heading: 'Lighthouse',
          href: 'https://github.com/GoogleChrome/lighthouse-ci',
          subheading: 'SEO Audits',
          text:
            'Lighthouse analyzes web apps and web pages, collecting modern performance metrics and insights on developer best practices.',
          list: [
            'Prevent regressions in accessibility, SEO, offline support, and performance best practices.',
            'Track performance metrics and Lighthouse scores over time.',
            'Set and keep performance budgets on scripts and images.',
            'Compare two versions of your site to find improvements and regressions of individual resources.',
          ],
        },
        {
          icon: faMobileAlt,
          heading: 'Progressive Web Apps',
          href: 'https://developers.google.com/web/progressive-web-apps',
          subheading: 'Fast, reliable, engaging web apps',
          text:
            'Progressive Web Apps (PWA) are reliable, fast, and engaging, although there are many things that can take a PWA from a baseline to exemplary experience.',
          list: [
            'Fast',
            'Installable',
            'Reliable',
            'Engaging',
            'Works Offline',
            'Predictive prefetching',
            'Web Push Notifications',
          ],
        },
        {
          icon: faCloudflare,
          heading: 'Cloudflare',
          href: 'https://www.cloudflare.com/',
          subheading: 'Secure DNS, proxy, CDN, with DDos protection',
          text:
            'Trusted by over 20 million Internet properties. Cloudflare provides a scalable, easy-to-use, unified control plane to deliver security, performance, and reliability for on-premises, hybrid, cloud, and SaaS applications.',
          list: [
            'Secure Domain Name Server (DNS)',
            'DDos protection',
            'Secure Sockets Layer (SSL)',
          ],
        },
        {
          icon: faImages,
          heading: 'Cloudinary',
          href: 'https://cloudinary.com/',
          subheading: 'Optimization, moderation, transformation image CDN',
          text:
            'Automate the entire image-processing pipeline: from uploads to on-the-fly manipulations to optimization to dynamic delivery with any CDN.',
        },
        {
          icon: faDog,
          heading: 'Snyk',
          href: 'https://snyk.io/',
          subheading: 'Automated security audits',
          text:
            'Snyk enables development teams to move quickly and securely by automatically finding and fixing issues faster than industry average.',
        },
        {
          icon: faGithub,
          heading: 'GitHub',
          href: 'https://github.com',
          subheading: 'Distributed version control system',
          list: [
            'CI/CD',
            'Secure development',
            'Code review',
            'Project management',
            'Hosting',
            'Team management',
          ],
        },
        {
          icon: faDocker,
          heading: 'Docker',
          href: 'https://www.docker.com/',
          subheading: 'Debug your app, not your environment',
          text: 'Securely build, share and run any application, anywhere',
        },
        {
          icon: faShapes,
          heading: 'Vuetify',
          href: 'https://vuetifyjs.com/',
          subheading: 'Material Design Component Framework',
          text:
            'UI Library with beautifully handcrafted Material Design Components.',
        },
        {
          icon: faAlignLeft,
          heading: 'Formspree',
          href: 'https://formspree.io/',
          subheading: 'Form submission API',
          text: 'Set up simple forms to send data to an email address',
        },
        {
          icon: faCheckDouble,
          heading: 'VeeValidate',
          href: 'https://logaretm.github.io/vee-validate/',
          subheading: 'Template Based Form Validation Framework for Vue.js',
          text: 'Validate form input to ensure data is clean and usable.',
        },
        {
          icon: faFontAwesome,
          heading: 'Fontawesome',
          href: 'https://fontawesome.com/',
          subheading: 'Vector icons and social logos',
          text:
            "Get vector icons and social logos on your website with Font Awesome, the web's most popular icon set and toolkit.",
        },
        {
          icon: faPaintRoller,
          heading: 'Renovate bot',
          href: 'https://github.com/renovatebot/renovate',
          subheading: 'Automated dependency updates',
          text:
            'Save time and reduce risk by automating dependency updates in software projects.',
        },
        {
          icon: faCubes,
          heading: 'Semantic Release',
          href: 'https://github.com/semantic-release/semantic-release',
          subheading: 'Fully automated version management',
          text:
            'Automate the whole package release workflow including: determining the next version number, generating the release notes and publishing the package. This removes the immediate connection between human emotions and version numbers, strictly following the Semantic Versioning specification.',
        },
        {
          icon: faCode,
          heading: 'Eslint',
          href: 'https://eslint.org/',
          subheading: 'Static code analysis',
          text:
            'Statically analyze your code to quickly find problems. ESLint is built into most text editors and you can run ESLint as part of your continuous integration pipeline.',
        },
        {
          icon: faFileCode,
          heading: 'Prettier',
          href: 'https://prettier.io/',
          subheading: 'Opinionated code formatter',
          list: [
            'An opinionated code formatter',
            'Supports many languages',
            'Integrates with most editors',
            'Has few options',
            'You press save and code is formatted',
            'No need to discuss style in code review',
            'Saves you time and energy',
          ],
        },
        {
          icon: faServer,
          heading: 'Heroku',
          href: 'https://www.heroku.com/',
          subheading: 'Web Hosting',
          text:
            'Cloud-based, fully-managed platform as a service (PaaS) for building, running, and managing apps.',
        },
        {
          icon: faDatabase,
          heading: 'PostgreSQL',
          href: 'https://www.postgresql.org/',
          subheading: 'Database',
          text:
            'Powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.',
        },
        {
          icon: faAlgolia,
          heading: 'Algolia',
          href: 'https://www.algolia.com/',
          subheading: 'Search',
          text:
            'A powerful hosted search API that provides product teams with the resources & tools they need to create fast, relevant search.',
          list: [
            'Typo Tolerance',
            'Rules',
            'Query Suggestions',
            'Filters and Facets',
            'Multi-Lingual',
            'Synonyms',
            'Transparent Relevancy',
            'Custom Ranking',
            'A/B Testing',
            'Personalization',
            'Relevant Sort',
          ],
        },
        {
          icon: faBug,
          heading: 'Sentry',
          href: 'https://sentry.io/',
          subheading: 'Monitoring',
          text:
            'Application monitoring platform helps every developer diagnose, fix, and optimize the performance of their code.',
        },
        {
          icon: faRocket,
          heading: 'Postman',
          href: 'https://www.postman.com/',
          subheading: 'Testing, Monitoring, Documentation',
          text:
            "A collaboration platform for API development. Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs faster.",
        },
      ],
    };
  },
};
</script>
