// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Ellucian Experience extension manifest.
//
// Conventions taken from Ellucian's official sdk-samples (which is
// on the SAME stack as us — SDK 8.1.2, EDS 8.4.0, React 19, Node
// 24.13.0). NOT from the FL Poly references — those are all on EDS
// 7.x and use an incompatible withStyles signature.

require('dotenv').config();

module.exports = {
    name: 'experience-extension-template',
    publisher: process.env.PUBLISHER || 'ExperienceExtensionCommunity',

    cards: [
        // 1. HelloUserCard — minimum-viable showcase card.
        // The ONE card that carries a `template:` block (catalog showcase).
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
        {
            type: 'EthosFetchCard',
            source: './src/cards/EthosFetchCard/EthosFetchCard.jsx',
            title: 'Active terms',
            displayCardType: 'Active terms',
            description: 'Demonstrates a Data Connect pipeline-driven card.',
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

        // 4. PageLinkCard — card-to-page navigation.
        // pageRoute binds this card to the extension's page URL
        // (`/page/.../PageLinkCard/`) that the dashboard publishes.
        // Required in SDK 8: without it the dashboard 404s the URL
        // even though the upload tool lists it.
        {
            type: 'PageLinkCard',
            source: './src/cards/PageLinkCard/PageLinkCard.jsx',
            title: 'Open sample page',
            displayCardType: 'Open sample page',
            description: 'Demonstrates navigateToPage().',
            // pageRoute: {
            //     route: '/',
            // },
        },
    ],

    page: {
        source: './src/pages/router.jsx',
        
        fullWidth: true,
    },
};
