// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Custom configuration form for ConfigurableCard.
//
// Demonstrates the canonical Experience customConfiguration pattern:
//   * Read existing config via useCardInfo
//   * Persist updates via useCardControl().setCustomConfiguration
//   * Gate save with useCardControl().setIsCustomConfigurationValid
//
// Persisted shape: { links: [{ label, url }, ...] }
//
// Mirrors account-details + custom-simple-links convention: hooks
// for SDK access, withStyles for layout, no withIntl, plain
// <div className={classes.root}> wrapper.

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Button,
    IconButton,
    TextField,
    Typography,
} from '@ellucian/react-design-system/core';
import {
    spacing10,
    spacing20,
    spacing30,
} from '@ellucian/react-design-system/core/styles/tokens';
import { useCardControl, useCardInfo } from '@ellucian/experience-extension-utils';

const styles = () => ({
    root: {
        padding: spacing30,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing20,
    },
    row: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing10,
    },
    fieldsCol: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
    },
    addRow: {
        marginTop: spacing30,
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

function ConfigurableCardConfig({ classes }) {
    const cardInfo = useCardInfo() || {};
    const { setCustomConfiguration, setIsCustomConfigurationValid } = useCardControl() || {};

    const initialLinks = useMemo(() => {
        const raw = cardInfo.configuration?.customConfiguration?.links;
        return Array.isArray(raw) && raw.length > 0 ? raw : [{ label: '', url: '' }];
    }, [cardInfo.configuration]);

    const [links, setLinks] = useState(initialLinks);

    useEffect(() => {
        const allValid = links.every((l) => typeof l.url === 'string' && isValidUrl(l.url));
        if (typeof setIsCustomConfigurationValid === 'function') {
            setIsCustomConfigurationValid(allValid);
        }
        if (typeof setCustomConfiguration === 'function') {
            setCustomConfiguration({ links });
        }
    }, [links, setCustomConfiguration, setIsCustomConfigurationValid]);

    const updateLink = (index, key, value) => {
        setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, [key]: value } : l)));
    };
    const removeLink = (index) =>
        setLinks((prev) => prev.filter((_l, i) => i !== index));
    const addLink = () =>
        setLinks((prev) => [...prev, { label: '', url: '' }]);

    return (
        <div className={classes.root}>
            <Typography variant="h6">Configure links</Typography>

            {links.map((link, idx) => {
                const urlInvalid = link.url.length > 0 && !isValidUrl(link.url);
                return (
                    <div key={idx} className={classes.row}>
                        <div className={classes.fieldsCol}>
                            <TextField
                                label="Label"
                                value={link.label}
                                onChange={(e) => updateLink(idx, 'label', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="URL"
                                value={link.url}
                                onChange={(e) => updateLink(idx, 'url', e.target.value)}
                                error={urlInvalid}
                                helperText={urlInvalid ? 'Enter a valid URL.' : undefined}
                                fullWidth
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

            <div className={classes.addRow}>
                <Button color="secondary" onClick={addLink}>
                    Add link
                </Button>
            </div>
        </div>
    );
}

ConfigurableCardConfig.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigurableCardConfig);
