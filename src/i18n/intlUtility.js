// Copyright 2021-2025 Ellucian Company L.P. and its affiliates.
// SPDX-License-Identifier: Apache-2.0
//
// Ported byte-for-byte from FloridaPoly/experience-ethos-examples/
// account-details-dataconnect/extension/src/i18n/intlUtility.js.

/* eslint-disable global-require */
import ENGLISH_TRANSLATION from '../i18n/en.json';

export const getMessages = (userLocale) => {
    const {messages: baseMessages } = ENGLISH_TRANSLATION;

    try {
        const { messages: localeMessages } = require(`../i18n/${userLocale}.json`);
        // check for territory specific translations
        if (localeMessages) {
            return Object.assign({}, baseMessages, localeMessages);
        } else {
            // check for language translations
            const actionLanguage = userLocale.split(/[-_]/)[0];
            const { messages: localeMessages } = require(`../i18n/${actionLanguage}.json`);
            return Object.assign({}, baseMessages, localeMessages);
        }
    } catch (e) {
        try {
            const actionLanguage = userLocale.split(/[-_]/)[0];
            const { messages: localeMessages } = require(`../i18n/${actionLanguage}.json`);
            return Object.assign({}, baseMessages, localeMessages);
        } catch (e) {
            // This userLocale is not supported.
            return baseMessages;
        }
    }
}
