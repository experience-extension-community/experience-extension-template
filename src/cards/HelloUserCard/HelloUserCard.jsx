// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HelloUserCard — minimum-viable card.
//
// Demonstrates the smallest set of patterns every Experience card uses:
//   * useUserInfo / useThemeInfo / useExtensionControl from the SDK
//   * useStyles via makeStyles from EDS
//   * IconSprite for Path icons
//   * useTypekitFont + useMaterialIconFonts for branded fonts
//   * react-intl for all user-facing strings
//
// No data fetching. No configuration. ~80 lines. Use as a copy/paste
// starting point for a new card.

import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
    Card,
    CardContent,
    Typography,
} from '@ellucian/react-design-system/core';
import { makeStyles } from '@ellucian/react-design-system/core/styles';
import {
    spacing20,
    spacing30,
} from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import {
    useUserInfo,
    useExtensionControl,
} from '@ellucian/experience-extension-utils';

import { useResolvedTheme } from '../../utils/branding/theme';
import { useTypekitFont, useMaterialIconFonts } from '../../hooks';
import { Icon } from '../../components';
import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const useStyles = makeStyles(() => ({
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
}));

const HelloUserCard = () => {
    const classes = useStyles();
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

export default withIntl(HelloUserCard);
