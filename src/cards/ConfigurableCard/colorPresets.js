// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Color preset registry for ConfigurableCard.
//
// Each preset is a stable key that maps to a value sourced from
// brandColors. Storing keys (not hex) means re-skinning the
// extension by editing brandColors.js automatically updates every
// configured card instance — institutional control stays in one place.

import { brandColors } from '../../utils/branding/brandColors';

export const COLOR_PRESETS = [
    { key: 'muted', labelId: 'card.configurable.color.muted', defaultLabel: 'Muted gray' },
    { key: 'dark', labelId: 'card.configurable.color.dark', defaultLabel: 'Dark text' },
    { key: 'primary', labelId: 'card.configurable.color.primary', defaultLabel: 'Brand primary' },
    { key: 'secondary', labelId: 'card.configurable.color.secondary', defaultLabel: 'Brand secondary' },
    { key: 'accent', labelId: 'card.configurable.color.accent', defaultLabel: 'Brand accent' },
];

export const resolveColor = (key) => {
    switch (key) {
        case 'dark':
            return brandColors.textPrimary;
        case 'primary':
            return brandColors.primary;
        case 'secondary':
            return brandColors.secondary;
        case 'accent':
            return brandColors.accent;
        case 'muted':
        default:
            return brandColors.textSecondary;
    }
};

export const DEFAULT_COLORS = {
    category: 'muted',
    link: 'dark',
    hover: 'primary',
};

export const normalizeColors = (raw) => ({
    category: COLOR_PRESETS.some((p) => p.key === raw?.category)
        ? raw.category
        : DEFAULT_COLORS.category,
    link: COLOR_PRESETS.some((p) => p.key === raw?.link)
        ? raw.link
        : DEFAULT_COLORS.link,
    hover: COLOR_PRESETS.some((p) => p.key === raw?.hover)
        ? raw.hover
        : DEFAULT_COLORS.hover,
});
