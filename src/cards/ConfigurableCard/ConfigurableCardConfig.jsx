// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Custom configuration form for ConfigurableCard.
//
// Demonstrates the canonical Experience customConfiguration pattern:
//   * Read existing configuration via useCardInfo
//   * Persist updates via useCardControl().setCustomConfiguration
//   * Gate save with useCardControl().setIsCustomConfigurationValid
//
// The shape persisted is `{ links: [{ label, url }, ...] }`.

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
    Button,
    IconButton,
    TextField,
    Typography,
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing10, spacing20, spacing30 } from '@ellucian/react-design-system/core/styles/tokens';
import { useCardControl, useCardInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import Icon from '../../components/Icon';

const styles = () => ({
    root: { display: 'flex', flexDirection: 'column', gap: spacing20 },
    row: { display: 'flex', alignItems: 'flex-start', gap: spacing10 },
    fieldsCol: {
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
    },
    addRow: { marginTop: spacing30 },
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

function ConfigurableCardConfig(props) {
    const { classes } = props;
    const intl = useIntl();
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
    const removeLink = (index) => setLinks((prev) => prev.filter((_l, i) => i !== index));
    const addLink = () => setLinks((prev) => [...prev, { label: '', url: '' }]);

    return (
        <div className={classes.root}>
            <Typography variant="h6">
                {intl.formatMessage({
                    id: 'card.configurable.config.heading',
                    defaultMessage: 'Configure links',
                })}
            </Typography>

            {links.map((link, idx) => {
                const urlInvalid = link.url.length > 0 && !isValidUrl(link.url);
                return (
                    <div key={idx} className={classes.row}>
                        <div className={classes.fieldsCol}>
                            <TextField
                                label={intl.formatMessage({
                                    id: 'card.configurable.config.label',
                                    defaultMessage: 'Label',
                                })}
                                value={link.label}
                                onChange={(e) => updateLink(idx, 'label', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label={intl.formatMessage({
                                    id: 'card.configurable.config.url',
                                    defaultMessage: 'URL',
                                })}
                                value={link.url}
                                onChange={(e) => updateLink(idx, 'url', e.target.value)}
                                error={urlInvalid}
                                helperText={
                                    urlInvalid
                                        ? intl.formatMessage({
                                              id: 'card.configurable.config.invalidUrl',
                                              defaultMessage: 'Enter a valid URL.',
                                          })
                                        : undefined
                                }
                                fullWidth
                            />
                        </div>
                        <IconButton
                            aria-label={intl.formatMessage({
                                id: 'card.configurable.config.remove',
                                defaultMessage: 'Remove',
                            })}
                            onClick={() => removeLink(idx)}
                            disabled={links.length === 1}
                        >
                            <Icon name="delete" size={20} />
                        </IconButton>
                    </div>
                );
            })}

            <div className={classes.addRow}>
                <Button color="secondary" onClick={addLink}>
                    {intl.formatMessage({
                        id: 'card.configurable.config.add',
                        defaultMessage: 'Add link',
                    })}
                </Button>
            </div>
        </div>
    );
}

ConfigurableCardConfig.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(ConfigurableCardConfig));
