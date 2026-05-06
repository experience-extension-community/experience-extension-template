// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// DIAGNOSTIC: ONE card only, building up incrementally.

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
            description: 'Diagnostic: withStyles + useUserInfo only.',
        },
    ],
};
