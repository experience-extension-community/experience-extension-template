// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// DebugHooksDialog — reusable dialog that dumps a card's props and
// the value of every CARD-context SDK hook. The page-context
// equivalent (usePageControl, usePageInfo) lives at /hooks; this
// dialog is for cards. Triggered from a small icon button on each
// card, opens an EDS Dialog. Safe-stringifies all values to avoid
// crashing on circular refs or unserializable function instances.

import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    spacing20,
    spacing30,
} from '@ellucian/react-design-system/core/styles/tokens';
import {
    useCache,
    useCardInfo,
    useCardControl,
    useData,
    useExperienceInfo,
    useExtensionControl,
    useExtensionInfo,
    useThemeInfo,
    useUserInfo,
    useDashboardInfo,
} from '@ellucian/experience-extension-utils';

import { brandColors } from '../../utils/branding/brandColors';

const styles = () => ({
    sectionHeading: {
        marginTop: spacing30,
        marginBottom: spacing20,
        fontSize: '0.6875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: brandColors.textSecondary,
    },
    block: {
        margin: 0,
        marginBottom: spacing20,
        padding: spacing20,
        backgroundColor: brandColors.surfaceMuted,
        borderRadius: 4,
        fontSize: '0.75rem',
        fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        overflow: 'auto',
        maxHeight: 320,
    },
    label: {
        fontWeight: 700,
        color: brandColors.textPrimary,
    },
});

const safeStringify = (value) => {
    try {
        return JSON.stringify(
            value,
            (_key, v) => {
                if (typeof v === 'function') return '[Function]';
                return v;
            },
            2,
        );
    } catch (e) {
        return `<unserializable: ${e.message}>`;
    }
};

const DebugHooksDialog = ({ classes, open, onClose, cardProps }) => {
    const hookEntries = [
        ['useCache', useCache()],
        ['useCardInfo', useCardInfo()],
        ['useCardControl', useCardControl()],
        ['useData', useData()],
        ['useExperienceInfo', useExperienceInfo()],
        ['useExtensionControl', useExtensionControl()],
        ['useExtensionInfo', useExtensionInfo()],
        ['useThemeInfo', useThemeInfo()],
        ['useUserInfo', useUserInfo()],
        ['useDashboardInfo', useDashboardInfo()],
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Card hooks &amp; properties</DialogTitle>
            <DialogContent dividers>
                <Typography className={classes.sectionHeading}>
                    Properties
                </Typography>
                <pre className={classes.block}>{safeStringify(cardProps)}</pre>
                <Typography className={classes.sectionHeading}>Hooks</Typography>
                {hookEntries.map(([label, value]) => (
                    <pre key={label} className={classes.block}>
                        <span className={classes.label}>{label}</span>
                        {'\n'}
                        {safeStringify(value)}
                    </pre>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DebugHooksDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    cardProps: PropTypes.object,
};

export default withStyles(DebugHooksDialog, styles, { name: 'DebugHooksDialog' });
