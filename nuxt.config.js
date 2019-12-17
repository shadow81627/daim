const purgecss = require('@fullhuman/postcss-purgecss');
const pkg = require('./package');

module.exports = {
  mode: 'universal',

  env: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    VERSION: pkg.version,
    COMMIT: process.env.npm_package_gitHead,
  },

  generate: {
    // use '404.html' instead default '200.html'
    fallback: true,
    // dir: 'public',
    // routes,
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
  css: [
    '~/assets/scss/custom.scss',
    '~/assets/css/storyblok.css',
    '~/assets/css/fonts.css',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/components.js'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@bazzite/nuxt-optimized-images',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    'nuxt-fontawesome',
    'nuxt-i18n',
    'nuxt-webfontloader',
    [
      'storyblok-nuxt',
      {
        accessToken: 'kycw6YWwjgilZCDf6Xb6kAtt',
        cacheProvider: 'memory',
      },
    ],
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false, // or `bvCSS`
    componentPlugins: [
      'Image',
      'FormSelect',
      'Card',
      'ButtonPlugin',
      'FormTextareaPlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
    ],
    directivePlugins: ['Tooltip'],
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

  // optimizedImages: {
  //   mozjpeg: {
  //     quality: 70,
  //   },
  // },

  // storyblok: {},

  vuetify: {
    optionsPath: './vuetify.options.js',
    // customVariables: ['~/assets/scss/vuetify.scss'],
    treeShake: true,
    theme: { disable: true },
    defaultAssets: false,
  },

  webfontloader: {
    // google: {
    //   families: ['Rouge Script', 'Nunito Sans:n4,n6'],
    //   urls: [
    //     // for each Google Fonts add url + options you want
    //     // here add font-display option
    //     'https://fonts.googleapis.com/css?family=Rouge+Script&display=swap',
    //     'https://fonts.googleapis.com/css?family=Nunito+Sans:400,600&display=swap',
    //     // 'https://fonts.googleapis.com/css?family=Roboto:300,700&display=swap'
    //   ]
    // },
    custom: {
      families: ['Rouge Script'],
      // urls: ['/fonts.css']
    },
  },

  /*
   ** Build configuration
   */
  build: {
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

  postcss: {
    plugins: [
      purgecss({
        content: [
          './pages/**/*.vue',
          './layouts/**/*.vue',
          './components/**/*.vue',
        ],
        whitelist: ['html', 'body'],
      }),
    ],
  },
};
