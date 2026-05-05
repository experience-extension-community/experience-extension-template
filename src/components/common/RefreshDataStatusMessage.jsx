// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Inline-styled — no withStyles. Matches FL Poly's canvas-teachers
// RefreshDataStatusMessage pattern.
//
// Renders a small banner above a data list when a refresh is
// in progress or has failed. Returns null for the 'idle' state.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, CircularProgress, Typography } from '@ellucian/react-design-system/core';

const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    borderRadius: 4,
    backgroundColor: '#F5F5F7',
    gap: 8,
};

const RefreshDataStatusMessage = ({ status, onRetry }) => {
    const intl = useIntl();

    if (status === 'idle') return null;

    if (status === 'refreshing') {
        return (
            <div style={baseStyle} role="status" aria-live="polite">
                <CircularProgress size={16} aria-hidden="true" />
                <Typography variant="body2">
                    {intl.formatMessage({
                        id: 'common.refreshing',
                        defaultMessage: 'Refreshing data…',
                    })}
                </Typography>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div style={{ ...baseStyle, color: '#B91C1C' }} role="alert">
                <Typography variant="body2">
                    {intl.formatMessage({
                        id: 'common.refreshFailed',
                        defaultMessage: 'Refresh failed.',
                    })}
                </Typography>
                {onRetry ? (
                    <Button size="small" color="secondary" onClick={onRetry}>
                        {intl.formatMessage({
                            id: 'common.tryAgain',
                            defaultMessage: 'Try again',
                        })}
                    </Button>
                ) : null}
            </div>
        );
    }

    return null;
};

RefreshDataStatusMessage.propTypes = {
    status: PropTypes.oneOf(['idle', 'refreshing', 'error']).isRequired,
    onRetry: PropTypes.func,
};

export default RefreshDataStatusMessage;
