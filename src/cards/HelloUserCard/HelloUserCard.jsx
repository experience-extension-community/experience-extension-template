// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — DIAGNOSTIC STEP 3.
//
// Found the breaking change. EDS 8.x changed the withStyles signature:
//
//   EDS 7.x (FL Poly's stack):
//       withStyles(styles, options)(Component)
//
//   EDS 8.x (our stack, and Ellucian's sdk-samples):
//       withStyles(Component, styles, { name: 'CardName' })
//
// Source: Ellucian's official sdk-samples — same SDK 8.1.2 / React 19 /
// Node 24 stack as ours. See PropsCard.jsx and LoadingStateCard.jsx in
// https://github.com/ellucian-developer/experience-sdk-sample-extensions
//
// HOC composition order in 8.x: withIntl(withStyles(...)) — withIntl
// OUTERMOST (the inverse of 7.x).
//
// All FL Poly references (exp-account-details-custom,
// custom-simple-links, exp-canvas-teachers, exp-events-studentlife,
// experience-ethos-examples) are on EDS 7.x — their withStyles call
// pattern doesn't apply to our 8.x stack.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const styles = () => ({
    root: {
        padding: spacing20,
    },
});

const HelloUserCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const { firstName } = useUserInfo() || {};

    return (
        <Box className={classes.root}>
            <Typography variant="h6">
                {intl.formatMessage(
                    { id: 'hello.greeting', defaultMessage: 'Hello, {firstName}!' },
                    { firstName: firstName || 'there' },
                )}
            </Typography>
        </Box>
    );
};

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

// EDS 8.x signature: withStyles(Component, styles, { name }).
// HOC composition: withIntl outermost (matches Ellucian sdk-samples'
// LoadingStateCard pattern).
export default withIntl(withStyles(HelloUserCard, styles, { name: 'HelloUserCard' }));
