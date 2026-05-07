// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// useCopyToClipboard — transient copy-with-confirmation state.
//
// Returns the id of the most recently copied row (so callers can
// flash a per-row "copied" affordance) and a `copy(id, value)`
// callback that writes to the clipboard and auto-clears after
// `resetMs` (default 1500ms). Failures from the clipboard API are
// swallowed silently — the UI still flashes.

import { useCallback, useState } from 'react';

export function useCopyToClipboard({ resetMs = 1500 } = {}) {
    const [copiedId, setCopiedId] = useState(null);

    const copy = useCallback(
        (id, value) => {
            if (!value) return;
            if (
                typeof navigator !== 'undefined' &&
                navigator.clipboard?.writeText
            ) {
                navigator.clipboard.writeText(value).catch(() => {
                    /* clipboard blocked — silently noop, copied UI still flashes */
                });
            }
            setCopiedId(id);
            setTimeout(
                () => setCopiedId((prev) => (prev === id ? null : prev)),
                resetMs,
            );
        },
        [resetMs],
    );

    return { copiedId, copy };
}
