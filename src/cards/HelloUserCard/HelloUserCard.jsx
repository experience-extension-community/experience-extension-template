// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — INCREMENTAL BUILD-UP, STEP 1.
//
// Plain "Hello, World!" with `withStyles` + `useUserInfo` only.
// No withIntl, no IconSprite, no font hooks, no design tokens.
//
// Diagnostic: prove that withStyles + a single SDK hook works in the
// live SDK shell. If this loads, we add things back one at a time:
//   2. + useIntl + withIntl
//   3. + useTypekitFont
//   4. + useMaterialIconFonts
//   5. + IconSprite
//   6. + design tokens
// Test after each. Whichever step breaks identifies the culprit.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Typography } from '@ellucian/react-design-system/core';
import { useUserInfo } from '@ellucian/experience-extension-utils';

const styles = () => ({
    root: {
        padding: 16,
    },
});

function HelloUserCard({ classes }) {
    const userInfo = useUserInfo() || {};
    const firstName = userInfo.firstName || 'there';
    return (
        <div className={classes.root}>
            <Typography variant="h6">Hello, {firstName}!</Typography>
        </div>
    );
}

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelloUserCard);
