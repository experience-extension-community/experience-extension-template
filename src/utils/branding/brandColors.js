// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Flat brand-colors object. Mirrors the pattern used by every Florida
// Poly extension's `src/styles/brandColors.js`. Imports the SINGLE
// EDS token FL Poly uses (`colorBackgroundDefault`) and otherwise
// holds literal hex values verified against the Florida Polytechnic
// brand manual (June 2024) for WCAG 2.2 AA contrast.
//
// To re-skin this extension for your institution: replace the hex
// values below. Do NOT change keys — components reference them.

import { colorBackgroundDefault } from '@ellucian/react-design-system/core/styles/tokens';

export const brandColors = {
    // Primary brand colors
    polyPurple: '#501D83',
    polyPurpleDark: '#2E1A4A',     // Python Plum
    polyPurpleLight: '#B095DE',    // Pixel Purple
    cyberBlue: '#009FDF',
    cyberBlueAlt: '#006BA3',       // higher-contrast variant for text on white

    // Neutrals
    techSlate: '#A7B4C3',
    graphiteGray: '#586066',
    lightGray: colorBackgroundDefault,
    borderGray: '#E2E5E9',
    white: '#FFFFFF',
    black: '#000000',

    // Semantic
    success: '#1E7E34',
    warning: '#B45309',
    danger: '#B91C1C',
    info: '#1D4ED8',

    // Surfaces
    surface: '#FFFFFF',
    surfaceMuted: '#F5F5F7',
    textPrimary: '#1A1A1A',
    textSecondary: '#586066',

    // Focus indicator (WCAG 2.4.7 / 2.4.13)
    focusRing: '#009FDF',
};

// Adobe Typekit kit ID for the institutional brand font. Read by
// `useTypekitFont`. Override per-environment via TYPEKIT_KIT_ID.
export const fontLoader = {
    typekitKitId: 'yld8vhe',
};

// Asset URLs — institutions should host their own.
export const assets = {
    logoHorizontal: '/assets/logo-horizontal.svg',
    logoStacked: '/assets/logo-stacked.svg',
    favicon: '/assets/favicon.svg',
};
