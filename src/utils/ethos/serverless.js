// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Data Connect serverless API helper.
//
// Builds the correct `Accept` header for the `application/vnd.hedtech.integration.v1+json`
// media type and routes the call through `authenticatedFetch` so it
// inherits the retry / timeout / error-normalization behavior.

import { authenticatedFetch } from './authenticatedFetch';

const HEDTECH_INTEGRATION_V1 = 'application/vnd.hedtech.integration.v1+json';

/**
 * Call a Data Connect serverless pipeline.
 *
 * @param {Function} authenticatedEthosFetch  from useData()
 * @param {string}   pipelineUrl
 * @param {object}   [options]
 * @param {object}   [options.body]   request body (will be JSON.stringified)
 * @param {string}   [options.method='POST']
 * @param {object}   [options.headers]
 * @param {number}   [options.timeoutMs]
 * @param {number}   [options.maxRetries]
 */
export const callServerlessPipeline = async (
  authenticatedEthosFetch,
  pipelineUrl,
  { body, method = 'POST', headers = {}, timeoutMs, maxRetries } = {},
) =>
  authenticatedFetch(authenticatedEthosFetch, pipelineUrl, {
    timeoutMs,
    maxRetries,
    fetchOptions: {
      method,
      headers: {
        Accept: HEDTECH_INTEGRATION_V1,
        'Content-Type': HEDTECH_INTEGRATION_V1,
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
  });
