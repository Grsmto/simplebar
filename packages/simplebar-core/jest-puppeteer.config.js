const caps = {
  browser: 'chrome', // You can choose `chrome`, `edge` or `firefox` in this capability
  browser_version: 'latest', // We support v83 and above. You can choose `latest`, `latest-beta`, `latest-1`, `latest-2` and so on, in this capability
  os: 'os x',
  os_version: 'big sur',
  project: 'simplebar',
  build:
    process.env.CI === 'true'
      ? `${process.env.TRAVIS_BRANCH}-${process.env.TRAVIS_COMMIT}`
      : 'local-tests',
  name: 'SimpleBar examples Puppeteer test', // The name of your test and build. See browserstack.com/docs/automate/puppeteer/organize tests for more details
  'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER,
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'browserstack.local': 'true',
};

module.exports = {
  launch: {
    headless: process.env.CI === 'true',
    devtools: process.env.CI === 'false',
  },
  server: {
    command: 'cd ../examples && webpack server --mode=production',
    port: 8090,
  },
  connect: {
    browserWSEndpoint: `wss://cdp.browserstack.com/puppeteer?caps=${encodeURIComponent(
      JSON.stringify(caps)
    )}`, // The BrowserStack CDP endpoint gives you a `browser` instance based on the `caps` that you specified
  },
};
