// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// brandColors — generic, semantic palette consumed by every card.
//
// Component code references brandColors.primary, brandColors.secondary,
// brandColors.textSecondary, etc. — never institution-specific names.
// To re-skin this extension for your institution: replace the HEX
// values below with your brand's equivalents. Do NOT change the keys.
//
// The defaults shipped here are Florida Polytechnic University's
// brand colors (June 2024 brand manual), used purely as a starting
// point. Each is annotated with its FL Poly name in the comments
// so adopters can see what role each value plays.

import { colorBackgroundDefault } from '@ellucian/react-design-system/core/styles/tokens';

export const brandColors = {
    // ─── Brand ─────────────────────────────────────────────────────────
    primary: '#501D83',          // FL Poly: Poly Purple
    primaryDark: '#2E1A4A',      // FL Poly: Python Plum (hover/active)
    primaryLight: '#B095DE',     // FL Poly: Pixel Purple (subtle accents)

    secondary: '#009FDF',        // FL Poly: Cyber Blue
    secondaryDark: '#006BA3',    // FL Poly: Cyber Blue Alt (text on white — 4.5:1+)

    // Optional accent if your institution has a third brand color.
    // Defaults to the secondary's lighter tint.
    accent: '#B095DE',

    // ─── Neutrals ───────────────────────────────────────────────────────
    neutralLight: '#A7B4C3',     // FL Poly: Tech Slate (subtle borders, muted icons)
    neutralDark: '#586066',      // FL Poly: Graphite Gray

    // ─── Surfaces ───────────────────────────────────────────────────────
    surface: '#FFFFFF',          // card / panel background
    surfaceMuted: '#F5F5F7',     // hover / row striping / subtle backgrounds
    surfaceDefault: colorBackgroundDefault, // Path DS default page background
    border: '#E2E5E9',           // subtle divider / border

    // ─── Text ───────────────────────────────────────────────────────────
    textPrimary: '#1A1A1A',      // body text on light surfaces
    textSecondary: '#586066',    // meta / secondary text
    textMuted: '#A7B4C3',        // placeholder / disabled-looking text
    textInverse: '#FFFFFF',      // text on dark / brand-colored backgrounds

    // ─── Semantic ───────────────────────────────────────────────────────
    success: '#1E7E34',
    warning: '#B45309',
    danger: '#B91C1C',
    info: '#1D4ED8',

    // ─── Focus & utility ────────────────────────────────────────────────
    focusRing: '#009FDF',        // WCAG 2.4.7 visible focus — usually = secondary

    white: '#FFFFFF',
    black: '#000000',
};

// Adobe Typekit kit ID for the institutional brand font. Read by
// `useTypekitFont()` (src/hooks/useTypekitFont.js). Replace per
// institution; set to '' if you don't use Typekit.
export const fontLoader = {
    typekitKitId: 'yld8vhe', // FL Poly: "New Science"
};

// Asset URLs — institutions should host their own.
export const assets = {
    logoHorizontal: '/assets/logo-horizontal.svg',
    logoStacked: '/assets/logo-stacked.svg',
    favicon: '/assets/favicon.svg',
};
