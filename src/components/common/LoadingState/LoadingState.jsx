// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CircularProgress } from '@ellucian/react-design-system/core';
import { spacing20, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';

const rootStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing40,
    gap: spacing20,
};

const labelStyle = {
    marginTop: spacing20,
};

const LoadingState = ({ label }) => {
    const intl = useIntl();
    const text =
        label || intl.formatMessage({ id: 'common.loading', defaultMessage: 'Loading…' });

    return (
        <div style={rootStyle} role="status" aria-live="polite">
            <CircularProgress aria-hidden="true" />
            <span style={labelStyle}>{text}</span>
        </div>
    );
};

LoadingState.propTypes = {
    label: PropTypes.string,
};

export default LoadingState;
export { LoadingState };
