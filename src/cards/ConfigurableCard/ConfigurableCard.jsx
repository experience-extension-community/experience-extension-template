// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — admin-configured categorized links.
//
// Reads `cardInfo.configuration.customConfiguration.categories` and
// renders each as a section with brand-colored heading + plain
// hyperlink rows. Designed to read well at any density (5 to ~50
// links) — the card scrolls when content exceeds its tile height.
//
// No redundant title (SDK card chrome supplies "Configurable links"
// already from extension.js's `displayCardType`).
//
// Colors come from `brandColors` (src/utils/branding/brandColors.js).
// Replace those values to re-skin per institution; this card needs
// no other edits.
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

const styles = () => ({
    root: {
        padding: spacing20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
        overflowY: 'auto',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
    },
    categoryHeading: {
        color: brandColors.primary,
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: 0,
        paddingBottom: 4,
        borderBottom: `2px solid ${brandColors.secondary}`,
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    listItem: {
        margin: 0,
    },
    link: {
        display: 'block',
        padding: `6px ${spacing10}`,
        color: brandColors.secondaryDark,
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.4,
        borderRadius: 3,
        transition: 'background-color 120ms ease-out, color 120ms ease-out',
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
            color: brandColors.primary,
            textDecoration: 'underline',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 2,
        },
    },
    empty: {
        color: brandColors.textSecondary,
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

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [setLoadingStatus]);

    // SDK lifts customConfiguration.client.categories to top-level on read.
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
                        defaultMessage: 'No links configured. Open the card configuration to add some.',
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
                                    {link.label || link.url}
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
