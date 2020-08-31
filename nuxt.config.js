import pkg from './package';

const env = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  VERSION: pkg.version,
  COMMIT: process.env.npm_package_gitHead || process.env.TRAVIS_COMMIT,
  DATE_GENERATED: new Date().toISOString(),
  APP_NAME: process.env.APP_NAME || pkg.name,
};

export default {
  mode: 'universal',
  target: 'static',

  publicRuntimeConfig: {
    ...env,
  },

  generate: {
    // use '404.html' instead default '200.html'
    fallback: true,
  },

  server: {
    timing: {
      total: true,
    },
  },

  render: {
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles.map(
          (f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`,
        ),
    },
  },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: (titleChunk) => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} - 𝒟𝒶𝒾𝓂` : '𝒟𝒶𝒾𝓂';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        property: 'og:title',
        template: (titleChunk) => {
          // If undefined or blank then we don't need the hyphen
          return titleChunk ? `${titleChunk} - 𝒟𝒶𝒾𝓂` : '𝒟𝒶𝒾𝓂';
        },
        vmid: 'og:title',
      },
      {
        name: 'version',
        content: pkg.version,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
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
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // 'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@nuxtjs/firebase',
    'nuxt-fontawesome',
    'nuxt-i18n',
    // 'nuxt-webfontloader',
    // 'nuxt-purgecss',
    // 'storyblok-nuxt',

    // always declare the sitemap module at end of array
    '@nuxtjs/sitemap',
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

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
    responsive: {
      adapter: require('responsive-loader/sharp'),
      sharp: {
        format: {
          webp: true,
        },
      },
    },
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyD1wVW-hB1hSBNjokWCTaodbFay9UjamXg',
      authDomain: 'daim-3b7c0.firebaseapp.com',
      databaseURL: 'https://daim-3b7c0.firebaseio.com',
      projectId: 'daim-3b7c0',
      storageBucket: 'daim-3b7c0.appspot.com',
      messagingSenderId: '228889932959',
      appId: '1:228889932959:web:38a9467c367189e2fd9eaa',
      measurementId: 'G-GX4B1VYRZN',
    },
    services: {
      performance: true,
      analytics: true,
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

  webfontloader: {},

  /*
   ** Build configuration
   */
  build: {
    filenames: {
      chunk: ({ isDev }) =>
        isDev ? '[name].js' : 'chunks/[id].[contenthash].js',
    },
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
