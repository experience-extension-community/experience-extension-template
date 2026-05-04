// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Icon system: Material Symbols Outlined.
//
// We standardize on Material Symbols Outlined (instead of the Path icon
// library) because it offers a much wider, more current selection and
// supports variable axes (FILL, weight, grade, optical size).
//
// The font is loaded once per dashboard via `loadIconFont()`. Components
// render an icon by passing a glyph name — e.g. <Icon name="school" /> —
// where `name` is any value listed at https://fonts.google.com/icons.

const MATERIAL_SYMBOLS_HREF =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap';

const STYLESHEET_ID = 'eec-material-symbols-outlined';

export const ICON_FONT_FAMILY = 'Material Symbols Outlined';

/**
 * Inject the Material Symbols Outlined stylesheet into the document head
 * if it isn't already present. Safe to call multiple times — the
 * stylesheet ID guard prevents duplicate links.
 */
export const loadIconFont = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLESHEET_ID)) return;

  const link = document.createElement('link');
  link.id = STYLESHEET_ID;
  link.rel = 'stylesheet';
  link.href = MATERIAL_SYMBOLS_HREF;
  document.head.appendChild(link);
};

/**
 * Returns inline-style props for rendering a Material Symbols Outlined
 * glyph inside any text-rendering element.
 *
 * @param {object} options
 * @param {number} [options.size=24]
 * @param {number} [options.weight=400]
 * @param {0|1}   [options.fill=0]
 * @param {number} [options.grade=0]
 */
export const iconStyle = ({ size = 24, weight = 400, fill = 0, grade = 0 } = {}) => ({
  fontFamily: ICON_FONT_FAMILY,
  fontSize: `${size}px`,
  lineHeight: 1,
  display: 'inline-block',
  verticalAlign: 'middle',
  fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${size}`,
});
