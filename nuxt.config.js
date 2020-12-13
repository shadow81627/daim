import pkg from './package';

const BASE_URL = (
  process.env.BASE_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.VERCEL_URL ||
  `http${process.env.PORT === 433 ? 's' : ''}://${process.env.HOST}:${
    process.env.PORT
  }`
).replace(/(^http[s]?)?(?::\/\/)?(.*)/, function (_, protocol, domain) {
  return `${protocol || 'http'}://${domain}`;
});

const env = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  BASE_URL,
  VERSION: pkg.version,
  COMMIT:
    process.env.npm_package_gitHead ||
    process.env.TRAVIS_COMMIT ||
    process.env.VERCEL_GITHUB_COMMIT_SHA,
  DATE_GENERATED: new Date().toISOString(),
  APP_NAME:
    process.env.APP_NAME ||
    `${pkg.name.charAt(0).toUpperCase()}${pkg.name.slice(1)}`,
};

const preconnectLinks = [];

export default {
  mode: 'universal',
  target: 'static',

  publicRuntimeConfig: {
    ...env,
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID || 'UA-176793964-1',
    },
  },

  generate: {
    // use '404.html' instead default '200.html'
    fallback: true,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Damien Robinson',
    titleTemplate: `%s | ${env.APP_NAME}`,
    meta: [
      {
        once: true,
        name: 'charset',
        hid: 'charset',
        content: 'utf-8',
      },
      {
        once: true,
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        once: true,
        name: 'version',
        hid: 'version',
        content: env.VERSION,
      },
      {
        once: true,
        property: 'og:title',
        content: 'Damien Robinson',
        template: `%s | ${env.APP_NAME}`,
        hid: 'og:title',
      },
      {
        name: 'version',
        content: pkg.version,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ...preconnectLinks.map((href) => ({
        rel: 'preconnect',
        href,
        hid: `preconnect-${href}`,
        crossorigin: 'anonymous',
        once: true,
      })),
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
  },

  pwa: {
    meta: {
      ogHost: env.BASE_URL,
      ogImage: {
        path: '/cover.jpg',
        width: 1200,
        height: 600,
        type: 'image/jpg',
      },
    },
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/google-analytics',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    'nuxt-fontawesome',
    'nuxt-i18n',
    // 'nuxt-webfontloader',

    // always declare the sitemap module at end of array
    '@nuxtjs/sitemap',
  ],

  components: ['~/components', { path: '~/components/base/', prefix: 'base' }],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
    },
  },

  i18n: {
    baseUrl: 'https://daim.dev',
    seo: false,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en',
        file: 'en.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
  },

  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true,
    responsive: {
      quality: 50,
      adapter: require('responsive-loader/sharp'),
      sizes: [320, 640, 960, 1200, 1800, 2400],
      placeholder: true,
      placeholderSize: 20,
      format: 'webp',
      sharp: {
        format: {
          webp: true,
        },
        progressive: true,
      },
    },
  },

  sitemap: {
    hostname: 'https://daim.dev',
  },

  vuetify: {
    optionsPath: './vuetify.options.js',
    customVariables: ['~/assets/scss/vuetify.scss'],
    treeShake: true,
    defaultAssets: false,
  },

  eslint: {
    cache: true,
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['lodash-es', 'vuetify/lib', 'vee-validate/dist/rules'],
    extractCSS: true,
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map';
      }
    },
  },
};
