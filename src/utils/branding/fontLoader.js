// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Imperative Typekit loader. The React-side wrapper is in
// `src/hooks/useTypekitFont.js`.

import { fontLoader } from './tokens';

const STYLESHEET_ID = 'eec-brand-font';

const resolveKitId = () => {
    if (typeof process !== 'undefined' && process.env && process.env.TYPEKIT_KIT_ID) {
        return process.env.TYPEKIT_KIT_ID;
    }
    return fontLoader.typekitKitId;
};

/**
 * Idempotently inject the Typekit stylesheet. Safe to call from any
 * mount effect — the stylesheet ID guard prevents duplicate links.
 * Returns the link element, or null if the document is unavailable
 * (SSR / tests) or no kit ID is configured.
 */
export const ensureTypekitFont = () => {
    if (typeof document === 'undefined') return null;

    const kitId = resolveKitId();
    if (!kitId) return null;

    const existing = document.getElementById(STYLESHEET_ID);
    if (existing) return existing;

    const link = document.createElement('link');
    link.id = STYLESHEET_ID;
    link.rel = 'stylesheet';
    link.href = `https://use.typekit.net/${kitId}.css`;
    document.head.appendChild(link);
    return link;
};
