// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { useCallback, useEffect, useState } from 'react';
import { useCardInfo, useData } from '@ellucian/experience-extension-utils';

import { fetchAcademicPeriods } from '../data/academicPeriods';

/**
 * Domain hook for the EthosFetchCard.
 *
 * Reads the pipeline name from the card configuration (extension-level
 * or card-level — see useExtensionConfig) and exposes the canonical
 * `{ data, isLoading, isRefreshing, isError, error, refresh }` shape.
 */
export const useAcademicPeriods = () => {
    const { authenticatedEthosFetch } = useData() || {};
    const cardInfo = useCardInfo() || {};
    const pipeline =
        cardInfo.configuration?.client?.termsPipeline ||
        cardInfo.configuration?.termsPipeline ||
        process.env.PIPELINE_GET_TERMS;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(
        async (isRefresh = false) => {
            if (!authenticatedEthosFetch) return;
            if (isRefresh) setIsRefreshing(true);
            else setIsLoading(true);
            setIsError(false);
            setError(null);

            const controller = new AbortController();
            const result = await fetchAcademicPeriods({
                authenticatedEthosFetch,
                pipeline,
                signal: controller.signal,
            });

            if (result.status === 'success') {
                setData(result.data);
            } else {
                setIsError(true);
                setError(result.error);
            }
            setIsLoading(false);
            setIsRefreshing(false);
        },
        [authenticatedEthosFetch, pipeline],
    );

    useEffect(() => {
        load(false);
    }, [load]);

    const refresh = useCallback(() => load(true), [load]);

    return { data, isLoading, isRefreshing, isError, error, refresh };
};
