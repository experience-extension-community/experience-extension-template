// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — Data Connect / Ethos data lifecycle.
//
// Demonstrates:
//   * Configurable Data Connect pipeline name
//   * useAcademicPeriods (domain hook) → fetchAcademicPeriods (data fn)
//   * LoadingState / ErrorState / EmptyState / RefreshDataStatusMessage
//   * useAnnouncer for screen-reader announcements
//   * formatDate for locale-aware date rendering
//
// HOC composition: withStyles(styles)(withIntl(Card)) — withStyles outermost.

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
import { spacing10, spacing20 } from '@ellucian/react-design-system/core/styles/tokens';
import { IconSprite } from '@ellucian/ds-icons/lib';
import { useExtensionControl, useUserInfo } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useAcademicPeriods } from '../../hooks/useAcademicPeriods';
import { useAnnouncer } from '../../hooks/useAnnouncer';
import { formatDate } from '../../utils/format';
import { brandColors } from '../../utils/branding/brandColors';

import Icon from '../../components/Icon';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import RefreshDataStatusMessage from '../../components/common/RefreshDataStatusMessage';

const styles = () => ({
    root: { height: '100%', display: 'flex', flexDirection: 'column' },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing20,
    },
    headerTitle: { display: 'flex', alignItems: 'center', gap: spacing10 },
    headerIcon: { color: brandColors.polyPurple },
    list: { display: 'flex', flexDirection: 'column', gap: spacing10, marginTop: spacing20 },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
        padding: spacing20,
    },
    dateRange: { color: brandColors.textSecondary },
});

function EthosFetchCard(props) {
    const { classes } = props;
    const intl = useIntl();
    const userInfo = useUserInfo() || {};
    const { setLoadingStatus } = useExtensionControl();
    const announce = useAnnouncer();

    useTypekitFont();

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
            <link rel="stylesheet" href="https://use.typekit.net/yld8vhe.css" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=block"
            />
            <IconSprite />
            <CardContent>
                <header className={classes.header}>
                    <span className={classes.headerTitle}>
                        <Icon name="event" size={24} className={classes.headerIcon} />
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
                                    <Typography variant="body2" className={classes.dateRange}>
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
}

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withIntl(EthosFetchCard));
