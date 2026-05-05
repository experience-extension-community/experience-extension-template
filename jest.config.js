// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'json'],
    moduleNameMapper: {
        // Style + asset mocks
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
        '\\.(png|jpg|jpeg|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
        // Ellucian package mocks — Jest can't resolve the CDN tarballs,
        // so route them at our local stand-ins.
        '^@ellucian/react-design-system/core/styles/tokens$':
            '<rootDir>/__mocks__/@ellucian/react-design-system/core/styles/tokens.js',
        '^@ellucian/react-design-system/core/styles$':
            '<rootDir>/__mocks__/@ellucian/react-design-system/core/styles.js',
        '^@ellucian/react-design-system/core$':
            '<rootDir>/__mocks__/@ellucian/react-design-system/core.js',
        '^@ellucian/ds-icons/lib$':
            '<rootDir>/__mocks__/@ellucian/ds-icons/lib.js',
        '^@ellucian/experience-extension-utils$':
            '<rootDir>/__mocks__/@ellucian/experience-extension-utils.js',
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testMatch: ['**/__tests__/**/*.{js,jsx}', '**/?(*.)+(test).{js,jsx}'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.test.{js,jsx}',
        '!src/**/index.js',
    ],
    coverageReporters: ['text', 'text-summary', 'lcov', 'html'],
    coverageDirectory: 'coverage',
};
