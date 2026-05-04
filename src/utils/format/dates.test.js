// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { formatDate } from './dates';

describe('formatDate', () => {
  const sample = new Date('2026-05-04T15:30:00Z');

  it('returns an empty string for null/undefined/empty input', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
    expect(formatDate('')).toBe('');
  });

  it('returns an empty string for invalid dates', () => {
    expect(formatDate('not-a-date')).toBe('');
  });

  it('formats with a known preset in en-US', () => {
    const out = formatDate(sample, { locale: 'en-US', preset: 'short' });
    expect(out).toMatch(/2026/);
    expect(out).toMatch(/May/);
  });

  it('respects custom Intl options', () => {
    const out = formatDate(sample, {
      locale: 'en-US',
      preset: { year: 'numeric' },
    });
    expect(out).toBe('2026');
  });
});
