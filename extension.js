// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// MINIMUM VIABLE EXTENSION MANIFEST.
//
// One card. No page. No customConfiguration. No template object.
// Mirrors FL Poly's simplest extension.js (exp-account-details-custom)
// stripped to its bones. If this doesn't load, nothing more elaborate
// will either. Build up from here.

require('dotenv').config();

module.exports = {
    name: 'experience-extension-template',
    publisher: process.env.PUBLISHER || 'ExperienceExtensionCommunity',
    cards: [
        {
            type: 'HelloUserCard',
            source: './src/cards/HelloUserCard/HelloUserCard.jsx',
            title: 'Hello user',
            displayCardType: 'Hello user',
            description: 'Minimum-viable card — plain text, no SDK hooks, no HOCs.',
        },
    ],
};
