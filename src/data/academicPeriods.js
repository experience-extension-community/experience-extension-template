// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { authenticatedFetch } from '../utils/ethos/authenticatedFetch';
import { normalizeError } from '../utils/ethos/errors';

const ETHOS_INTEGRATION_HOST = 'https://integrate.elluciancloud.com';

/**
 * Call the configured Data Connect pipeline that returns academic
 * periods (terms). Used by EthosFetchCard.
 */
export const fetchAcademicPeriods = async ({
    authenticatedEthosFetch,
    cardId,
    pipeline,
    signal,
}) => {
    if (!cardId) {
        return { status: 'error', data: [], error: new Error('Missing cardId from useCardInfo()') };
    }
    if (!pipeline) {
        return { status: 'error', data: [], error: new Error('No pipeline configured') };
    }
    try {
        const url = `${ETHOS_INTEGRATION_HOST}/api/${encodeURIComponent(cardId)}/${encodeURIComponent(pipeline)}`;
        const result = await authenticatedFetch(authenticatedEthosFetch, url, {
            signal,
            fetchOptions: {
                method: 'GET',
                headers: { Accept: 'application/json' },
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
