const readFileSync = require('fs').readFileSync;
const resolve = require(`path`).resolve;

module.exports = {
  generateNotes: {
    preset: 'angular',
    writerOpts: {
      mainTemplate: readFileSync(
        resolve(__dirname, '.release-notes-templates/template.hbs'),
        'utf-8',
      ),
      headerPartial: readFileSync(
        resolve(__dirname, '.release-notes-templates/header.hbs'),
        'utf-8',
      ),
      commitPartial: readFileSync(
        resolve(__dirname, '.release-notes-templates/commit.hbs'),
        'utf-8',
      ),
      footerPartial: readFileSync(
        resolve(__dirname, '.release-notes-templates/footer.hbs'),
        'utf-8',
      ),
    },
  },

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', { changelogTitle: '# Releases' }],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        /* eslint-disable */
        message:
          'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
        /* eslint-enable */
      },
    ],
    '@semantic-release/github',
  ],
};
