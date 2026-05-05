// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — minimum-viable card.
//
// Demonstrates the smallest set of patterns every Experience card uses:
//   * useUserInfo / useExtensionControl from the SDK
//   * withStyles HOC + Path tokens for layout/spacing
//   * IconSprite for Path icons (required once per card)
//   * useTypekitFont + useMaterialIconFonts for branded fonts
//   * react-intl for all user-facing strings
//
// HOC composition follows the FL Poly canonical order:
//   withStyles(styles)(withIntl(Card))   — withStyles outermost.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Card, CardContent, Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useExtensionControl, useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useResolvedTheme } from '../../utils/branding/theme';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
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
    body: {
        marginBottom: spacing30,
    },
});

const HelloUserCard = ({ classes }) => {
    const intl = useIntl();
    const userInfo = useUserInfo() || {};
    const { palette } = useResolvedTheme();
    const { setLoadingStatus } = useExtensionControl();

    useTypekitFont();
    useMaterialIconFonts();

    useEffect(() => {
        setLoadingStatus(false);
    }, [setLoadingStatus]);

    return (
        <Card className={classes.root}>
            <IconSprite />
            <CardContent>
                <header className={classes.header}>
                    <Icon name="waving_hand" size={28} style={{ color: palette.primary }} />
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
};

HelloUserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(HelloUserCard));
