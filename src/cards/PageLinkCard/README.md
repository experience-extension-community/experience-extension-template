# PageLinkCard

Demonstrates card → page navigation.

The card itself is intentionally minimal — most of the rendering work
happens on the page (see `src/pages/SamplePage/`).

Key wires:

- `extension.js` declares `pageRoute: { route: '/sample', excludeClickSelectors: ['a','button'] }` for this card.
- The card calls `useCardControl().navigateToPage({ route: '/' })` to launch the page programmatically. (The pageRoute also enables click-anywhere navigation for areas not in `excludeClickSelectors`.)
- The page's entry is `extension.js`'s top-level `page.source` —
  `'./src/pages/SamplePage/router.jsx'`.
