// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Authenticated Ethos fetch helper.
//
// Wraps the SDK's `authenticatedEthosFetch` with:
//   - timeout (default 15s) via AbortController
//   - retry with exponential backoff for transient failures
//   - normalized errors (see ./errors.js)
//   - automatic JSON parsing when the response is JSON
//
// `authenticatedEthosFetch` itself comes from `useDataQuery` /
// `useData` in the Experience SDK. This helper accepts the bound
// fetcher as its first argument so it can be tested in isolation
// and used from outside React.

import { EthosError, ErrorCategory, normalizeError } from './errors';

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 500;

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const isRetryable = (err) =>
  err instanceof EthosError &&
  (err.category === ErrorCategory.NETWORK ||
    err.category === ErrorCategory.TIMEOUT ||
    err.category === ErrorCategory.SERVER);

const parseBody = async (response) => {
  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType.includes('application/json') || contentType.includes('+json')) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
  try {
    return await response.text();
  } catch (_err) {
    return null;
  }
};

/**
 * @param {Function} authenticatedEthosFetch  bound fetcher from useData()
 * @param {string}   url
 * @param {object}   [options]
 * @param {number}   [options.timeoutMs]
 * @param {number}   [options.maxRetries]
 * @param {AbortSignal} [options.signal]   caller-controlled abort
 * @param {object}   [options.fetchOptions]  passed through to fetch
 * @returns {Promise<{ data, status, requestId }>}
 * @throws  {EthosError}
 */
export const authenticatedFetch = async (
  authenticatedEthosFetch,
  url,
  {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    maxRetries = DEFAULT_MAX_RETRIES,
    signal: callerSignal,
    fetchOptions = {},
  } = {},
) => {
  if (typeof authenticatedEthosFetch !== 'function') {
    throw new EthosError({
      message: 'authenticatedEthosFetch is not available; ensure useData() is wired in.',
      category: ErrorCategory.UNKNOWN,
    });
  }

  let attempt = 0;
  let lastError;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    if (callerSignal) {
      if (callerSignal.aborted) controller.abort();
      else callerSignal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    try {
      const response = await authenticatedEthosFetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const requestId =
          response.headers?.get?.('x-request-id') ||
          response.headers?.get?.('x-correlation-id') ||
          null;
        throw normalizeError({
          status: response.status,
          statusText: response.statusText,
          requestId,
        });
      }

      const data = await parseBody(response);
      const requestId = response.headers?.get?.('x-request-id') || null;
      return { data, status: response.status, requestId };
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = normalizeError(err);

      if (!isRetryable(lastError) || attempt === maxRetries) {
        throw lastError;
      }
      const delay = RETRY_BASE_DELAY_MS * 2 ** attempt;
      await sleep(delay);
      attempt += 1;
    }
  }

  throw lastError; /* istanbul ignore next */
};
