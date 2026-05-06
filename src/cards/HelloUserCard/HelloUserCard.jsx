// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — minimum-viable greeting card.
//
// Mirrors FL Poly's exp-account-details-custom and exp-canvas-teachers
// pattern exactly:
//   * function component, classes injected via withStyles HOC
//   * <div className={classes.root}> outer wrapper (NOT <Card>)
//   * IconSprite at the top so Path icons render inside
//   * useUserInfo() hook for the signed-in user's name
//   * react-intl for messages (useIntl + withIntl HOC)
//   * HOC composition: withStyles(styles)(withIntl(Card))

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Typography } from '@ellucian/react-design-system/core';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';

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
    const intl = useIntl();
    const userInfo = useUserInfo() || {};
    const firstName = userInfo.firstName || 'there';

    useTypekitFont();
    useMaterialIconFonts();

    return (
        <div className={classes.root}>
            <IconSprite />
            <Typography variant="h6" className={classes.greeting}>
                {intl.formatMessage(
                    { id: 'card.helloUser.title', defaultMessage: 'Hello, {firstName}' },
                    { firstName },
                )}
            </Typography>
            <Typography variant="body2">
                {intl.formatMessage({
                    id: 'card.helloUser.subtitle',
                    defaultMessage: 'Welcome to the community Experience extension template.',
                })}
            </Typography>
        </div>
    );
}

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(HelloUserCard));
