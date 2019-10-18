module.exports = {
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  moduleFileExtensions: ['js'],
  setupFiles: ['<rootDir>/tests/testsSetup.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/testsSetupAfterEnv.js']
};
