// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — DIAGNOSTIC STEP 2.
//
// Mirrors FL Poly's exp-account-details-custom/src/cards/AccountDetails.jsx
// shape EXACTLY. Differences from step 1a (which crashed):
//
//   * Use <Box> from EDS (not <div>)
//   * Use `function Card(props)` + `const { classes } = props`
//     (not destructured in arg list)
//   * `styles` defined AFTER the component function, AFTER propTypes
//   * Add withIntl HOC — exported as withStyles(styles)(withIntl(Card))
//   * Use useIntl() for the greeting message
//
// Hypothesis: EDS's withStyles HOC needs to wrap a class component
// (which withIntl produces); wrapping a plain function component
// breaks. FL Poly always uses withStyles(...)(withIntl(...)) — never
// withStyles directly on a function component.

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import { spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

function HelloUserCard(props) {
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
}

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = () => ({
    root: {
        padding: spacing20,
    },
});

export default withStyles(styles)(withIntl(HelloUserCard));
