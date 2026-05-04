// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Data-layer fetchers. No React. Each function takes the SDK's
// `authenticatedEthosFetch` and returns a normalized result envelope
// that hooks can reason about uniformly.

import { authenticatedFetch } from '../utils/ethos/authenticatedFetch';
import { normalizeError } from '../utils/ethos/errors';

/**
 * Call the configured Data Connect pipeline that returns persons.
 *
 * @param {object} args
 * @param {Function} args.authenticatedEthosFetch  bound from useData()
 * @param {string}  args.pipeline   pipeline name (e.g. 'eec-template-persons-get')
 * @param {string}  [args.cardId]   for cache scoping by SDK
 * @param {AbortSignal} [args.signal]
 * @returns {Promise<{status:'success'|'error', data:Array, error:Error|null}>}
 */
export const fetchPersons = async ({ authenticatedEthosFetch, pipeline, signal }) => {
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
