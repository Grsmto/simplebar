const { defaults: tsjPreset } = require('ts-jest/presets');
const { isVue3 } = require('vue-demi');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.vue$': isVue3 ? 'vue-jest' : 'vue-jest2',
  },
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
