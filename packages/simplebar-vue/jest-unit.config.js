module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js'],
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['<rootDir>/tests/testsSetup.js']
};
