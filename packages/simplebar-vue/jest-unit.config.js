const { isVue3 } = require('vue-demi');

module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.vue$': isVue3 ? 'vue-jest' : 'vue-jest2',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['<rootDir>/tests/testsSetup.js'],
  testURL: "http://localhost/"
};
