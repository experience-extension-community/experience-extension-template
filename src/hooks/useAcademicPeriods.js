// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Pattern adapted byte-for-byte from FloridaPoly/exp-account-details-custom
// (src/hooks/useAccountDetails.js).

import { useState, useEffect, useCallback } from 'react';
import { useData, useCardInfo } from '@ellucian/experience-extension-utils';

import { fetchAcademicPeriods } from '../data/academicPeriods';

/**
 * Domain hook for the EthosFetchCard.
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

    const [data, setData] = useState([]);
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
                    setData(Array.isArray(result.data) ? result.data : []);
                } else {
                    setIsError(true);
                    setData([]);
                }
            } catch {
                setIsError(true);
                setData([]);
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

    return { data, isLoading, isRefreshing, isError, refresh };
}
