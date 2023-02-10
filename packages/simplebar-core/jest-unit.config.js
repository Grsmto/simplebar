const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^lodash-es/*(.*)$': 'lodash/$1',
  },
  testEnvironment: 'jsdom',
};
