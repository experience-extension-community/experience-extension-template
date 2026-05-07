# src/page

Single page module containing four sub-pages plus the router.
Linked to the dashboard via `PageLinkCard`'s `pageRoute` and the
manifest's top-level `page: { source: './src/page/router.jsx' }`.

## Routes

| Route | Component | What it does |
|-------|-----------|--------------|
| `/` | `Home.jsx` | Three-tile hub linking to the sub-pages. |
| `/hooks` | `HooksPage.jsx` | Inspector for every page-context SDK hook. |
| `/terms` | `TermsPage.jsx` | Page-sized academic-periods table with copy buttons. |
| `/links` | `LinksPage.jsx` | Page-sized configurable-links view. |

## Architecture

`router.jsx` is the entry point referenced from `extension.js`:

```js
page: {
    source: './src/page/router.jsx',
    fullWidth: true,
}
```

It does three things:

1. Loads brand fonts (Material Symbols + Typekit) once via
   `loadMaterialSymbolsCSS()` and `ensureTypekitFont()`.
2. Mounts a `<BrowserRouter basename={pageInfo.basePath}>`.
3. Renders the four `<Route>`s.

Sub-pages don't load fonts themselves — they inherit from the
router. They DO each set their page title via
`usePageControl().setPageTitle(...)`.

## Page-side vs card-side hooks

Pages get **page-context** SDK hooks (`usePageInfo`,
`usePageControl`, `useDashboardInfo`, `useExtensionInfo`). The
four cards on the dashboard get **card-context** hooks
(`useCardInfo`, `useCardControl`).

Some hooks work on both surfaces (`useUserInfo`, `useData`,
`useThemeInfo`, `useExtensionControl`).

`HooksPage.jsx` exists specifically as a working reference: every
hook called, every value rendered.

## Page configuration inheritance

Because `extension.js` declares `configuration` at the
**extension** level, every page reads the same `termsPipeline` +
`ethosApiKey` via `useCardInfo()` (same call as cards). No
page-specific configuration block is needed.

If your extension launches a page from a card whose `cardId` is
unfamiliar to a pipeline, the pipeline call returns 400. Fix:
save the extension-level configuration in Experience Manager —
that registers every card's `cardId` with the pipeline. See the
entry in [`docs/TROUBLESHOOTING.md`](../../docs/TROUBLESHOOTING.md).

## TermsPage and LinksPage — same hook as the cards

- `TermsPage` uses `useAcademicPeriods()` — same hook as
  `EthosFetchCard`. The page renders a wider table and a refresh
  button; the data and order are identical.
- `LinksPage` uses `useCardInfo()` to read `customConfiguration`
  — same source as `ConfigurableCard`. When launched from
  `PageLinkCard` (whose card-id has no `customConfiguration`), it
  falls back to a static demo dataset and shows a notice.

## Files

```
src/page/
├── router.jsx           BrowserRouter + font loaders
├── Home.jsx             Hub (three tiles)
├── HooksPage.jsx        SDK hooks reference
├── TermsPage.jsx        Page-sized terms table
└── LinksPage.jsx        Page-sized links view
```

## Customization points

| What | Where |
|------|-------|
| Add a new sub-page | New component file + new `<Route>` in `router.jsx` + new tile in `Home.jsx`'s `tiles` array (optional). |
| Page-wide layout | Each sub-page applies its own `padding`/`maxWidth` in its `styles` block. There is no shared page wrapper. |
| Font loaders | `router.jsx` `useEffect` runs on mount. Drop in additional loaders here. |
| Page title | `usePageControl().setPageTitle(...)` in each sub-page. |

## Replacing this page module

If you keep a page module but want different content:

1. Add or edit components in this folder.
2. Add a `<Route path="...">` in `router.jsx`.
3. (Optional) Add a tile to `Home.jsx`'s `tiles` array.
4. Update any card that navigates here (e.g. `PageLinkCard`'s
   `PAGES`).

If you DON'T need a page at all:

1. Delete this folder.
2. Remove the `page: { source: ... }` field from `extension.js`.
3. Delete `PageLinkCard` (it's the only thing that links here).
