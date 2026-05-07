# Experience Extension Template

> Community template for **Ellucian Experience SDK 8.1.2**. Fork it,
> customize the branding tokens and Data Connect pipelines, replace
> the sample cards with your real ones, and you have a publishable
> extension scaffolded with CI, accessibility, data-fetching, and
> i18n already wired up.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D24.13.0-brightgreen)](.nvmrc)
[![SDK](https://img.shields.io/badge/Experience%20SDK-8.1.2-7c3aed)](docs/SDK_UPDATES.md)

---

> **This is a community-driven open-source project.** It is not affiliated
> with, endorsed by, sponsored by, or officially connected to Ellucian
> Company L.P. "Ellucian", "Ellucian Experience", "Banner", "Colleague",
> and related marks are trademarks of Ellucian Company L.P. and are used
> here for descriptive purposes only.

---

## What this is

A real, working Ellucian Experience extension scaffold — not a
documentation skeleton. Out of the box it ships:

- **Four sample cards**, intentionally boring, each demonstrating a
  different SDK surface:
    - [`HelloUserCard`](src/cards/HelloUserCard/README.md) ("User Card") — the minimum-viable identity tile
    - [`EthosFetchCard`](src/cards/EthosFetchCard/README.md) ("Active Terms") — Data Connect data with loading/error/empty states + per-row copy buttons
    - [`ConfigurableCard`](src/cards/ConfigurableCard/README.md) ("Configurable Links") — a `customConfiguration` admin form with categorized links + admin-picked colors
    - [`PageLinkCard`](src/cards/PageLinkCard/README.md) ("Sample Pages") — card → full-width page navigation with a hooks-choice dialog
- **One [page module with four sub-pages](src/page/README.md)** under `src/page/`:
  Home (hub), HooksPage (page-context SDK hooks reference), TermsPage
  (page-sized terms table with copy buttons), LinksPage (configurable
  links page with live-or-demo data + admin colors).
- **Two working Data Connect pipelines** (`persons`, `academic-periods`)
  in the top-level [`DataConnect/`](DataConnect/README.md) folder. Import them
  unchanged into any Banner or Colleague Ethos tenant.
- **Branding tokens** layered: Path Design System tokens (baseline) +
  institutional overlay (Florida Poly defaults, swappable) + live
  dashboard theme (`useThemeInfo`).
- **Material Symbols Outlined** icons via a single `<Icon>` component;
  font auto-loaded with retry.
- **Adobe Typekit** brand-font loader, configurable per institution.
- **`react-intl`** with locale cascade (exact → language → English). See [`docs/I18N.md`](docs/I18N.md).
- **`withStyles`** HOC from `@ellucian/react-design-system/core/styles`
  on every component — matches Ellucian samples and FL Poly extensions.
  No inline hex values.
- **Two-layer data flow**: pure async `src/data/<domain>.js` fetchers
  consumed by React `src/hooks/use<Domain>.js` state machines. Sort
  logic (e.g. `sortAcademicPeriods`) lives next to its data layer so
  card and page stay in sync.
- **WCAG 2.2 AA** floor — every component has render + `jest-axe` tests.
- **CI workflows** referencing the community's reusable workflow.

It is **not** a fork of `experience-sdk-sample-extensions`. It is
community-built for institutional adoption.

## Documentation map

Reading order for a new contributor (or AI assistant):

1. **README.md** (this file) — what + entry points.
2. [**ARCHITECTURE.md**](ARCHITECTURE.md) — data flow, three-layer pattern, SDK hooks used, configuration model.
3. [**CONTRIBUTING.md**](CONTRIBUTING.md) — hard rules (license, stack, accessibility, AI-tooling policy).
4. [**REPLACE_THESE.md**](REPLACE_THESE.md) — onboarding checklist for a forking institution.
5. **Per-card READMEs** — one for each of the four samples (linked above).
6. [**src/page/README.md**](src/page/README.md) — the page module.
7. **`docs/`** deep-dive guides:
   - [`INSTITUTIONAL_SETUP.md`](docs/INSTITUTIONAL_SETUP.md) — 30-minute walkthrough for a forking institution.
   - [`DEVELOPMENT.md`](docs/DEVELOPMENT.md) — day-to-day commands, layout, conventions.
   - [`BRANDING.md`](docs/BRANDING.md) — re-skinning for your institution.
   - [`CONFIGURATION.md`](docs/CONFIGURATION.md) — the three configuration surfaces in detail.
   - [`DATA_CONNECT.md`](docs/DATA_CONNECT.md) — pipeline import + permissions.
   - [`I18N.md`](docs/I18N.md) — adding locales, naming keys, plurals.
   - [`SDK_UPDATES.md`](docs/SDK_UPDATES.md) — Ellucian's SDK changelog and upgrade procedures.
   - [`TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) — common adoption issues.
8. **Per-folder READMEs** under `src/`:
   - [`src/data/README.md`](src/data/README.md), [`src/components/README.md`](src/components/README.md), [`src/utils/README.md`](src/utils/README.md).

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `24.13.0` (run `nvm use`) |
| Experience SDK | `8.1.2` (pinned in `package.json`) |
| Ethos | An Ethos Integration tenant (non-prod for local dev) |

## Quickstart

```bash
git clone <your-fork-url>
cd <your-extension>
nvm use
npm install
cp sample.env .env             # fill in EXPERIENCE_EXTENSION_UPLOAD_TOKEN
npm start                      # webpack dev server with live reload
```

Then open the URL printed by `npm start` to see the four sample cards
in the SDK dev shell.

## Customizing for your institution

1. Walk through [`REPLACE_THESE.md`](REPLACE_THESE.md). It is the
   complete onboarding checklist.
2. Edit [`src/utils/branding/brandColors.js`](src/utils/branding/brandColors.js)
   for colors, typography, logos, and Typekit kit ID. See
   [`docs/BRANDING.md`](docs/BRANDING.md).
3. Replace the sample cards in `src/cards/` with your real ones —
   see each card's README for what to change.
4. Update `src/i18n/en.json` strings; add locale files as needed.
   See [`docs/I18N.md`](docs/I18N.md).
5. Import the [`DataConnect/`](DataConnect/) pipelines into your
   Ethos tenant, or replace them with your institution's. See
   [`docs/DATA_CONNECT.md`](docs/DATA_CONNECT.md).

## Daily commands

| Command | What it does |
|---------|--------------|
| `npm start` | Webpack dev server with hot reload. |
| `npm run build-dev` / `build-prod` | Build the extension bundle. |
| `npm run deploy-dev` / `deploy-prod` | Build and upload to your tenant. |
| `npm run watch-and-upload` | Hot-reload with continuous upload. |
| `npm run lint` / `lint:fix` | ESLint 9 flat config. |
| `npm run format` / `format:check` | Prettier write / check. |
| `npm test` / `test:ci` / `test:watch` | Jest. |
| `npm run verify` | Lint + format check + tests (matches CI). |

## Project structure

```
.
├── extension.js                       SDK manifest (root, CommonJS).
│                                      Extension-level configuration
│                                      shared by every card + page.
├── webpack.config.js                  Re-exports SDK webpack config.
├── sample.env                         Environment variables template.
├── package.json                       Pinned to SDK 8.1.2.
│
├── DataConnect/                       Data Connect pipeline JSONs.
│   ├── README.md
│   ├── persons/
│   └── academic-periods/
│
├── src/
│   ├── i18n/
│   │   ├── en.json
│   │   ├── intlUtility.js              getMessages(userLocale)
│   │   └── ReactIntlProviderWrapper.jsx
│   ├── cards/                          (READMEs in each)
│   │   ├── HelloUserCard/              Identity tile.
│   │   ├── EthosFetchCard/             Active terms list.
│   │   ├── ConfigurableCard/           (+ ConfigurableCardConfig.jsx,
│   │   │                                 + colorPresets.js)
│   │   └── PageLinkCard/               "Sample Pages" launcher.
│   ├── page/                          Single page module, four routes.
│   │   ├── README.md
│   │   ├── router.jsx                  BrowserRouter + font loaders.
│   │   ├── Home.jsx                    Landing hub.
│   │   ├── HooksPage.jsx               Page-context SDK hooks reference.
│   │   ├── TermsPage.jsx               Page-sized terms table.
│   │   └── LinksPage.jsx               Configurable-links page.
│   ├── components/
│   │   ├── README.md
│   │   ├── Icon/                       Material Symbols Outlined glyph.
│   │   └── common/
│   │       ├── LoadingState/
│   │       ├── ErrorState/
│   │       ├── EmptyState/
│   │       └── DebugHooksDialog.jsx    Card-context hooks/props dump.
│   ├── hooks/
│   │   ├── useEthosFetch.js
│   │   ├── useExtensionConfig.js
│   │   ├── useAnnouncer.js
│   │   ├── usePrefersReducedMotion.js
│   │   ├── useTypekitFont.js
│   │   ├── useMaterialIconFonts.js
│   │   ├── useCopyToClipboard.js       Transient copy-with-confirmation.
│   │   └── useAcademicPeriods.js       Domain hook example (pre-sorted).
│   ├── data/
│   │   ├── README.md
│   │   ├── persons.js                  fetchPersons(...)
│   │   ├── academicPeriods.js          fetchAcademicPeriods(...)
│   │   └── sortAcademicPeriods.js      Pure sort — single source for
│   │                                   card + page ordering.
│   └── utils/
│       ├── README.md
│       ├── branding/                   tokens (Path + institutional),
│       │                               theme, icons, fontLoader.
│       ├── ethos/                      authenticatedFetch, errors,
│       │                               serverless.
│       ├── a11y/                       announcer, IDs, keyboard helpers.
│       ├── format/                     Intl-based date/number formatting.
│       └── sdk/                        PropTypes for SDK-injected props.
│
└── docs/
    ├── INSTITUTIONAL_SETUP.md
    ├── DEVELOPMENT.md
    ├── BRANDING.md
    ├── CONFIGURATION.md
    ├── DATA_CONNECT.md
    ├── I18N.md                         Adding locales, naming keys,
    │                                   plurals, testing.
    ├── SDK_UPDATES.md                  Ellucian's SDK changelog +
    │                                   upgrade procedures.
    └── TROUBLESHOOTING.md
```

## Configuration reference

Three configuration surfaces:

| Surface | When | Where |
|---------|------|-------|
| Experience-managed (extension/card) | Admin-set per tenant | `extension.js` `configuration` block (extension-level so all cards share); read via `useCardInfo()` / `useExtensionInfo()` |
| Environment variables | Local dev only | `sample.env` → `.env`; in production every value is overridden by Experience-managed config |
| Branding tokens | Compile-time, swappable per fork | `src/utils/branding/brandColors.js` |

See [`docs/CONFIGURATION.md`](docs/CONFIGURATION.md) for the full
reference table.

## Accessibility

This template targets **WCAG 2.2 AA**. CI runs `jest-axe` across every
component. ESLint enforces `eslint-plugin-jsx-a11y` in error mode.
When customizing for your institution, [verify color contrast](docs/BRANDING.md)
against your palette.

## Updating the SDK

Ellucian's authoritative SDK changelog lives in
[`docs/SDK_UPDATES.md`](docs/SDK_UPDATES.md). When a new SDK version
drops, follow that document — update `package.json`, delete
`package-lock.json` and `node_modules`, then re-install. See
[`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) for common
upgrade issues.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Highlights:

- Conventional Commits required.
- DCO sign-off on every commit (`git commit -s`). No CLA.
- Apache 2.0 SPDX header on every `.js`/`.jsx` file.
- No vendor-specific AI configuration files (`CLAUDE.md`, `AGENTS.md`,
  `.cursorrules`, `copilot-instructions.md`, `.claude/`). The
  framework is intentionally vendor-neutral; `README.md` +
  `CONTRIBUTING.md` + `ARCHITECTURE.md` + `docs/*` + per-folder
  READMEs are the only context any AI tool needs.

## License

Apache License 2.0 — see [`LICENSE`](LICENSE).

Copyright 2026 Experience Extension Community contributors.

## Acknowledgments

- Ellucian for the Experience SDK and Path Design System.
- Florida Polytechnic University for initiating the community.
- Material Symbols Outlined (Google) for the icon font.
- Every institution that contributes back.
