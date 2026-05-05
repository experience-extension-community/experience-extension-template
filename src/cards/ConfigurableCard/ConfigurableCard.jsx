// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ConfigurableCard — admin-configured content via customConfiguration.
//
// Reads `customConfiguration.links` (an array of { label, url })
// from the card config. Renders each link as a Path Button.
//
// Demonstrates the read-side of the customConfiguration pattern.
// The write-side (form) lives in ConfigurableCardConfig.jsx.

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
    Button,
    Card,
    CardContent,
    Typography,
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    spacing10,
    spacing20,
} from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import {
    useCardInfo,
    useExtensionControl,
} from '@ellucian/experience-extension-utils';

import { useResolvedTheme } from '../../utils/branding/theme';
import { useTypekitFont, useMaterialIconFonts } from '../../hooks';
import { Icon, EmptyState } from '../../components';
import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const styles = () => ({
    root: { height: '100%', display: 'flex', flexDirection: 'column' },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing10,
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
});

const ConfigurableCard = ({ classes }) => {
    const intl = useIntl();
    const { palette } = useResolvedTheme();
    const cardInfo = useCardInfo() || {};
    const { setLoadingStatus } = useExtensionControl();

    useTypekitFont();
    useMaterialIconFonts();

    useEffect(() => {
        setLoadingStatus(false);
    }, [setLoadingStatus]);

    const links = useMemo(() => {
        const raw = cardInfo.configuration?.customConfiguration?.links;
        if (!Array.isArray(raw)) return [];
        return raw.filter((l) => l && typeof l.url === 'string' && l.url.length > 0);
    }, [cardInfo.configuration]);

    return (
        <Card className={classes.root}>
            <IconSprite />
            <CardContent>
                <header className={classes.header}>
                    <Icon name="link" size={24} style={{ color: palette.primary }} />
                    <Typography variant="h6">
                        {intl.formatMessage({
                            id: 'card.configurable.title',
                            defaultMessage: 'Configurable links',
                        })}
                    </Typography>
                </header>

                {links.length === 0 ? (
                    <EmptyState
                        title={intl.formatMessage({
                            id: 'card.configurable.empty.title',
                            defaultMessage: 'No links configured',
                        })}
                        description={intl.formatMessage({
                            id: 'card.configurable.empty.description',
                            defaultMessage: 'Open the card configuration to add some.',
                        })}
                        icon="settings"
                    />
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
            </CardContent>
        </Card>
    );
};

ConfigurableCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(ConfigurableCard));
