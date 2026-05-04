// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
import { iconStyle, ICON_FONT_FAMILY } from './icons';

describe('iconStyle', () => {
    it('produces a Material Symbols Outlined font binding', () => {
        const style = iconStyle({ size: 32, weight: 700, fill: 1, grade: 200 });
        expect(style.fontFamily).toBe(ICON_FONT_FAMILY);
        expect(style.fontSize).toBe('32px');
        expect(style.fontVariationSettings).toContain('"FILL" 1');
        expect(style.fontVariationSettings).toContain('"wght" 700');
        expect(style.fontVariationSettings).toContain('"GRAD" 200');
        expect(style.fontVariationSettings).toContain('"opsz" 32');
    });

    it('falls back to sensible defaults', () => {
        const style = iconStyle();
        expect(style.fontSize).toBe('24px');
        expect(style.fontVariationSettings).toContain('"FILL" 0');
        expect(style.fontVariationSettings).toContain('"wght" 400');
    });
});
