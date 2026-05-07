# Architecture

> **Forking?** This document describes the architecture of the
> *template itself* so contributors and AI tools can read the
> repo and immediately understand its structure. When you fork to
> build your real extension, replace this content with your own
> architecture document — keeping the same section structure
> makes it easy for future maintainers to navigate.

## What this extension does

A reference scaffold for Ellucian Experience extensions. Ships
four sample cards exercising different SDK surfaces, one page
module with four routes, real Data Connect pipelines, branding
tokens, i18n, accessibility hooks, and CI — all wired together so
a forking institution can rip the samples and drop in their own.

## What it does not do

- Production data integrations beyond the two sample pipelines
  (`persons`, `academic-periods`).
- Any institution-specific business logic. The brand defaults are
  Florida Polytechnic's; replacement is the first step of the
  onboarding checklist (`REPLACE_THESE.md`).
- TypeScript. JavaScript + PropTypes only.

## Components

```
.
├── extension.js              SDK manifest. Extension-level
│                             `configuration` block (termsPipeline
│                             client + ethosApiKey server) shared
│                             by every card and the page.
├── DataConnect/              Data Connect pipeline JSONs.
│                             Imported into your Ethos tenant.
└── src/
    ├── cards/                Four sample cards, each with a
    │                         README explaining its hooks,
    │                         configuration, customization points.
    ├── page/                 Single page module, four routes.
    ├── components/           Shared UI (LoadingState, ErrorState,
    │                         EmptyState, DebugHooksDialog, Icon).
    ├── hooks/                Custom React hooks (font loaders,
    │                         clipboard, domain hooks).
    ├── data/                 Pure async fetchers + sort/transform
    │                         helpers (no React).
    ├── utils/                branding, ethos, a11y, format, sdk.
    └── i18n/                 react-intl provider + locale cascade.
```

## Data flow

The canonical "card displays Data Connect data" flow:

1. **User opens dashboard** → Experience renders the card via the
   SDK.
2. **Card mounts** → `useAcademicPeriods()` is called.
3. **Hook reads config** → `useCardInfo()` returns
   `configuration.termsPipeline` and `configuration.ethosApiKey`
   (lifted from the extension-level config block).
4. **Hook calls fetcher** → `fetchAcademicPeriods({
   authenticatedEthosFetch, cardId, pipeline })` in
   `src/data/academicPeriods.js`.
5. **Fetcher hits Data Connect** → `authenticatedEthosFetch` from
   `useData()` proxies the call. Returns
   `{ status: 'success'|'error', data, error }`.
6. **Hook sorts** → `sortAcademicPeriods(rawData)` produces the
   canonical order.
7. **Hook returns** →
   `{ data, isLoading, isRefreshing, isError, refresh }`.
8. **Card renders** → loading → success / error / empty.
9. **(Optional) Body click** → `navigateToPage()` sends the user
   to the page-sized version (`TermsPage`), which uses the same
   hook for the same data in the same order.

## Three-layer pattern

```
┌───────────────────────────────────────────┐
│ Component (card or page)                 │
│   - JSX, withStyles, useIntl             │
│   - Calls a domain hook                  │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌───────────────────────────────────────────┐
│ Domain hook (src/hooks/use<Domain>.js)   │
│   - React state (data/loading/error)     │
│   - Reads SDK hooks (useCardInfo etc.)   │
│   - Calls the fetcher                    │
│   - Memoized sort/derive                 │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌───────────────────────────────────────────┐
│ Data layer (src/data/<domain>.js)        │
│   - Pure async (no React)                │
│   - Receives auth from caller            │
│   - Returns { status, data, error }      │
└───────────────────────────────────────────┘
```

Pure-derivation logic (sort, transform) lives next to the fetcher
in `src/data/`, **not** inside components or even the hook. This
is why both `EthosFetchCard` and `TermsPage` show terms in the
same order — they consume the same hook, which has already
applied `sortAcademicPeriods`.

## Configuration model

Three layers, lowest to highest priority:

1. **Path Design System tokens** — imported from
   `@ellucian/react-design-system/core/styles/tokens`
   (`spacing10`...`spacing80`, neutral colors, radii). Baseline
   visual system; never overridden.
2. **Institutional brand colors**
   (`src/utils/branding/brandColors.js`) — a flat map of semantic
   keys (`primary`, `surface`, `textSecondary`, `focusRing`...)
   to hex values. Defaults are Florida Poly's. Re-skinning the
   extension means editing this **one file**.
3. **Live dashboard theme** (`useThemeInfo()`) — the tenant's
   runtime theme. Currently consumed by `DebugHooksDialog` for
   inspection; cards and pages do not derive their colors from it
   (they consume `brandColors` directly). Extending to a
   `useResolvedTheme()` is a possible follow-up.

Components consume `brandColors.X` (semantic) or Path tokens
(spacing). They do **not** contain hex literals. Lint rule:
`eslint-plugin-jsx-a11y` runs in error mode in CI.

## Configuration surfaces

| Surface | When | Where |
|---------|------|-------|
| Extension-managed (admin UI) | Admin sets per tenant | `extension.js` `configuration` block (extension-level so all cards inherit). |
| Custom configuration | Per-card admin form | `customConfiguration: { source: '...' }` field on a card; persisted via `setCustomConfiguration({ customConfiguration: { client: {...} } })`. |
| Environment variables | Local dev only | `sample.env` → `.env`. Not used in production. |
| Branding tokens | Compile-time | `src/utils/branding/brandColors.js`. |

See [`docs/CONFIGURATION.md`](docs/CONFIGURATION.md) for the full
reference table.

## SDK hooks used

Card surfaces (called inside any card):

- `useCardInfo()`, `useCardControl()`, `useUserInfo()`,
  `useThemeInfo()`, `useExtensionControl()`, `useExtensionInfo()`,
  `useData()`, `useCache()`, `useExperienceInfo()`,
  `useDashboardInfo()`.

Page surfaces (called inside `src/page/*`):

- `usePageInfo()`, `usePageControl()` plus the shared subset
  (`useUserInfo`, `useData`, `useThemeInfo`, `useExtensionControl`,
  `useExtensionInfo`, `useDashboardInfo`, `useExperienceInfo`).

`HooksPage` (`/hooks`) is a working reference that calls each
page-context hook and renders its value. `DebugHooksDialog`
(launched from `PageLinkCard`) does the same for card-context
hooks.

## External integrations

| System | Pattern | Auth | Endpoints | Data classification |
|---|---|---|---|---|
| Ellucian Ethos / Data Connect | `authenticatedEthosFetch` from `useData()` | User token (Experience-managed) | Pipelines under `DataConnect/`: `persons`, `academic-periods` | Internal (subject to tenant role permissions on the underlying Ethos resource). |
| Adobe Typekit | `useTypekitFont()` loads the kit CSS | Public | `https://use.typekit.net/<kitId>.css` | Public. |
| Material Symbols Outlined | `useMaterialIconFonts()` / `loadMaterialSymbolsCSS()` | Public | `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined…` | Public. |

## Per-folder reading order

When exploring or onboarding, read in this order:

1. [`README.md`](README.md) — entry point, project structure,
   quickstart.
2. [`ARCHITECTURE.md`](ARCHITECTURE.md) — this document.
3. [`CONTRIBUTING.md`](CONTRIBUTING.md) — hard rules (license,
   stack, accessibility, AI policy).
4. [`REPLACE_THESE.md`](REPLACE_THESE.md) — onboarding checklist
   for a forking institution.
5. `src/cards/<Card>/README.md` — per-card details (one for each
   of the four samples).
6. [`src/page/README.md`](src/page/README.md) — the page module.
7. [`docs/`](docs/) — deep-dive guides (BRANDING, CONFIGURATION,
   DATA_CONNECT, DEVELOPMENT, INSTITUTIONAL_SETUP, I18N,
   SDK_UPDATES, TROUBLESHOOTING).

## Diagrams

Mermaid diagrams render natively on GitHub. Drop architecture
diagrams in `docs/diagrams/` and link from here as the extension
grows.

## Decisions

Architecture decision records live in `docs/decisions/` (create
the folder when you have your first ADR). Format:
`ADR-NNN-short-title.md`.
