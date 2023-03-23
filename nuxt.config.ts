import svgLoader from 'vite-svg-loader';
import pkg from './package.json';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';
const BASE_URL = (
  process.env.BASE_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.VERCEL_URL ||
  process.env.CF_PAGES_URL ||
  `http${PORT === '433' ? 's' : ''}://${HOST}${
    ['433', '80'].includes(PORT) ? '' : `:${PORT}`
  }`
).replace(/(^http[s]?)?(?::\/\/)?(.*)/, function (_, protocol, domain) {
  return `${protocol || 'http'}://${domain}`;
});

const DESCRIPTION =
  'Get a high quality custom landing page or microsite built by professionals.';
const THEME_COLOR = '#343a40';

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

  // MATOMO_URL: process.env.MATOMO_URL ?? 'https://matomo.daim.dev/',
  // MATOMO_SITE_ID: process.env.MATOMO_SITE_ID ?? 2,
  // MATOMO_DEBUG: process.env.MATOMO_DEBUG ?? false,
};

export default defineNuxtConfig({
  ssr: true,
  experimental: {
    // https://github.com/nuxt/nuxt/issues/19850
    inlineSSRStyles: false,

    // payloadExtraction: false,
  },

  runtimeConfig: {
    public: {
      ...env,
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID || 'UA-176793964-1',
      },
      IMGPROXY_KEY: process.env.IMGPROXY_KEY,
      IMGPROXY_SALT: process.env.IMGPROXY_SALT,
    },
  },

  /*
   ** Headers of the page
   */
  app: {
    head: {
      title: 'Damien Robinson',
      titleTemplate: `%s | ${env.APP_NAME}`,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icon.png' },
      ],
      meta: [
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        { property: 'description', content: DESCRIPTION },
        // open graph social image
        { property: 'og:title', content: env.APP_NAME },
        { property: 'og:description', content: DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/cover.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '600' },
        { property: 'og:site_name', content: env.APP_NAME },
        // { property: 'twitter:site', content: '@elk_zone' },
        // { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'theme-color', content: THEME_COLOR },
      ],
    },
  },

  /*
   ** Global CSS
   */
  css: ['vuetify/lib/styles/main.sass'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/eslint-module',
    '@formkit/nuxt',
    '@unocss/nuxt',
    '@nuxt/content',
    // '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxt/image-edge',
    'nuxt-icon',
    // 'nuxt-webfontloader',
    // ['nuxt-matomo', matomo],

    // always declare the sitemap module at end of array
    // '@nuxtjs/sitemap',
  ],

  components: [
    '~/components',
    '~/components/sections',
    { path: '~/components/base/', prefix: 'base' },
  ],

  unocss: {
    typography: true,
  },

  content: {},

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: env.APP_NAME,
      short_name: env.APP_NAME,
      theme_color: THEME_COLOR,
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  },

  i18n: {
    baseUrl: env.BASE_URL,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en',
        file: 'en.json',
      },
    ],
    // lazy: true,
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
    // provider: 'imgproxy',
    screens: {
      // placeholder: 10,
      xs: 320,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    domains: [env.HOST, 'imgproxy.daim.dev'],
    providers: {
      imgproxy: {
        provider: '~/imgproxy',
        options: {
          key: process.env.IMGPROXY_KEY,
          salt: process.env.IMGPROXY_SALT,
        },
      },
    },
  },

  routeRules: {
    // Static generation
    '/': { prerender: true },
    // CDN cache rules
    '/manifest.webmanifest': {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: true,
    },
  },
  sourcemap: true,

  /*
   ** Build configuration
   */
  build: {
    transpile: [
      'lodash-es',
      'vuetify',
      'vee-validate/dist/rules',
      'iron-webcrypto',
      'unhead',
      'i18n-iso-countries',
    ],
  },
  vite: {
    plugins: [svgLoader()],
  },
});
