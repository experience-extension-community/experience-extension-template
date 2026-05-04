// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { useEffect } from 'react';
import { ensureTypekitFont } from '../utils/branding/fontLoader';

/**
 * React hook wrapper that injects the Typekit stylesheet on mount.
 * Idempotent — safe to call from multiple components.
 */
export const useTypekitFont = () => {
    useEffect(() => {
        ensureTypekitFont();
    }, []);
};
