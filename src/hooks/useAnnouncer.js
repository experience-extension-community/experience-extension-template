// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { useCallback } from 'react';
import { announce } from '../utils/a11y';

/**
 * React-friendly wrapper around the imperative `announce` helper.
 *
 *   const announceMessage = useAnnouncer();
 *   announceMessage('Saved.', { priority: 'polite' });
 */
export const useAnnouncer = () =>
  useCallback((message, options) => announce(message, options), []);
