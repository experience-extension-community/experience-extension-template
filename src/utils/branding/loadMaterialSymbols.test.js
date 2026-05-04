// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
import { loadMaterialSymbolsCSS } from './loadMaterialSymbols';

describe('loadMaterialSymbolsCSS', () => {
    beforeEach(() => {
        document.head.innerHTML = '';
    });

    it('injects the stylesheet exactly once on success', async () => {
        // Arrange: stub onload to fire synchronously after appendChild.
        const originalAppend = document.head.appendChild.bind(document.head);
        document.head.appendChild = jest.fn((node) => {
            const result = originalAppend(node);
            if (node.tagName === 'LINK') {
                queueMicrotask(() => {
                    if (typeof node.onload === 'function') node.onload();
                });
            }
            return result;
        });

        const ok1 = await loadMaterialSymbolsCSS();
        const ok2 = await loadMaterialSymbolsCSS();
        expect(ok1).toBe(true);
        expect(ok2).toBe(true);

        document.head.appendChild = originalAppend;
    });
});
