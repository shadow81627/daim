const purgecss = require('@fullhuman/postcss-purgecss');
const pkg = require('./package');

module.exports = {
  mode: 'universal',
  // buildDir: 'public',

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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { innerHTML: 'This website requires JavaScript.' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
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
    '@nuxtjs/vuetify',
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  bootstrapVue: {
    // bootstrapCSS: false, // or `css`
    // bootstrapVueCSS: false, // or `bvCSS`
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

  vuetify: {
    optionsPath: './vuetify.options.js',
    // customVariables: ['~/assets/scss/vuetify.scss'],
    treeShake: true,
    theme: { disable: true },
    defaultAssets: false,
  },

  /*
   ** Build configuration
   */
  build: {
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
