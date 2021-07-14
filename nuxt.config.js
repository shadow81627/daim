import pkg from './package';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';
const BASE_URL = (
  process.env.BASE_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.VERCEL_URL ||
  `http${PORT === 433 ? 's' : ''}://${HOST}${
    [433, 80].includes(PORT) ? '' : `:${PORT}`
  }`
).replace(/(^http[s]?)?(?::\/\/)?(.*)/, function (_, protocol, domain) {
  return `${protocol || 'http'}://${domain}`;
});

const env = {
  HOST,
  PORT,
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
  target: 'static',
  modern: true,

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
      theme_color: '#343a40',
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
    '@nuxt/image',
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

  components: [
    '~/components',
    '~/components/sections',
    { path: '~/components/base/', prefix: 'base' },
  ],

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
    baseUrl: env.BASE_URL,
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

  sitemap: {
    hostname: env.BASE_URL,
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

  image: {
    provider: 'static',
    screens: {
      placeholder: 10,
      xs: 320,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    domains: [env.HOST],
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['lodash-es', 'vuetify/lib', 'vee-validate/dist/rules'],
    extractCSS: true,
    filenames: {
      app: ({ isDev, isModern }) =>
        isDev
          ? `[name]${isModern ? '.modern' : ''}.js`
          : `[name].${isModern ? '.modern' : ''}.js?v=[contenthash:7]`,
      chunk: ({ isDev, isModern }) =>
        isDev
          ? `[name]${isModern ? '.modern' : ''}.js`
          : `[name]${isModern ? '.modern' : ''}.js?v=[contenthash:7]`,
      css: ({ isDev }) =>
        isDev ? '[name].css' : 'css/[name].css?v=[contenthash:7]',
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[name].[ext]?v=[contenthash:7]',
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[name].[ext]?v=[contenthash:7]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[name].[ext]?v=[contenthash:7]',
    },
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map';
      }
    },
  },
};
