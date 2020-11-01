const http = require('http');
const { setHeadlessWhen } = require('@codeceptjs/configure');
const handler = require('serve-handler');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response, { public: 'dist' });
});

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.CI);

exports.config = {
  tests: './test/e2e/*_test.js',
  output: './test/e2e/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3001',
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
  bootstrap() {
    server.listen(3001, () => {
      console.log('Running at http://localhost:3001');
    });
  },
  teardown() {
    server.close();
  },
  mocha: {},
  name: 'daim',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: false,
    },
  },
};
