import pkg from './package';

const STORYBLOK_TOKEN =
  process.env.STORYBLOK_TOKEN || 'kycw6YWwjgilZCDf6Xb6kAtt';

const env = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  VERSION: pkg.version,
  COMMIT: process.env.npm_package_gitHead || process.env.TRAVIS_COMMIT,
  DATE_GENERATED: new Date().toISOString(),
  STORYBLOK_TOKEN,
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
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
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

  purgeCSS: {
    // your settings here
    mode: 'postcss',
  },

  // storyblok: {
  //   accessToken: STORYBLOK_TOKEN,
  // },

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
