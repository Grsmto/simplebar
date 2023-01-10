const { isVue3 } = require('vue-demi');

module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.vue$': isVue3 ? 'vue-jest' : 'vue-jest2',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  snapshotSerializers: ['jest-serializer-vue'],
  testEnvironmentOptions: {
    url: 'http://localhost/',
    customExportConditions: ['node', 'node-addons'], // See https://github.com/vuejs/vue-jest/issues/479
  },
};
