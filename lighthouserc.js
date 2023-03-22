const WARN = 'warn';

module.exports = {
  ci: {
    collect: {
      url: [
        '/200.html',
        '/404.html',
        '/people/',
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
