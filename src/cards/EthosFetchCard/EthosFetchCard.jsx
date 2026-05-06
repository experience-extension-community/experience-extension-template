// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — Data Connect / Ethos data lifecycle (placeholder).
//
// Demonstrates:
//   * Pipeline name read from card configuration with env-var fallback
//   * useExtensionControl().setLoadingStatus to drive the SDK shimmer
//   * Three render branches: loading / error / data
//
// This iteration shows a static placeholder. Once the card pattern is
// confirmed working, swap the placeholder body for a real Data
// Connect call via authenticatedEthosFetch (see useAcademicPeriods
// in src/hooks/ for the wiring).

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import {
    useCardInfo,
    useExtensionControl,
} from '@ellucian/experience-extension-utils';

const styles = () => ({
    root: {
        padding: spacing30,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing20,
    },
    pipeline: {
        marginTop: spacing10,
        color: '#5B5E65', // colorTextSecondary
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        wordBreak: 'break-all',
    },
});

function EthosFetchCard({ classes }) {
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl() || {};

    const pipeline =
        cardInfo.configuration?.client?.termsPipeline ||
        process.env.PIPELINE_GET_TERMS ||
        '(no pipeline configured)';

    const [isLoading, setIsLoading] = useState(false); // Stub state — set true when wiring real fetch

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(isLoading);
        }
    }, [isLoading, setLoadingStatus]);

    return (
        <div className={classes.root}>
            <IconSprite />
            <header className={classes.header}>
                <Typography variant="h6">Active terms</Typography>
                <Button size="small" color="secondary" onClick={() => setIsLoading(false)}>
                    Refresh
                </Button>
            </header>
            <Typography variant="body2">
                Data Connect pipeline-driven card.
            </Typography>
            <Typography variant="body2" className={classes.pipeline}>
                Pipeline: {pipeline}
            </Typography>
        </div>
    );
}

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EthosFetchCard);
