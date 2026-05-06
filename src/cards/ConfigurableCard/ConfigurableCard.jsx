// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — admin-configured content via customConfiguration.
//
// Reads `customConfiguration.links` (array of `{ label, url }`) from
// the card config and renders each as a Path Button. Demonstrates the
// READ side of the customConfiguration pattern. The WRITE side
// (the form) lives in ConfigurableCardConfig.jsx.
//
// Mirrors FL Poly's custom-simple-links approach: literal strings
// (no react-intl), withStyles HOC only, plain <div> wrapper.

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useCardInfo, useExtensionControl } from '@ellucian/experience-extension-utils';

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
                Configurable links
            </Typography>

            {links.length === 0 ? (
                <Typography variant="body2" className={classes.empty}>
                    No links configured. Open card configuration to add some.
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

export default withStyles(styles)(ConfigurableCard);
