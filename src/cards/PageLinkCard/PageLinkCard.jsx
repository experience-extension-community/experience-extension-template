// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// PageLinkCard — card-to-page navigation.
//
// Renders one link row per extension sub-page, each wired to
// navigateToPage(). Lets a user jump straight to /hooks, /terms,
// or /links from the dashboard rather than landing on the hub
// first. The hub at "/" remains accessible via the back link on
// each sub-page.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import {
    spacing10,
    spacing20,
    spacing30,
} from '@ellucian/react-design-system/core/styles/tokens';
import { useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { brandColors } from '../../utils/branding/brandColors';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';

const PAGES = [
    {
        route: '/hooks',
        icon: 'data_object',
        labelId: 'card.pageLink.hooks',
        defaultLabel: 'Hooks & properties',
    },
    {
        route: '/terms',
        icon: 'event',
        labelId: 'card.pageLink.terms',
        defaultLabel: 'Active terms',
    },
    {
        route: '/links',
        icon: 'link',
        labelId: 'card.pageLink.links',
        defaultLabel: 'Configured links',
    },
];

const styles = () => ({
    root: {
        padding: spacing20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
    },
    description: {
        color: brandColors.textSecondary,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
        marginTop: spacing10,
    },
    linkRow: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing20,
        padding: `${spacing20} ${spacing30}`,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        color: brandColors.textPrimary,
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        transition: 'background-color 120ms ease-out, color 120ms ease-out',
        '&:hover:not(:disabled)': {
            backgroundColor: brandColors.surfaceMuted,
            color: brandColors.primary,
            '& $arrow': {
                opacity: 1,
                transform: 'translateX(2px)',
            },
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
        '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },
    icon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1.125rem',
        lineHeight: 1,
        color: brandColors.primary,
    },
    label: {
        flex: '1 1 auto',
        fontWeight: 500,
    },
    arrow: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
        color: brandColors.textMuted,
        opacity: 0.4,
        transition: 'opacity 120ms ease-out, transform 120ms ease-out',
    },
});

const PageLinkCard = (props) => {
    const { classes, cardControl: { navigateToPage } = {} } = props;
    const intl = useIntl();
    const { setLoadingStatus } = useExtensionControl() || {};

    useMaterialIconFonts();

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [setLoadingStatus]);

    const goto = (route) => {
        if (typeof navigateToPage === 'function') {
            navigateToPage({ route });
        }
    };

    const disabled = typeof navigateToPage !== 'function';

    return (
        <Box className={classes.root}>
            <Typography variant="h6">
                {intl.formatMessage({
                    id: 'card.pageLink.title',
                    defaultMessage: 'Extension page',
                })}
            </Typography>
            <Typography variant="body2" className={classes.description}>
                {intl.formatMessage({
                    id: 'card.pageLink.description',
                    defaultMessage: 'Open a section of the extension page.',
                })}
            </Typography>
            <Box className={classes.list}>
                {PAGES.map((page) => (
                    <button
                        key={page.route}
                        type="button"
                        className={classes.linkRow}
                        onClick={() => goto(page.route)}
                        disabled={disabled}
                    >
                        <span aria-hidden="true" className={classes.icon}>
                            {page.icon}
                        </span>
                        <span className={classes.label}>
                            {intl.formatMessage({
                                id: page.labelId,
                                defaultMessage: page.defaultLabel,
                            })}
                        </span>
                        <span aria-hidden="true" className={classes.arrow}>
                            arrow_forward
                        </span>
                    </button>
                ))}
            </Box>
        </Box>
    );
};

PageLinkCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object,
};

export default withIntl(withStyles(PageLinkCard, styles, { name: 'PageLinkCard' }));
