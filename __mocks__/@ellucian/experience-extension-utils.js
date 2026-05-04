// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Manual Jest mock for the SDK utilities.
// Override per-test with `jest.mock('@ellucian/experience-extension-utils', () => ({ ... }))`.

module.exports = {
    useThemeInfo: () => ({
        primaryColor: '#501D83',
        secondaryColor: '#009FDF',
        ctaColors: {
            active: '#2E1A4A',
            base: '#501D83',
            hover: '#2E1A4A',
            tint: '#B095DE',
        },
    }),
    useUserInfo: () => ({
        id: 'test-user',
        firstName: 'Ada',
        lastName: 'Lovelace',
        locale: 'en-US',
    }),
    useCardInfo: () => ({
        cardId: 'test-card',
        configuration: { client: {}, server: {}, customConfiguration: {} },
    }),
    useCardControl: () => ({
        navigateToPage: jest.fn(),
        setCustomConfiguration: jest.fn(),
        setIsCustomConfigurationValid: jest.fn(),
    }),
    useExtensionInfo: () => ({
        name: 'test-extension',
        configuration: { client: {}, server: {} },
    }),
    useDashboardInfo: () => ({ dashboardId: 'test-dashboard', name: 'Test' }),
    useExtensionControl: () => ({
        setLoadingStatus: jest.fn(),
        setErrorMessage: jest.fn(),
        setPageTitle: jest.fn(),
    }),
    useData: () => ({
        authenticatedEthosFetch: jest.fn(),
    }),
    useCache: () => ({
        getItem: jest.fn(),
        storeItem: jest.fn(),
        removeItem: jest.fn(),
    }),
};
