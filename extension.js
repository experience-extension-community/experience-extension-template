// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Ellucian Experience extension manifest.
//
// `configuration` is declared at the EXTENSION level so all cards and
// the page share a single `ethosApiKey` (server) + `termsPipeline`
// (client) values. Admin configures once in Extension Manager and
// every card / page-side fetch picks them up via `useCardInfo()`.
// Pattern confirmed from FloridaPoly/custom-simple-links.

require('dotenv').config();

module.exports = {
    name: 'experience-extension-template',
    publisher: process.env.PUBLISHER || 'ExperienceExtensionCommunity',

    configuration: {
        client: [
            {
                key: 'termsPipeline',
                label: 'Terms pipeline (Data Connect)',
                type: 'text',
                require: false,
                default:
                    process.env.PIPELINE_GET_TERMS || 'eec-template-academic-periods-get',
            },
        ],
        server: [
            {
                key: 'ethosApiKey',
                label: 'Ethos API key',
                type: 'password',
                require: true,
                value: process.env.ETHOS_API_KEY || '',
            },
        ],
    },

    cards: [
        // 1. User Card — identity showcase. (cardType remains
        // HelloUserCard for backwards compatibility with any tenant
        // configuration already attached.)
        {
            type: 'HelloUserCard',
            source: './src/cards/HelloUserCard/HelloUserCard.jsx',
            title: 'User Card',
            displayCardType: 'User Card',
            description:
                'Greets the signed-in user with avatar, email, and locale. Use as a starting point for any new card.',
            template: {
                icon: 'user',
                title: 'User Card',
                description:
                    'Greets the signed-in user and shows basic identity info from useUserInfo().',
            },
        },

        // 2. Active Terms — Data Connect pipeline-driven card.
        // Body click opens the page-sized version of the same data.
        // excludeClickSelectors keeps the per-row term-code copy buttons
        // working as copy-to-clipboard rather than navigation.
        {
            type: 'EthosFetchCard',
            source: './src/cards/EthosFetchCard/EthosFetchCard.jsx',
            title: 'Active Terms',
            displayCardType: 'Active Terms',
            description: 'Demonstrates a Data Connect pipeline-driven card.',
            pageRoute: {
                route: '/terms',
                excludeClickSelectors: ['button'],
            },
        },

        // 3. Configurable Links — admin-driven content via customConfiguration form.
        // Body click opens the page-sized links view. excludeClickSelectors
        // keeps the link rows + collapsible category summaries working.
        {
            type: 'ConfigurableCard',
            source: './src/cards/ConfigurableCard/ConfigurableCard.jsx',
            title: 'Configurable Links',
            displayCardType: 'Configurable Links',
            description: 'A card whose content is configured by an admin via a custom form.',
            customConfiguration: {
                source: './src/cards/ConfigurableCard/ConfigurableCardConfig.jsx',
            },
            pageRoute: {
                route: '/links',
                excludeClickSelectors: ['a', 'button', 'summary', 'details'],
            },
        },

        // 4. Sample Pages — multi-section page launcher.
        // excludeClickSelectors stops body-click navigation from
        // hijacking the per-row link buttons (which need to either
        // navigate to their own sub-route or open the hooks-choice
        // dialog locally).
        {
            type: 'PageLinkCard',
            source: './src/cards/PageLinkCard/PageLinkCard.jsx',
            title: 'Sample Pages',
            displayCardType: 'Sample Pages',
            description:
                'Multi-section sample page — hooks reference, active terms, and configured links.',
            pageRoute: {
                route: '/',
                excludeClickSelectors: ['button'],
            },
        },
    ],

    page: {
        source: './src/page/router.jsx',
        fullWidth: true,
    },
};
