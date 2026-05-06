// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — categorized links optimised for dashboard tile UX.
//
// Design intent:
//   * Looks at home next to other Path-styled cards on a dashboard
//   * Scannable in 1-2 seconds (clear category hierarchy)
//   * Easy to click — full-row hit targets, ~44px tall
//   * Restrained brand presence — primary color only on category
//     headings + on hover. Links default to readable secondaryDark.
//   * Scrolls cleanly for many links / many categories
//
// Persistence (read side):
//   cardInfo.configuration.customConfiguration.categories
// (SDK lifts customConfiguration.client.categories on read)
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
        gap: spacing50,
        padding: spacing40,
        overflowY: 'auto',
        fontFamily: BRAND_FONT_STACK,
        backgroundColor: brandColors.surface,

        // Tasteful native scrollbar tinting (only Webkit).
        '&::-webkit-scrollbar': { width: 8 },
        '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: brandColors.border,
            borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: brandColors.neutralLight,
        },
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
    },
    categoryHeading: {
        margin: 0,
        marginBottom: spacing30,
        color: brandColors.primary,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.8125rem',     // 13px
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        lineHeight: 1.3,
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    listItem: {
        margin: 0,
        borderBottom: `1px solid ${brandColors.border}`,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing30,
        padding: `${spacing30} ${spacing20}`,    // 8px / 4px
        minHeight: 44,                            // WCAG 2.5.5 target size
        color: brandColors.secondaryDark,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.9375rem',                    // 15px
        fontWeight: 500,
        lineHeight: 1.35,
        textDecoration: 'none',
        borderRadius: 3,
        transition:
            'background-color 120ms ease-out, color 120ms ease-out',
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
            color: brandColors.primary,
        },
        '&:hover $chevron': {
            color: brandColors.primary,
            opacity: 1,
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
        fontSize: '1.125rem',          // 18px
        lineHeight: 1,
        color: brandColors.neutralLight,
        opacity: 0.7,
        transition: 'color 120ms ease-out, opacity 120ms ease-out',
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
                <section key={cat.id || catIdx} className={classes.section}>
                    {cat.name ? (
                        <h3 className={classes.categoryHeading}>{cat.name}</h3>
                    ) : null}
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
                </section>
            ))}
        </Box>
    );
};

ConfigurableCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(ConfigurableCard, styles, { name: 'ConfigurableCard' }));
