// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Material Symbols Outlined glyph helper. The CSS is loaded by
// `loadMaterialSymbolsCSS` (in ./loadMaterialSymbols.js) — this file
// only provides the inline-style helper used by the <Icon> component.

export const ICON_FONT_FAMILY = 'Material Symbols Outlined';

/**
 * Inline-style props for rendering a Material Symbols Outlined glyph.
 *
 * @param {object} options
 * @param {number} [options.size=24]
 * @param {number} [options.weight=400]
 * @param {0|1}    [options.fill=0]
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
