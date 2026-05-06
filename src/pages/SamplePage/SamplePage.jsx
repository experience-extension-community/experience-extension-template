// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// SamplePage — minimal full-width page paired with PageLinkCard.
// EDS 8.x signature: withStyles(Component, styles, { name }).

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import { spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
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

const SamplePage = (props) => {
    const { classes } = props;
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
        <Box component="main" className={classes.root}>
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
        </Box>
    );
};

SamplePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(SamplePage, styles, { name: 'SamplePage' });
