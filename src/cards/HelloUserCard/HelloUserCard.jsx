// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — minimum-viable showcase card.
//
// EDS 8.x: withStyles(Component, styles, { name }) + withIntl outermost.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { brandColors } from '../../utils/branding/brandColors';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
import DebugHooksDialog from '../../components/common/DebugHooksDialog';

const styles = () => ({
    root: {
        position: 'relative',
        padding: spacing20,
        height: '100%',
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

const HelloUserCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const { firstName } = useUserInfo() || {};
    const [debugOpen, setDebugOpen] = useState(false);

    useMaterialIconFonts();

    return (
        <Box className={classes.root}>
            <Typography variant="h6">
                {intl.formatMessage(
                    { id: 'hello.greeting', defaultMessage: 'Hello, {firstName}!' },
                    { firstName: firstName || 'there' },
                )}
            </Typography>
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
