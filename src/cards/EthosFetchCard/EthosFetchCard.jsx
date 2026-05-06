// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — fetches active academic terms via a Data Connect
// pipeline and renders them as a list. Demonstrates the canonical
// fetch lifecycle: loading → error / empty / data, with refresh.
//
// EDS 8.x: withStyles(Component, styles, { name }) + withIntl outermost.

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Box } from '@ellucian/react-design-system/core';
import {
    spacing10,
    spacing20,
    spacing30,
} from '@ellucian/react-design-system/core/styles/tokens';
import { useExtensionControl } from '@ellucian/experience-extension-utils';

import { withIntl } from '../../i18n/ReactIntlProviderWrapper';
import { useAcademicPeriods } from '../../hooks/useAcademicPeriods';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { brandColors } from '../../utils/branding/brandColors';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';

const BRAND_FONT_STACK =
    '"new-science", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const styles = () => ({
    root: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: spacing30,
        fontFamily: BRAND_FONT_STACK,
        backgroundColor: brandColors.surface,
    },
    refreshButton: {
        position: 'absolute',
        top: spacing20,
        right: spacing20,
        zIndex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        padding: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        color: brandColors.textMuted,
        opacity: 0,
        transition:
            'color 120ms ease-out, background-color 120ms ease-out, opacity 150ms ease-out',
        '$root:hover &, &:focus-visible, &:disabled': {
            opacity: 1,
        },
        '&:hover:not(:disabled)': {
            color: brandColors.primary,
            backgroundColor: brandColors.surfaceMuted,
        },
        '&:disabled': {
            cursor: 'wait',
        },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
    },
    refreshButtonSpinning: {
        animation: '$spin 800ms linear infinite',
    },
    '@keyframes spin': {
        to: { transform: 'rotate(360deg)' },
    },
    refreshIcon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1.125rem',
        fontVariationSettings: '"FILL" 0, "wght" 500, "GRAD" 0, "opsz" 24',
        lineHeight: 1,
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        flex: '1 1 auto',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
    },
    term: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
        padding: `${spacing20} ${spacing30}`,
        borderRadius: 4,
        '&:hover': { backgroundColor: brandColors.surfaceMuted },
    },
    termTitle: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.875rem',
        fontWeight: 600,
        color: brandColors.textPrimary,
        lineHeight: 1.3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    termMeta: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.75rem',
        color: brandColors.textSecondary,
        fontVariantNumeric: 'tabular-nums',
        display: 'flex',
        alignItems: 'baseline',
        gap: spacing20,
    },
    termCode: {
        fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        fontSize: '0.875rem',                    // 14px — matches body text for WCAG legibility
        fontWeight: 600,
        color: brandColors.textPrimary,
        letterSpacing: '0.02em',
    },
    termDates: {
        fontFamily: BRAND_FONT_STACK,
    },
    refreshing: {
        marginTop: spacing20,
    },
});

const formatDate = (iso, intl) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return intl.formatDate(d, { year: 'numeric', month: 'short', day: 'numeric' });
};

const EthosFetchCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const { setLoadingStatus } = useExtensionControl() || {};

    useTypekitFont();
    useMaterialIconFonts();

    const { data, isLoading, isRefreshing, isError, error, refresh } = useAcademicPeriods();

    // Sort:
    //   1. By category — 'term' first, 'subterm' second, anything else,
    //      and 'year' ALWAYS last regardless of what else exists.
    //   2. Within category, titles that start with a letter come before
    //      titles that start with a digit (e.g. "Spring 2026" before
    //      "2027-2028").
    //   3. Within each partition, natural locale-aware alpha by title.
    const sortedTerms = useMemo(() => {
        if (!Array.isArray(data)) return [];
        const CATEGORY_RANK = { term: 0, subterm: 1 };
        const rankOfCategory = (cat) => {
            const key = String(cat || '').toLowerCase();
            if (key === 'year') return 999;             // always last
            if (CATEGORY_RANK[key] !== undefined) return CATEGORY_RANK[key];
            return 50;                                   // unknown — between subterm and year
        };
        const startsWithDigit = (s) => /^\d/.test(String(s || '').trim());
        return [...data].sort((a, b) => {
            const cr = rankOfCategory(a?.category) - rankOfCategory(b?.category);
            if (cr !== 0) return cr;

            const aDigit = startsWithDigit(a?.title);
            const bDigit = startsWithDigit(b?.title);
            if (aDigit !== bDigit) return aDigit ? 1 : -1;

            return String(a?.title || '').localeCompare(
                String(b?.title || ''),
                undefined,
                { numeric: true, sensitivity: 'base' },
            );
        });
    }, [data]);

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(isLoading);
        }
    }, [isLoading, setLoadingStatus]);

    if (isLoading) {
        return (
            <Box className={classes.root}>
                <LoadingState />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box className={classes.root}>
                <ErrorState error={error} onRetry={refresh} />
            </Box>
        );
    }

    if (!sortedTerms || sortedTerms.length === 0) {
        return (
            <Box className={classes.root}>
                <EmptyState
                    icon="event_busy"
                    title={intl.formatMessage({
                        id: 'card.ethosFetch.empty.title',
                        defaultMessage: 'No active terms',
                    })}
                    description={intl.formatMessage({
                        id: 'card.ethosFetch.empty.description',
                        defaultMessage: 'The pipeline returned no academic periods.',
                    })}
                />
            </Box>
        );
    }

    return (
        <Box className={classes.root}>
            <button
                type="button"
                onClick={refresh}
                disabled={isRefreshing}
                aria-label={intl.formatMessage({
                    id: 'card.ethosFetch.cta.refresh',
                    defaultMessage: 'Refresh',
                })}
                title={intl.formatMessage({
                    id: 'card.ethosFetch.cta.refresh',
                    defaultMessage: 'Refresh',
                })}
                className={classes.refreshButton}
            >
                <span
                    aria-hidden="true"
                    className={`${classes.refreshIcon}${
                        isRefreshing ? ` ${classes.refreshButtonSpinning}` : ''
                    }`}
                >
                    refresh
                </span>
            </button>

            <ul className={classes.list}>
                {sortedTerms.map((term, idx) => {
                    const range = [formatDate(term.startOn, intl), formatDate(term.endOn, intl)]
                        .filter(Boolean)
                        .join(' – ');
                    return (
                        <li key={term.id || term.code || idx} className={classes.term}>
                            <span className={classes.termTitle}>
                                {term.title || term.code || '(unnamed term)'}
                            </span>
                            <span className={classes.termMeta}>
                                {term.code && (
                                    <span className={classes.termCode}>{term.code}</span>
                                )}
                                {term.code && range && <span aria-hidden="true">·</span>}
                                {range && <span className={classes.termDates}>{range}</span>}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </Box>
    );
};

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(EthosFetchCard, styles, { name: 'EthosFetchCard' }));
