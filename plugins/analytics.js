import { Analytics } from 'analytics';
import segmentPlugin from '@analytics/segment';

export default ({
  app,
  inject,
  $config: { VERSION, APP_NAME, SEGMENT_WRITE_KEY },
}) => {
  /*
   ** Only run on client-side and only in production mode
   */
  if (process.env.NODE_ENV === 'production') {
    /* Initialize analytics */
    const analytics = Analytics({
      app: APP_NAME,
      version: VERSION,
      plugins: [
        segmentPlugin({
          writeKey: SEGMENT_WRITE_KEY,
        }),
      ],
    });

    /*
     ** Every time the route changes (fired on initialization too)
     */
    app.router.afterEach((to, from) => {
      /* Track a page view */
      analytics.page();
    });

    if (typeof analytics === 'function') {
      inject('analytics', analytics);
    }
  }
};
