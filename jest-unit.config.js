module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js'],
  setupFiles: ['<rootDir>/tests/testsSetup.js']
};
