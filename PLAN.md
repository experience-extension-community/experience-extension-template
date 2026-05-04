# Template Build Plan

> Purpose: define exactly what the `experience-extension-template`
> repo will look like once finished, why each choice is made, and
> what changes are needed to the existing `claude/setup-community-org-czMiB`
> branch to align with how Ellucian and Florida Polytechnic actually
> ship Experience extensions.
>
> Read this in full and sign off (or push back) before we touch code
> again.

---

## 1. Sources of truth

This plan reconciles four inputs:

1. **Hub architecture plan** — the master document you wrote (locked v1.0).
2. **`experience-update-docs.md`** — Ellucian's authoritative SDK 8.1.2
   migration guide, already in the template repo.
3. **Ellucian's official sample-extensions repo**
   (`ellucian-developer/experience-sdk-sample-extensions`,
   `sdk-samples/`) — the canonical "this is how an Experience extension
   is laid out" reference. Confirmed by direct fetch.
4. **The four Florida Poly extensions** (`custom-simple-links`,
   `exp-account-details-custom`, `exp-canvas-teachers`,
   `exp-events-studentlife`) — real production code showing the
   patterns FL Poly actually uses.

When inputs conflict: **Ellucian's sample wins for SDK conventions;
the hub plan wins for community policy (license, governance,
accessibility floor, vendor-neutral AI, branding-token discipline);
FL Poly examples inform what's *actually idiomatic* in our community.**

## 2. What the existing branch gets right

- SDK 8.1.2 dependency pins (CDN tarball URLs, Node 24.13.0,
  React 19, ESLint 9 flat config, `.babelrc`, `prop-types` runtime
  dep, `@tanstack/react-virtual` override).
- Apache 2.0 + SPDX headers on every `.js`/`.jsx`.
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`, issue/PR
  templates, CodeQL + dependency-review workflows, Dependabot config.
- Three docs (`BRANDING.md`, `CONFIGURATION.md`, `TROUBLESHOOTING.md`)
  + `INSTITUTIONAL_SETUP.md` + `DEVELOPMENT.md` + `REPLACE_THESE.md`.
- The conceptual shape of `ethos/` (errors, authenticatedFetch,
  serverless), `a11y/` (announcer, keyboard, IDs), `format/` (Intl
  wrappers), and `hooks/`.

## 3. What the existing branch gets wrong (must be fixed)

| # | Issue | Fix |
|---|-------|-----|
| 1 | `extension.js` is in `src/` and uses ES module imports of `SampleCard` and `SamplePage` | Move to **repo root**, use **CommonJS** (`module.exports = {...}; require('dotenv').config();`), and reference cards/page via `source: './src/cards/...'` **string paths** |
| 2 | No `webpack.config.js` | Add at repo root. Re-export from `@ellucian/experience-extension/webpack` (the SDK provides the base config — extensions can pass through or wrap it). |
| 3 | `.env.example` instead of `sample.env` | Rename and rewrite to match the canonical Ellucian format (`EXPERIENCE_EXTENSION_UPLOAD_TOKEN`, `EXPERIENCE_EXTENSION_SHARED_SECRET`, `EXPERIENCE_EXTENSION_ENABLED`, `EXPERIENCE_EXTENSION_ENVIRONMENTS`) plus extension-specific `PIPELINE_*` and `PUBLISHER` vars |
| 4 | Components use inline styles, no `withStyles` / Path theme integration | Refactor every component to use `withStyles(styles)` from `@ellucian/react-design-system/core/styles`, taking `(theme) => ({...})` and consuming `theme.palette` plus Path tokens |
| 5 | Branding tokens are handcrafted hex values with no Path DS lineage | Rebuild `branding/tokens.js` to **import** from `@ellucian/react-design-system/core/styles/tokens` (`spacing10`..`spacing80`, `colorTextNeutral*`, `colorBackground*`, `borderRadiusReduced`, etc.) and overlay institutional brand values *on top of* Path's tokens |
| 6 | No `IconSprite` | Render `<IconSprite />` from `@ellucian/ds-icons/lib` once at the page/card root. Required for any Path icon to render. |
| 7 | Build scripts are wrong (`experience-extension start` doesn't exist) | Replace with the canonical Ellucian script set: `lint`, `build-dev`, `build-prod`, `deploy-dev`, `deploy-prod`, `watch-and-upload`, `start`, `test` (all webpack-based) |
| 8 | Missing `dotenv`, `cross-env`, `classnames`, `date-fns` deps | Add — they're standard across Ellucian and FL Poly samples |
| 9 | Missing react-intl provider wiring | Add `src/i18n/ReactIntlProviderWrapper.jsx` (provider + `withIntl` HOC) and `src/i18n/intlUtility.js` (locale-cascade `getMessages(userLocale)`) per FL Poly's pattern |
| 10 | No `DataConnect/` top-level folder | Add it. This is where Data Connect pipeline JSON definitions live. Subfolder by pipeline group (e.g. `DataConnect/students/`, `DataConnect/billing/`). Per `custom-simple-links`, file naming is `<publisher>-<pipeline-name>-<verb>_v<semver>.json`. |
| 11 | Only one sample card | Ship **multiple cards** — each demonstrates a different SDK surface (see §6) |
| 12 | No `customConfiguration` example | Ship at least one card whose `customConfiguration: { source: '...' }` points to a config-form component that uses `setIsCustomConfigurationValid` |
| 13 | No `pageRoute` example | One card uses `pageRoute: { route: '/foo', excludeClickSelectors: [...] }` to demonstrate card→page navigation |
| 14 | `__mocks__/@ellucian/experience-extension-utils.js` mock returns a non-existent `useExtensionControl().setLoadingStatus` shape | Update mock to match real SDK surface: `setLoadingStatus`, `setErrorMessage`, `setPageTitle`, plus `useCardControl`, `useDashboardInfo` |
| 15 | `ARCHITECTURE.md` stub at repo root is the existing per-extension stub | Keep — it's correct for the template (forkers customize). The community-level architecture lives in the hub repo (still pending Step 3). |

## 4. Final file inventory (target end state)

```
.
├── PLAN.md                          this document, kept for reference
├── ARCHITECTURE.md                  per-extension stub (forkers customize)
├── RUNBOOK.md                       per-extension stub (forkers customize)
├── SECURITY.md                      per-extension stub (forkers customize)
├── README.md                        rewritten last; references real paths
├── REPLACE_THESE.md                 onboarding checklist (revise for new layout)
├── CONTRIBUTING.md                  unchanged from existing branch
├── CODE_OF_CONDUCT.md               unchanged
├── LICENSE                          Apache 2.0, unchanged
├── experience-update-docs.md        keep as authoritative SDK reference
│
├── extension.js                     SDK manifest, root, CommonJS
├── webpack.config.js                wraps the SDK's webpack export
├── package.json                     scripts + deps aligned with Ellucian sample
├── package-lock.json                committed
├── sample.env                       canonical Ellucian format + ours
├── .babelrc
├── .nvmrc                           24.13.0
├── .gitignore
├── .npmignore
├── .editorconfig
├── .prettierrc
├── eslint.config.mjs                ESLint 9 flat config
├── jest.config.js
├── jest.setup.js
├── __mocks__/                       Jest module mocks (SDK utils, styles, files)
│
├── DataConnect/                     pipeline JSON definitions, grouped
│   ├── README.md                    explains naming + how to upload
│   ├── students/
│   │   └── eec-template-students-list-get_v1.0.0.json   (sample)
│   └── courses/
│       └── eec-template-courses-list-get_v1.0.0.json    (sample)
│
├── docs/
│   ├── INSTITUTIONAL_SETUP.md
│   ├── DEVELOPMENT.md
│   ├── BRANDING.md
│   ├── CONFIGURATION.md
│   ├── TROUBLESHOOTING.md
│   ├── DATA_CONNECT.md              new — explains DataConnect/ folder + upload flow
│   └── decisions/                   ADRs (empty, with README)
│
├── .github/
│   ├── CODEOWNERS
│   ├── dependabot.yml
│   ├── ISSUE_TEMPLATE/{config,bug_report,feature_request}.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/{ci,dependency-review,codeql,release}.yml
│
└── src/
    ├── i18n/
    │   ├── en.json                  message bundle
    │   ├── intlUtility.js           getMessages(userLocale) with locale cascade
    │   ├── ReactIntlProviderWrapper.jsx   provider + withIntl HOC
    │   └── README.md
    │
    ├── cards/
    │   ├── HelloUserCard/                 (Card 1 — see §6.1)
    │   │   ├── HelloUserCard.jsx
    │   │   ├── HelloUserCard.test.jsx
    │   │   └── README.md
    │   ├── EthosFetchCard/                (Card 2 — see §6.2)
    │   │   ├── EthosFetchCard.jsx
    │   │   ├── EthosFetchCard.test.jsx
    │   │   └── README.md
    │   ├── ConfigurableCard/              (Card 3 — see §6.3)
    │   │   ├── ConfigurableCard.jsx
    │   │   ├── ConfigurableCardConfig.jsx
    │   │   ├── ConfigurableCard.test.jsx
    │   │   └── README.md
    │   └── PageLinkCard/                  (Card 4 — see §6.4)
    │       ├── PageLinkCard.jsx
    │       ├── PageLinkCard.test.jsx
    │       └── README.md
    │
    ├── pages/
    │   └── SamplePage/
    │       ├── SamplePage.jsx
    │       ├── SamplePage.test.jsx
    │       ├── router.jsx           the entry point referenced by extension.js
    │       └── README.md
    │
    ├── components/
    │   ├── common/                  the FL Poly "common/" convention
    │   │   ├── LoadingState/
    │   │   ├── ErrorState/
    │   │   ├── EmptyState/
    │   │   └── RefreshDataStatusMessage/
    │   ├── Icon/                    Material Symbols Outlined
    │   └── README.md
    │
    ├── hooks/
    │   ├── useEthosFetch.js         (refactored — see §7)
    │   ├── useExtensionConfig.js
    │   ├── useAnnouncer.js
    │   ├── usePrefersReducedMotion.js
    │   ├── useTypekitFont.js        (replaces fontLoader-as-util-only)
    │   ├── useMaterialIconFonts.js  (status-aware, port FL Poly's)
    │   └── README.md
    │
    ├── data/
    │   ├── students.js              fetchStudents({authenticatedEthosFetch, cardId, pipeline})
    │   ├── courses.js               fetchCourses(...)
    │   └── README.md
    │
    └── utils/
        ├── README.md
        ├── branding/
        │   ├── tokens.js            re-exports Path tokens + institutional overlay
        │   ├── theme.js             useResolvedTheme()
        │   ├── icons.js             iconStyle helper (font is loaded by the hook)
        │   ├── fontLoader.js        ensureTypekitFont() imperative helper
        │   ├── loadMaterialSymbols.js   imperative loader with retry
        │   └── README.md
        ├── ethos/
        │   ├── authenticatedFetch.js
        │   ├── serverless.js
        │   ├── errors.js
        │   └── README.md
        ├── a11y/
        │   ├── announcer.js
        │   ├── keyboard.js
        │   ├── id.js
        │   └── README.md
        ├── format/
        │   ├── dates.js
        │   ├── numbers.js
        │   └── README.md
        ├── sdk/
        │   └── propTypes.js
        ├── log-level.js             initializeLogging('default') — port from FL Poly
        └── events.js                small pub/sub (ports from FL Poly)
```

## 5. Branding token strategy (the "where do tokens come from" answer)

Three layers, lowest to highest priority:

1. **Path Design System tokens.** Source: `@ellucian/react-design-system/core/styles/tokens`. Provides:
   - Spacing scale: `spacing10`, `spacing20`, `spacing30`, `spacing40`, `spacing50`, `spacing60`, `spacing70`, `spacing80`
   - Color tokens: `colorTextNeutral500`, `colorBrandSecondary500`, `colorBackgroundDefault`, `colorBorderNeutralStrong`, etc.
   - Typography, border radius, shadow tokens

   This is the *baseline visual system* every Path-built UI assumes. We
   never override these directly — we consume them.

2. **Institutional overlay** (`src/utils/branding/tokens.js`). Defines the
   institution's specific brand values: `polyPurple`, `cyberBlue`,
   `New Science` font family, Typekit kit ID, logo asset URLs. **Imports
   the Path tokens it falls back to**, so a forking institution gets a
   coherent default if they leave a value unset.

3. **Live dashboard theme** (`useThemeInfo()` from the SDK). The current
   tenant's runtime theme — primary, secondary, CTA colors. **Wins over
   both layers above** for those properties only.

`useResolvedTheme()` composes all three:

```js
// Pseudocode
const theme = useThemeInfo() || {};
return {
  ...pathTokens,                  // baseline
  ...institutionalOverlay,        // institutional brand
  primaryColor: theme.primaryColor || institutionalOverlay.primary,
  // ...etc
};
```

Components consume `useResolvedTheme()` only. **Never** import Path
tokens or the institutional overlay directly in components — that
breaks the override chain.

The existing `tokens.js` is a clean handcrafted version of layer 2
without layer 1. The refactor adds layer 1: `import { spacing10,
colorTextNeutralSubtle, ... } from '@ellucian/react-design-system/core/styles/tokens'`.

## 6. The four sample cards

**Goal:** every relevant SDK hook and every community utility is
demonstrated at least once across these four cards. Each card is
intentionally small.

### 6.1 `HelloUserCard` — basic SDK + branding

- Uses `useUserInfo()` to greet the signed-in user.
- Uses `useThemeInfo()` via `useResolvedTheme()`.
- Uses `useExtensionControl().setLoadingStatus(false)` to dismiss the SDK's loading spinner once mounted.
- Uses `withStyles` (the canonical EDS pattern).
- Uses `Icon` (Material Symbols Outlined) and `IconSprite` (Path).
- Renders `LoadingState` while user info resolves, then content.
- No data fetching, no configuration — minimum viable card.

### 6.2 `EthosFetchCard` — Ethos data + states

- Uses `useEthosFetch` against a configurable Data Connect pipeline.
- Demonstrates `LoadingState` / `ErrorState` (with retry) / `EmptyState`.
- Configuration exposes the pipeline name as a card-level config knob
  (`coursesDataConnectPipeline`, defaulting to
  `process.env.PIPELINE_GET_COURSES`).
- Uses `useAnnouncer` to announce "Data loaded" / "Refresh failed".
- Uses `formatDate` and `formatNumber` from `utils/format`.

### 6.3 `ConfigurableCard` — `customConfiguration` form

- Ships with a `ConfigurableCardConfig.jsx` form that:
  - Reads existing config via `useCardInfo().configuration.customConfiguration`.
  - Calls `setIsCustomConfigurationValid(true|false)` from `useCardControl`.
  - Calls `setCustomConfiguration({...})` to persist.
  - Validates a non-trivial input (e.g., a list of links with URL validation).
- The card itself reads the persisted config and renders accordingly.
- Demonstrates the canonical pattern for institutionally-configured
  cards (the heart of `custom-simple-links`).

### 6.4 `PageLinkCard` — card → page navigation

- Uses `useCardControl().navigateToPage()` to launch the page.
- Has `pageRoute: { route: '/sample', excludeClickSelectors: ['a','button'] }` in the manifest.
- The associated page uses `useDashboardInfo()`, `useExtensionInfo()`,
  and demonstrates `react-intl`-driven copy via `useIntl()`.

This card array also exercises the `template: { icon, title, description }` Card Library preview shape.

## 7. Hook + data-layer convention

Following the FL Poly pattern (specifically `useAccountDetails` →
`fetchAccountDetails`):

- **`src/hooks/use<Domain>.js`** — React-side state machine
  (`{ data, isLoading, isRefreshing, isError, refresh }`). Calls the
  data-layer fetch function.
- **`src/data/<domain>.js`** — pure async function `fetch<Domain>({
  authenticatedEthosFetch, cardId, pipeline, signal })`. No React.
  Returns `{ status: 'success'|'error', data, error }`.
- **`src/utils/ethos/authenticatedFetch.js`** — low-level wrapper
  (timeout, retry, error normalization). `data/<domain>.js` calls
  this; hooks call `data/<domain>.js`.

Layered this way, the existing `useEthosFetch` hook becomes a
**convenience hook for one-off URL fetches** (still useful — `EthosFetchCard`
uses it), while complex cards use the `hook → data → util` cascade.

## 8. `sample.env` layout

Three sections:

```bash
# === REQUIRED ===
# This token is required to deploy. Get it from the Experience admin UI.
EXPERIENCE_EXTENSION_UPLOAD_TOKEN=<upload-token>

# === OPTIONAL: SETUP API ===
# Uncomment and fill in to use the Setup API for tenant management.
# EXPERIENCE_EXTENSION_SHARED_SECRET=<shared-secret>
# EXPERIENCE_EXTENSION_ENABLED=<true/false>
# EXPERIENCE_EXTENSION_ENVIRONMENTS=<Tenant1,Tenant2>

# === EXTENSION METADATA ===
# Public publisher slug shown to users. Default: institution short name.
PUBLISHER=ExperienceExtensionCommunity

# === DATA CONNECT PIPELINES ===
# Default pipeline names — referenced by extension.js as the `value`
# (production) or `default` (dev) for the matching card configuration.
# Each pipeline must exist in your Ethos Data Connect tenant before the
# corresponding card will function.
PIPELINE_GET_STUDENTS=eec-template-students-list-get
PIPELINE_GET_COURSES=eec-template-courses-list-get

# === BRANDING (OPTIONAL) ===
# Override the Adobe Typekit kit ID without editing src/utils/branding/tokens.js.
# Leave blank if your institution doesn't use Typekit.
TYPEKIT_KIT_ID=yld8vhe

# === DEBUG (OPTIONAL) ===
# Toggle log-level package output for local dev.
LOG_LEVEL=info
```

This shape clearly separates **what's required**, **what's optional but
expected to be configured by an institution** (pipelines, publisher,
Typekit), and **what's purely for debugging**.

## 9. CI/build conventions

- Scripts are the Ellucian-standard set: `build-dev`, `build-prod`,
  `deploy-dev`, `deploy-prod`, `watch-and-upload`, `start`, `lint`,
  `test`. Plus our `verify`, `format`, `format:check`.
- `webpack.config.js` re-exports `@ellucian/experience-extension/webpack`.
- `ci.yml` continues to reference the hub's reusable workflow but
  passes `Node 24.13.0` and runs `npm run lint && npm test && npm run build-prod`
  (not `npm run build` — the SDK has no such script).
- Tests run under `cross-env BABEL_ENV=test` per Ellucian's pattern.

## 10. Decisions (locked)

> All seven questions below were resolved by the project owner on
> 2026-05-04. Answers are reflected in §§4–9 above. The original
> question text is preserved here for the record.



1. **Path DS token coverage.**
   *Decision:* Import what we need as we need them. Match the Ellucian
   sample's pragmatic subset (`spacing10`..`spacing80`,
   `colorTextNeutral500`, `colorBackgroundDefault`, etc.). Document
   the import path in `src/utils/branding/tokens.js` so contributors
   know where to extend.

2. **`useStyles` vs `withStyles`.**
   *Decision:* `useStyles` (hook produced by `makeStyles`) per the
   project owner's explicit request. Imports come from
   `@ellucian/react-design-system/core/styles`. The FL Poly cards use
   the equivalent `withStyles` HOC; both are supported by EDS and
   produce identical CSS, so this is purely a syntax preference.

3. **`react-intl`.** *Decision:* Yes — both Ellucian's official sample
   and every FL Poly extension use it, so we follow.
   `ReactIntlProviderWrapper.jsx` + `intlUtility.js` (locale-cascade) +
   `useIntl()` / `intl.formatMessage(...)` in components.

4. **DataConnect/ pipeline JSONs.**
   *Decision:* Ship **real, working, generic** pipeline examples that
   any institution can import as-is. These hit standard Ethos resources
   that exist at every institution (`persons`, `academic-periods`).
   Naming convention: `eec-template-<resource>-<verb>_v1.0.0.json`.
   Pipeline JSONs are configuration, not credentials — committing
   working examples is correct.

5. **Multiple cards in `extension.js`.** *Decision:* Confirmed — four
   cards as enumerated in §6.

6. **Branch strategy.** *Decision:* Option (b). New branch
   `refactor/align-with-sdk-conventions` branched from the existing
   `claude/setup-community-org-czMiB`. No force-push. Refactor lands
   as a single follow-on commit so the diff is reviewable.

7. **Hub `ARCHITECTURE.md` PR.** *Decision:* Deferred until the
   template is solid. Tracked as a follow-up.

## 11. What I'll do once you sign off

1. Add `webpack.config.js`, `dotenv`, `cross-env`, `classnames`,
   `date-fns` to deps. Update `package.json` scripts.
2. Move `extension.js` to root, rewrite as CommonJS with four cards.
3. Rename `.env.example` → `sample.env` and rewrite per §8.
4. Refactor every component to `withStyles` + Path tokens.
5. Rebuild `tokens.js` to import from Path DS tokens.
6. Add `IconSprite` to `HelloUserCard` and the page.
7. Add `react-intl` provider, `intlUtility.js`, `withIntl` HOC.
8. Add four sample cards + their tests + READMEs.
9. Add `src/data/` layer + refactor existing hooks to use it.
10. Add `DataConnect/` with two example pipelines + README.
11. Add `docs/DATA_CONNECT.md`.
12. Update `__mocks__/@ellucian/experience-extension-utils.js` with
    `useCardControl` etc.
13. Refresh `REPLACE_THESE.md` and `README.md` to match the new layout.
14. Commit on the chosen branch (per §10 q6) with a clean Conventional
    Commit message.

---

**End of plan.** Sign off (with answers to §10's questions) and I'll execute.
