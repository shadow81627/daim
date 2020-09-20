const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.CI);

exports.config = {
  tests: './test/e2e/*_test.ts',
  output: './test/e2e/output',
  helpers: {
    Puppeteer: {
      url: process.env.BASE_URL || 'http://localhost:3001',
      show: true,
      waitForNavigation: 'networkidle0',
    },
    ResembleHelper: {
      require: 'codeceptjs-resemblehelper',
      baseFolder: './test/e2e/screenshots/base/',
      diffFolder: './test/e2e/screenshots/diff/',
      prepareBaseImage: true,
    },
  },
  bootstrap: null,
  mocha: {},
  name: 'daim',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
