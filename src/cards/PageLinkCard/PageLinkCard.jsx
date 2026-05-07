// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Sample Pages — multi-section page launcher.
//
// Renders one link row per extension sub-page, each wired to
// navigateToPage(). Lets a user jump straight to /hooks, /terms,
// or /links from the dashboard. The hub at "/" remains accessible
// via the back link on each sub-page.
//
// cardType remains 'PageLinkCard' for backwards compatibility.

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
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
import DebugTrigger from '../../components/common/DebugTrigger';

const BRAND_FONT_STACK =
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

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
        position: 'relative',
        padding: spacing30,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
        fontFamily: BRAND_FONT_STACK,
        backgroundColor: brandColors.surface,
    },
    description: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.8125rem',
        color: brandColors.textSecondary,
        lineHeight: 1.5,
        margin: 0,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: spacing10,
    },
    linkRow: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing30,
        padding: `${spacing20} ${spacing30}`,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        color: brandColors.textPrimary,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.875rem',
        transition:
            'background-color 120ms ease-out, color 120ms ease-out',
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
        transition:
            'opacity 120ms ease-out, transform 120ms ease-out',
    },
});

const PageLinkCard = (props) => {
    const { classes, cardControl: { navigateToPage } = {} } = props;
    const intl = useIntl();
    const { setLoadingStatus } = useExtensionControl() || {};

    useTypekitFont();
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
            <Typography className={classes.description}>
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
            <DebugTrigger cardProps={props} />
        </Box>
    );
};

PageLinkCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object,
};

export default withIntl(withStyles(PageLinkCard, styles, { name: 'PageLinkCard' }));
