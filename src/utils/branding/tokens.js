// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Institution-specific visual identity tokens.
//
// To adapt this extension for your institution:
//   1. Replace VALUES in this file with your institution's brand values.
//   2. DO NOT change the keys or shape — components depend on them.
//   3. Verify text/background combinations meet WCAG 2.2 AA contrast.
//
// The defaults below reflect Florida Polytechnic University's brand.
// They serve as a worked example; nothing in any other file should
// reference these specific colors directly. All colors flow through
// `useResolvedTheme` from `./theme.js`.

export const palette = {
  // Primary brand colors
  primary: '#501D83', // Poly Purple
  primaryDark: '#2E1A4A', // Python Plum
  primaryLight: '#B095DE', // Pixel Purple

  // Secondary / accent
  accent: '#009FDF', // Cyber Blue

  // Neutrals
  neutralLight: '#A7B4C3', // Tech Slate
  neutralDark: '#586066', // Graphite Gray

  // Semantic — meet WCAG 2.2 AA against `surface` (#FFFFFF).
  success: '#1E7E34',
  warning: '#B45309',
  danger: '#B91C1C',
  info: '#1D4ED8',

  // Surfaces
  surface: '#FFFFFF',
  surfaceMuted: '#F5F5F7',
  textPrimary: '#1A1A1A',
  textSecondary: '#586066',
};

export const typography = {
  // Brand font is loaded by `./fontLoader.js` (Adobe Typekit by default).
  // The fallback chain ensures graceful degradation if the brand font fails.
  fontFamily:
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMono: '"JetBrains Mono", Menlo, Monaco, Consolas, monospace',

  weights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },

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

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  pill: '999px',
};

export const elevation = {
  card: '0 1px 3px rgba(0,0,0,0.08)',
  raised: '0 4px 12px rgba(0,0,0,0.10)',
  floating: '0 8px 24px rgba(0,0,0,0.14)',
};

export const focus = {
  // High-contrast, visible-against-any-background focus ring.
  // Required by WCAG 2.2 SC 2.4.7 and 2.4.13.
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

// Adobe Typekit kit ID for the institutional brand font.
// Override per-environment via the TYPEKIT_KIT_ID env var.
export const fontLoader = {
  typekitKitId: 'yld8vhe', // Florida Poly: "New Science"
};
