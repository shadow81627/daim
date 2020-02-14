const axios = require('axios');
const pkg = require('./package');

const STORYBLOK_TOKEN =
  process.env.STORYBLOK_TOKEN || 'kycw6YWwjgilZCDf6Xb6kAtt';

module.exports = {
  mode: 'universal',

  env: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    VERSION: pkg.version,
    COMMIT: process.env.npm_package_gitHead,

    STORYBLOK_TOKEN,
  },

  router: {
    middleware: 'setCacheVersion',
  },

  generate: {
    // use '404.html' instead default '200.html'
    fallback: true,
    routes(callback) {
      const token = STORYBLOK_TOKEN;
      const version = 'published';
      let cacheVersion = 0;

      // other routes that are not in Storyblok with their slug.
      const routes = ['/']; // adds / directly

      // Load space and receive latest cache version key to improve performance
      axios
        .get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`)
        .then((spaceRes) => {
          // timestamp of latest publish
          cacheVersion = spaceRes.data.space.version;

          // Call for all Links using the Links API: https://www.storyblok.com/docs/Delivery-Api/Links
          axios
            .get(
              `https://api.storyblok.com/v1/cdn/links?token=${token}&version=${version}&cv=${cacheVersion}`,
            )
            .then((res) => {
              Object.keys(res.data.links).forEach((key) => {
                if (res.data.links[key].slug !== 'home') {
                  routes.push('/' + res.data.links[key].slug);
                }
              });

              callback(null, routes);
            });
        });
    },
  },

  server: {
    timing: {
      total: true,
    },
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        // type is inferred based on the file extension.
        // https://fetch.spec.whatwg.org/#concept-request-destination
        if (type === 'script' || type === 'style') {
          return true;
        }
        if (type === 'font') {
          // only preload woff2 fonts
          return /\.woff2$/.test(file);
        }
        if (type === 'image') {
          // only preload important images
          return file === 'header-bg.jpg';
        }
      },
    },
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
  css: ['~/assets/css/storyblok.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/components.js'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@bazzite/nuxt-optimized-images',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    'nuxt-fontawesome',
    'nuxt-i18n',
    // 'nuxt-webfontloader',
    // 'nuxt-purgecss',
    'storyblok-nuxt',

    // always declare the sitemap module at end of array
    '@nuxtjs/sitemap',
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false, // or `bvCSS`
    // componentPlugins: [
    //   'Image',
    //   'FormSelect',
    //   'Card',
    //   'ButtonPlugin',
    //   'FormTextareaPlugin',
    //   'FormGroupPlugin',
    //   'FormInputPlugin',
    // ],
    // directivePlugins: ['Tooltip'],
  },

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      },
    ],
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
    mozjpeg: {
      quality: 50,
    },
  },

  purgeCSS: {
    // your settings here
    mode: 'postcss',
  },

  storyblok: {
    accessToken: STORYBLOK_TOKEN,
  },

  sitemap: {
    hostname: 'https://daim.dev',
  },

  vuetify: {
    optionsPath: './vuetify.options.js',
    // customVariables: ['~/assets/scss/vuetify.scss'],
    treeShake: true,
    theme: { disable: true },
    defaultAssets: false,
  },

  webfontloader: {},

  /*
   ** Build configuration
   */
  build: {
    // extractCSS: true,
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
