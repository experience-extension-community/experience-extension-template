// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { formatNumber, formatCurrency, formatPercent } from './numbers';

describe('format/numbers', () => {
  it('returns empty for null/undefined/NaN', () => {
    expect(formatNumber(null)).toBe('');
    expect(formatNumber(undefined)).toBe('');
    expect(formatNumber(Number.NaN)).toBe('');
  });

  it('formats currency in USD by default', () => {
    expect(formatCurrency(1234.5, { locale: 'en-US' })).toBe('$1,234.50');
  });

  it('formats percent with sensible defaults', () => {
    expect(formatPercent(0.85, { locale: 'en-US' })).toBe('85%');
  });
});
