// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeNoSandBox: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless'],
      },
    },
    singleRun: true,
    restartOnFileChange: true,
    failOnEmptyTestSuite: false,
  });

  if (process.env.TRAVIS) {
    config.browsers = ['ChromeHeadless'];
    config.singleRun = true;
    config.browserDisconnectTimeout = 10000;
  }
};
