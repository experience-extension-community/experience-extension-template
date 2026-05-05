// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Status-aware Material Symbols Outlined loader hook. Mirrors
// Florida Poly's custom-simple-links useMaterialIconFonts hook.
//
// Usage in a card:
//
//   import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
//   ...
//   const fontStatus = useMaterialIconFonts(); // 'idle' | 'loading' | 'ready' | 'error'
//
// Or fire-and-forget (no status tracking) via the imperative loader:
//
//   import { loadMaterialSymbolsCSS } from '../../utils/branding/loadMaterialSymbols';
//   useEffect(() => { loadMaterialSymbolsCSS(); }, []);

import { useEffect, useState } from 'react';

import { loadMaterialSymbolsCSS } from '../utils/branding/loadMaterialSymbols';

const CONFIG = {
    MAX_RETRIES: 2,
    RETRY_DELAY_BASE_MS: 1000,
    FONT_TIMEOUT_MS: 5000,
    FONTS_TO_LOAD: ['Material Symbols Outlined'],
};

const delay = (ms) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

async function waitForFonts(fontFamilies, timeout) {
    if (typeof document === 'undefined' || !document.fonts || !document.fonts.load) {
        return; // graceful degradation; CSS fallback will handle it
    }
    const loadPromises = fontFamilies.map((family) =>
        document.fonts.load(`400 24px "${family}"`, '★'),
    );
    await Promise.race([
        Promise.all(loadPromises),
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error('font-load-timeout')), timeout);
        }),
    ]);
    if (document.fonts.ready) {
        await document.fonts.ready;
    }
}

async function loadFontsWithRetry() {
    for (let attempt = 0; attempt <= CONFIG.MAX_RETRIES; attempt += 1) {
        try {
            if (attempt > 0) {
                await delay(CONFIG.RETRY_DELAY_BASE_MS * attempt);
            }
            await waitForFonts(CONFIG.FONTS_TO_LOAD, CONFIG.FONT_TIMEOUT_MS);
            return true;
        } catch {
            if (attempt >= CONFIG.MAX_RETRIES) return false;
        }
    }
    return false;
}

/**
 * Load the Material Symbols Outlined stylesheet AND wait for the
 * font face to be ready before returning 'ready'. Returns one of:
 *   'idle' | 'loading' | 'ready' | 'error'
 *
 * On failure, transitions to 'ready' anyway (graceful degradation —
 * the icon glyphs will fall back to text but cards stay functional).
 */
export function useMaterialIconFonts() {
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setStatus('loading');

            // Stylesheet first
            const stylesheetLoaded = await loadMaterialSymbolsCSS();
            if (cancelled) return;

            if (!stylesheetLoaded) {
                setStatus('ready'); // graceful degradation
                return;
            }

            // Then wait for font face availability
            const fontLoaded = await loadFontsWithRetry();
            if (cancelled) return;

            if (fontLoaded && typeof document !== 'undefined') {
                document.body.classList.add('fonts-loaded');
            }
            setStatus('ready');
        }

        run();

        return () => {
            cancelled = true;
        };
    }, []);

    return status;
}
