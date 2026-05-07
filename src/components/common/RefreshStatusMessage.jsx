// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// RefreshStatusMessage — transient inline banner shown at the top
// of a card or page during a background refresh. Three variants:
//
//   type="loading"  — spinner + "Refreshing data…". Shown for the
//                     duration of an in-flight refresh.
//   type="success"  — checkmark + brief "Data refreshed" flash
//                     (consumers usually clear it after ~3s).
//   type="error"    — error icon + message + optional retry button.
//                     Consumers usually clear it after ~5s, leaving
//                     the previously-cached data visible.
//
// Pattern adapted from FloridaPoly/exp-events-studentlife's
// RefreshDataStatusMessage.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { CircularProgress } from '@ellucian/react-design-system/core';
import { spacing10, spacing20 } from '@ellucian/react-design-system/core/styles/tokens';

import { brandColors } from '../../utils/branding/brandColors';

const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing10,
        padding: `${spacing10} ${spacing20}`,
        fontSize: '0.8125rem',
        lineHeight: 1.4,
        borderRadius: 4,
        textAlign: 'center',
    },
    loading: {
        color: brandColors.secondaryDark,
        backgroundColor: `${brandColors.secondary}11`,
    },
    success: {
        color: brandColors.success,
        backgroundColor: `${brandColors.success}14`,
    },
    error: {
        color: brandColors.danger,
        backgroundColor: `${brandColors.danger}14`,
    },
    icon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
    },
    retry: {
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        padding: 0,
        marginLeft: spacing10,
    },
});

const RefreshStatusMessage = ({
    classes,
    type,
    message,
    onRetry = null,
    retryLabel = 'Retry',
}) => {
    return (
        <div
            className={`${classes.root} ${classes[type] || ''}`}
            role="status"
            aria-live="polite"
        >
            {type === 'loading' && (
                <CircularProgress size={14} style={{ color: 'currentColor' }} />
            )}
            {type === 'success' && (
                <span aria-hidden="true" className={classes.icon}>
                    check_circle
                </span>
            )}
            {type === 'error' && (
                <span aria-hidden="true" className={classes.icon}>
                    error
                </span>
            )}
            <span>
                {message}
                {type === 'error' && onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className={classes.retry}
                    >
                        {retryLabel}
                    </button>
                )}
            </span>
        </div>
    );
};

RefreshStatusMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['loading', 'success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
    onRetry: PropTypes.func,
    retryLabel: PropTypes.string,
};

export default withStyles(RefreshStatusMessage, styles, {
    name: 'RefreshStatusMessage',
});
