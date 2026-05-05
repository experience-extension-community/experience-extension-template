// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// withStyles-wrapped per FL Poly's canvas-teachers EmptyState pattern.
// Centered icon glyph + title + optional description. Inline icon
// rendering avoids importing the Icon component just for this.

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';

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
        color: '#586066', // Graphite Gray (FL Poly brand neutral)
        marginBottom: 12,
    },
    description: {
        marginTop: 8,
    },
});

const EmptyState = ({ classes, title, description, icon = 'inbox' }) => (
    <div className={classes.container}>
        <span aria-hidden="true" className={classes.icon}>
            {icon}
        </span>
        <Typography variant="h6">{title}</Typography>
        {description ? (
            <Typography variant="body2" className={classes.description}>
                {description}
            </Typography>
        ) : null}
    </div>
);

EmptyState.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
};

export default withStyles(styles)(EmptyState);
