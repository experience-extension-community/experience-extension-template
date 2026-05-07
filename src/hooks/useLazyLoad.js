// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// useLazyLoad — IntersectionObserver-based progressive rendering.
// Returns a `visibleItems` slice of `items`, growing by `increment`
// each time the `triggerRef` element scrolls into view.
//
// Pattern adapted from FloridaPoly/exp-events-studentlife with one
// extension: an optional `rootRef` that lets the observer use a
// scrollable parent (e.g. an overflow-auto card body) instead of
// the viewport. Without it, lazy load doesn't fire when the list
// scrolls inside its own container rather than the page.
//
// Usage:
//   const listRef = useRef(null);
//   const { visibleItems, hasMore, isLoading, triggerRef } =
//       useLazyLoad(items, 5, 5, listRef);
//
//   <ul ref={listRef} className={classes.list}>
//       {visibleItems.map(…)}
//       {hasMore && <li ref={triggerRef}>Loading more…</li>}
//   </ul>

import { useState, useEffect, useRef, useCallback } from 'react';

export const useLazyLoad = (
    items,
    initialCount = 5,
    increment = 5,
    rootRef = null,
) => {
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const [isLoading, setIsLoading] = useState(false);
    const triggerRef = useRef(null);

    const total = items.length;

    const loadMore = useCallback(() => {
        if (visibleCount < total) {
            setIsLoading(true);
            // Tiny delay so consumers can flash the loading row.
            setTimeout(() => {
                setVisibleCount((prev) => Math.min(prev + increment, total));
                setIsLoading(false);
            }, 100);
        }
    }, [visibleCount, total, increment]);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMore();
                }
            },
            {
                root: (rootRef && rootRef.current) || null,
                threshold: 0.1,
            },
        );
        observer.observe(trigger);

        return () => {
            observer.unobserve(trigger);
        };
    }, [loadMore, isLoading, rootRef]);

    return {
        visibleItems: items.slice(0, visibleCount),
        hasMore: visibleCount < total,
        isLoading,
        triggerRef,
        visibleCount,
        totalCount: total,
    };
};
