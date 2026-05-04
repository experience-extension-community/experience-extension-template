// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Locale-aware date formatting. Built on Intl.DateTimeFormat — no
// moment, no dayjs, no extra dependency.
//
// Locale comes from `userInfo.locale` (Experience SDK). Fall back to
// `navigator.language`, then `'en-US'`.

const resolveLocale = (locale) => {
  if (locale) return locale;
  if (typeof navigator !== 'undefined' && navigator.language) return navigator.language;
  return 'en-US';
};

const toDate = (value) => (value instanceof Date ? value : new Date(value));

const PRESETS = {
  short: { year: 'numeric', month: 'short', day: 'numeric' },
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  weekday: { weekday: 'long', month: 'long', day: 'numeric' },
  time: { hour: 'numeric', minute: '2-digit' },
  datetime: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  },
};

/**
 * @param {Date|string|number} value
 * @param {object} [options]
 * @param {string} [options.locale]
 * @param {keyof PRESETS|Intl.DateTimeFormatOptions} [options.preset='short']
 */
export const formatDate = (value, { locale, preset = 'short' } = {}) => {
  if (value === null || value === undefined || value === '') return '';
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return '';
  const opts = typeof preset === 'string' ? PRESETS[preset] || PRESETS.short : preset;
  return new Intl.DateTimeFormat(resolveLocale(locale), opts).format(date);
};
