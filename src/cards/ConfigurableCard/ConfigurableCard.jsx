// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — categorized links, dashboard-tile UX with
// collapsible category sections.

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import {
    spacing10,
    spacing20,
    spacing30,
    spacing40,
    spacing50,
} from '@ellucian/react-design-system/core/styles/tokens';
import { useExtensionControl, useCardInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { brandColors, BRAND_FONT_STACK } from '../../utils/branding/brandColors';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
import { normalizeColors, resolveColor } from './colorPresets';

const styles = () => ({
    root: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: BRAND_FONT_STACK,
        backgroundColor: brandColors.surface,
    },
    scrollArea: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing40,
        padding: `${spacing30} ${spacing30}`,
        overflowY: 'auto',
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
        padding: `${spacing20} ${spacing30}`,
        marginBottom: 2,
        borderRadius: 4,
        transition: 'background-color 120ms ease-out',
        '&::-webkit-details-marker': { display: 'none' },
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
        },
        '&:hover $categoryName': {
            color: 'var(--cc-hover-color)',
        },
        '&:hover $expandIcon': {
            color: 'var(--cc-hover-color)',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
    },
    categoryName: {
        flex: '1 1 auto',
        color: 'var(--cc-category-color)',
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.6875rem',
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
        fontSize: '0.625rem',
        fontWeight: 500,
        fontVariantNumeric: 'tabular-nums',
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
        padding: `${spacing10} ${spacing40}`,
        minHeight: 28,
        color: 'var(--cc-link-color)',
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.4,
        textDecoration: 'none',
        borderRadius: 4,
        transition:
            'background-color 120ms ease-out, color 120ms ease-out',
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
            color: 'var(--cc-hover-color)',
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

    const colorStyle = useMemo(() => {
        const colors = normalizeColors(
            cardInfo.configuration?.customConfiguration?.colors,
        );
        return {
            '--cc-category-color': resolveColor(colors.category),
            '--cc-link-color': resolveColor(colors.link),
            '--cc-hover-color': resolveColor(colors.hover),
        };
    }, [cardInfo.configuration]);

    return (
        <Box className={classes.root} style={colorStyle}>
            <Box className={classes.scrollArea}>
                {totalLinks === 0 ? (
                    <Typography variant="body2" className={classes.empty}>
                        {intl.formatMessage({
                            id: 'card.configurable.empty',
                            defaultMessage:
                                'No links configured. Open the card configuration to add some.',
                        })}
                    </Typography>
                ) : (
                    categories.map((cat, catIdx) => (
                        <details
                            key={cat.id || catIdx}
                            className={classes.section}
                            open
                        >
                            <summary className={classes.categoryHeading}>
                                <span className={classes.categoryName}>
                                    {cat.name ||
                                        intl.formatMessage({
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
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ))
                )}
            </Box>
        </Box>
    );
};

ConfigurableCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(ConfigurableCard, styles, { name: 'ConfigurableCard' }));
