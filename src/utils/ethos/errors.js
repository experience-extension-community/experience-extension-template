// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Normalized errors for any Ethos / Experience-side fetch failure.
//
// Ethos and Data Connect surface errors in several different shapes
// depending on which gateway, version, and content type was hit. The
// rest of the codebase should never have to branch on those shapes;
// it should ask three things:
//
//   1. Did this fail?  -> error instanceof EthosError
//   2. Why did it fail? -> error.category   (auth | network | server | validation | timeout | unknown)
//   3. What do I show the user? -> error.userMessage  (i18n-ready key + fallback)

export const ErrorCategory = Object.freeze({
  AUTH: 'auth',
  NETWORK: 'network',
  SERVER: 'server',
  VALIDATION: 'validation',
  TIMEOUT: 'timeout',
  UNKNOWN: 'unknown',
});

export class EthosError extends Error {
  constructor({ message, category, status, cause, requestId } = {}) {
    super(message || 'Ethos request failed');
    this.name = 'EthosError';
    this.category = category || ErrorCategory.UNKNOWN;
    this.status = typeof status === 'number' ? status : null;
    this.requestId = requestId || null;
    if (cause) this.cause = cause;
  }

  /**
   * A stable, translation-friendly message key plus a default English
   * fallback. Components can pass `key` to react-intl, or render
   * `fallback` directly.
   */
  get userMessage() {
    switch (this.category) {
      case ErrorCategory.AUTH:
        return { key: 'ethos.error.auth', fallback: 'You are not authorized for this data.' };
      case ErrorCategory.NETWORK:
        return { key: 'ethos.error.network', fallback: 'Cannot reach the server. Check your connection and try again.' };
      case ErrorCategory.TIMEOUT:
        return { key: 'ethos.error.timeout', fallback: 'The request timed out. Please try again.' };
      case ErrorCategory.SERVER:
        return { key: 'ethos.error.server', fallback: 'The server returned an error. Please try again later.' };
      case ErrorCategory.VALIDATION:
        return { key: 'ethos.error.validation', fallback: 'The request could not be processed.' };
      default:
        return { key: 'ethos.error.unknown', fallback: 'An unexpected error occurred.' };
    }
  }
}

const categoryFromStatus = (status) => {
  if (status === 401 || status === 403) return ErrorCategory.AUTH;
  if (status === 408 || status === 504) return ErrorCategory.TIMEOUT;
  if (status === 422 || (status >= 400 && status < 500)) return ErrorCategory.VALIDATION;
  if (status >= 500) return ErrorCategory.SERVER;
  return ErrorCategory.UNKNOWN;
};

/**
 * Convert anything thrown or returned-as-error inside a fetch flow into
 * an EthosError. Idempotent — passing in an EthosError returns it as-is.
 */
export const normalizeError = (input) => {
  if (input instanceof EthosError) return input;

  // AbortController-driven timeouts surface as DOMException 'AbortError'.
  if (input && (input.name === 'AbortError' || input.code === 20)) {
    return new EthosError({
      message: 'Request aborted',
      category: ErrorCategory.TIMEOUT,
      cause: input,
    });
  }

  // Native fetch network failures are TypeErrors with a message like 'Failed to fetch'.
  if (input instanceof TypeError) {
    return new EthosError({
      message: input.message,
      category: ErrorCategory.NETWORK,
      cause: input,
    });
  }

  // HTTP-shaped error: { status, statusText, body, requestId }.
  if (input && typeof input.status === 'number') {
    return new EthosError({
      message: input.statusText || `HTTP ${input.status}`,
      category: categoryFromStatus(input.status),
      status: input.status,
      requestId: input.requestId,
      cause: input.cause,
    });
  }

  return new EthosError({
    message: input?.message || String(input),
    category: ErrorCategory.UNKNOWN,
    cause: input instanceof Error ? input : undefined,
  });
};
