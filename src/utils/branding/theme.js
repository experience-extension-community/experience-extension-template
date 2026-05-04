// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { useThemeInfo } from '@ellucian/experience-extension-utils';
import {
  palette,
  typography,
  spacing,
  radius,
  elevation,
  focus,
  motion,
  assets,
} from './tokens';

/**
 * Compose static institutional tokens with the live dashboard theme.
 *
 * Resolution rule: dashboard theme wins for properties it defines
 * (primary, secondary, CTA colors). Static tokens fill the gaps
 * (typography, spacing, radius, elevation, focus, motion, semantic colors).
 *
 * The practical effect: an extension built by Florida Poly will adopt
 * Stetson University's dashboard primary color when running in Stetson's
 * tenant — without code changes.
 */
export const useResolvedTheme = () => {
  const dashboardTheme = useThemeInfo() || {};

  return {
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
    spacing,
    radius,
    elevation,
    focus,
    motion,
    assets,
  };
};
