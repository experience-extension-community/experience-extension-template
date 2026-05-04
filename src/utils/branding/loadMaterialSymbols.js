// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Imperative Material Symbols Outlined stylesheet loader with retry.
// React-side wrapper that returns load status is in
// `src/hooks/useMaterialIconFonts.js`.

const FONT_CONFIG = {
    URL: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=block',
    LINK_ID: 'eec-material-symbols',
    MAX_RETRIES: 2,
    RETRY_DELAY_BASE_MS: 1000,
    LOAD_TIMEOUT_MS: 10_000,
};

const delay = (ms) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const attemptLoad = (attempt) =>
    new Promise((resolve) => {
        const existing = document.getElementById(FONT_CONFIG.LINK_ID);
        if (existing && existing.sheet) {
            resolve(true);
            return;
        }
        if (existing) existing.remove();

        const link = document.createElement('link');
        link.id = FONT_CONFIG.LINK_ID;
        link.rel = 'stylesheet';
        link.href = FONT_CONFIG.URL;

        const timeout = setTimeout(() => resolve(false), FONT_CONFIG.LOAD_TIMEOUT_MS);
        link.onload = () => {
            clearTimeout(timeout);
            resolve(true);
        };
        link.onerror = () => {
            clearTimeout(timeout);
            resolve(false);
        };

        document.head.appendChild(link);
    });

/**
 * Load the Material Symbols Outlined stylesheet with bounded retry.
 * Resolves to true when loaded, false after exhausting retries.
 */
export const loadMaterialSymbolsCSS = async () => {
    if (typeof document === 'undefined') return false;
    for (let attempt = 0; attempt <= FONT_CONFIG.MAX_RETRIES; attempt += 1) {
        if (attempt > 0) {
            await delay(FONT_CONFIG.RETRY_DELAY_BASE_MS * attempt);
        }
        const ok = await attemptLoad(attempt);
        if (ok) return true;
    }
    return false;
};
