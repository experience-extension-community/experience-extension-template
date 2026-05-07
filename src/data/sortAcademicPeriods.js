// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// sortAcademicPeriods — single source of truth for term ordering.
//
// Both EthosFetchCard (dashboard) and TermsPage (page) render the
// same data and must share the same order. Sorting lives here so
// neither consumer reorders its own copy.
//
// Order:
//   1. By category. Known order: 'term' → 'subterm' → anything else
//      → 'year' (year is ALWAYS last regardless of what else exists).
//   2. Within a category: alpha-leading titles first, digit-leading
//      titles second.
//   3. Within the digit-leading group: by leading number DESCENDING
//      (newest year first). Without this, locale-aware string compare
//      gives messy results for hyphenated ranges like "2024-2025".
//   4. Within the alpha group: locale-aware natural alphabetical.

const CATEGORY_RANK = { term: 0, subterm: 1 };

const rankOfCategory = (cat) => {
    const key = String(cat || '').toLowerCase();
    if (key === 'year') return 999;
    if (CATEGORY_RANK[key] !== undefined) return CATEGORY_RANK[key];
    return 50;
};

const startsWithDigit = (s) => /^\d/.test(String(s || '').trim());

const extractLeadingNumber = (s) => {
    const m = String(s || '')
        .trim()
        .match(/^(\d+)/);
    return m ? parseInt(m[1], 10) : null;
};

export const sortAcademicPeriods = (data) => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => {
        const cr = rankOfCategory(a?.category) - rankOfCategory(b?.category);
        if (cr !== 0) return cr;

        const aTitle = String(a?.title || '');
        const bTitle = String(b?.title || '');
        const aDigit = startsWithDigit(aTitle);
        const bDigit = startsWithDigit(bTitle);
        if (aDigit !== bDigit) return aDigit ? 1 : -1;

        if (aDigit) {
            const aNum = extractLeadingNumber(aTitle);
            const bNum = extractLeadingNumber(bTitle);
            if (aNum !== null && bNum !== null && aNum !== bNum) {
                return bNum - aNum; // newest year first
            }
        }

        return aTitle.localeCompare(bTitle, undefined, {
            numeric: true,
            sensitivity: 'base',
        });
    });
};
