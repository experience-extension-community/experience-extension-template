// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    spacing30,
    spacing40,
} from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import {
    useDashboardInfo,
    useExtensionControl,
    useExtensionInfo,
    useUserInfo,
} from '@ellucian/experience-extension-utils';

import { useResolvedTheme } from '../../utils/branding/theme';
import { useTypekitFont, useMaterialIconFonts } from '../../hooks';
import { Icon } from '../../components';

const styles = () => ({
    root: {
        padding: spacing40,
        maxWidth: 960,
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing30,
    },
    section: {
        marginTop: spacing40,
    },
});

const SamplePage = ({ classes }) => {
    const intl = useIntl();
    const { palette } = useResolvedTheme();
    const userInfo = useUserInfo() || {};
    const dashboardInfo = useDashboardInfo() || {};
    const extensionInfo = useExtensionInfo() || {};
    const { setPageTitle, setLoadingStatus } = useExtensionControl() || {};

    useTypekitFont();
    useMaterialIconFonts();

    useEffect(() => {
        if (typeof setPageTitle === 'function') {
            setPageTitle(
                intl.formatMessage({ id: 'page.sample.title', defaultMessage: 'Sample page' }),
            );
        }
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [intl, setPageTitle, setLoadingStatus]);

    return (
        <main className={classes.root}>
            <IconSprite />
            <header className={classes.header}>
                <Icon name="dashboard" size={32} style={{ color: palette.primary }} />
                <Typography variant="h4">
                    {intl.formatMessage({ id: 'page.sample.title', defaultMessage: 'Sample page' })}
                </Typography>
            </header>

            <Typography variant="body1" className={classes.section}>
                {intl.formatMessage({
                    id: 'page.sample.intro',
                    defaultMessage:
                        'This page exercises page-level SDK hooks. Replace it for your real use case.',
                })}
            </Typography>

            <section className={classes.section} aria-labelledby="page-context-heading">
                <Typography id="page-context-heading" variant="h6">
                    Context
                </Typography>
                <Typography variant="body2" style={{ color: palette.textSecondary }}>
                    User: {userInfo.firstName} {userInfo.lastName} ({userInfo.locale})
                </Typography>
                <Typography variant="body2" style={{ color: palette.textSecondary }}>
                    Dashboard: {dashboardInfo.name || dashboardInfo.dashboardId || '(unknown)'}
                </Typography>
                <Typography variant="body2" style={{ color: palette.textSecondary }}>
                    Extension: {extensionInfo.name || '(unknown)'}
                </Typography>
            </section>
        </main>
    );
};

SamplePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const Wrapped = withStyles(styles)(SamplePage);

export default Wrapped;
export { Wrapped as SamplePage };
