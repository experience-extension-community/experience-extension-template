// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// SamplePage — minimal full-width page paired with PageLinkCard.
//
// Mirrors FL Poly's exp-events-studentlife page pattern: function
// component, classes from withStyles, hooks for SDK access, no
// react-intl. Uses plain HTML elements + EDS Typography.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Typography } from '@ellucian/react-design-system/core';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import {
    useDashboardInfo,
    useExtensionControl,
    useExtensionInfo,
    useUserInfo,
} from '@ellucian/experience-extension-utils';

const styles = () => ({
    root: {
        padding: spacing30,
        maxWidth: 960,
        margin: '0 auto',
    },
    section: {
        marginTop: spacing30,
    },
    contextLine: {
        color: '#5B5E65',
    },
});

function SamplePage({ classes }) {
    const userInfo = useUserInfo() || {};
    const dashboardInfo = useDashboardInfo() || {};
    const extensionInfo = useExtensionInfo() || {};
    const { setPageTitle, setLoadingStatus } = useExtensionControl() || {};

    useEffect(() => {
        if (typeof setPageTitle === 'function') {
            setPageTitle('Sample page');
        }
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [setPageTitle, setLoadingStatus]);

    return (
        <main className={classes.root}>
            <IconSprite />
            <Typography variant="h4">Sample page</Typography>

            <Typography variant="body1" className={classes.section}>
                This page exercises page-level SDK hooks. Replace it for your real use case.
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
