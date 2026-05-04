// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Declarative Ethos-fetch hook.
//
// Usage:
//   const { data, isLoading, error, refetch } = useEthosFetch('/api/foo');
//
// Returns the canonical four-state contract that every consumer in the
// codebase can reason about uniformly. Pairs with the LoadingState /
// ErrorState / EmptyState components, which accept this same shape.

import { useCallback, useEffect, useRef, useState } from 'react';
import { useData } from '@ellucian/experience-extension-utils';
import { authenticatedFetch } from '../utils/ethos';

export const useEthosFetch = (url, options = {}) => {
  const { authenticatedEthosFetch } = useData() || {};
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  // Identity-stable options reference so we don't re-fetch on every render.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const performFetch = useCallback(
    async (signal) => {
      if (!url || !authenticatedEthosFetch) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await authenticatedFetch(authenticatedEthosFetch, url, {
          ...optionsRef.current,
          signal,
        });
        if (signal?.aborted) return;
        setData(result.data);
      } catch (err) {
        if (signal?.aborted) return;
        setError(err);
      } finally {
        if (!signal?.aborted) setIsLoading(false);
      }
    },
    [url, authenticatedEthosFetch],
  );

  useEffect(() => {
    const controller = new AbortController();
    performFetch(controller.signal);
    return () => controller.abort();
  }, [performFetch]);

  const refetch = useCallback(() => performFetch(), [performFetch]);

  return { data, isLoading, error, refetch };
};
