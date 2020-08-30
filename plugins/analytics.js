import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';
import hubSpotPlugin from '@analytics/hubspot';

export default ({
  app,
  inject,
  $config: {
    GOOGLE_ANALYTICS_TRACKING_ID,
    VERSION,
    HUBSPOT_PORTAL_ID,
    APP_NAME,
  },
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
        googleAnalytics({
          trackingId: GOOGLE_ANALYTICS_TRACKING_ID,
        }),
        hubSpotPlugin({
          portalId: HUBSPOT_PORTAL_ID,
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
