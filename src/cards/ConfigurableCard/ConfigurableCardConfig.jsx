// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Custom configuration form for ConfigurableCard.
//
// Mirrors FL Poly's custom-simple-links/QuickLinksCardConfig.jsx
// pattern (the canonical complex-form example) plus Ellucian
// sdk-samples MarkdownTemplateConfig.jsx (the 8.x-stack reference):
//
//   * cardControl + cardInfo come from PROPS (the SDK passes them
//     down to config forms — useCardControl()/useCardInfo() hooks
//     are NOT for use here).
//
//   * setCustomConfiguration takes the shape
//         { customConfiguration: { client: {...payload} } }
//     The SDK persists `client.X` and lifts it to read at
//     `cardInfo.configuration.customConfiguration.X` (asymmetric —
//     write through .client, read directly).
//
//   * setIsCustomConfigurationValid takes (isValid, errorCount).
//
//   * withStyles for layout — EDS 8.x signature
//         withStyles(Component, styles, { name })
//
// Persisted shape (write):  { customConfiguration: { client: { links: [...] } } }
// Read in ConfigurableCard:  cardInfo.configuration.customConfiguration.links

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
} from '@ellucian/react-design-system/core';
import {
    spacing20,
    spacing30,
    spacing40,
} from '@ellucian/react-design-system/core/styles/tokens';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const styles = () => ({
    root: {
        padding: spacing40,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing30,
    },
    row: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing20,
    },
    fieldsCol: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
    },
});

const isValidUrl = (str) => {
    if (!str) return false;
    try {
        const u = new URL(str);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
};

const ConfigurableCardConfig = (props) => {
    const {
        classes,
        cardControl: { setCustomConfiguration, setIsCustomConfigurationValid },
        cardInfo: { configuration: { customConfiguration } = {} } = {},
    } = props;

    const client = customConfiguration ? customConfiguration.client : undefined;
    const [links, setLinks] = useState(
        client && Array.isArray(client.links) && client.links.length > 0
            ? client.links
            : [{ label: '', url: '' }],
    );

    // Initial validation on mount.
    useEffect(() => {
        updateCustomConfigVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save and re-verify on every change.
    useEffect(() => {
        updateCustomConfig();
        updateCustomConfigVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [links]);

    const updateCustomConfig = () => {
        setCustomConfiguration({
            customConfiguration: {
                client: {
                    links,
                },
            },
        });
    };

    const updateCustomConfigVerification = () => {
        const errorCount = links.filter(
            (l) => !l || typeof l.url !== 'string' || !isValidUrl(l.url),
        ).length;
        setIsCustomConfigurationValid(errorCount === 0, errorCount);
    };

    const updateLink = (index, key, value) => {
        setLinks((prev) =>
            prev.map((l, i) => (i === index ? { ...l, [key]: value } : l)),
        );
    };
    const removeLink = (index) =>
        setLinks((prev) => prev.filter((_l, i) => i !== index));
    const addLink = () =>
        setLinks((prev) => [...prev, { label: '', url: '' }]);

    return (
        <Box className={classes.root}>
            <Typography variant="h6">Configure links</Typography>

            {links.map((link, idx) => {
                const urlInvalid = link.url.length > 0 && !isValidUrl(link.url);
                return (
                    <div key={idx} className={classes.row}>
                        <div className={classes.fieldsCol}>
                            <TextField
                                label="Label"
                                value={link.label || ''}
                                onChange={(e) => updateLink(idx, 'label', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="URL"
                                value={link.url || ''}
                                onChange={(e) => updateLink(idx, 'url', e.target.value)}
                                error={urlInvalid}
                                helperText={urlInvalid ? 'Enter a valid URL.' : undefined}
                                fullWidth
                                required
                            />
                        </div>
                        <IconButton
                            aria-label="Remove"
                            onClick={() => removeLink(idx)}
                            disabled={links.length === 1}
                        >
                            <span aria-hidden="true">×</span>
                        </IconButton>
                    </div>
                );
            })}

            <Button color="secondary" onClick={addLink}>
                Add link
            </Button>
        </Box>
    );
};

ConfigurableCardConfig.propTypes = {
    classes: PropTypes.object.isRequired,
    cardControl: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired,
};

export default withIntl(
    withStyles(ConfigurableCardConfig, styles, { name: 'ConfigurableCardConfig' }),
);
