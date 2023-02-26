// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: { primary: '#1a1a1a' },
        },
        dark: {
          colors: { primary: '#1a1a1a' },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
