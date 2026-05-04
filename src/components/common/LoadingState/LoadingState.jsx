// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CircularProgress } from '@ellucian/react-design-system/core';
import { makeStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing40,
        gap: spacing20,
    },
    label: {
        marginTop: spacing20,
    },
}));

export const LoadingState = ({ label }) => {
    const classes = useStyles();
    const intl = useIntl();
    const text =
        label ||
        intl.formatMessage({ id: 'common.loading', defaultMessage: 'Loading…' });

    return (
        <div className={classes.root} role="status" aria-live="polite">
            <CircularProgress aria-hidden="true" />
            <span className={classes.label}>{text}</span>
        </div>
    );
};

LoadingState.propTypes = {
    label: PropTypes.string,
};

LoadingState.defaultProps = {
    label: undefined,
};
