module.exports = {
  verbose: true,
  setupFiles: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/demo/dist/'],
  setupTestFrameworkScriptFile: '<rootDir>/rtl.setup.js',
};
