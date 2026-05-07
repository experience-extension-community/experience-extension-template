// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — fetches active academic terms via a Data Connect
// pipeline and renders them as a list. Demonstrates the canonical
// fetch lifecycle: loading → error / empty / data, with refresh.
//
// EDS 8.x: withStyles(Component, styles, { name }) + withIntl outermost.

import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import DebugHooksDialog from '../../components/common/DebugHooksDialog';
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
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    termAction: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
        width: '100%',
        padding: `${spacing20} ${spacing30}`,
        margin: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'background-color 120ms ease-out',
        '&:hover': { backgroundColor: brandColors.surfaceMuted },
        '&:hover $copyIcon': { color: brandColors.primary },
        '&:focus-visible': {
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
            backgroundColor: brandColors.surfaceMuted,
        },
    },
    termActionStatic: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing10,
        padding: `${spacing20} ${spacing30}`,
    },
    termActionCopied: {
        backgroundColor: `${brandColors.success}14`,
        '&:hover': { backgroundColor: `${brandColors.success}22` },
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing30,
    },
    termDates: {
        fontFamily: BRAND_FONT_STACK,
        fontSize: '0.75rem',
        color: brandColors.textSecondary,
        fontVariantNumeric: 'tabular-nums',
        flex: '1 1 auto',
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    termCodeGroup: {
        flex: '0 0 auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing20,
    },
    termCode: {
        fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: brandColors.textPrimary,
        letterSpacing: '0.02em',
    },
    copyIcon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1.25rem',
        fontVariationSettings: '"FILL" 0, "wght" 500, "GRAD" 0, "opsz" 24',
        lineHeight: 1,
        color: brandColors.textMuted,
        transition: 'color 120ms ease-out',
    },
    copyIconCopied: {
        color: brandColors.success,
    },
    debugButton: {
        position: 'absolute',
        bottom: spacing20,
        right: spacing20,
        zIndex: 1,
        width: 24,
        height: 24,
        padding: 0,
        background: 'transparent',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: brandColors.textMuted,
        opacity: 0.3,
        transition:
            'opacity 120ms ease-out, color 120ms ease-out, background-color 120ms ease-out',
        '&:hover': {
            opacity: 1,
            color: brandColors.primary,
            backgroundColor: brandColors.surfaceMuted,
        },
        '&:focus-visible': {
            opacity: 1,
            outline: `2px solid ${brandColors.focusRing}`,
            outlineOffset: 1,
        },
    },
    debugIcon: {
        fontFamily: 'Material Symbols Outlined',
        fontSize: '1rem',
        lineHeight: 1,
    },
});

const formatDate = (iso, intl) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return intl.formatDate(d, { year: 'numeric', month: 'short', day: 'numeric' });
};

// Extracts the leading run of digits from a title (e.g. "2024-2025" → 2024).
// Used to sort digit-leading titles deterministically by their year value.
const extractLeadingNumber = (s) => {
    const m = String(s || '').trim().match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : null;
};

const startsWithDigit = (s) => /^\d/.test(String(s || '').trim());

const EthosFetchCard = (props) => {
    const { classes } = props;
    const intl = useIntl();
    const { setLoadingStatus } = useExtensionControl() || {};
    const [debugOpen, setDebugOpen] = useState(false);

    useTypekitFont();
    useMaterialIconFonts();

    const { data, isLoading, isRefreshing, isError, error, refresh } = useAcademicPeriods();

    const [copiedId, setCopiedId] = useState(null);
    const copyCode = useCallback((id, code) => {
        if (!code) return;
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(code).catch(() => {
                /* clipboard blocked — silently noop, copied UI still flashes */
            });
        }
        setCopiedId(id);
        setTimeout(
            () => setCopiedId((prev) => (prev === id ? null : prev)),
            1500,
        );
    }, []);

    // Sort:
    //   1. By category — 'term' first, 'subterm' second, anything else,
    //      and 'year' ALWAYS last regardless of what else exists.
    //   2. Within category: alpha titles first, digit-leading titles second.
    //   3. Within the digit-leading group: sort by leading number
    //      DESCENDING (newest year first). Without this the year category
    //      is sorted by full-string localeCompare which puts hyphenated
    //      ranges out of intuitive order.
    //   4. Within the alpha group: locale-aware natural alphabetical.
    const sortedTerms = useMemo(() => {
        if (!Array.isArray(data)) return [];
        const CATEGORY_RANK = { term: 0, subterm: 1 };
        const rankOfCategory = (cat) => {
            const key = String(cat || '').toLowerCase();
            if (key === 'year') return 999;
            if (CATEGORY_RANK[key] !== undefined) return CATEGORY_RANK[key];
            return 50;
        };
        return [...data].sort((a, b) => {
            const cr = rankOfCategory(a?.category) - rankOfCategory(b?.category);
            if (cr !== 0) return cr;

            const aTitle = String(a?.title || '');
            const bTitle = String(b?.title || '');
            const aDigit = startsWithDigit(aTitle);
            const bDigit = startsWithDigit(bTitle);
            if (aDigit !== bDigit) return aDigit ? 1 : -1;

            if (aDigit) {
                const aNum = extractLeadingNumber(aTitle);
                const bNum = extractLeadingNumber(bTitle);
                if (aNum !== null && bNum !== null && aNum !== bNum) {
                    return bNum - aNum; // newest year first
                }
            }

            return aTitle.localeCompare(bTitle, undefined, {
                numeric: true,
                sensitivity: 'base',
            });
        });
    }, [data]);

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(isLoading);
        }
    }, [isLoading, setLoadingStatus]);

    const debugButton = (
        <button
            type="button"
            className={classes.debugButton}
            onClick={() => setDebugOpen(true)}
            aria-label="Show hooks and properties"
            title="Show hooks and properties"
        >
            <span aria-hidden="true" className={classes.debugIcon}>
                data_object
            </span>
        </button>
    );

    const debugDialog = debugOpen ? (
        <DebugHooksDialog
            open={debugOpen}
            onClose={() => setDebugOpen(false)}
            cardProps={props}
        />
    ) : null;

    if (isLoading) {
        return (
            <Box className={classes.root}>
                <LoadingState />
                {debugButton}
                {debugDialog}
            </Box>
        );
    }

    if (isError) {
        return (
            <Box className={classes.root}>
                <ErrorState error={error} onRetry={refresh} />
                {debugButton}
                {debugDialog}
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
                {debugButton}
                {debugDialog}
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
                    const rowKey = term.id || term.code || idx;
                    const isCopied = copiedId === rowKey;
                    const copyableLabel = isCopied
                        ? intl.formatMessage({
                              id: 'common.copied',
                              defaultMessage: 'Copied',
                          })
                        : intl.formatMessage(
                              {
                                  id: 'card.ethosFetch.copyCode',
                                  defaultMessage: 'Copy code {code}',
                              },
                              { code: term.code || '' },
                          );
                    const Wrapper = term.code ? 'button' : 'div';
                    const wrapperProps = term.code
                        ? {
                              type: 'button',
                              onClick: () => copyCode(rowKey, term.code),
                              'aria-label': copyableLabel,
                              title: copyableLabel,
                          }
                        : {};
                    const range = [formatDate(term.startOn, intl), formatDate(term.endOn, intl)]
                        .filter(Boolean)
                        .join(' – ');
                    return (
                        <li key={rowKey} className={classes.term}>
                            <Wrapper
                                {...wrapperProps}
                                className={`${
                                    term.code ? classes.termAction : classes.termActionStatic
                                }${isCopied ? ` ${classes.termActionCopied}` : ''}`}
                            >
                                <span className={classes.termTitle}>
                                    {term.title || term.code || '(unnamed term)'}
                                </span>
                                <span className={classes.termMeta}>
                                    <span className={classes.termDates}>{range || ' '}</span>
                                    {term.code && (
                                        <span className={classes.termCodeGroup}>
                                            <span className={classes.termCode}>{term.code}</span>
                                            <span
                                                aria-hidden="true"
                                                className={`${classes.copyIcon}${
                                                    isCopied ? ` ${classes.copyIconCopied}` : ''
                                                }`}
                                            >
                                                {isCopied ? 'check' : 'content_copy'}
                                            </span>
                                        </span>
                                    )}
                                </span>
                            </Wrapper>
                        </li>
                    );
                })}
            </ul>
            {debugButton}
            {debugDialog}
        </Box>
    );
};

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(EthosFetchCard, styles, { name: 'EthosFetchCard' }));
