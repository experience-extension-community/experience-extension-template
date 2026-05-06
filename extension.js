// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Ellucian Experience extension manifest.
//
// Conventions taken from review across all four FL Poly extensions
// (custom-simple-links, exp-account-details-custom, exp-canvas-teachers,
// exp-events-studentlife) plus Ellucian's official sdk-samples:
//
//   * Card titles are plain strings.
//   * Page title for SDK 8.x must be a translation object keyed by
//     full BCP-47 locale (en-US), per upload validator.
//   * Only ONE card per extension carries a `template:` block — the
//     showcase / starting-point card. Other cards omit it.
//   * `customConfiguration: { source: '...' }` points at the form
//     component for cards whose admin-side config can't be expressed
//     as plain text/dropdown fields.
//   * Per-card `configuration` for pipeline names; top-level
//     `configuration` for tenant-wide defaults.
//
// EVERY field marked TODO must be replaced before publishing under
// your institution. See REPLACE_THESE.md.

require('dotenv').config();

module.exports = {
    name: 'experience-extension-template',                 // TODO: your slug
    publisher: process.env.PUBLISHER || 'ExperienceExtensionCommunity',  // TODO: your institution

    cards: [
        // 1. HelloUserCard — minimum-viable showcase card.
        //    The ONE card that carries a `template:` block.
        {
            type: 'HelloUserCard',
            source: './src/cards/HelloUserCard/HelloUserCard.jsx',
            title: 'Hello user',
            displayCardType: 'Hello user',
            description: 'A minimum-viable greeting card. Use as your starting point for any new card.',
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
        {
            type: 'PageLinkCard',
            source: './src/cards/PageLinkCard/PageLinkCard.jsx',
            title: 'Open sample page',
            displayCardType: 'Open sample page',
            description: 'Demonstrates navigateToPage().',
        },
    ],

    page: {
        source: './src/pages/SamplePage/router.jsx',
        title: { 'en-US': 'Sample page' },
        fullWidth: true,
    },
};
