# Experience Extension Template

> Community template for **Ellucian Experience SDK 8.1.2**. Fork it,
> customize the branding tokens and Data Connect pipelines, replace
> the sample cards with your real ones, and you have a publishable
> extension scaffolded with CI, accessibility, data-fetching, and
> i18n already wired up.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D24.13.0-brightgreen)](.nvmrc)
[![SDK](https://img.shields.io/badge/Experience%20SDK-8.1.2-7c3aed)](experience-update-docs.md)

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
    - `HelloUserCard` — the minimum-viable card
    - `EthosFetchCard` — Data Connect data with loading/error/empty states
    - `ConfigurableCard` — a `customConfiguration` admin form
    - `PageLinkCard` — card → full-width page navigation
- **One sample page** exercising `useDashboardInfo` / `useExtensionInfo`.
- **Two working Data Connect pipelines** (`persons`, `academic-periods`)
  in the top-level `DataConnect/` folder. Import them unchanged into
  any Banner or Colleague Ethos tenant.
- **Branding tokens** layered: Path Design System tokens (baseline) +
  institutional overlay (Florida Poly defaults, swappable) + live
  dashboard theme (`useThemeInfo`).
- **Material Symbols Outlined** icons via a single `<Icon>` component;
  font auto-loaded with retry.
- **Adobe Typekit** brand-font loader, configurable per institution.
- **`react-intl`** with locale cascade (exact → language → English).
- **`withStyles`** HOC from `@ellucian/react-design-system/core/styles`
  on every component — matches Ellucian samples and FL Poly extensions.
  No inline hex values.
- **Two-layer data flow**: pure async `src/data/<domain>.js` fetchers
  consumed by React `src/hooks/use<Domain>.js` state machines.
- **WCAG 2.2 AA** floor — every component has render + `jest-axe` tests.
- **CI workflows** referencing the community's reusable workflow.

It is **not** a fork of `experience-sdk-sample-extensions`. It is
community-built for institutional adoption.

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
2. Edit [`src/utils/branding/tokens.js`](src/utils/branding/tokens.js)
   for colors, typography, logos, and Typekit kit ID. See
   [`docs/BRANDING.md`](docs/BRANDING.md).
3. Replace the sample cards in `src/cards/` with your real ones.
4. Update `src/i18n/en.json` strings.
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
├── extension.js                       SDK manifest (root, CommonJS)
├── webpack.config.js                  Re-exports SDK webpack config
├── sample.env                         Environment variables template
├── package.json                       Pinned to SDK 8.1.2
│
├── DataConnect/                       Data Connect pipeline JSONs
│   ├── README.md
│   ├── persons/
│   └── academic-periods/
│
├── src/
│   ├── i18n/
│   │   ├── en.json
│   │   ├── intlUtility.js             getMessages(userLocale)
│   │   └── ReactIntlProviderWrapper.jsx
│   ├── cards/
│   │   ├── HelloUserCard/
│   │   ├── EthosFetchCard/
│   │   ├── ConfigurableCard/          (+ ConfigurableCardConfig.jsx)
│   │   └── PageLinkCard/
│   ├── pages/SamplePage/
│   │   ├── router.jsx                 HashRouter entry
│   │   └── SamplePage.jsx
│   ├── components/
│   │   ├── Icon/                      Material Symbols Outlined glyph
│   │   └── common/
│   │       ├── LoadingState/
│   │       ├── ErrorState/
│   │       ├── EmptyState/
│   │       └── RefreshDataStatusMessage/
│   ├── hooks/
│   │   ├── useEthosFetch.js
│   │   ├── useExtensionConfig.js
│   │   ├── useAnnouncer.js
│   │   ├── usePrefersReducedMotion.js
│   │   ├── useTypekitFont.js
│   │   ├── useMaterialIconFonts.js
│   │   └── useAcademicPeriods.js      (domain hook example)
│   ├── data/
│   │   ├── persons.js                 fetchPersons(...)
│   │   └── academicPeriods.js         fetchAcademicPeriods(...)
│   └── utils/
│       ├── branding/                  tokens (Path + institutional), theme, icons, fontLoader
│       ├── ethos/                     authenticatedFetch, errors, serverless
│       ├── a11y/                      announcer, IDs, keyboard helpers
│       ├── format/                    Intl-based date/number formatting
│       └── sdk/                       PropTypes for SDK-injected props
│
├── docs/
│   ├── INSTITUTIONAL_SETUP.md
│   ├── DEVELOPMENT.md
│   ├── BRANDING.md
│   ├── CONFIGURATION.md
│   ├── DATA_CONNECT.md
│   └── TROUBLESHOOTING.md
└── PLAN.md                            architecture decisions for this template
```

## Configuration reference

Three configuration surfaces:

| Surface | When | Where |
|---------|------|-------|
| Experience-managed (extension/card) | Admin-set per tenant | `extension.js` `configuration` block; read via `useCardInfo` / `useExtensionInfo` |
| Environment variables | Local dev only | `sample.env` → `.env`; in production every value is overridden by Experience-managed config |
| Branding tokens | Compile-time, swappable per fork | `src/utils/branding/tokens.js` |

See [`docs/CONFIGURATION.md`](docs/CONFIGURATION.md) for the full
reference table.

## Accessibility

This template targets **WCAG 2.2 AA**. CI runs `jest-axe` across every
component. ESLint enforces `eslint-plugin-jsx-a11y` in error mode.
When customizing for your institution, [verify color contrast](docs/BRANDING.md)
against your palette.

## Updating the SDK

Ellucian's authoritative SDK changelog lives in
[`experience-update-docs.md`](experience-update-docs.md). When a new
SDK version drops, follow that document — update `package.json`,
delete `package-lock.json` and `node_modules`, then re-install. See
[`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) for common
upgrade issues.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Highlights:

- Conventional Commits required.
- DCO sign-off on every commit (`git commit -s`). No CLA.
- Apache 2.0 SPDX header on every `.js`/`.jsx` file.
- No vendor-specific AI configuration files (`CLAUDE.md`, `AGENTS.md`,
  `.cursorrules`, `copilot-instructions.md`, `.claude/`). The
  framework is intentionally vendor-neutral.

## License

Apache License 2.0 — see [`LICENSE`](LICENSE).

Copyright 2026 Experience Extension Community contributors.

## Acknowledgments

- Ellucian for the Experience SDK and Path Design System.
- Florida Polytechnic University for initiating the community.
- Material Symbols Outlined (Google) for the icon font.
- Every institution that contributes back.
