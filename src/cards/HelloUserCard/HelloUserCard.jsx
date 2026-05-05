// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — minimum-viable card.
//
// Demonstrates the smallest set of patterns every Experience card uses,
// matching FL Poly's exp-account-details-custom pattern exactly:
//   * `classes` injected via withStyles, read from props
//   * SDK hooks used inside the card body (useUserInfo, useExtensionControl)
//   * useTypekitFont() loads the brand stylesheet on mount
//   * react-intl's useIntl() for messages
//   * brandColors literal hex values in the styles function
//   * Spacing from Path DS tokens (spacing10, spacing20, ...)
//
// HOC composition: withStyles(styles)(withIntl(Card)) — withStyles
// outermost, matching the canonical FL Poly export pattern.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Card, CardContent, Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useExtensionControl, useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { brandColors } from '../../utils/branding/brandColors';
import Icon from '../../components/Icon';

const styles = () => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing20,
        marginBottom: spacing20,
    },
    icon: {
        color: brandColors.polyPurple,
    },
    body: {
        marginBottom: spacing30,
    },
});

function HelloUserCard(props) {
    const { classes } = props;
    const intl = useIntl();
    const userInfo = useUserInfo() || {};
    const { setLoadingStatus } = useExtensionControl();

    useTypekitFont();

    useEffect(() => {
        setLoadingStatus(false);
    }, [setLoadingStatus]);

    return (
        <Card className={classes.root}>
            <link rel="stylesheet" href="https://use.typekit.net/yld8vhe.css" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=block"
            />
            <IconSprite />
            <CardContent>
                <header className={classes.header}>
                    <Icon name="waving_hand" size={28} className={classes.icon} />
                    <Typography variant="h6">
                        {intl.formatMessage(
                            {
                                id: 'card.helloUser.title',
                                defaultMessage: 'Hello, {firstName}',
                            },
                            { firstName: userInfo.firstName || 'there' },
                        )}
                    </Typography>
                </header>
                <Typography variant="body1" className={classes.body}>
                    {intl.formatMessage({
                        id: 'card.helloUser.subtitle',
                        defaultMessage: 'Welcome to the community Experience extension template.',
                    })}
                </Typography>
            </CardContent>
        </Card>
    );
}

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(HelloUserCard));
