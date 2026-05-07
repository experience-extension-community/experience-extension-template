// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// User Card — identity showcase.
//
// Renders a small user identity tile from useUserInfo(): avatar with
// initials, time-of-day greeting + first name, full name (if it
// differs from first+last), email, and a locale chip.
//
// EDS 8.x: withStyles(Component, styles, { name }) + withIntl outermost.

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import {
    spacing10,
    spacing20,
    spacing30,
} from '@ellucian/react-design-system/core/styles/tokens';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { brandColors } from '../../utils/branding/brandColors';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
import DebugHooksDialog from '../../components/common/DebugHooksDialog';

const BRAND_FONT_STACK =
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const styles = () => ({
    root: {
        position: 'relative',
        height: '100%',
        padding: spacing30,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
        fontFamily: BRAND_FONT_STACK,
        backgroundColor: brandColors.surface,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing30,
    },
    avatar: {
        flex: '0 0 auto',
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: brandColors.primary,
        color: brandColors.textInverse,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: BRAND_FONT_STACK,
        fontSize: '1.125rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        userSelect: 'none',
    },
    identity: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        minWidth: 0,
    },
    greeting: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.6875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: brandColors.textSecondary,
        lineHeight: 1.4,
    },
    name: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '1.25rem',
        fontWeight: 700,
        color: brandColors.textPrimary,
        lineHeight: 1.2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
    },
    fullName: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.875rem',
        color: brandColors.textSecondary,
    },
    email: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing10,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.8125rem',
        color: brandColors.textSecondary,
        textDecoration: 'none',
        wordBreak: 'break-all',
        transition: 'color 120ms ease-out',
        '&:hover': {
            color: brandColors.primary,
            textDecoration: 'underline',
        },
    },
    emailIcon: {
        flex: '0 0 auto',
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
        color: brandColors.textMuted,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing20,
        marginTop: spacing10,
    },
    chip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing10,
        padding: `2px ${spacing20}`,
        borderRadius: 999,
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        backgroundColor: brandColors.surfaceMuted,
        color: brandColors.textSecondary,
    },
    chipIcon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '0.875rem',
        lineHeight: 1,
    },
    debugButton: {
        position: 'absolute',
        bottom: spacing20,
        right: spacing20,
        width: 24,
        height: 24,
        padding: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: brandColors.textMuted,
        opacity: 0.3,
        transition:
            'opacity 120ms ease-out, color 120ms ease-out, background-color 120ms ease-out',
        '&:hover': {
            opacity: 1,
            color: brandColors.primary,
            backgroundColor: brandColors.surfaceMuted,
        },
        '&:focus-visible': {
            opacity: 1,
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
    },
    debugIcon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
    },
});

const computeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { id: 'hello.morning', defaultMessage: 'Good morning' };
    if (h < 18) return { id: 'hello.afternoon', defaultMessage: 'Good afternoon' };
    return { id: 'hello.evening', defaultMessage: 'Good evening' };
};

const HelloUserCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const userInfo = useUserInfo() || {};
    const { firstName, lastName, fullName, emailAddress, locale } = userInfo;
    const [debugOpen, setDebugOpen] = useState(false);

    useTypekitFont();
    useMaterialIconFonts();

    const greetingMsg = useMemo(computeGreeting, []);

    const initials = useMemo(() => {
        const a = firstName ? firstName[0] : '';
        const b = lastName ? lastName[0] : '';
        const both = (a + b).toUpperCase();
        return both || (a || b || '?').toUpperCase();
    }, [firstName, lastName]);

    const computedFull = [firstName, lastName].filter(Boolean).join(' ').trim();
    const showFullName = fullName && fullName.trim() && fullName.trim() !== computedFull;

    const displayName =
        firstName ||
        intl.formatMessage({ id: 'hello.fallback', defaultMessage: 'Welcome' });

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <div className={classes.avatar} aria-hidden="true">
                    {initials}
                </div>
                <div className={classes.identity}>
                    <Typography className={classes.greeting}>
                        {intl.formatMessage(greetingMsg)}
                    </Typography>
                    <Typography className={classes.name} title={displayName}>
                        {displayName}
                    </Typography>
                </div>
            </Box>

            {(showFullName || emailAddress || locale) && (
                <Box className={classes.body}>
                    {showFullName && (
                        <Typography className={classes.fullName}>
                            {fullName}
                        </Typography>
                    )}
                    {emailAddress && (
                        <a
                            href={`mailto:${emailAddress}`}
                            className={classes.email}
                            title={emailAddress}
                        >
                            <span aria-hidden="true" className={classes.emailIcon}>
                                mail
                            </span>
                            {emailAddress}
                        </a>
                    )}
                    {locale && (
                        <Box className={classes.chips}>
                            <span className={classes.chip}>
                                <span aria-hidden="true" className={classes.chipIcon}>
                                    language
                                </span>
                                {locale}
                            </span>
                        </Box>
                    )}
                </Box>
            )}

            <button
                type="button"
                className={classes.debugButton}
                onClick={() => setDebugOpen(true)}
                aria-label="Show hooks and properties"
                title="Show hooks and properties"
            >
                <span aria-hidden="true" className={classes.debugIcon}>
                    data_object
                </span>
            </button>
            {debugOpen && (
                <DebugHooksDialog
                    open={debugOpen}
                    onClose={() => setDebugOpen(false)}
                    cardProps={props}
                />
            )}
        </Box>
    );
};

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(HelloUserCard, styles, { name: 'HelloUserCard' }));
