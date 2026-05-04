# Experience Extension Template

> Community template for **Ellucian Experience SDK 8.1.2**. Fork it,
> customize the branding, replace the sample card and page, and you
> have a publishable extension scaffolded with CI, accessibility,
> data-fetching, and i18n already wired up.

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

A minimal, opinionated starting point for an Ellucian Experience extension:

- **One card and one page**, intentionally boring, demonstrating the
  patterns you'll repeat in your own code.
- **Branding tokens** (colors, fonts, icons, asset URLs) in one file —
  swap them and you've re-skinned every component.
- **Material Symbols Outlined** icons via a single `<Icon name="…" />`
  component, with the font auto-loaded.
- **Adobe Typekit** brand-font loader, configurable per institution.
- **`useEthosFetch`** hook with retry, timeout, error normalization,
  and `LoadingState` / `ErrorState` / `EmptyState` companions.
- **WCAG 2.2 AA** floor — every component ships with a render test
  and a `jest-axe` test.
- **CI workflows** referencing the community's reusable workflow.
- **i18n** via JSON locale files — no hardcoded strings.

It is **not** a fork of `experience-sdk-sample-extensions`. It is
designed for institutional adoption, not just demonstration.

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `24.13.0` (run `nvm use`) |
| Experience SDK | `8.1.2` (pinned in `package.json`) |
| Access | Ellucian Experience tenant + Ethos Integration tenant for local dev |

## Quickstart

```bash
git clone <your-fork-url>
cd <your-extension>
nvm use
npm install
cp .env.example .env.local       # fill in your tenant + Ethos values
npm start
```

Then open the URL printed by `npm start` to see the sample card and page
inside the Experience dev shell.

## Customizing for your institution

1. Walk through [`REPLACE_THESE.md`](REPLACE_THESE.md). It is the
   complete onboarding checklist.
2. Edit [`src/utils/branding/tokens.js`](src/utils/branding/tokens.js)
   for colors, typography, logos, and Typekit kit ID. See
   [`docs/BRANDING.md`](docs/BRANDING.md).
3. Replace the sample card and page in `src/cards/` and `src/pages/`.
4. Update `src/i18n/en.json` strings (and add other locales as needed).

## Daily commands

| Command | What it does |
|---------|--------------|
| `npm start` | Run the Experience dev server. |
| `npm run build` | Build an uploadable extension bundle. |
| `npm run lint` / `lint:fix` | Run / fix ESLint 9 flat config. |
| `npm run format` / `format:check` | Prettier write / check. |
| `npm test` / `test:ci` / `test:watch` | Jest. |
| `npm run verify` | Lint + format check + tests (matches CI). |

## Project structure

```
.
├── src/
│   ├── extension.js                   SDK manifest
│   ├── cards/SampleCard/              Sample card
│   ├── pages/SamplePage/              Sample page
│   ├── components/
│   │   ├── Icon/                      Material Symbols Outlined glyph
│   │   ├── LoadingState/
│   │   ├── ErrorState/
│   │   └── EmptyState/
│   ├── hooks/
│   │   ├── useEthosFetch.js
│   │   ├── useExtensionConfig.js
│   │   ├── useAnnouncer.js
│   │   └── usePrefersReducedMotion.js
│   ├── utils/
│   │   ├── branding/                  tokens, theme, icons, font loader
│   │   ├── ethos/                     authenticatedFetch, errors, serverless
│   │   ├── a11y/                      announcer, IDs, keyboard helpers
│   │   ├── format/                    Intl-based date/number formatting
│   │   └── sdk/                       PropTypes for SDK-injected props
│   └── i18n/                          translation JSON
├── docs/
│   ├── INSTITUTIONAL_SETUP.md
│   ├── DEVELOPMENT.md
│   ├── BRANDING.md
│   ├── CONFIGURATION.md
│   └── TROUBLESHOOTING.md
├── .github/                           workflows + issue + PR templates
├── ARCHITECTURE.md                    per-extension architecture (replace)
├── RUNBOOK.md                         on-call reference (replace)
├── SECURITY.md                        per-extension security notes (replace)
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE                            Apache 2.0
└── REPLACE_THESE.md                   onboarding checklist
```

## Configuration reference

See [`docs/CONFIGURATION.md`](docs/CONFIGURATION.md) for the three
configuration surfaces (Experience-managed, env vars, branding tokens)
and the canonical reference table.

The minimum local-dev `.env.local` requires:

| Name | Required | Purpose |
|------|----------|---------|
| `EXPERIENCE_TENANT_URL` | yes (local dev) | Your Experience tenant URL. |
| `EXPERIENCE_TENANT_ID` | yes (local dev) | Your tenant ID. |
| `ETHOS_API_KEY` | yes (local dev) | Non-prod Ethos key. |
| `ETHOS_PROXY_URL` | yes (local dev) | Ethos proxy URL. |
| `DATA_CONNECT_PIPELINE_URL` | no | Optional serverless pipeline URL. |
| `TYPEKIT_KIT_ID` | no | Override the brand-font kit ID. |

Full file: [`.env.example`](.env.example).

## Accessibility

This template targets **WCAG 2.2 AA**. The CI pipeline runs `jest-axe`
across every component test. ESLint enforces `eslint-plugin-jsx-a11y`
in error mode. When customizing for your institution, [verify color
contrast](docs/BRANDING.md#accessibility) against your palette.

## Updating the SDK

The Experience SDK changelog lives in [`experience-update-docs.md`](experience-update-docs.md).
When Ellucian releases a new SDK version, update `package.json` per
that document, delete `package-lock.json` and `node_modules`, then
re-install. See [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md)
for common upgrade issues.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Highlights:

- Conventional Commits required.
- DCO sign-off on every commit (`git commit -s`). No CLA.
- Apache 2.0 SPDX header on every `.js`/`.jsx` file.
- No vendor-specific AI configuration files (`CLAUDE.md`,
  `AGENTS.md`, `.cursorrules`, `copilot-instructions.md`, `.claude/`).
  The framework is intentionally vendor-neutral.

## License

Apache License 2.0 — see [`LICENSE`](LICENSE).

Copyright 2026 Experience Extension Community contributors.

## Acknowledgments

- Ellucian for the Experience SDK and Path Design System.
- Florida Polytechnic University for initiating the community.
- Material Symbols Outlined (Google) for the icon font.
- Every institution that contributes back.
