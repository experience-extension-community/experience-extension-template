// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Ported from Florida Poly's exp-canvas-teachers/src/i18n/intlUtility.js.
// Identical logic; only the catch bindings use ES2019 optional catch
// binding (FL Poly's `catch (e)` trips our SDK's stricter
// no-unused-vars eslint rule).

import ENGLISH_TRANSLATION from './en.json';

export const getMessages = (userLocale) => {
    const { messages: baseMessages } = ENGLISH_TRANSLATION;

    try {
        const { messages: localeMessages } = require(`./${userLocale}.json`);
        if (localeMessages) {
            return Object.assign({}, baseMessages, localeMessages);
        } else {
            const actionLanguage = userLocale.split(/[-_]/)[0];
            const { messages } = require(`./${actionLanguage}.json`);
            return Object.assign({}, baseMessages, messages);
        }
    } catch {
        try {
            const actionLanguage = userLocale.split(/[-_]/)[0];
            const { messages } = require(`./${actionLanguage}.json`);
            return Object.assign({}, baseMessages, messages);
        } catch {
            return baseMessages;
        }
    }
};
