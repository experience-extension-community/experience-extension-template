// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HooksPage — props and SDK-hook dump. Useful as a developer
// reference; demonstrates every hook the SDK exposes to a page.

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Typography, TextLink } from '@ellucian/react-design-system/core';
import {
    spacing20,
    spacing40,
    spacing50,
} from '@ellucian/react-design-system/core/styles/tokens';
import {
    useCache,
    useCardInfo,
    useData,
    useExperienceInfo,
    useExtensionControl,
    useExtensionInfo,
    useThemeInfo,
    useUserInfo,
    useDashboardInfo,
    useCardControl,
    usePageControl,
    usePageInfo,
} from '@ellucian/experience-extension-utils';

import { brandColors } from '../utils/branding/brandColors';

const styles = () => ({
    root: {
        padding: spacing50,
        maxWidth: 1080,
        margin: '0 auto',
    },
    backLink: {
        display: 'inline-block',
        marginBottom: spacing40,
        color: brandColors.primary,
        textDecoration: 'none',
        fontSize: '0.875rem',
        '&:hover': { textDecoration: 'underline' },
    },
    block: {
        margin: `0 ${spacing20} ${spacing40}`,
        padding: spacing20,
        backgroundColor: brandColors.surfaceMuted,
        borderRadius: 4,
        fontSize: '0.8125rem',
        overflowX: 'auto',
    },
});

const hookDump = (label, value) => (
    <pre key={label} style={{ margin: 0 }}>
        {label} {JSON.stringify(value, undefined, 3)}
    </pre>
);

const HooksPage = (props) => {
    const { classes } = props;
    const { setPageTitle } = usePageControl() || {};

    if (typeof setPageTitle === 'function') {
        setPageTitle('Hooks & properties');
    }

    const hookEntries = [
        ['useCache', useCache()],
        ['useCardInfo', useCardInfo()],
        ['useData', useData()],
        ['useExperienceInfo', useExperienceInfo()],
        ['useExtensionControl', useExtensionControl()],
        ['useExtensionInfo', useExtensionInfo()],
        ['useThemeInfo', useThemeInfo()],
        ['useUserInfo', useUserInfo()],
        ['useDashboardInfo', useDashboardInfo()],
        ['useCardControl', useCardControl()],
        ['usePageControl', usePageControl()],
        ['usePageInfo', usePageInfo()],
    ];

    return (
        <div className={classes.root}>
            <Link to="/" className={classes.backLink}>
                ← Back to overview
            </Link>
            <Typography variant="h2">Properties</Typography>
            <pre className={classes.block}>{JSON.stringify(props, undefined, 3)}</pre>
            <Typography variant="h2">Hooks</Typography>
            {hookEntries.map(([label, value]) => (
                <div key={label} className={classes.block}>
                    {hookDump(label, value)}
                </div>
            ))}
            <Typography>
                For more information regarding hooks and props, visit the{' '}
                <TextLink
                    href="https://resources.elluciancloud.com/bundle/ellucian_experience_acn_use/page/c_props_hooks_sdk.html"
                    target="_blank"
                >
                    Props and Hooks
                </TextLink>{' '}
                section of the Ellucian Experience SDK documentation.
            </Typography>
        </div>
    );
};

HooksPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(HooksPage, styles, { name: 'HooksPage' });
