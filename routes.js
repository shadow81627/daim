const { Router } = require('@layer0/core/router');
const { nuxtRoutes } = require('@layer0/nuxt');

module.exports = new Router()
  // .match('/service-worker.js', ({ serviceWorker }) => {
  //   serviceWorker('.nuxt/dist/client/service-worker.js');
  // })
  .use(nuxtRoutes);
