// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// RefreshIndicator — small inline status element used alongside
// data fetched via useCache + stale-while-revalidate hooks.
//
// Three rendered states (in priority order):
//   1. refreshError=true → "Refresh failed — showing cached data."
//      (typically flashed for ~5s by the consuming hook).
//   2. isRefreshing=true → "Refreshing…" with a spinning icon.
//   3. lastUpdated set    → "Last updated 3:45 PM".
//   4. nothing to show    → renders null.
//
// Mirrors the FL Poly studentlife extension's LastUpdated
// component pattern but with i18n + brandColors integration.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing10 } from '@ellucian/react-design-system/core/styles/tokens';

import { brandColors } from '../../utils/branding/brandColors';

const styles = () => ({
    root: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing10,
        fontSize: '0.75rem',
        color: brandColors.textSecondary,
        lineHeight: 1.4,
        fontVariantNumeric: 'tabular-nums',
    },
    error: {
        color: brandColors.danger,
    },
    icon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '0.875rem',
        lineHeight: 1,
    },
    iconSpinning: {
        animation: '$spin 800ms linear infinite',
    },
    '@keyframes spin': {
        to: { transform: 'rotate(360deg)' },
    },
});

const formatTime = (ts, intl) => {
    if (!ts) return '';
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return '';
    return intl.formatTime(d, { hour: 'numeric', minute: '2-digit' });
};

const RefreshIndicator = ({
    classes,
    isRefreshing = false,
    refreshError = false,
    lastUpdated = null,
}) => {
    const intl = useIntl();

    if (refreshError) {
        return (
            <span
                className={`${classes.root} ${classes.error}`}
                role="status"
                aria-live="polite"
            >
                <span aria-hidden="true" className={classes.icon}>
                    error
                </span>
                {intl.formatMessage({
                    id: 'common.refreshFailed',
                    defaultMessage: 'Refresh failed — showing cached data.',
                })}
            </span>
        );
    }

    if (isRefreshing) {
        return (
            <span className={classes.root} role="status" aria-live="polite">
                <span
                    aria-hidden="true"
                    className={`${classes.icon} ${classes.iconSpinning}`}
                >
                    refresh
                </span>
                {intl.formatMessage({
                    id: 'common.refreshing',
                    defaultMessage: 'Refreshing…',
                })}
            </span>
        );
    }

    if (!lastUpdated) return null;

    return (
        <span className={classes.root}>
            {intl.formatMessage(
                {
                    id: 'common.lastUpdated',
                    defaultMessage: 'Last updated {time}',
                },
                { time: formatTime(lastUpdated, intl) },
            )}
        </span>
    );
};

RefreshIndicator.propTypes = {
    classes: PropTypes.object.isRequired,
    isRefreshing: PropTypes.bool,
    refreshError: PropTypes.bool,
    lastUpdated: PropTypes.number,
};

export default withStyles(RefreshIndicator, styles, { name: 'RefreshIndicator' });
