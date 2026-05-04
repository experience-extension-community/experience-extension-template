// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Branding tokens — three layers, lowest-priority first:
//
//   1. Path Design System tokens (imported below). Baseline visual
//      system. Never overridden directly.
//   2. Institutional overlay (this file). Brand colors, font, kit ID,
//      asset URLs. Layered ON TOP of Path tokens.
//   3. Live dashboard theme (read at runtime via useThemeInfo, in
//      ./theme.js). Wins for primary/secondary/CTA.
//
// To re-skin this extension for your institution:
//   * Replace VALUES under `palette`, `typography.fontFamily`,
//     `assets`, and `fontLoader.typekitKitId`.
//   * DO NOT change keys or shape.
//   * Verify text/background contrast meets WCAG 2.2 AA.
//
// Defaults reflect Florida Polytechnic University.

// Path Design System tokens. Add more as components need them — every
// EDS-rendered surface assumes these are available, but you only need
// to import the ones the extension explicitly references.
import {
    // Spacing scale (10 = 8px, 20 = 16px, 30 = 24px, etc.)
    spacing10,
    spacing20,
    spacing30,
    spacing40,
    spacing50,
    spacing60,
    // Neutral colors
    colorTextNeutral500,
    colorBackgroundNeutral200,
    colorBackgroundNeutral100,
    colorBorderNeutralStrong,
    // Border radius
    borderRadiusReduced,
} from '@ellucian/react-design-system/core/styles/tokens';

// --- 1. Path baseline (re-exported for component import convenience) ---

export const path = {
    spacing: { 10: spacing10, 20: spacing20, 30: spacing30, 40: spacing40, 50: spacing50, 60: spacing60 },
    color: {
        textNeutral: colorTextNeutral500,
        backgroundDefault: colorBackgroundNeutral100,
        backgroundMuted: colorBackgroundNeutral200,
        borderStrong: colorBorderNeutralStrong,
    },
    borderRadius: borderRadiusReduced,
};

// --- 2. Institutional overlay (Florida Poly defaults) ---

export const palette = {
    // Brand
    primary: '#501D83',          // Poly Purple
    primaryDark: '#2E1A4A',      // Python Plum
    primaryLight: '#B095DE',     // Pixel Purple
    accent: '#009FDF',           // Cyber Blue
    // Neutrals (institutional-specific; falls back to Path neutrals via theme.js)
    neutralLight: '#A7B4C3',     // Tech Slate
    neutralDark: '#586066',      // Graphite Gray
    // Semantic — meet WCAG 2.2 AA against `surface` (#FFFFFF)
    success: '#1E7E34',
    warning: '#B45309',
    danger: '#B91C1C',
    info: '#1D4ED8',
    // Surfaces (institutional override of Path neutrals)
    surface: '#FFFFFF',
    surfaceMuted: '#F5F5F7',
    textPrimary: '#1A1A1A',
    textSecondary: '#586066',
};

export const typography = {
    // Brand font is loaded by `./fontLoader.js`. Fallback chain
    // ensures graceful degradation if Typekit fails.
    fontFamily: '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: '"JetBrains Mono", Menlo, Monaco, Consolas, monospace',
    weights: { regular: 400, medium: 500, bold: 700 },
    scale: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
    },
};

export const focus = {
    // High-contrast, visible-on-any-background ring.
    // Required by WCAG 2.2 SC 2.4.7 / 2.4.13.
    ring: `0 0 0 3px ${palette.accent}`,
    outlineOffset: '2px',
};

export const motion = {
    // Components must respect `prefers-reduced-motion`. These are upper bounds.
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
};

export const assets = {
    // Host your own logos. Don't hot-link to anyone else's CDN.
    logoHorizontal: '/assets/logo-horizontal.svg',
    logoStacked: '/assets/logo-stacked.svg',
    favicon: '/assets/favicon.svg',
};

export const fontLoader = {
    // Adobe Typekit kit ID. Override per-environment via TYPEKIT_KIT_ID.
    typekitKitId: 'yld8vhe', // Florida Poly: "New Science"
};
