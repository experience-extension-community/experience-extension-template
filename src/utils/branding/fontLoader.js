// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Imperative Typekit loader. Mirrors FL Poly's exp-account-details-custom
// fontLoader exactly. The matching React-side `useTypekitFont()` hook
// lives in `src/hooks/useTypekitFont.js`.
//
// The kit ID and font name come from `brandFont` in brandColors.js —
// the single source of truth for the institution's web font. See
// `docs/BRANDING.md`.

import { brandFont } from './brandColors';

const TYPEKIT_LINK_ID = 'typekit-brand-font-css';

export const ensureTypekitFont = () => {
    if (typeof document === 'undefined') return null;
    if (!brandFont.kitId) return null;

    const href = `https://use.typekit.net/${brandFont.kitId}.css`;

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
