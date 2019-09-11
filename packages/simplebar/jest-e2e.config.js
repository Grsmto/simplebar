module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  preset: 'jest-puppeteer',
  testRegex: '^.+\\.test\\.e2e\\.js$',
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js']
};
