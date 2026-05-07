// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Domain hook for the academic-periods pipeline. Used by both the
// dashboard card (EthosFetchCard) and the page-sized view
// (TermsPage). Returns data already sorted via sortAcademicPeriods
// so consumers never reorder their own copy and the two surfaces
// can never disagree.
//
// Caching (stale-while-revalidate):
//   - On mount, the hook reads `useCache()` for a previous
//     successful response. If found, it sets `data` immediately,
//     drops `isLoading`, and fires a background refresh.
//   - Background refresh sets `isRefreshing` (NOT `isLoading`).
//     Components show the cached data while the indicator runs.
//   - On success, the cache is overwritten with the fresh data
//     and a `lastUpdated` timestamp.
//   - On failure of a background refresh, cached data stays on
//     screen and `showRefreshError` flashes for 5 seconds.
//   - `refresh()` is a manual refresh — it skips the cache read
//     and forces a network fetch.
//
// A custom `scope: 'eec-academic-periods'` is passed to
// getItem/storeItem so the dashboard card and the page share the
// SAME cache (their default cardId scopes would otherwise be
// distinct, defeating warm-navigation cache hits).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    useCache,
    useCardInfo,
    useData,
} from '@ellucian/experience-extension-utils';

import { fetchAcademicPeriods } from '../data/academicPeriods';
import { sortAcademicPeriods } from '../data/sortAcademicPeriods';

const CACHE_KEY = 'academic-periods';
const CACHE_SCOPE = 'eec-academic-periods';
const REFRESH_ERROR_FLASH_MS = 5000;

/**
 * Domain hook for the academic-periods pipeline.
 *
 * @returns {{
 *   data: Array,
 *   isLoading: boolean,
 *   isRefreshing: boolean,
 *   isError: boolean,
 *   error: any,
 *   lastUpdated: number | null,
 *   showRefreshError: boolean,
 *   refresh: Function,
 * }}
 */
export function useAcademicPeriods() {
    const { authenticatedEthosFetch } = useData();
    const { cardId, configuration } = useCardInfo();
    const cache = useCache() || {};
    const { getItem, storeItem } = cache;

    const pipeline =
        configuration?.termsPipeline || process.env.PIPELINE_GET_TERMS;

    const [rawData, setRawData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [showRefreshError, setShowRefreshError] = useState(false);

    const hasFetchedOnMount = useRef(false);
    const refreshErrorTimeoutId = useRef(null);
    const currentDataRef = useRef(rawData);

    useEffect(() => {
        currentDataRef.current = rawData;
    }, [rawData]);

    const loadData = useCallback(
        async (isManualRefresh = false) => {
            if (!authenticatedEthosFetch) return;

            setIsError(false);
            setError(null);
            setShowRefreshError(false);
            clearTimeout(refreshErrorTimeoutId.current);

            // Try cache first (skip on manual refresh).
            let hasCachedData = false;
            if (!isManualRefresh && typeof getItem === 'function') {
                const cached = getItem({ key: CACHE_KEY, scope: CACHE_SCOPE });
                if (cached?.data) {
                    setRawData(Array.isArray(cached.data) ? cached.data : []);
                    setLastUpdated(cached.lastUpdated || null);
                    setIsLoading(false);
                    hasCachedData = true;
                }
            }

            // Always fetch fresh. Loading vs refreshing depends on
            // whether we already have something to show.
            if (hasCachedData || currentDataRef.current.length > 0) {
                setIsRefreshing(true);
            } else {
                setIsLoading(true);
            }

            try {
                const result = await fetchAcademicPeriods({
                    authenticatedEthosFetch,
                    cardId,
                    pipeline,
                });

                if (result.status === 'success') {
                    const fresh = Array.isArray(result.data) ? result.data : [];
                    const timestamp = Date.now();
                    setRawData(fresh);
                    setLastUpdated(timestamp);
                    if (typeof storeItem === 'function') {
                        storeItem({
                            key: CACHE_KEY,
                            scope: CACHE_SCOPE,
                            data: fresh,
                            lastUpdated: timestamp,
                        });
                    }
                } else if (hasCachedData) {
                    // Keep cached data showing; flash a refresh error.
                    setShowRefreshError(true);
                    refreshErrorTimeoutId.current = setTimeout(() => {
                        setShowRefreshError(false);
                    }, REFRESH_ERROR_FLASH_MS);
                } else {
                    setIsError(true);
                    setError(result.error || null);
                    setRawData([]);
                }
            } catch (err) {
                if (hasCachedData) {
                    setShowRefreshError(true);
                    refreshErrorTimeoutId.current = setTimeout(() => {
                        setShowRefreshError(false);
                    }, REFRESH_ERROR_FLASH_MS);
                } else {
                    setIsError(true);
                    setError(err);
                    setRawData([]);
                }
            } finally {
                setIsLoading(false);
                setIsRefreshing(false);
            }
        },
        [authenticatedEthosFetch, cardId, pipeline, getItem, storeItem],
    );

    useEffect(() => {
        if (!hasFetchedOnMount.current) {
            hasFetchedOnMount.current = true;
            loadData(false);
        }
    }, [loadData]);

    useEffect(
        () => () => {
            clearTimeout(refreshErrorTimeoutId.current);
        },
        [],
    );

    const refresh = useCallback(() => {
        loadData(true);
    }, [loadData]);

    const data = useMemo(() => sortAcademicPeriods(rawData), [rawData]);

    return {
        data,
        isLoading,
        isRefreshing,
        isError,
        error,
        lastUpdated,
        showRefreshError,
        refresh,
    };
}
