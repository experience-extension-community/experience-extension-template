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
    // ─── Brand ───────────────────────────────────────────────
    primary: '#501D83',          // FL Poly: Poly Purple
    primaryDark: '#2E1A4A',      // FL Poly: Python Plum (hover/active)
    primaryLight: '#B095DE',     // FL Poly: Pixel Purple (subtle accents)

    secondary: '#009FDF',        // FL Poly: Cyber Blue
    secondaryDark: '#006BA3',    // FL Poly: Cyber Blue Alt (text on white — 4.5:1+)

    // Optional accent if your institution has a third brand color.
    // Defaults to the secondary's lighter tint.
    accent: '#B095DE',

    // ─── Neutrals ─────────────────────────────────────────────
    neutralLight: '#A7B4C3',     // FL Poly: Tech Slate (subtle borders, muted icons)
    neutralDark: '#586066',      // FL Poly: Graphite Gray

    // ─── Surfaces ─────────────────────────────────────────────
    surface: '#FFFFFF',          // card / panel background
    surfaceMuted: '#F5F5F7',     // hover / row striping / subtle backgrounds
    surfaceDefault: colorBackgroundDefault, // Path DS default page background
    border: '#E2E5E9',           // subtle divider / border

    // ─── Text ──────────────────────────────────────────────────
    textPrimary: '#1A1A1A',      // body text on light surfaces
    textSecondary: '#586066',    // meta / secondary text
    textMuted: '#A7B4C3',        // placeholder / disabled-looking text
    textInverse: '#FFFFFF',      // text on dark / brand-colored backgrounds

    // ─── Semantic ─────────────────────────────────────────────
    success: '#1E7E34',
    warning: '#B45309',
    danger: '#B91C1C',
    info: '#1D4ED8',

    // ─── Focus & utility ────────────────────────────────────────────
    focusRing: '#009FDF',        // WCAG 2.4.7 visible focus — usually = secondary

    white: '#FFFFFF',
    black: '#000000',
};

// Brand font — single source of truth for the institution's web font.
//
// Adobe Typekit ("Adobe Fonts") is a font hosting service. A "kit" is
// a collection of fonts you've enabled in your Adobe account. Each
// kit has a unique ID; loading https://use.typekit.net/<kitId>.css
// registers the kit's @font-face rules, then your CSS
// `font-family: "<webFontName>"` actually applies the font.
//
// To re-skin this extension's typography:
//
//   1. Create your kit at https://fonts.adobe.com/ (add the fonts
//      you want to use).
//   2. From your kit's "Embed code" / "Web Project" settings, copy:
//        - the kit ID (the slug at the end of the use.typekit.net URL).
//        - the "web font name" Adobe shows for the primary font
//          (often kebab-case: "proxima-nova", "acumin-pro").
//   3. Paste them below.
//   4. (Optional) Adjust `fallbackStack` for the system fallbacks
//      that should kick in while the Typekit CSS is still loading
//      (or if it fails to load entirely).
//
// Set `kitId: ''` to disable Typekit entirely — components will fall
// back to the system font stack.
//
// See `docs/BRANDING.md` for a step-by-step walkthrough.
export const brandFont = {
    kitId: 'yld8vhe',                 // FL Poly: "New Science" kit
    webFontName: 'new-science',       // FL Poly: New Science web font name
    fallbackStack:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

// Composed font stack consumed by every card and page. Components
// import this directly:
//
//   import { BRAND_FONT_STACK } from '<...>/utils/branding/brandColors';
//   const styles = () => ({ root: { fontFamily: BRAND_FONT_STACK } });
export const BRAND_FONT_STACK = brandFont.webFontName
    ? `"${brandFont.webFontName}", ${brandFont.fallbackStack}`
    : brandFont.fallbackStack;

// Asset URLs — institutions should host their own.
export const assets = {
    logoHorizontal: '/assets/logo-horizontal.svg',
    logoStacked: '/assets/logo-stacked.svg',
    favicon: '/assets/favicon.svg',
};
