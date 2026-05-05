// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Ellucian Experience extension manifest.
// Lives at the repo root; loaded by the SDK build at deploy time.
//
// Each card's `source` is a string path to the component file, NOT
// an import. The SDK resolves these at build time.
//
// EVERY field marked TODO must be replaced before publishing this
// extension under your institution's name. See REPLACE_THESE.md.

require('dotenv').config();

module.exports = {
    name: 'experience-extension-template',                  // TODO: replace with your slug
    publisher: process.env.PUBLISHER || 'ExperienceExtensionCommunity',  // TODO: your institution

    // Extension-level configuration. Applies to all cards in this extension.
    configuration: {
        client: [
            {
                key: 'studentsPipeline',
                label: 'Students pipeline (Data Connect)',
                type: 'text',
                required: false,
                default: process.env.PIPELINE_GET_STUDENTS || 'eec-template-persons-get',
            },
            {
                key: 'termsPipeline',
                label: 'Terms pipeline (Data Connect)',
                type: 'text',
                required: false,
                default: process.env.PIPELINE_GET_TERMS || 'eec-template-academic-periods-get',
            },
        ],
        server: [
            {
                key: 'ethosApiKey',
                label: 'Ethos API key',
                type: 'password',
                required: true,
                value: process.env.ETHOS_API_KEY || '',
            },
        ],
    },

    cards: [
        // 1. HelloUserCard — minimal viable card.
        // Demonstrates: useUserInfo, useThemeInfo, useExtensionControl,
        // useStyles, IconSprite, react-intl. No data fetching.
        {
            type: 'HelloUserCard',
            source: './src/cards/HelloUserCard/HelloUserCard.jsx',
            title: 'Hello user',
            displayCardType: 'Hello user',
            description: 'Greets the signed-in user. Demonstrates the minimum-viable Experience card.',
            template: {
                icon: 'user',
                title: 'Hello user',
                description: 'A minimal card that greets the user.',
            },
        },

        // 2. EthosFetchCard — Ethos data + state lifecycle.
        // Demonstrates: useEthosFetch, LoadingState/ErrorState/EmptyState,
        // useAnnouncer, formatDate/formatNumber, configurable pipeline.
        {
            type: 'EthosFetchCard',
            source: './src/cards/EthosFetchCard/EthosFetchCard.jsx',
            title: 'Active terms',
            displayCardType: 'Active terms',
            description: 'Lists academic periods returned by the configured Data Connect pipeline.',
            template: {
                icon: 'calendar',
                title: 'Active terms',
                description: 'Demonstrates Data Connect data fetching with retry and error handling.',
            },
        },

        // 3. ConfigurableCard — customConfiguration form pattern.
        // Demonstrates: customConfiguration source, setCustomConfiguration,
        // setIsCustomConfigurationValid, validation, dynamic content.
        {
            type: 'ConfigurableCard',
            source: './src/cards/ConfigurableCard/ConfigurableCard.jsx',
            title: 'Configurable links',
            displayCardType: 'Configurable links',
            description: 'A card whose content is configured by an admin via a custom config form.',
            customConfiguration: {
                source: './src/cards/ConfigurableCard/ConfigurableCardConfig.jsx',
            },
            template: {
                icon: 'settings',
                title: 'Configurable links',
                description: 'Editable links with admin-managed configuration.',
            },
        },

        // 4. PageLinkCard — card-to-page navigation.
        // Demonstrates: pageRoute, useCardControl().navigateToPage,
        // page-side useDashboardInfo / useExtensionInfo.
        {
            type: 'PageLinkCard',
            source: './src/cards/PageLinkCard/PageLinkCard.jsx',
            title: 'Open sample page',
            displayCardType: 'Open sample page',
            description: 'Navigates to a full-width page that exercises page-level SDK hooks.',
            pageRoute: {
                route: '/sample',
                excludeClickSelectors: ['a', 'button'],
            },
            template: {
                icon: 'arrow-right',
                title: 'Open sample page',
                description: 'A card that opens a full-width Experience page.',
            },
        },
    ],

    page: {
        source: './src/pages/SamplePage/router.jsx',
        title: { 'en-US': 'Sample page' },
        fullWidth: true,
        backgroundColor: 'neutral',
    },
};
