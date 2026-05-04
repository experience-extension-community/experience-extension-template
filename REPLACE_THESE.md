# Replace these before publishing

Open this checklist immediately after using this template. Work
top-to-bottom; each step is small. Total time: ~15 minutes.

## 1. `package.json`

- [ ] `name` — your extension's slug (e.g., `experience-card-degree-progress`)
- [ ] `description` — one sentence
- [ ] `repository.url` — your repo's HTTPS URL
- [ ] `homepage` — usually the repo URL with `#readme`
- [ ] `bugs.url` — your repo's issues URL
- [ ] `author` — your institution

## 2. `src/extension.js`

- [ ] `name` — same slug as `package.json` `name`
- [ ] `publisher` — your institution's slug
- [ ] Card `type`, `title`, `displayCardType`, `description`
- [ ] Card `configuration.client` — your card's config knobs
- [ ] Replace `SampleCard` and `SamplePage` imports / wires once you
      rename or replace them

## 3. Branding — `src/utils/branding/tokens.js`

- [ ] `palette` — your institution's brand colors
- [ ] `typography.fontFamily` — your font stack
- [ ] `assets` — your hosted logo / favicon URLs
- [ ] `fontLoader.typekitKitId` — your Adobe Typekit kit ID, or `''`
      if you don't use Typekit

## 4. Local environment

- [ ] `cp .env.example .env.local`
- [ ] Fill in `EXPERIENCE_TENANT_URL`, `EXPERIENCE_TENANT_ID`,
      `ETHOS_API_KEY`, `ETHOS_PROXY_URL`
- [ ] (Optional) `DATA_CONNECT_PIPELINE_URL`, `TYPEKIT_KIT_ID`

## 5. Ownership and license

- [ ] `LICENSE` — change the copyright line to your institution
      (keep the Apache 2.0 body)
- [ ] `.github/CODEOWNERS` — replace the team handle with your team

## 6. Source files

- [ ] Update SPDX copyright lines to name your institution. Search
      for `Experience Extension Community contributors` and replace
      where appropriate.

## 7. README

- [ ] Replace the template README with your extension's README.
      Keep the structure (description, screenshots, prerequisites,
      quickstart, configuration reference, customization, license).
- [ ] Add screenshots to `docs/screenshots/` (create the folder).
- [ ] Update the badges to point to your repo.

## 8. Sample code

- [ ] Replace `src/cards/SampleCard/` with your card.
- [ ] Replace `src/pages/SamplePage/` with your page (or delete
      `src/pages/` and remove the `page` field from `extension.js`
      if you only ship a card).
- [ ] Update `src/i18n/en.json` strings.

## 9. Verify

- [ ] `npm install`
- [ ] `npm run verify`  (lint + format check + tests all pass)
- [ ] `npm run build`   (produces a clean bundle)
- [ ] `npm start`       (renders in Experience dev mode)

## 10. Topics

After pushing, add GitHub topic tags on the repo:
`ellucian-experience`, plus one of `experience-card`, `experience-page`,
`experience-extension`. Plus subject tags (`student-services`,
`advising`, etc.).

## 11. Catalog entry

When the extension is stable, open a PR against the hub repo's
`CATALOG.md` to list it. Use the existing entries as the format guide.
