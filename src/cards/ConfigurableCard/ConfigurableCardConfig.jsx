// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Custom configuration form for ConfigurableCard.
//
// Mirrors Ellucian sdk-samples' MarkdownTemplateConfig.jsx EXACTLY
// (same SDK 8.1.2 stack as ours):
//   * cardControl + cardInfo are read from PROPS, not hooks
//     (the SDK passes them down as props to config forms)
//   * setCustomConfiguration takes the shape:
//         { customConfiguration: { client: {...payload} } }
//     NOT just the payload directly
//   * setIsCustomConfigurationValid takes TWO args: (isValid, errorCount)
//   * No withStyles HOC — just withIntl
//
// Persisted shape: { customConfiguration: { client: { links: [{label, url}] } } }

import React, { useEffect, useState } from 'react';
import {
    Button,
    IconButton,
    TextField,
    Typography,
} from '@ellucian/react-design-system/core';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

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
        cardControl: { setCustomConfiguration, setIsCustomConfigurationValid },
        cardInfo: { configuration: { customConfiguration } = {} } = {},
    } = props;

    const client = customConfiguration ? customConfiguration.client : undefined;
    const [links, setLinks] = useState(
        client && Array.isArray(client.links) && client.links.length > 0
            ? client.links
            : [{ label: '', url: '' }],
    );

    // Initial validation on mount — catches required-field errors that
    // wouldn't otherwise surface until the user interacts.
    useEffect(() => {
        updateCustomConfigVerification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Save on every change.
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
        <React.Fragment>
            <Typography variant="h6" style={{ marginBottom: 16 }}>
                Configure links
            </Typography>

            {links.map((link, idx) => {
                const urlInvalid = link.url.length > 0 && !isValidUrl(link.url);
                return (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                            marginBottom: 16,
                        }}
                    >
                        <div
                            style={{
                                flex: '1 1 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                            }}
                        >
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

            <Button color="secondary" onClick={addLink} style={{ marginTop: 8 }}>
                Add link
            </Button>
        </React.Fragment>
    );
};

export default withIntl(ConfigurableCardConfig);
