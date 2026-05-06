// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — admin-configured categorized links.
//
// Reads the persisted shape:
//   cardInfo.configuration.customConfiguration.categories
// (the SDK lifts customConfiguration.client.categories here on read)
//
// Renders each category as a section with its links as buttons.
// Categories without a `name` render as an unlabelled group.
//
// EDS 8.x: withStyles(Component, styles, { name }) + withIntl outermost.

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Button, Typography } from '@ellucian/react-design-system/core';
import { spacing10, spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { useCardInfo, useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const styles = () => ({
    root: {
        padding: spacing30,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing30,
        overflowY: 'auto',
    },
    title: {
        marginBottom: spacing10,
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
    },
    categoryHeading: {
        marginBottom: spacing10,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 700,
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
        marginTop: spacing20,
    },
});

const isValidLink = (l) => l && typeof l.url === 'string' && l.url.length > 0;

const ConfigurableCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl() || {};

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(false);
        }
    }, [setLoadingStatus]);

    // Read the persisted categories. SDK lifts client.categories to
    // top-level customConfiguration on read.
    const categories = useMemo(() => {
        const raw = cardInfo.configuration?.customConfiguration?.categories;
        if (!Array.isArray(raw)) return [];
        return raw
            .map((c) => ({
                id: c.id,
                name: c.name || '',
                links: Array.isArray(c.links) ? c.links.filter(isValidLink) : [],
            }))
            .filter((c) => c.links.length > 0);
    }, [cardInfo.configuration]);

    const totalLinks = useMemo(
        () => categories.reduce((n, c) => n + c.links.length, 0),
        [categories],
    );

    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                {intl.formatMessage({
                    id: 'card.configurable.title',
                    defaultMessage: 'Configurable links',
                })}
            </Typography>

            {totalLinks === 0 ? (
                <Typography variant="body2" className={classes.empty}>
                    {intl.formatMessage({
                        id: 'card.configurable.empty.description',
                        defaultMessage: 'Open the card configuration to add some.',
                    })}
                </Typography>
            ) : (
                categories.map((cat, catIdx) => (
                    <section key={cat.id || catIdx} className={classes.section}>
                        {cat.name ? (
                            <Typography
                                variant="caption"
                                color="textSecondary"
                                className={classes.categoryHeading}
                            >
                                {cat.name}
                            </Typography>
                        ) : null}
                        <div className={classes.list}>
                            {cat.links.map((link, idx) => (
                                <Button
                                    key={link.id || `${link.url}-${idx}`}
                                    color="primary"
                                    variant="text"
                                    fullWidth
                                    className={classes.linkButton}
                                    onClick={() =>
                                        window.open(link.url, '_blank', 'noopener,noreferrer')
                                    }
                                >
                                    {link.label || link.url}
                                </Button>
                            ))}
                        </div>
                    </section>
                ))
            )}
        </Box>
    );
};

ConfigurableCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(ConfigurableCard, styles, { name: 'ConfigurableCard' }));
