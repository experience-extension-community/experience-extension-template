// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Locale-cascade message resolver.
//
// Lookup order:
//   1. Exact match     (e.g. `en-GB.json`)
//   2. Language match  (e.g. `en.json` for `en-GB`)
//   3. English fallback
//
// Mirrors the pattern used in Ellucian's official sample-extensions
// and FL Poly's existing extensions.

import ENGLISH_TRANSLATION from './en.json';

export const getMessages = (userLocale) => {
    const { messages: baseMessages } = ENGLISH_TRANSLATION;
    if (!userLocale) return baseMessages;

    try {
        const { messages: localeMessages } = require(`./${userLocale}.json`);
        if (localeMessages) {
            return { ...baseMessages, ...localeMessages };
        }
    } catch {
        // exact match not found; fall through to language match
    }

    try {
        const language = userLocale.split(/[-_]/)[0];
        if (language && language !== userLocale) {
            const { messages: localeMessages } = require(`./${language}.json`);
            return { ...baseMessages, ...localeMessages };
        }
    } catch {
        // language match not found; fall through to base
    }

    return baseMessages;
};
