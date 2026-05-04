// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { makeStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';

import { Icon } from '../../Icon';
import { EthosError } from '../../../utils/ethos';
import { useResolvedTheme } from '../../../utils/branding/theme';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: spacing40,
        gap: spacing20,
    },
}));

export const ErrorState = ({ error, onRetry, fallbackMessage }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { palette } = useResolvedTheme();

    let message = fallbackMessage;
    if (error instanceof EthosError) {
        const { key, fallback } = error.userMessage;
        message = intl.formatMessage({ id: key, defaultMessage: fallback });
    } else if (!message) {
        message = intl.formatMessage({
            id: 'common.error',
            defaultMessage: 'Something went wrong.',
        });
    }

    const retryLabel = intl.formatMessage({
        id: 'common.tryAgain',
        defaultMessage: 'Try again',
    });

    return (
        <div className={classes.root} role="alert">
            <Icon name="error" size={32} fill={1} label="Error" style={{ color: palette.danger }} />
            <Typography variant="body1">{message}</Typography>
            {onRetry ? (
                <Button color="secondary" onClick={onRetry}>
                    {retryLabel}
                </Button>
            ) : null}
        </div>
    );
};

ErrorState.propTypes = {
    error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.object]),
    onRetry: PropTypes.func,
    fallbackMessage: PropTypes.string,
};

ErrorState.defaultProps = {
    error: undefined,
    onRetry: undefined,
    fallbackMessage: undefined,
};
