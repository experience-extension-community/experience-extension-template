// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Data-layer fetchers. No React. Each function takes the SDK's
// `authenticatedEthosFetch` and returns a normalized result envelope
// that hooks can reason about uniformly.
//
// DataConnect pipeline invocation URL is `/api/{pipelineName}` —
// the Ellucian Experience SDK's `authenticatedEthosFetch` resolves
// that against the tenant Ethos integration host. This is the same
// path used by Ellucian's official sdk-samples and every working
// FL Poly extension.

import { authenticatedFetch } from '../utils/ethos/authenticatedFetch';
import { normalizeError } from '../utils/ethos/errors';

const ETHOS_INTEGRATION_HOST = 'https://integrate.elluciancloud.com';

/**
 * Call the configured Data Connect pipeline that returns persons.
 *
 * @param {object} args
 * @param {Function} args.authenticatedEthosFetch  bound from useData()
 * @param {string}  args.cardId     from useCardInfo()
 * @param {string}  args.pipeline   pipeline name (e.g. 'eec-template-persons-get')
 * @param {AbortSignal} [args.signal]
 * @returns {Promise<{status:'success'|'error', data:Array, error:Error|null}>}
 */
export const fetchPersons = async ({ authenticatedEthosFetch, cardId, pipeline, signal }) => {
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
