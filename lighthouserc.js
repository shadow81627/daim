module.exports = {
  ci: {
    collect: {
      url: [
        '/',
        '/404.html',
        '/resume/',
        '/releases/',
        '/tools/',
        '/portfolio/',
        '/blog/',
        '/contact',
      ],
      staticDistDir: './dist',
      numberOfRuns: 5,
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
