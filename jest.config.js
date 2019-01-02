module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
      '/node_modules/',
    ],
    roots: [
      '<rootDir>/tests',
    ],
    setupFiles: [
      '<rootDir>/tests/setupTests.js',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost:8888/',
  };

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html