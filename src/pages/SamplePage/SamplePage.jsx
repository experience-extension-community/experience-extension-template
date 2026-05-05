// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Sample page. Wrapped only in withStyles — the IntlProvider is
// supplied by router.jsx so a useIntl() call here works.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Typography } from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import {
    useDashboardInfo,
    useExtensionControl,
    useExtensionInfo,
    useUserInfo,
} from '@ellucian/experience-extension-utils';

import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';
import { brandColors } from '../../utils/branding/brandColors';
import Icon from '../../components/Icon';

const styles = () => ({
    root: {
        padding: spacing30,
        maxWidth: 960,
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing30,
    },
    headerIcon: { color: brandColors.polyPurple },
    section: {
        marginTop: spacing30,
    },
    contextLine: { color: brandColors.textSecondary },
});

function SamplePage(props) {
    const { classes } = props;
    const intl = useIntl();
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
                <Icon name="dashboard" size={32} className={classes.headerIcon} />
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
                <Typography variant="body2" className={classes.contextLine}>
                    User: {userInfo.firstName} {userInfo.lastName} ({userInfo.locale})
                </Typography>
                <Typography variant="body2" className={classes.contextLine}>
                    Dashboard: {dashboardInfo.name || dashboardInfo.dashboardId || '(unknown)'}
                </Typography>
                <Typography variant="body2" className={classes.contextLine}>
                    Extension: {extensionInfo.name || '(unknown)'}
                </Typography>
            </section>
        </main>
    );
}

SamplePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SamplePage);
