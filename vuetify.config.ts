import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: { primary: '#1a1a1a', secondary: '#424242' },
      },
      dark: {
        colors: { primary: '#1a1a1a', secondary: '#424242' },
      },
    },
  },
  icons: {
    defaultSet: 'mdi-svg',
  },
});
