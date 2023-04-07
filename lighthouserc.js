const WARN = 'warn';

module.exports = {
  ci: {
    collect: {
      url: [
        '/',
        '/404.html',
        '/people/',
        '/tools/',
        '/portfolio/',
        '/blog/',
        '/contact/',
      ].map((path) => `http://localhost:3001${path}`),
      staticDistDir: './.output/public',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'unused-javascript': WARN,
        'unused-css-rules': WARN,
        'non-composited-animations': WARN,
        'errors-in-console': WARN,
        canonical: WARN,
        'valid-source-maps': WARN,
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
