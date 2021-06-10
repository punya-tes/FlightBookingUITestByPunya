
const { argv } = require('yargs');

const wdioConfig = require('./wdio.json');

const suiteName = wdioConfig.suites;

const browserName = wdioConfig[argv.Browser] || wdioConfig.chromeheadlessbinary;
const fileName = argv.File || '*.test.js';

console.log(`./regression/tests/**/*${fileName}`);
console.log(`Print browserName | ${argv.Browser}  & fileName: ${fileName}`);

exports.config = {
  logLevel: 'error',
  waitforTimeout: wdioConfig.implicit,

  specs: [`./regression/tests/**/*.test.js`],
  suites: suiteName,
  capabilities: browserName,
  // eslint-disable-next-line no-unused-vars
  beforeTest(test, context) {
    console.log('beforeTest Hook');
    // eslint-disable-next-line no-undef
    browser.deleteCookies();
    browser.deleteAllCookies();
    // browser.maximizeWindow();
    browser.setTimeout({ pageLoad: wdioConfig.pageLoad });
    browser.setTimeout({ script: wdioConfig.script });
    browser.setTimeout({ implicit: wdioConfig.implicit });

    browser.setTimeout({
      pageLoad: wdioConfig.pageLoad,
      script: wdioConfig.script,
      implicit: wdioConfig.implicit,
    });
  },

  afterTest(test, context, { error, result, duration, passed, retries }) {
    console.log('afterTest Hook');
    if (error) {
      browser.takeScreenshot();
    }
    browser.deleteCookies();
  },

  runner: 'local',
  baseUrl: 'http://localhost',
  sync: true,
  maxInstances: 1,
  framework: 'mocha',
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    [
      'selenium-standalone',
      {
        logPath: './temp',
        args: {
          version: '3.141.59',
          seleniumArgs: ['-host', '127.0.0.1', '-port', '5555'],
        },
      },
    ],
  ],

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'regression/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: wdioConfig.script,
    retries: 0,
  },
};
