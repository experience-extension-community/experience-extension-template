// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// TermsPage — page-sized view of the academic-periods pipeline.
// Reuses useAcademicPeriods (same data source as EthosFetchCard).
//
// IMPORTANT: For this page to load data, PageLinkCard's tenant
// configuration must include the same `termsPipeline` and
// `ethosApiKey` as EthosFetchCard. The page is scoped to
// PageLinkCard's cardId; without that authorization the pipeline
// returns 400. See PageLinkCard's configuration block in
// extension.js.

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box, Typography } from '@ellucian/react-design-system/core';
import {
    spacing20,
    spacing30,
    spacing40,
    spacing50,
} from '@ellucian/react-design-system/core/styles/tokens';
import { usePageControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../i18n/ReactIntlProviderWrapper';
import { useAcademicPeriods } from '../hooks/useAcademicPeriods';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { brandColors } from '../utils/branding/brandColors';

const BRAND_FONT_STACK =
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const styles = () => ({
    root: {
        padding: spacing50,
        maxWidth: 1080,
        margin: '0 auto',
        fontFamily: BRAND_FONT_STACK,
    },
    backLink: {
        display: 'inline-block',
        marginBottom: spacing40,
        color: brandColors.primary,
        textDecoration: 'none',
        fontSize: '0.875rem',
        '&:hover': { textDecoration: 'underline' },
    },
    subtitle: {
        marginBottom: spacing40,
        color: brandColors.textSecondary,
        fontSize: '0.9375rem',
    },
    refreshRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing30,
    },
    refresh: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing20,
        padding: `${spacing20} ${spacing30}`,
        background: 'transparent',
        border: `1px solid ${brandColors.border}`,
        borderRadius: 4,
        cursor: 'pointer',
        color: brandColors.textPrimary,
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        '&:hover:not(:disabled)': {
            borderColor: brandColors.primary,
            color: brandColors.primary,
        },
        '&:disabled': { cursor: 'wait', opacity: 0.6 },
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: `${spacing20} ${spacing30}`,
        textAlign: 'left',
        fontSize: '0.6875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: brandColors.textSecondary,
        borderBottom: `1px solid ${brandColors.border}`,
    },
    td: {
        padding: spacing30,
        fontSize: '0.875rem',
        color: brandColors.textPrimary,
        borderBottom: `1px solid ${brandColors.border}`,
        verticalAlign: 'top',
    },
    code: {
        fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        fontSize: '0.875rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
    },
    muted: {
        color: brandColors.textSecondary,
    },
    chip: {
        display: 'inline-block',
        padding: `2px ${spacing20}`,
        borderRadius: 999,
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        backgroundColor: brandColors.surfaceMuted,
        color: brandColors.textSecondary,
    },
});

const formatDate = (iso, intl) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return intl.formatDate(d, { year: 'numeric', month: 'short', day: 'numeric' });
};

const TermsPage = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const { setPageTitle } = usePageControl() || {};

    if (typeof setPageTitle === 'function') {
        setPageTitle('Active terms');
    }

    const { data, isLoading, isRefreshing, isError, refresh } = useAcademicPeriods();

    const sortedTerms = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return [...data].sort((a, b) => {
            const ad = a?.startOn ? new Date(a.startOn).getTime() : 0;
            const bd = b?.startOn ? new Date(b.startOn).getTime() : 0;
            return bd - ad;
        });
    }, [data]);

    return (
        <Box className={classes.root}>
            <Link to="/" className={classes.backLink}>
                ← Back to overview
            </Link>
            <Typography className={classes.subtitle}>
                Academic periods sourced from the Data Connect pipeline.
            </Typography>

            {isLoading ? (
                <LoadingState />
            ) : isError ? (
                <ErrorState onRetry={refresh} />
            ) : sortedTerms.length === 0 ? (
                <EmptyState
                    icon="event_busy"
                    title="No active terms"
                    description="The pipeline returned no academic periods."
                />
            ) : (
                <>
                    <Box className={classes.refreshRow}>
                        <Typography variant="body2" className={classes.muted}>
                            {sortedTerms.length} term
                            {sortedTerms.length === 1 ? '' : 's'}
                        </Typography>
                        <button
                            type="button"
                            className={classes.refresh}
                            onClick={refresh}
                            disabled={isRefreshing}
                        >
                            {isRefreshing ? 'Refreshing…' : 'Refresh'}
                        </button>
                    </Box>
                    <table className={classes.table}>
                        <thead>
                            <tr>
                                <th className={classes.th}>Title</th>
                                <th className={classes.th}>Code</th>
                                <th className={classes.th}>Category</th>
                                <th className={classes.th}>Start</th>
                                <th className={classes.th}>End</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTerms.map((term, idx) => (
                                <tr key={term.id || term.code || idx}>
                                    <td className={classes.td}>
                                        {term.title || '(unnamed)'}
                                    </td>
                                    <td className={classes.td}>
                                        <span className={classes.code}>
                                            {term.code || '—'}
                                        </span>
                                    </td>
                                    <td className={classes.td}>
                                        {term.category ? (
                                            <span className={classes.chip}>
                                                {term.category}
                                            </span>
                                        ) : (
                                            <span className={classes.muted}>—</span>
                                        )}
                                    </td>
                                    <td className={classes.td}>
                                        {formatDate(term.startOn, intl) || '—'}
                                    </td>
                                    <td className={classes.td}>
                                        {formatDate(term.endOn, intl) || '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </Box>
    );
};

TermsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(TermsPage, styles, { name: 'TermsPage' }));
