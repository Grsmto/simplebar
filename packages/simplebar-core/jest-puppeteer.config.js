module.exports = {
  launch: {
    headless: process.env.CI === 'true',
    devtools: process.env.CI === 'false',
  },
  server: {
    command: 'cd ../examples && webpack-dev-server --mode=development',
    port: 8090,
  },
};
