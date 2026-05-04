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
- [ ] Remove sample cards you don't need (HelloUserCard, EthosFetchCard,
      ConfigurableCard, PageLinkCard) and add your own
- [ ] `page.title` and `page.fullWidth` per your design

## 3. `sample.env` → `.env`

- [ ] `cp sample.env .env`
- [ ] Fill in `EXPERIENCE_EXTENSION_UPLOAD_TOKEN`
- [ ] (Optional) Setup API vars (shared secret, enabled, environments)
- [ ] `PUBLISHER` — your institution slug
- [ ] `PIPELINE_*` — names of the pipelines in your Ethos Data Connect tenant
- [ ] (Optional) `TYPEKIT_KIT_ID` — your Adobe Typekit kit ID, or empty

## 4. Branding — `src/utils/branding/tokens.js`

- [ ] `palette` — your institution's brand colors (verify WCAG contrast)
- [ ] `typography.fontFamily` — your font stack
- [ ] `assets` — your hosted logo / favicon URLs
- [ ] `fontLoader.typekitKitId` — your Typekit kit ID (or `''` to disable)
- [ ] (Optional) extend the `import { ... } from '@ellucian/react-design-system/core/styles/tokens'` block as components need more Path tokens

## 5. Ownership and license

- [ ] `LICENSE` — change copyright line to your institution (keep Apache 2.0 body)
- [ ] `.github/CODEOWNERS` — replace placeholder with your team handle

## 6. SPDX headers

- [ ] Search for `Experience Extension Community contributors` and
      replace with your institution where appropriate. Keep the
      `// SPDX-License-Identifier: Apache-2.0` line on every file.

## 7. README

- [ ] Replace this template's README with your extension's README.
      Keep the structure (description, screenshots, prerequisites,
      quickstart, configuration reference, customization, license).
- [ ] Add screenshots to `docs/screenshots/` (create the folder).

## 8. Sample cards

- [ ] Replace each `src/cards/<Card>/` with your real cards.
- [ ] Replace `src/pages/SamplePage/` with your real page (or delete
      `src/pages/` and remove the `page` field from `extension.js`
      if you only ship cards).
- [ ] Update `src/i18n/en.json` strings; remove keys for deleted cards.

## 9. Data Connect

- [ ] Decide whether to keep the `DataConnect/` example pipelines or
      replace with your institution's. See `docs/DATA_CONNECT.md`.
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
