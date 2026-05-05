// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — Data Connect / Ethos data lifecycle.
//
// Demonstrates:
//   * Data Connect pipeline name read from card configuration with
//     env-var fallback
//   * useAcademicPeriods (domain hook) → fetchAcademicPeriods (data fn)
//     → authenticatedFetch (transport)
//   * LoadingState / ErrorState / EmptyState
//   * RefreshDataStatusMessage for refresh flow
//   * useAnnouncer for screen-reader announcements
//   * formatDate for locale-aware date rendering

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
    Button,
    Card,
    CardContent,
    Divider,
    Typography,
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    spacing10,
    spacing20,
} from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useExtensionControl, useUserInfo } from '@ellucian/experience-extension-utils';

import { useResolvedTheme } from '../../utils/branding/theme';
import {
    useAcademicPeriods,
    useAnnouncer,
    useTypekitFont,
    useMaterialIconFonts,
} from '../../hooks';
import {
    Icon,
    LoadingState,
    ErrorState,
    EmptyState,
    RefreshDataStatusMessage,
} from '../../components';
import { formatDate } from '../../utils/format';
import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const styles = () => ({
    root: { height: '100%', display: 'flex', flexDirection: 'column' },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing20,
    },
    headerTitle: { display: 'flex', alignItems: 'center', gap: spacing10 },
    list: { display: 'flex', flexDirection: 'column', gap: spacing10, marginTop: spacing20 },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
        padding: spacing20,
    },
});

const EthosFetchCard = ({ classes }) => {
    const intl = useIntl();
    const { palette } = useResolvedTheme();
    const userInfo = useUserInfo() || {};
    const { setLoadingStatus } = useExtensionControl();
    const announce = useAnnouncer();

    useTypekitFont();
    useMaterialIconFonts();

    const { data, isLoading, isRefreshing, isError, error, refresh } = useAcademicPeriods();

    useEffect(() => {
        setLoadingStatus(isLoading);
    }, [isLoading, setLoadingStatus]);

    useEffect(() => {
        if (!isLoading && !isError && data) {
            announce(
                intl.formatMessage(
                    {
                        id: 'card.ethosFetch.announce.loaded',
                        defaultMessage:
                            '{count, plural, one {# term loaded} other {# terms loaded}}.',
                    },
                    { count: data.length },
                ),
            );
        }
        if (isError) {
            announce(
                intl.formatMessage({
                    id: 'card.ethosFetch.announce.failed',
                    defaultMessage: 'Failed to load terms.',
                }),
                { priority: 'assertive' },
            );
        }
    }, [isLoading, isError, data, announce, intl]);

    const refreshStatus = isRefreshing ? 'refreshing' : isError ? 'error' : 'idle';

    return (
        <Card className={classes.root}>
            <IconSprite />
            <CardContent>
                <header className={classes.header}>
                    <span className={classes.headerTitle}>
                        <Icon name="event" size={24} style={{ color: palette.primary }} />
                        <Typography variant="h6">
                            {intl.formatMessage({
                                id: 'card.ethosFetch.title',
                                defaultMessage: 'Active terms',
                            })}
                        </Typography>
                    </span>
                    <Button
                        size="small"
                        color="secondary"
                        onClick={refresh}
                        disabled={isLoading || isRefreshing}
                    >
                        {intl.formatMessage({
                            id: 'card.ethosFetch.cta.refresh',
                            defaultMessage: 'Refresh',
                        })}
                    </Button>
                </header>

                <RefreshDataStatusMessage status={refreshStatus} onRetry={refresh} />

                {isLoading ? <LoadingState /> : null}

                {!isLoading && isError ? (
                    <ErrorState error={error} onRetry={refresh} />
                ) : null}

                {!isLoading && !isError && (!data || data.length === 0) ? (
                    <EmptyState
                        title={intl.formatMessage({
                            id: 'card.ethosFetch.empty.title',
                            defaultMessage: 'No active terms',
                        })}
                        description={intl.formatMessage({
                            id: 'card.ethosFetch.empty.description',
                            defaultMessage: 'The pipeline returned no academic periods.',
                        })}
                        icon="event_busy"
                    />
                ) : null}

                {!isLoading && !isError && data && data.length > 0 ? (
                    <ul className={classes.list} aria-label="Academic periods">
                        {data.map((term, idx) => (
                            <li key={term.id || term.code || idx} className={classes.listItem}>
                                <Typography variant="subtitle2">
                                    {term.title || term.code || `Term ${idx + 1}`}
                                </Typography>
                                {term.startOn || term.endOn ? (
                                    <Typography
                                        variant="body2"
                                        style={{ color: palette.textSecondary }}
                                    >
                                        {formatDate(term.startOn, { locale: userInfo.locale })}
                                        {term.endOn
                                            ? ` – ${formatDate(term.endOn, { locale: userInfo.locale })}`
                                            : ''}
                                    </Typography>
                                ) : null}
                                {idx < data.length - 1 ? <Divider /> : null}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </CardContent>
        </Card>
    );
};

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(EthosFetchCard));
