// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { CircularProgress } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';

const styles = () => ({
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
});

const LoadingStateBase = ({ classes, label }) => {
    const intl = useIntl();
    const text =
        label || intl.formatMessage({ id: 'common.loading', defaultMessage: 'Loading…' });

    return (
        <div className={classes.root} role="status" aria-live="polite">
            <CircularProgress aria-hidden="true" />
            <span className={classes.label}>{text}</span>
        </div>
    );
};

LoadingStateBase.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string,
};

LoadingStateBase.defaultProps = {
    label: undefined,
};

export const LoadingState = withStyles(styles)(LoadingStateBase);
