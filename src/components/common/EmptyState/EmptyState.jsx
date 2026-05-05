// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';

import { Icon } from '../../Icon';
import { useResolvedTheme } from '../../../utils/branding/theme';

const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: spacing40,
        gap: spacing20,
    },
});

const EmptyStateBase = ({ classes, title, description, icon }) => {
    const { palette } = useResolvedTheme();

    return (
        <div className={classes.root}>
            <Icon name={icon} size={32} style={{ color: palette.neutralDark }} />
            <Typography variant="h6">{title}</Typography>
            {description ? <Typography variant="body2">{description}</Typography> : null}
        </div>
    );
};

EmptyStateBase.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
};

EmptyStateBase.defaultProps = {
    description: undefined,
    icon: 'inbox',
};

export const EmptyState = withStyles(styles)(EmptyStateBase);
