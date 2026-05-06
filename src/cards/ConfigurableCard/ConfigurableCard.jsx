// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — admin-configured content via customConfiguration.
//
// Reads `customConfiguration.links` (array of `{ label, url }`) from
// the card config and renders each as a Path Button. Demonstrates the
// READ side of the customConfiguration pattern; the WRITE side (form)
// lives in ConfigurableCardConfig.jsx.
//
// HOC: withStyles(styles)(withIntl(Card)).

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useCardInfo, useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const styles = () => ({
    root: {
        padding: spacing30,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        marginBottom: spacing20,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
    },
    linkButton: {
        justifyContent: 'flex-start',
        textTransform: 'none',
    },
    empty: {
        color: '#5B5E65',
        fontStyle: 'italic',
    },
});

function ConfigurableCard({ classes }) {
    const intl = useIntl();
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl() || {};

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [setLoadingStatus]);

    const links = useMemo(() => {
        const raw = cardInfo.configuration?.customConfiguration?.links;
        if (!Array.isArray(raw)) return [];
        return raw.filter((l) => l && typeof l.url === 'string' && l.url.length > 0);
    }, [cardInfo.configuration]);

    return (
        <div className={classes.root}>
            <IconSprite />
            <Typography variant="h6" className={classes.title}>
                {intl.formatMessage({
                    id: 'card.configurable.title',
                    defaultMessage: 'Configurable links',
                })}
            </Typography>

            {links.length === 0 ? (
                <Typography variant="body2" className={classes.empty}>
                    {intl.formatMessage({
                        id: 'card.configurable.empty.description',
                        defaultMessage: 'Open the card configuration to add some.',
                    })}
                </Typography>
            ) : (
                <div className={classes.list}>
                    {links.map((link, idx) => (
                        <Button
                            key={`${link.url}-${idx}`}
                            color="primary"
                            variant="text"
                            fullWidth
                            className={classes.linkButton}
                            onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                        >
                            {link.label || link.url}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}

ConfigurableCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(ConfigurableCard));
