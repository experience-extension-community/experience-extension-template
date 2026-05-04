// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEach: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(png|jpg|jpeg|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.{js,jsx}', '**/?(*.)+(test).{js,jsx}'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/index.js',
    '!src/extension.js',
  ],
  coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
  coverageDirectory: 'coverage',
};
