// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// LinksPage — page-sized view of categorized links.
//
// Tries to read live config from the launching card's
// customConfiguration.categories. PageLinkCard (which opens this
// page) does not currently expose a customConfiguration, so the
// page falls back to a static demo dataset. To wire to real data:
//   1. Replicate ConfigurableCard's customConfiguration on
//      PageLinkCard (the page is scoped to PageLinkCard's cardInfo),
//      OR
//   2. Add a `pageRoute` to ConfigurableCard so the configurable
//      card itself opens this page — then `useCardInfo()` returns
//      the configurable links directly.

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import {
    spacing20,
    spacing30,
    spacing40,
    spacing50,
} from '@ellucian/react-design-system/core/styles/tokens';
import { usePageControl, useCardInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../i18n/ReactIntlProviderWrapper';
import { brandColors } from '../utils/branding/brandColors';

const BRAND_FONT_STACK =
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const SAMPLE_CATEGORIES = [
    {
        id: 'student-life',
        name: 'Student Life',
        links: [
            { id: 's1', label: 'Housing portal', url: 'https://example.edu/housing' },
            { id: 's2', label: 'Dining services', url: 'https://example.edu/dining' },
            { id: 's3', label: 'Health & wellness', url: 'https://example.edu/health' },
        ],
    },
    {
        id: 'academics',
        name: 'Academics',
        links: [
            { id: 'a1', label: 'Course catalog', url: 'https://example.edu/catalog' },
            { id: 'a2', label: 'Library', url: 'https://example.edu/library' },
            { id: 'a3', label: 'Tutoring center', url: 'https://example.edu/tutoring' },
        ],
    },
    {
        id: 'support',
        name: 'Support',
        links: [
            { id: 'p1', label: 'IT help desk', url: 'https://example.edu/it' },
            { id: 'p2', label: 'Financial aid', url: 'https://example.edu/finaid' },
        ],
    },
];

const styles = () => ({
    root: {
        padding: spacing50,
        maxWidth: 1080,
        margin: '0 auto',
        fontFamily: BRAND_FONT_STACK,
    },
    backLink: {
        display: 'inline-block',
        marginBottom: spacing40,
        color: brandColors.primary,
        textDecoration: 'none',
        fontSize: '0.875rem',
        '&:hover': { textDecoration: 'underline' },
    },
    subtitle: {
        marginBottom: spacing40,
        color: brandColors.textSecondary,
        fontSize: '0.9375rem',
    },
    note: {
        marginBottom: spacing40,
        padding: spacing30,
        borderRadius: 4,
        backgroundColor: brandColors.surfaceMuted,
        color: brandColors.textSecondary,
        fontSize: '0.8125rem',
        lineHeight: 1.5,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: spacing40,
    },
    section: {
        padding: spacing40,
        borderRadius: 8,
        backgroundColor: brandColors.surface,
        border: `1px solid ${brandColors.border}`,
    },
    sectionHeading: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.6875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: brandColors.textSecondary,
        marginBottom: spacing30,
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
    },
    link: {
        display: 'block',
        padding: `${spacing20} ${spacing30}`,
        borderRadius: 4,
        color: brandColors.textPrimary,
        textDecoration: 'none',
        fontSize: '0.875rem',
        transition: 'background-color 120ms ease-out, color 120ms ease-out',
        '&:hover': {
            backgroundColor: brandColors.surfaceMuted,
            color: brandColors.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 2,
        },
    },
});

const isUsableLink = (l) => l && typeof l.url === 'string' && l.url.length > 0;

const LinksPage = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const { setPageTitle } = usePageControl() || {};
    const cardInfo = useCardInfo() || {};

    if (typeof setPageTitle === 'function') {
        setPageTitle('Configured links');
    }

    const liveCategories = useMemo(() => {
        const raw = cardInfo.configuration?.customConfiguration?.categories;
        if (!Array.isArray(raw)) return null;
        const filtered = raw
            .map((c) => ({
                id: c.id,
                name: c.name || '',
                links: Array.isArray(c.links) ? c.links.filter(isUsableLink) : [],
            }))
            .filter((c) => c.links.length > 0);
        return filtered.length > 0 ? filtered : null;
    }, [cardInfo.configuration]);

    const usingDemoData = !liveCategories;
    const categories = liveCategories || SAMPLE_CATEGORIES;

    return (
        <Box className={classes.root}>
            <Link to="/" className={classes.backLink}>
                ← Back to overview
            </Link>
            <Typography className={classes.subtitle}>
                {intl.formatMessage({
                    id: 'page.links.subtitle',
                    defaultMessage:
                        'A categorized directory rendered as a full-width page.',
                })}
            </Typography>

            {usingDemoData && (
                <Box className={classes.note}>
                    Showing sample data. Wire to live configuration by adding a
                    customConfiguration to PageLinkCard, or by giving
                    ConfigurableCard its own pageRoute that targets this page.
                </Box>
            )}

            <Box className={classes.grid}>
                {categories.map((cat) => (
                    <Box key={cat.id} className={classes.section}>
                        <Typography className={classes.sectionHeading}>
                            {cat.name}
                        </Typography>
                        <ul className={classes.list}>
                            {cat.links.map((link) => (
                                <li key={link.id}>
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
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

LinksPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(LinksPage, styles, { name: 'LinksPage' }));
