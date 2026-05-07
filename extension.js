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

    // Shared by every card and the page. Both cards that fetch from
    // the academic-periods pipeline (EthosFetchCard on the dashboard,
    // TermsPage on the page) and the page launcher (Sample Pages /
    // PageLinkCard) read these values via useCardInfo().configuration.
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
        // 1. HelloUserCard — minimum-viable showcase card.
        {
            type: 'HelloUserCard',
            source: './src/cards/HelloUserCard/HelloUserCard.jsx',
            title: 'Hello user',
            displayCardType: 'Hello user',
            description:
                'A minimum-viable greeting card. Use as your starting point for any new card.',
            template: {
                icon: 'user',
                title: 'Hello user',
                description:
                    'Greets the signed-in user. Demonstrates the smallest pattern an Experience card needs to render.',
            },
        },

        // 2. EthosFetchCard — Data Connect pipeline-driven card.
        // Inherits termsPipeline + ethosApiKey from the extension-level
        // configuration block above.
        {
            type: 'EthosFetchCard',
            source: './src/cards/EthosFetchCard/EthosFetchCard.jsx',
            title: 'Active terms',
            displayCardType: 'Active terms',
            description: 'Demonstrates a Data Connect pipeline-driven card.',
        },

        // 3. ConfigurableCard — admin-driven content via customConfiguration form.
        {
            type: 'ConfigurableCard',
            source: './src/cards/ConfigurableCard/ConfigurableCard.jsx',
            title: 'Configurable links',
            displayCardType: 'Configurable links',
            description: 'A card whose content is configured by an admin via a custom form.',
            customConfiguration: {
                source: './src/cards/ConfigurableCard/ConfigurableCardConfig.jsx',
            },
        },

        // 4. Sample Pages — multi-section page launcher.
        // cardType remains 'PageLinkCard' for backwards compatibility
        // with any tenant-side configuration already in place.
        // Inherits termsPipeline + ethosApiKey from extension level so
        // TermsPage's fetch is authorized under this card's cardId.
        {
            type: 'PageLinkCard',
            source: './src/cards/PageLinkCard/PageLinkCard.jsx',
            title: 'Sample Pages',
            displayCardType: 'Sample Pages',
            description:
                'Multi-section sample page — hooks reference, active terms, and configured links.',
            pageRoute: {
                route: '/',
            },
        },
    ],

    page: {
        source: './src/page/router.jsx',
        fullWidth: true,
    },
};
