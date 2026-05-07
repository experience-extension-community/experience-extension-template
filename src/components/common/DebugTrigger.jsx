// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// DebugTrigger — small "data_object" icon button that opens a
// DebugHooksDialog showing the host card's props + every
// card-context SDK hook value.
//
// Renders an absolutely-positioned button at bottom-right of the
// nearest positioned ancestor. Cards using this component MUST
// have `position: relative` on their root element. Owns the
// open/closed state internally so callers don't have to.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';

import { brandColors } from '../../utils/branding/brandColors';
import DebugHooksDialog from './DebugHooksDialog';

const styles = () => ({
    button: {
        position: 'absolute',
        bottom: spacing20,
        right: spacing20,
        zIndex: 1,
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
    icon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
    },
});

const DebugTrigger = ({ classes, cardProps }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className={classes.button}
                onClick={() => setOpen(true)}
                aria-label="Show hooks and properties"
                title="Show hooks and properties"
            >
                <span aria-hidden="true" className={classes.icon}>
                    data_object
                </span>
            </button>
            {open && (
                <DebugHooksDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    cardProps={cardProps}
                />
            )}
        </>
    );
};

DebugTrigger.propTypes = {
    classes: PropTypes.object.isRequired,
    cardProps: PropTypes.object,
};

export default withStyles(DebugTrigger, styles, { name: 'DebugTrigger' });
