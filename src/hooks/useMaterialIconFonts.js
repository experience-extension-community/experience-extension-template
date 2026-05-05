// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Status-aware Material Symbols Outlined loader hook.
// Returns one of: 'idle' | 'loading' | 'ready' | 'error'.
//
// Use this when the card needs to gate rendering on font availability
// to avoid flash-of-unstyled-text. For most cards, the simpler pattern
// of "load and forget" works fine — `loadMaterialSymbolsCSS` does that
// and is what the template's <Icon> component implicitly relies on.

import { useEffect, useState } from 'react';
import { loadMaterialSymbolsCSS } from '../utils/branding/loadMaterialSymbols';

const FONT_FAMILY = 'Material Symbols Outlined';
const FONT_LOAD_TIMEOUT_MS = 5000;

const waitForFontFace = async (timeout) => {
    if (typeof document === 'undefined' || !document.fonts || !document.fonts.load) {
        return; // graceful degradation; CSS fallback will handle it
    }
    // Caller decides whether to surface 'error' or graceful 'ready' — let the
    // promise rejection propagate.
    await Promise.race([
        document.fonts.load(`400 24px "${FONT_FAMILY}"`, '★'),
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error('font-load-timeout')), timeout);
        }),
    ]);
    if (document.fonts.ready) await document.fonts.ready;
};

export const useMaterialIconFonts = () => {
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setStatus('loading');
            const stylesheetLoaded = await loadMaterialSymbolsCSS();
            if (cancelled) return;
            if (!stylesheetLoaded) {
                setStatus('ready'); // graceful degradation — CSS may still apply
                return;
            }
            try {
                await waitForFontFace(FONT_LOAD_TIMEOUT_MS);
                if (!cancelled) setStatus('ready');
            } catch {
                if (!cancelled) setStatus('ready'); // don't block UI on font errors
            }
        };
        run();
        return () => {
            cancelled = true;
        };
    }, []);

    return status;
};
