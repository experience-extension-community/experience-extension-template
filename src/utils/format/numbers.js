// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

const resolveLocale = (locale) => {
  if (locale) return locale;
  if (typeof navigator !== 'undefined' && navigator.language) return navigator.language;
  return 'en-US';
};

export const formatNumber = (value, { locale, ...options } = {}) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '';
  return new Intl.NumberFormat(resolveLocale(locale), options).format(value);
};

export const formatCurrency = (value, { locale, currency = 'USD', ...options } = {}) =>
  formatNumber(value, {
    locale,
    style: 'currency',
    currency,
    ...options,
  });

export const formatPercent = (value, { locale, ...options } = {}) =>
  formatNumber(value, {
    locale,
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  });
