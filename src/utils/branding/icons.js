// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Material Symbols Outlined glyph helper. The stylesheet is loaded
// inline by the `withIntl` HOC (see ReactIntlProviderWrapper.jsx) so
// no programmatic loader is needed.
//
// Used by the <Icon> component in src/components/Icon.jsx.

export const ICON_FONT_FAMILY = 'Material Symbols Outlined';

export const iconStyle = ({ size = 24, weight = 400, fill = 0, grade = 0 } = {}) => ({
    fontFamily: ICON_FONT_FAMILY,
    fontSize: `${size}px`,
    lineHeight: 1,
    display: 'inline-block',
    verticalAlign: 'middle',
    fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${size}`,
});
