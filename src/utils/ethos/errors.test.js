// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { EthosError, ErrorCategory, normalizeError } from './errors';

describe('normalizeError', () => {
  it('returns EthosError instances unchanged', () => {
    const original = new EthosError({ message: 'x', category: ErrorCategory.AUTH });
    expect(normalizeError(original)).toBe(original);
  });

  it('classifies AbortError as timeout', () => {
    const abortError = new Error('aborted');
    abortError.name = 'AbortError';
    expect(normalizeError(abortError).category).toBe(ErrorCategory.TIMEOUT);
  });

  it('classifies TypeError as network', () => {
    expect(normalizeError(new TypeError('Failed to fetch')).category).toBe(
      ErrorCategory.NETWORK,
    );
  });

  it.each([
    [401, ErrorCategory.AUTH],
    [403, ErrorCategory.AUTH],
    [404, ErrorCategory.VALIDATION],
    [422, ErrorCategory.VALIDATION],
    [500, ErrorCategory.SERVER],
    [503, ErrorCategory.SERVER],
    [504, ErrorCategory.TIMEOUT],
  ])('classifies HTTP %d as %s', (status, expected) => {
    expect(normalizeError({ status, statusText: 'x' }).category).toBe(expected);
  });

  it('exposes a translation-friendly userMessage for each category', () => {
    Object.values(ErrorCategory).forEach((category) => {
      const err = new EthosError({ category });
      expect(err.userMessage.key).toMatch(/^ethos\.error\./);
      expect(err.userMessage.fallback).toEqual(expect.any(String));
    });
  });
});
