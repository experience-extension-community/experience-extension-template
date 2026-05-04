// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { authenticatedFetch } from '../utils/ethos/authenticatedFetch';
import { normalizeError } from '../utils/ethos/errors';

/**
 * Call the configured Data Connect pipeline that returns academic
 * periods (terms). Used by EthosFetchCard.
 */
export const fetchAcademicPeriods = async ({ authenticatedEthosFetch, pipeline, signal }) => {
    if (!pipeline) {
        return { status: 'error', data: [], error: new Error('No pipeline configured') };
    }
    try {
        const url = `/api/data-connect/v1/pipelines/${encodeURIComponent(pipeline)}/run`;
        const result = await authenticatedFetch(authenticatedEthosFetch, url, {
            signal,
            fetchOptions: {
                method: 'GET',
                headers: { Accept: 'application/vnd.hedtech.integration.v1+json' },
            },
        });
        return {
            status: 'success',
            data: Array.isArray(result.data) ? result.data : [result.data].filter(Boolean),
            error: null,
        };
    } catch (err) {
        return { status: 'error', data: [], error: normalizeError(err) };
    }
};
