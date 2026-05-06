// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — Data Connect / Ethos data lifecycle (placeholder).
//
// Demonstrates pipeline name read from card configuration with
// env-var fallback, plus the canonical card structure (function +
// classes from props + react-intl). Real data fetch wiring is in
// `src/hooks/useAcademicPeriods.js` — wire it in once this iteration
// is verified loading.
//
// HOC: withStyles(styles)(withIntl(Card)).

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useCardInfo, useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';

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
        color: '#5B5E65',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        wordBreak: 'break-all',
    },
});

function EthosFetchCard({ classes }) {
    const intl = useIntl();
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl() || {};

    useTypekitFont();
    useMaterialIconFonts();

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
        <div className={classes.root}>
            <IconSprite />
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
        </div>
    );
}

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(EthosFetchCard));
