// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Stable unique IDs for ARIA wiring (`aria-labelledby`, `aria-describedby`).
//
// React 18+ exposes `useId()` natively — prefer that in components.
// This helper exists for non-React contexts and tests.

let counter = 0;

export const uniqueId = (prefix = 'eec') => {
  counter += 1;
  return `${prefix}-${counter}`;
};

/* istanbul ignore next */
export const __resetForTests = () => {
  counter = 0;
};
