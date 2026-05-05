// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Status banner for refresh actions — shows "Refreshing…", success
// chime, or failure with retry. Designed to sit above a data list
// without consuming a full row.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20 } from '@ellucian/react-design-system/core/styles/tokens';

import { useResolvedTheme } from '../../../utils/branding/theme';

const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing10} ${spacing20}`,
    borderRadius: 4,
};

const RefreshDataStatusMessage = ({ status, onRetry }) => {
    const intl = useIntl();
    const { palette } = useResolvedTheme();

    if (status === 'idle') return null;

    if (status === 'refreshing') {
        return (
            <div
                style={{ ...baseStyle, backgroundColor: palette.surfaceMuted }}
                role="status"
                aria-live="polite"
            >
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
            <div
                style={{
                    ...baseStyle,
                    backgroundColor: palette.surfaceMuted,
                    color: palette.danger,
                }}
                role="alert"
            >
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
export { RefreshDataStatusMessage };
