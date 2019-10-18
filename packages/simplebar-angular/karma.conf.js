// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage/simplebar-angular'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      ChromeNoSandBox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--headless']
      }
    },
    singleRun: true,
    restartOnFileChange: true,
    failOnEmptyTestSuite: false
  });

  if (process.env.TRAVIS) {
    config.browsers = ['HeadlessChrome'];
    config.singleRun = true;
    config.browserDisconnectTimeout = 10000;
  }
};
