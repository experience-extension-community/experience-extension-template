// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — Data Connect / Ethos data lifecycle (placeholder).
// EDS 8.x signature: withStyles(Component, styles, { name }), withIntl outermost.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Button, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { useCardInfo, useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const styles = () => ({
    root: {
        padding: spacing20,
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
        color: '#5B5E65',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        wordBreak: 'break-all',
    },
});

const EthosFetchCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl() || {};

    const pipeline =
        cardInfo.configuration?.client?.termsPipeline ||
        process.env.PIPELINE_GET_TERMS ||
        '(no pipeline configured)';

    const [isLoading] = useState(false);

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(isLoading);
        }
    }, [isLoading, setLoadingStatus]);

    return (
        <Box className={classes.root}>
            <header className={classes.header}>
                <Typography variant="h6">
                    {intl.formatMessage({
                        id: 'card.ethosFetch.title',
                        defaultMessage: 'Active terms',
                    })}
                </Typography>
                <Button size="small" color="secondary" onClick={() => {}}>
                    {intl.formatMessage({
                        id: 'card.ethosFetch.cta.refresh',
                        defaultMessage: 'Refresh',
                    })}
                </Button>
            </header>
            <Typography variant="body2">
                Data Connect pipeline-driven card.
            </Typography>
            <Typography variant="body2" className={classes.pipeline}>
                Pipeline: {pipeline}
            </Typography>
        </Box>
    );
};

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(EthosFetchCard, styles, { name: 'EthosFetchCard' }));
