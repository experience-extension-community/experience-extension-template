// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// RefreshIndicator — small inline "Last updated <time>" element,
// rendered at the bottom of a card or page that uses
// useCache-backed data.
//
// Renders nothing when `lastUpdated` is null. Active-refresh and
// error states are surfaced separately (and more prominently) by
// `RefreshStatusMessage` at the top of the surface.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';

import { brandColors } from '../../utils/branding/brandColors';

const styles = () => ({
    root: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '0.75rem',
        color: brandColors.textSecondary,
        lineHeight: 1.4,
        fontVariantNumeric: 'tabular-nums',
    },
});

const formatTime = (ts, intl) => {
    if (!ts) return '';
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return '';
    return intl.formatTime(d, { hour: 'numeric', minute: '2-digit' });
};

const RefreshIndicator = ({ classes, lastUpdated = null }) => {
    const intl = useIntl();
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
    lastUpdated: PropTypes.number,
};

export default withStyles(RefreshIndicator, styles, { name: 'RefreshIndicator' });
