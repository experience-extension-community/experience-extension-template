// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Imperative Typekit loader. Mirrors FL Poly's exp-account-details-custom
// fontLoader exactly. The matching React-side `useTypekitFont()` hook
// lives in `src/hooks/useTypekitFont.js`.

import { fontLoader } from './brandColors';

const TYPEKIT_LINK_ID = 'typekit-new-science-css';

const resolveKitId = () => {
    if (typeof process !== 'undefined' && process.env && process.env.TYPEKIT_KIT_ID) {
        return process.env.TYPEKIT_KIT_ID;
    }
    return fontLoader.typekitKitId;
};

export const ensureTypekitFont = () => {
    if (typeof document === 'undefined') return null;

    const kitId = resolveKitId();
    if (!kitId) return null;

    const href = `https://use.typekit.net/${kitId}.css`;

    let linkElement = document.getElementById(TYPEKIT_LINK_ID);
    if (linkElement) {
        if (linkElement.getAttribute('href') !== href) {
            linkElement.setAttribute('href', href);
        }
        return linkElement;
    }

    linkElement = document.createElement('link');
    linkElement.id = TYPEKIT_LINK_ID;
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
    return linkElement;
};
