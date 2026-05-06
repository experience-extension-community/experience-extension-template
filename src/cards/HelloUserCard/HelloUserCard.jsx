// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — DIAGNOSTIC STEP 1a.
//
// Plain "Hello, World!" with `withStyles` ONLY. No useUserInfo, no
// hooks of any kind, no withIntl, no IconSprite, no font hooks.
//
// Step 1 (withStyles + useUserInfo) crashed. Bisecting which of
// the two is the culprit.
//   * If THIS loads:  useUserInfo is the problem.
//   * If THIS crashes: withStyles is the problem.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Typography } from '@ellucian/react-design-system/core';

const styles = () => ({
    root: {
        padding: 16,
    },
});

function HelloUserCard({ classes }) {
    return (
        <div className={classes.root}>
            <Typography variant="h6">Hello, World!</Typography>
        </div>
    );
}

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelloUserCard);
