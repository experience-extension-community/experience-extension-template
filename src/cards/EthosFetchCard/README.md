# EthosFetchCard ("Active Terms")

Demonstrates the canonical Data Connect fetch lifecycle: loading
→ error / empty / data, with refresh. Body click opens a
page-sized version of the same data (`TermsPage` at `/terms`).

Card and page consume the **same** hook (`useAcademicPeriods`)
and display terms in the **same** order — sort lives in
`src/data/sortAcademicPeriods.js`, not in either component.

## What it shows

A list of active academic periods, each row clickable to copy the
term code. The top-right refresh button refetches the pipeline.

## SDK hooks used

| Hook | Why |
|------|-----|
| `useExtensionControl().setLoadingStatus` | Tells the SDK we're loading so its skeleton shows. |
| `useIntl()` | Localizes empty/error states + copy labels. |

Plus this template's hooks:

- `useAcademicPeriods()` — fetch + sort. Returns
  `{ data, isLoading, isRefreshing, isError, error, refresh }`.
  Lives in `src/hooks/useAcademicPeriods.js`. Wraps
  `src/data/academicPeriods.js` (pure fetcher) and
  `src/data/sortAcademicPeriods.js` (pure sort).
- `useCopyToClipboard()` — flashes a "copied" affordance on row
  click and auto-resets after 1.5s.
- `useTypekitFont()`, `useMaterialIconFonts()` — fonts.

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
| Row layout / styling | `styles` block in `EthosFetchCard.jsx`. |
| Copy-to-clipboard reset duration | Pass `{ resetMs: <ms> }` to `useCopyToClipboard()`. Default 1500. |
| Body click target | `pageRoute.route` in `extension.js` (defaults to `/terms`). |
| Body click exclusions | `pageRoute.excludeClickSelectors: ['button']` keeps the row buttons working. |
| Empty / error state copy | i18n keys below. |

## i18n keys

| Key | Default |
|-----|---------|
| `card.ethosFetch.empty.title` | "No active terms" |
| `card.ethosFetch.empty.description` | "The pipeline returned no academic periods." |
| `card.ethosFetch.cta.refresh` | "Refresh" |
| `card.ethosFetch.copyCode` | "Copy code {code}" |
| `common.copied` | "Copied" |

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
└── useAcademicPeriods.js       React state machine + sort
```

## Replacing this card with your own data

1. Add a pipeline JSON under `DataConnect/<your-resource>/`.
2. Add `src/data/<yourResource>.js` (pure async fetcher returning
   `{ status, data, error }`).
3. (If sorting matters) add `src/data/sort<YourResource>.js` (pure
   sort).
4. Add `src/hooks/use<YourResource>.js` (state machine; calls the
   fetcher; memoizes the sort).
5. Copy this card and swap `useAcademicPeriods` → your hook.
6. Update `termsPipeline` config in `extension.js` (or add a new
   extension-level key for your pipeline).

The three-layer pattern (component → hook → data) is documented in
[`ARCHITECTURE.md`](../../../ARCHITECTURE.md).
