const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

module.exports = async function globalTeardown(globalConfig) {
  await new Promise((resolve) => {
    globalThis.__BROWSERSTACK_LOCAL__.stop(() => {
      resolve();
    });
  });
  await teardownPuppeteer(globalConfig);
};
