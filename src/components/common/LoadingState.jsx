// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Inline-styled — no withStyles. Matches FL Poly's canvas-teachers
// LoadingState exactly. Use for any "we are fetching" placeholder.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CircularProgress, Typography } from '@ellucian/react-design-system/core';

const LoadingState = ({ label }) => {
    const intl = useIntl();
    const text =
        label || intl.formatMessage({ id: 'common.loading', defaultMessage: 'Loading…' });
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: 24,
            }}
            role="status"
            aria-live="polite"
        >
            <CircularProgress aria-hidden="true" />
            <Typography variant="body2" align="center" style={{ marginTop: 12 }}>
                {text}
            </Typography>
        </div>
    );
};

LoadingState.propTypes = {
    label: PropTypes.string,
};

export default LoadingState;
