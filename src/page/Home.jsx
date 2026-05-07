// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Home — landing hub for the extension page. Linked from PageLinkCard.
// Three navigation tiles, one per sub-page (/hooks, /terms, /links).
// Page title comes from setPageTitle — no redundant heading rendered.

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import {
    spacing20,
    spacing40,
    spacing50,
} from '@ellucian/react-design-system/core/styles/tokens';
import { usePageControl } from '@ellucian/experience-extension-utils';

import { brandColors, BRAND_FONT_STACK } from '../utils/branding/brandColors';

const styles = () => ({
    root: {
        padding: spacing50,
        maxWidth: 960,
        margin: '0 auto',
        fontFamily: BRAND_FONT_STACK,
    },
    intro: {
        marginBottom: spacing50,
        color: brandColors.textSecondary,
        fontSize: '0.9375rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: spacing40,
    },
    tile: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
        padding: spacing40,
        borderRadius: 8,
        backgroundColor: brandColors.surface,
        border: `1px solid ${brandColors.border}`,
        textDecoration: 'none',
        color: 'inherit',
        transition:
            'border-color 120ms ease-out, transform 120ms ease-out, box-shadow 120ms ease-out',
        '&:hover': {
            borderColor: brandColors.primary,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 2,
        },
    },
    icon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '2rem',
        lineHeight: 1,
        color: brandColors.primary,
    },
    tileTitle: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '1.125rem',
        fontWeight: 600,
        color: brandColors.textPrimary,
    },
    tileDescription: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.875rem',
        color: brandColors.textSecondary,
        lineHeight: 1.5,
    },
});

const tiles = [
    {
        to: '/hooks',
        icon: 'data_object',
        title: 'Hooks & properties',
        description: 'Inspect every SDK hook and the props passed to this page.',
    },
    {
        to: '/terms',
        icon: 'event',
        title: 'Active terms',
        description: 'Full list of academic periods from the Data Connect pipeline.',
    },
    {
        to: '/links',
        icon: 'link',
        title: 'Configured links',
        description: 'A page-sized view of categorized links.',
    },
];

const Home = (props) => {
    const { classes } = props;
    const { setPageTitle } = usePageControl() || {};

    if (typeof setPageTitle === 'function') {
        setPageTitle('Extension page');
    }

    return (
        <Box className={classes.root}>
            <Typography className={classes.intro}>
                Pick a section to explore.
            </Typography>
            <Box className={classes.grid}>
                {tiles.map((t) => (
                    <Link key={t.to} to={t.to} className={classes.tile}>
                        <span aria-hidden="true" className={classes.icon}>
                            {t.icon}
                        </span>
                        <Typography className={classes.tileTitle}>{t.title}</Typography>
                        <Typography className={classes.tileDescription}>
                            {t.description}
                        </Typography>
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Home, styles, { name: 'PageHome' });
