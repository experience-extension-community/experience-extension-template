// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// EthosFetchCard — fetches active academic terms via a Data Connect
// pipeline and renders them as a list. Demonstrates the canonical
// fetch lifecycle: loading → error / empty / data, with refresh.
//
// Data is pre-sorted by useAcademicPeriods (shared with TermsPage).

import React, { useEffect } from 'react';
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
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import { brandColors, BRAND_FONT_STACK } from '../../utils/branding/brandColors';
import { useTypekitFont } from '../../hooks/useTypekitFont';
import { useMaterialIconFonts } from '../../hooks/useMaterialIconFonts';

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

    const { data, isLoading, isRefreshing, isError, error, refresh } =
        useAcademicPeriods();
    const { copiedId, copy } = useCopyToClipboard();

    useEffect(() => {
        if (typeof setLoadingStatus === 'function') {
            setLoadingStatus(isLoading);
        }
    }, [isLoading, setLoadingStatus]);

    let body;
    if (isLoading) {
        body = <LoadingState />;
    } else if (isError) {
        body = <ErrorState error={error} onRetry={refresh} />;
    } else if (!data || data.length === 0) {
        body = (
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
        );
    } else {
        body = (
            <>
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
                    {data.map((term, idx) => {
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
                                  onClick: () => copy(rowKey, term.code),
                                  'aria-label': copyableLabel,
                                  title: copyableLabel,
                              }
                            : {};
                        const range = [
                            formatDate(term.startOn, intl),
                            formatDate(term.endOn, intl),
                        ]
                            .filter(Boolean)
                            .join(' – ');
                        return (
                            <li key={rowKey} className={classes.term}>
                                <Wrapper
                                    {...wrapperProps}
                                    className={`${
                                        term.code
                                            ? classes.termAction
                                            : classes.termActionStatic
                                    }${isCopied ? ` ${classes.termActionCopied}` : ''}`}
                                >
                                    <span className={classes.termTitle}>
                                        {term.title || term.code || '(unnamed term)'}
                                    </span>
                                    <span className={classes.termMeta}>
                                        <span className={classes.termDates}>
                                            {range || ' '}
                                        </span>
                                        {term.code && (
                                            <span className={classes.termCodeGroup}>
                                                <span className={classes.termCode}>
                                                    {term.code}
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className={`${classes.copyIcon}${
                                                        isCopied
                                                            ? ` ${classes.copyIconCopied}`
                                                            : ''
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
            </>
        );
    }

    return <Box className={classes.root}>{body}</Box>;
};

EthosFetchCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withIntl(withStyles(EthosFetchCard, styles, { name: 'EthosFetchCard' }));
