const BrowserStackLocal = require('browserstack-local');
const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

const bsLocal = new BrowserStackLocal.Local();

globalThis.__BROWSERSTACK_LOCAL__ = bsLocal;

const BS_LOCAL_ARGS = {
  key: process.env.BROWSERSTACK_ACCESS_KEY,
};

// Starts the Local instance with the required arguments

module.exports = async function globalSetup(globalConfig) {
  await new Promise((resolve) => {
    bsLocal.start(BS_LOCAL_ARGS, () => {
      // Check if BrowserStack local instance is running
      console.log(`BrowserStackLocal running: ${bsLocal.isRunning()}`);
      resolve();
    });
  });
  await setupPuppeteer(globalConfig);
};
