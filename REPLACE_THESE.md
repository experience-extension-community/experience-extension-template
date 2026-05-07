# Replace these before publishing

Open this checklist immediately after using this template. Total
time: ~15–20 minutes.

## 1. `package.json`

- [ ] `name` — your extension's slug (e.g., `experience-card-degree-progress`)
- [ ] `description` — one sentence
- [ ] `repository.url` — your repo's HTTPS URL
- [ ] `homepage` — usually the repo URL with `#readme`
- [ ] `bugs.url` — your repo's issues URL
- [ ] `author` — your institution

## 2. `extension.js` (repo root)

- [ ] `name` — same slug as `package.json` `name`
- [ ] `publisher` — your institution (overrides the `PUBLISHER` env var)
- [ ] Each card's `type`, `title`, `displayCardType`, `description`, `template`
- [ ] Card `configuration` knobs that apply to your real use case
  (or rely on the extension-level `configuration` block already present)
- [ ] Remove sample cards you don't need (HelloUserCard, EthosFetchCard,
      ConfigurableCard, PageLinkCard) and add your own
- [ ] `page.fullWidth` per your design

## 3. `sample.env` → `.env`

- [ ] `cp sample.env .env`
- [ ] Fill in `EXPERIENCE_EXTENSION_UPLOAD_TOKEN` (or leave commented out
      until you have a real token — see the file's comments).
- [ ] (Optional) Setup API vars (shared secret, enabled, environments).
- [ ] `PUBLISHER` — your institution slug.
- [ ] `PIPELINE_*` — names of the pipelines in your Ethos Data Connect
      tenant.

## 4. Branding — `src/utils/branding/brandColors.js`

One file owns colors, the brand font (Typekit kit + web font name),
and asset URLs. See [`docs/BRANDING.md`](docs/BRANDING.md) for the
step-by-step.

- [ ] `brandColors` palette — your institution's brand colors
      (verify WCAG contrast against your palette).
- [ ] `brandFont.kitId` — your Adobe Fonts (Typekit) kit ID, OR `''`
      to disable Typekit and use system fonts.
- [ ] `brandFont.webFontName` — the web font name from your kit's
      settings (e.g. `proxima-nova`). Must match what's actually in
      the kit.
- [ ] `brandFont.fallbackStack` — (optional) tweak the system
      fallback stack used while the kit CSS loads.
- [ ] `assets` — your hosted logo / favicon URLs.
- [ ] (Optional) extend the `import { ... } from '@ellucian/react-design-system/core/styles/tokens'`
      block as components need more Path tokens.

## 5. Ownership and license

- [ ] `LICENSE` — change copyright line to your institution (keep
      Apache 2.0 body).
- [ ] `.github/CODEOWNERS` — replace placeholder with your team handle.

## 6. SPDX headers

- [ ] Search for `Experience Extension Community contributors` and
      replace with your institution where appropriate. Keep the
      `// SPDX-License-Identifier: Apache-2.0` line on every file.

## 7. README

- [ ] Replace this template's README with your extension's README.
      Keep the structure (description, screenshots, prerequisites,
      quickstart, configuration reference, customization, license).
- [ ] Add screenshots to `docs/screenshots/` (create the folder).

## 8. Sample cards and page

- [ ] Replace each `src/cards/<Card>/` with your real cards. Each
      card has its own README explaining hooks/config/i18n.
- [ ] Replace `src/page/` (Home, HooksPage, TermsPage, LinksPage,
      router) with your real page module — or delete `src/page/`
      and remove the `page` field from `extension.js` if you only
      ship cards.
- [ ] Update `src/i18n/en.json` strings; remove keys for deleted
      cards. See [`docs/I18N.md`](docs/I18N.md).

## 9. Data Connect

- [ ] Decide whether to keep the `DataConnect/` example pipelines or
      replace with your institution's. See
      [`docs/DATA_CONNECT.md`](docs/DATA_CONNECT.md) for pipeline
      creation + permissioning.
- [ ] Import each pipeline JSON into your Ethos Data Connect tenant.
- [ ] Verify each `PIPELINE_*` env var matches a pipeline that exists.

## 10. Verify

- [ ] `npm install`
- [ ] `npm run verify`  (lint + format check + tests all pass)
- [ ] `npm run build-prod`   (produces a clean bundle)
- [ ] `npm start`       (renders in the SDK's local dev shell)

## 11. Topics

After pushing the repo, add GitHub topic tags:
`ellucian-experience` plus one of `experience-card`, `experience-page`,
or `experience-extension`. Plus subject tags as relevant
(`student-services`, `advising`, etc.).

## 12. Catalog entry

When the extension is stable, open a PR against the hub repo's
`CATALOG.md` to list it. See existing entries for the format.
