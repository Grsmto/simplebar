module.exports = {
  preset: 'jest-puppeteer',
  testRegex: '^.+\\.test\\.e2e\\.js$',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
  ...(process.env.CI === 'true' && { maxWorkers: 2, testTimeout: 15000 }),
  globalSetup: './global-setup.js',
};
