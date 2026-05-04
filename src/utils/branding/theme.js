// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { useThemeInfo } from '@ellucian/experience-extension-utils';
import { path, palette, typography, focus, motion, assets } from './tokens';

/**
 * Compose the three branding layers into a single theme object:
 *
 *   1. Path Design System tokens   (baseline)
 *   2. Institutional overlay       (this fork's brand)
 *   3. Live dashboard theme        (current tenant — wins for
 *      primary/secondary/CTA only)
 *
 * Components consume `useResolvedTheme()` only. Never import `path`
 * or `palette` directly into a component — that breaks the override
 * chain.
 */
export const useResolvedTheme = () => {
    const dashboardTheme = useThemeInfo() || {};

    return {
        // Path baseline — already imported once, available for use.
        path,
        // Institutional overlay, with dashboard theme winning where it defines a value.
        palette: {
            ...palette,
            primary: dashboardTheme.primaryColor || palette.primary,
            secondary: dashboardTheme.secondaryColor || palette.accent,
            ctaActive: dashboardTheme.ctaColors?.active || palette.primaryDark,
            ctaBase: dashboardTheme.ctaColors?.base || palette.primary,
            ctaHover: dashboardTheme.ctaColors?.hover || palette.primaryDark,
            ctaTint: dashboardTheme.ctaColors?.tint || palette.primaryLight,
        },
        typography,
        focus,
        motion,
        assets,
    };
};
