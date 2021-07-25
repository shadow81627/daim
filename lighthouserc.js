const WARN = 'warn';

module.exports = {
  ci: {
    collect: {
      url: [
        '/',
        '/404.html',
        '/people/',
        '/releases/',
        '/tools/',
        '/portfolio/',
        '/blog/',
        '/contact/',
      ],
      staticDistDir: './dist',
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
