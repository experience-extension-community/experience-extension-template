// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — admin-configured categorized links.
//
// Renders categories as section headings + tight list of links. Uses
// the institution's brand font (loaded via useTypekitFont) and
// Material Symbols Outlined icons (loaded via useMaterialIconFonts)
// for chevron affordances on each link.
//
// Persistence (read side):
//   cardInfo.configuration.customConfiguration.categories
// (SDK lifts customConfiguration.client.categories to top-level on read)
//
// EDS 8.x: withStyles(Component, styles, { name }) + withIntl outermost.

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { useExtensionControl, useCardInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { brandColors } from '../../utils/branding/brandColors';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';

const BRAND_FONT_STACK =
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const styles = () => ({
    root: {
        padding: spacing20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing30,
        overflowY: 'auto',
        fontFamily: BRAND_FONT_STACK,
        backgroundColor: brandColors.surface,
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    categoryHeading: {
        color: brandColors.primary,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        margin: 0,
        marginBottom: 4,
        paddingBottom: 6,
        borderBottom: `2px solid ${brandColors.secondary}`,
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
        justifyContent: 'space-between',
        gap: spacing10,
        padding: `${spacing10} ${spacing10}`,
        color: brandColors.secondaryDark,
        textDecoration: 'none',
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.9375rem',
        fontWeight: 500,
        lineHeight: 1.4,
        borderRadius: 4,
        borderBottom: `1px solid ${brandColors.border}`,
        transition: 'background-color 140ms ease-out, color 140ms ease-out, transform 140ms ease-out',
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
            color: brandColors.primary,
            transform: 'translateX(2px)',
        },
        '&:hover $chevron': {
            opacity: 1,
            transform: 'translateX(2px)',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 2,
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
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1.125rem',
        lineHeight: 1,
        opacity: 0.4,
        transition: 'opacity 140ms ease-out, transform 140ms ease-out',
        flex: '0 0 auto',
    },
    empty: {
        color: brandColors.textSecondary,
        fontFamily: BRAND_FONT_STACK,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: spacing30,
    },
});

const isUsableLink = (l) => l && typeof l.url === 'string' && l.url.length > 0;

const ConfigurableCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl() || {};

    // Load brand font + Material Symbols icon font.
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
