// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Domain hook for the academic-periods pipeline. Used by both the
// dashboard card (EthosFetchCard) and the page-sized view
// (TermsPage). Returns data already sorted via sortAcademicPeriods
// so consumers never reorder their own copy and the two surfaces
// can never disagree.
//
// TODO(roadmap): wrap this in `useCache` from
// @ellucian/experience-extension-utils so the dashboard and the
// page share a browser-cached copy scoped by extensionId|cardId.
// Today every mount re-runs the pipeline; the underlying
// `ethosProxyGet` segment caches server-side for 300s, but adding
// `useCache` on top would skip the network entirely on warm
// navigations between EthosFetchCard and TermsPage. Sketch:
//
//   const cache = useCache();
//   const cached = cache.getItem({ key: 'academic-periods' });
//   if (cached) setRawData(cached);
//   ...
//   if (result.status === 'success') {
//     setRawData(result.data);
//     cache.storeItem({ key: 'academic-periods', data: result.data });
//   }
//
// `refresh()` should bypass the cache (force re-fetch) and overwrite.

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useData, useCardInfo } from '@ellucian/experience-extension-utils';

import { fetchAcademicPeriods } from '../data/academicPeriods';
import { sortAcademicPeriods } from '../data/sortAcademicPeriods';

/**
 * Domain hook for the academic-periods pipeline.
 *
 * @returns {{
 *   data: Array,
 *   isLoading: boolean,
 *   isRefreshing: boolean,
 *   isError: boolean,
 *   refresh: Function
 * }}
 */
export function useAcademicPeriods() {
    const { authenticatedEthosFetch } = useData();
    const { cardId, configuration } = useCardInfo();

    const pipeline =
        configuration?.termsPipeline || process.env.PIPELINE_GET_TERMS;

    const [rawData, setRawData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);

    const loadData = useCallback(
        async (isRefresh = false) => {
            if (!authenticatedEthosFetch) return;

            if (isRefresh) setIsRefreshing(true);
            else setIsLoading(true);
            setIsError(false);

            try {
                const result = await fetchAcademicPeriods({
                    authenticatedEthosFetch,
                    cardId,
                    pipeline,
                });
                if (result.status === 'success') {
                    setRawData(Array.isArray(result.data) ? result.data : []);
                } else {
                    setIsError(true);
                    setRawData([]);
                }
            } catch {
                setIsError(true);
                setRawData([]);
            } finally {
                setIsLoading(false);
                setIsRefreshing(false);
            }
        },
        [authenticatedEthosFetch, cardId, pipeline],
    );

    useEffect(() => {
        loadData(false);
    }, [loadData]);

    const refresh = useCallback(() => {
        loadData(true);
    }, [loadData]);

    const data = useMemo(() => sortAcademicPeriods(rawData), [rawData]);

    return { data, isLoading, isRefreshing, isError, refresh };
}
