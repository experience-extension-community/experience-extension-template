// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Status banner for refresh actions — shows "Refreshing…", success
// chime, or failure with retry. Designed to sit above a data list
// without consuming a full row.

import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing10, spacing20 } from '@ellucian/react-design-system/core/styles/tokens';

import { useResolvedTheme } from '../../../utils/branding/theme';

const styles = () => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${spacing10} ${spacing20}`,
        borderRadius: 4,
    },
});

const RefreshDataStatusMessageBase = ({ classes, status, onRetry }) => {
    const intl = useIntl();
    const { palette } = useResolvedTheme();

    if (status === 'idle') return null;

    if (status === 'refreshing') {
        return (
            <div
                className={classes.root}
                role="status"
                aria-live="polite"
                style={{ backgroundColor: palette.surfaceMuted }}
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
                className={classes.root}
                role="alert"
                style={{ backgroundColor: palette.surfaceMuted, color: palette.danger }}
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

RefreshDataStatusMessageBase.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.oneOf(['idle', 'refreshing', 'error']).isRequired,
    onRetry: PropTypes.func,
};

RefreshDataStatusMessageBase.defaultProps = {
    onRetry: undefined,
};

export const RefreshDataStatusMessage = withStyles(styles)(RefreshDataStatusMessageBase);
