// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — minimum-viable greeting card.
//
// Mirrors FL Poly's exp-canvas-teachers pattern (line-for-line):
//   * function component, classes injected via withStyles HOC
//   * <div className={classes.root}> outer wrapper (NOT <Card>)
//   * IconSprite at the top so Path icons render inside
//   * useUserInfo() hook for the signed-in user's name
//   * No react-intl yet — literal strings (add withIntl later)
//   * No font loaders yet — relies on browser defaults

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Typography } from '@ellucian/react-design-system/core';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useUserInfo } from '@ellucian/experience-extension-utils';

const styles = () => ({
    root: {
        padding: spacing30,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    greeting: {
        marginBottom: spacing20,
    },
});

function HelloUserCard({ classes }) {
    const userInfo = useUserInfo() || {};
    const firstName = userInfo.firstName || 'there';

    return (
        <div className={classes.root}>
            <IconSprite />
            <Typography variant="h6" className={classes.greeting}>
                Hello, {firstName}!
            </Typography>
            <Typography variant="body2">
                Welcome to the community Experience extension template.
            </Typography>
        </div>
    );
}

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelloUserCard);
