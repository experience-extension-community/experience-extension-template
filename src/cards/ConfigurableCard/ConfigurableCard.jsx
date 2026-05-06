// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — categorized links, dashboard-tile UX with
// collapsible category sections.
//
// Design references (modern dashboard nav patterns):
//   * Linear & Vercel sidebar: tight rows (32px), no row dividers,
//     hover bg as the only row affordance, headings are quiet
//   * Notion sidebar: 11px uppercase muted-gray category headers
//   * Stripe Dashboard: chevron at very low opacity, full on hover
//   * Tailwind Catalyst Sidebar: 14px link text, 11px section headers
//
// What this card adopts from those:
//   * No 1px borders between link rows — whitespace + hover bg
//   * 32px link row (down from 44px in earlier iteration)
//   * Category heading is small + muted (11px, textSecondary color),
//     uppercase, NOT brand-primary — heading earns no extra weight,
//     it's a quiet wayfinder
//   * Hover on heading shifts text to brand primary (the hover IS
//     the brand moment)
//   * Chevron on each link: opacity 0.4 by default, 1.0 + 2px right
//     nudge on hover
//   * Sections separated by 16px gap, no underlines
//
// EDS 8.x: withStyles(Component, styles, { name }) + withIntl outermost.

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import {
    spacing20,
    spacing30,
    spacing40,
    spacing50,
} from '@ellucian/react-design-system/core/styles/tokens';
import { useExtensionControl, useCardInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { brandColors } from '../../utils/branding/brandColors';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';

const BRAND_FONT_STACK =
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing40,                       // 16px between sections
        padding: `${spacing30} ${spacing30}`, // 8px around — tight container padding
        overflowY: 'auto',
        fontFamily: BRAND_FONT_STACK,
        backgroundColor: brandColors.surface,

        '&::-webkit-scrollbar': { width: 6 },
        '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: brandColors.border,
            borderRadius: 3,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: brandColors.neutralLight,
        },
    },
    section: {
        '&[open] $expandIcon': {
            transform: 'rotate(180deg)',
        },
    },
    categoryHeading: {
        listStyle: 'none',
        cursor: 'pointer',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: spacing30,
        padding: `${spacing20} ${spacing30}`,    // 4px / 8px — quiet
        marginBottom: 2,
        borderRadius: 4,
        transition: 'background-color 120ms ease-out',
        '&::-webkit-details-marker': { display: 'none' },
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
        },
        '&:hover $categoryName': {
            color: brandColors.primary,
        },
        '&:hover $expandIcon': {
            color: brandColors.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
    },
    categoryName: {
        flex: '1 1 auto',
        color: brandColors.textSecondary,        // muted, not brand
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.6875rem',                   // 11px
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        lineHeight: 1.4,
        transition: 'color 120ms ease-out',
    },
    categoryCount: {
        flex: '0 0 auto',
        color: brandColors.textMuted,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.625rem',                    // 10px
        fontWeight: 500,
        fontVariantNumeric: 'tabular-nums',      // even number widths
    },
    expandIcon: {
        flex: '0 0 auto',
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
        color: brandColors.textMuted,
        transition: 'transform 220ms ease-out, color 120ms ease-out',
        userSelect: 'none',
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    listItem: {
        margin: 0,
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing30,
        padding: `${spacing20} ${spacing30}`,   // 4px / 8px — same as heading
        minHeight: 32,                          // tighter than 44px
        color: brandColors.textPrimary,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.875rem',                   // 14px
        fontWeight: 500,
        lineHeight: 1.4,
        textDecoration: 'none',
        borderRadius: 4,
        transition:
            'background-color 120ms ease-out, color 120ms ease-out',
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
            color: brandColors.primary,
        },
        '&:hover $chevron': {
            color: brandColors.primary,
            opacity: 1,
            transform: 'translateX(2px)',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: -2,
            backgroundColor: brandColors.surfaceMuted,
        },
    },
    label: {
        flex: '1 1 auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    chevron: {
        flex: '0 0 auto',
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
        color: brandColors.neutralLight,
        opacity: 0.4,                            // very quiet by default
        transition:
            'color 120ms ease-out, opacity 120ms ease-out, transform 120ms ease-out',
        userSelect: 'none',
    },
    empty: {
        margin: 'auto',
        padding: spacing50,
        textAlign: 'center',
        color: brandColors.textSecondary,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.875rem',
        fontStyle: 'italic',
    },
});

const isUsableLink = (l) => l && typeof l.url === 'string' && l.url.length > 0;

const ConfigurableCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl() || {};

    useTypekitFont();
    useMaterialIconFonts();

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [setLoadingStatus]);

    const categories = useMemo(() => {
        const raw = cardInfo.configuration?.customConfiguration?.categories;
        if (!Array.isArray(raw)) return [];
        return raw
            .map((c) => ({
                id: c.id,
                name: c.name || '',
                links: Array.isArray(c.links) ? c.links.filter(isUsableLink) : [],
            }))
            .filter((c) => c.links.length > 0);
    }, [cardInfo.configuration]);

    const totalLinks = useMemo(
        () => categories.reduce((n, c) => n + c.links.length, 0),
        [categories],
    );

    if (totalLinks === 0) {
        return (
            <Box className={classes.root}>
                <Typography variant="body2" className={classes.empty}>
                    {intl.formatMessage({
                        id: 'card.configurable.empty',
                        defaultMessage:
                            'No links configured. Open the card configuration to add some.',
                    })}
                </Typography>
            </Box>
        );
    }

    return (
        <Box className={classes.root}>
            {categories.map((cat, catIdx) => (
                <details
                    key={cat.id || catIdx}
                    className={classes.section}
                    open
                >
                    <summary className={classes.categoryHeading}>
                        <span className={classes.categoryName}>
                            {cat.name || intl.formatMessage({
                                id: 'card.configurable.unnamedCategory',
                                defaultMessage: 'Links',
                            })}
                        </span>
                        <span className={classes.categoryCount}>
                            {cat.links.length}
                        </span>
                        <span aria-hidden="true" className={classes.expandIcon}>
                            expand_more
                        </span>
                    </summary>
                    <ul className={classes.list}>
                        {cat.links.map((link, idx) => (
                            <li
                                key={link.id || `${link.url}-${idx}`}
                                className={classes.listItem}
                            >
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.link}
                                >
                                    <span className={classes.label}>
                                        {link.label || link.url}
                                    </span>
                                    <span aria-hidden="true" className={classes.chevron}>
                                        chevron_right
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </details>
            ))}
        </Box>
    );
};

ConfigurableCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(ConfigurableCard, styles, { name: 'ConfigurableCard' }));
