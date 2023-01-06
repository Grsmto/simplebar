const { defaults: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform,
    '^.+\\.js?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/testsSetup.js'],
};
