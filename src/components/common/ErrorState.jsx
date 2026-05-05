// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// withStyles-wrapped per FL Poly's canvas-teachers ErrorState pattern.
// Knows how to render an EthosError's translated user message; falls
// back to a generic message otherwise.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';

import { EthosError } from '../../utils/ethos';

const styles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 24,
        textAlign: 'center',
    },
    icon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: 32,
        color: '#B91C1C', // danger
        marginBottom: 12,
    },
    retry: {
        marginTop: 12,
    },
});

const ErrorState = ({ classes, error, onRetry, fallbackMessage }) => {
    const intl = useIntl();

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

    return (
        <div className={classes.container} role="alert">
            <span aria-label="Error" role="img" className={classes.icon}>
                error
            </span>
            <Typography variant="body1">{message}</Typography>
            {onRetry ? (
                <Button color="secondary" onClick={onRetry} className={classes.retry}>
                    {intl.formatMessage({ id: 'common.tryAgain', defaultMessage: 'Try again' })}
                </Button>
            ) : null}
        </div>
    );
};

ErrorState.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.object]),
    onRetry: PropTypes.func,
    fallbackMessage: PropTypes.string,
};

export default withStyles(styles)(ErrorState);
