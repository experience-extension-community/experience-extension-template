// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Programmatic loader for the Material Symbols Outlined stylesheet.
// Mirrors Florida Poly's custom-simple-links pattern: retry-enabled
// async function plus a synchronous fallback. The matching
// `useMaterialIconFonts()` React hook (with status tracking) lives
// in `src/hooks/useMaterialIconFonts.js`.

const FONT_CONFIG = {
    FONT_URL:
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,1,0&display=block',
    LINK_ID: 'material-symbols-stylesheet',
    MAX_RETRIES: 2,
    RETRY_DELAY_BASE_MS: 1000,
    LOAD_TIMEOUT_MS: 10000,
};

const delay = (ms) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const attemptLoadStylesheet = (attempt = 0) =>
    new Promise((resolve) => {
        if (typeof document === 'undefined') {
            resolve(false);
            return;
        }

        const existing = document.getElementById(FONT_CONFIG.LINK_ID);
        if (existing && existing.sheet) {
            resolve(true);
            return;
        }
        if (existing) existing.remove();

        const link = document.createElement('link');
        link.id = FONT_CONFIG.LINK_ID;
        link.rel = 'stylesheet';
        link.href = FONT_CONFIG.FONT_URL;

        const timeout = setTimeout(() => {
            // eslint-disable-next-line no-console
            console.warn(`[Material Symbols] Load timeout on attempt ${attempt + 1}`);
            resolve(false);
        }, FONT_CONFIG.LOAD_TIMEOUT_MS);

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
 * Resolves to true on success, false after exhausting retries.
 * Safe to call multiple times — duplicate links are skipped.
 */
export async function loadMaterialSymbolsCSS() {
    for (let attempt = 0; attempt <= FONT_CONFIG.MAX_RETRIES; attempt += 1) {
        if (attempt > 0) {
            await delay(FONT_CONFIG.RETRY_DELAY_BASE_MS * attempt);
        }
        const ok = await attemptLoadStylesheet(attempt);
        if (ok) return true;
    }
    return false;
}

/**
 * Synchronous fallback. No retry, no load detection — just appends
 * the link tag if it isn't already present. Use when you don't need
 * to wait for load completion.
 */
export function loadMaterialSymbolsCSSSync() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(FONT_CONFIG.LINK_ID)) return;

    const link = document.createElement('link');
    link.id = FONT_CONFIG.LINK_ID;
    link.rel = 'stylesheet';
    link.href = FONT_CONFIG.FONT_URL;
    document.head.appendChild(link);
}
