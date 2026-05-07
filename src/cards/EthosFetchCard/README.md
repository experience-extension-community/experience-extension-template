# EthosFetchCard ("Active Terms")

Demonstrates the canonical Data Connect fetch lifecycle: loading
→ error / empty / data, with refresh. Body click opens a
page-sized version of the same data (`TermsPage` at `/terms`).

Card and page consume the **same** hook (`useAcademicPeriods`),
share the **same** browser cache (scope `eec-academic-periods`),
and display terms in the **same** order — sort lives in
`src/data/sortAcademicPeriods.js`, not in either component.

## What it shows

A list of active academic periods, each row clickable to copy the
term code. Three indicators of refresh state:

- **Top banner**, transient: `RefreshStatusMessage` flashes while
  a background refresh is in flight ("Refreshing data…"), briefly
  on success ("Data refreshed"), and on failure ("Refresh failed
  — showing cached data." with a Retry button).
- **Bottom-right footer**, persistent: `RefreshIndicator` shows
  "Last updated 3:45 PM" once the first successful fetch lands.
- **Top-right corner**, hover/focus to reveal: an icon button that
  triggers a manual refresh.

The term list is **lazy-rendered** — initial 5 terms, +5 more each
time the IntersectionObserver trigger row scrolls into the
card's scroll viewport. (Active-term lists are typically small,
so the trigger rarely fires; the pattern is here for reference
when swapping in a longer dataset.)

## Cache + refresh behavior (stale-while-revalidate)

1. **First mount, cold cache** → `LoadingState` shows while the
   pipeline runs. On success, data renders and is stored in the
   cache with a `lastUpdated` timestamp. **No success banner** on
   cold load.
2. **Subsequent mount, warm cache** → cached data renders
   **instantly** (`isLoading` stays `false`). Background refresh
   fires; the `loading` banner shows "Refreshing data…" while it
   runs. On success the banner flips to `success` ("Data
   refreshed") for ~3 seconds, then disappears.
3. **Background refresh fails** → cached data stays on screen.
   The banner flashes `error` ("Refresh failed — showing cached
   data." + Retry) for ~5 seconds.
4. **Manual refresh button** → skips the cache read entirely and
   forces a network fetch. Same banner sequence as a warm-cache
   refresh.

The Data Connect pipeline itself caches at the Ethos proxy layer
for 300s (`cache: true, cacheTTLSeconds: 300` in the
`ethosProxyGet` segment). The browser-side `useCache` adds a
second layer that skips the network round-trip entirely on warm
mounts.

## SDK hooks used

| Hook | Why |
|------|-----|
| `useExtensionControl().setLoadingStatus` | Tells the SDK we're loading so its skeleton shows. |
| `useIntl()` | Localizes empty/error states + copy labels. |

Plus this template's hooks:

- `useAcademicPeriods()` — fetch, cache (`useCache` from
  `@ellucian/experience-extension-utils`), and sort. Returns
  `{ data, isLoading, isRefreshing, isError, error, lastUpdated,
  showRefreshError, showSuccessMessage, refresh }`. Lives in
  `src/hooks/useAcademicPeriods.js`. Wraps
  `src/data/academicPeriods.js` (pure fetcher) and
  `src/data/sortAcademicPeriods.js` (pure sort).
- `useCopyToClipboard()` — flashes a "copied" affordance on row
  click and auto-resets after 1.5s.
- `useLazyLoad()` — IntersectionObserver-based progressive
  rendering; accepts an optional `rootRef` for scrollable
  containers like the card's internally-scrolling list.
- `useTypekitFont()`, `useMaterialIconFonts()` — fonts.

Shared components:

- `<RefreshStatusMessage>` (`src/components/common/RefreshStatusMessage.jsx`)
  — the top transient banner.
- `<RefreshIndicator>` (`src/components/common/RefreshIndicator.jsx`)
  — the bottom "Last updated" line.

## Configuration

Inherited from the **extension-level** `configuration` block in
`extension.js`:

| Key | Surface | Default | Required | What it does |
|-----|---------|---------|----------|--------------|
| `termsPipeline` | client | `eec-template-academic-periods-get` | no | Data Connect pipeline name. |
| `ethosApiKey` | server | (admin-set) | yes | Ethos API key the SDK passes through `authenticatedEthosFetch`. |

Both values are saved once in Experience Manager → Extension
Configuration; every card and the page inherits them via
`useCardInfo()`.

## Pipeline setup

This card calls a Data Connect pipeline. Before it can render data:

1. Import
   `DataConnect/academic-periods/eec-template-academic-periods-get_v1.0.0.json`
   into your Ethos Data Connect tenant. See
   [`docs/DATA_CONNECT.md`](../../../docs/DATA_CONNECT.md) for
   import + permissioning steps.
2. (Optional) Rename the pipeline for your institution
   (`<prefix>-academic-periods-get_v1.0.0.json`). Update the
   `default` for `termsPipeline` in `extension.js` to match.
3. In Experience Manager → Extension Configuration, save your
   Ethos API key. Until saved, the card's `cardId` is not
   registered with the pipeline and calls return 400.

## Customization points

| What | Where |
|------|-------|
| Sort order | `src/data/sortAcademicPeriods.js` (single source — card and page use the same sort). |
| Cache key/scope | `CACHE_KEY` / `CACHE_SCOPE` constants at the top of `src/hooks/useAcademicPeriods.js`. Change `CACHE_SCOPE` to give a card-and-page pair their own private cache. |
| Refresh-error flash duration | `REFRESH_ERROR_FLASH_MS` in `src/hooks/useAcademicPeriods.js`. Default 5000ms. |
| Success flash duration | `SUCCESS_FLASH_MS` in `src/hooks/useAcademicPeriods.js`. Default 3000ms. |
| Lazy-load page size | The `useLazyLoad(data, 5, 5, listRef)` call in `EthosFetchCard.jsx` (initial 5, +5 per scroll). The page (`TermsPage`) uses 25/25. |
| Row layout / styling | `styles` block in `EthosFetchCard.jsx`. |
| Copy-to-clipboard reset duration | Pass `{ resetMs: <ms> }` to `useCopyToClipboard()`. Default 1500. |
| Body click target | `pageRoute.route` in `extension.js` (defaults to `/terms`). |
| Body click exclusions | `pageRoute.excludeClickSelectors: ['button']` keeps the row buttons working. |
| Empty / error state copy | i18n keys below. |
| Indicator copy | `common.refreshing*` / `common.lastUpdated` / `common.refreshFailed` / `common.refreshSuccess` in `src/i18n/en.json`. |

## i18n keys

| Key | Default |
|-----|---------|
| `card.ethosFetch.empty.title` | "No active terms" |
| `card.ethosFetch.empty.description` | "The pipeline returned no academic periods." |
| `card.ethosFetch.cta.refresh` | "Refresh" |
| `card.ethosFetch.copyCode` | "Copy code {code}" |
| `common.copied` | "Copied" |
| `common.refreshingData` | "Refreshing data…" (top banner) |
| `common.refreshSuccess` | "Data refreshed" (top banner) |
| `common.refreshFailed` | "Refresh failed — showing cached data." (top banner) |
| `common.retry` | "Retry" (banner button) |
| `common.lastUpdated` | "Last updated {time}" (bottom indicator) |
| `common.loadingMore` | "Loading more…" (lazy trigger) |
| `common.showingCount` | "Showing {visible} of {total}" (lazy trigger) |

## Files

```
EthosFetchCard/
└── EthosFetchCard.jsx
```

Data lives one level up:

```
src/data/
├── academicPeriods.js          Pure async fetcher
└── sortAcademicPeriods.js      Pure sort

src/hooks/
├── useAcademicPeriods.js       useCache + state machine + sort
└── useLazyLoad.js              IntersectionObserver lazy load

src/components/common/
├── RefreshStatusMessage.jsx    Top transient banner
└── RefreshIndicator.jsx        Bottom "Last updated" line
```

## Replacing this card with your own data

1. Add a pipeline JSON under `DataConnect/<your-resource>/`.
2. Add `src/data/<yourResource>.js` (pure async fetcher returning
   `{ status, data, error }`).
3. (If sorting matters) add `src/data/sort<YourResource>.js` (pure
   sort).
4. Add `src/hooks/use<YourResource>.js` (state machine; calls the
   fetcher; memoizes the sort; layers `useCache` if you want
   stale-while-revalidate). Copy the cache pattern from
   `useAcademicPeriods.js`.
5. Copy this card and swap `useAcademicPeriods` → your hook.
6. Update `termsPipeline` config in `extension.js` (or add a new
   extension-level key for your pipeline).

The three-layer pattern (component → hook → data) is documented in
[`ARCHITECTURE.md`](../../../ARCHITECTURE.md).
