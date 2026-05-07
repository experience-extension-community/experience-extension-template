# Troubleshooting

Common issues hit when adopting this template.

## `npm install` fails on `@ellucian/*` packages

Those dependencies install from CDN tarballs (per the SDK 8.1.2
upgrade docs). Symptoms: 404, certificate error, or `ENOTFOUND`.

- Confirm the version strings in `package.json` match the latest
  [SDK_UPDATES.md](SDK_UPDATES.md).
- Confirm corporate proxy / firewall allows `cdn.elluciancloud.com`.
- Delete `package-lock.json` and `node_modules`, then re-run `npm install`.

## Lint complains about `eslint.config.mjs`

You need ESLint 9.x. Old ESLint 8.x doesn't understand the flat
config. Verify with `npx eslint -v`. Re-run `npm install` if you
recently upgraded the package version.

## Brand font isn't loading

Four failure modes:

1. **Kit CSS request never fires.** Open DevTools → Network. If
   there's no request to `https://use.typekit.net/<kit-id>.css`,
   confirm `useTypekitFont()` is called in your card / page mount
   or `ensureTypekitFont()` runs in `src/page/router.jsx`.
2. **Kit CSS request 404s.** Your `brandFont.kitId` in
   `src/utils/branding/brandColors.js` is wrong. Open your kit at
   <https://fonts.adobe.com/> and copy the slug from its embed
   code's `use.typekit.net/<slug>.css` URL.
3. **Kit CSS loads but the font still doesn't apply.** Your
   `brandFont.webFontName` doesn't match any font in the kit.
   Open the kit's settings and copy the *web font name* (not the
   display name) for the primary font — it's usually kebab-case
   like `proxima-nova` or `new-science`. Update
   `brandFont.webFontName` to match.
4. **Kit ID is intentionally empty.** `brandFont.kitId: ''`
   disables Typekit entirely; components use the fallback stack.
   This is a feature, not a bug.

See [`BRANDING.md`](BRANDING.md) for the full setup walkthrough.

## Material Symbols Outlined glyphs render as text

Same root cause as above for the icon font. Look for a request to
`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined…`.
If absent, confirm `useMaterialIconFonts()` is called in your card,
or `loadMaterialSymbolsCSS()` runs in `src/page/router.jsx`.

## Tests fail with `useThemeInfo is not a function`

The Jest manual mock at `__mocks__/@ellucian/experience-extension-utils.js`
provides a default `useThemeInfo`. Tests need to call
`jest.mock('@ellucian/experience-extension-utils')` for that mock to
take effect — see existing component tests for the pattern.

## `npm run build-prod` crashes with "Cannot read properties of null (reading 'accountId')"

Full error:

```
TypeError: Cannot read properties of null (reading 'accountId')
    at WebpackExperienceValidatorPlugin.validateExtensionConfig
```

Cause: your `.env` has `EXPERIENCE_EXTENSION_UPLOAD_TOKEN` set to a
non-JWT value (e.g. the literal placeholder `<upload-token>` or any
string that isn't a real token). The SDK's webpack validator
unconditionally JWT-decodes whatever value is present and crashes
when decoding returns `null`.

Fix: either supply a real upload token from the Experience admin UI,
or **comment out the line entirely** while you only need to build /
test / lint locally:

```
# EXPERIENCE_EXTENSION_UPLOAD_TOKEN=<paste-real-jwt-here>
```

Local-only commands (`npm install`, `npm test`, `npm run lint`,
`npm run build-prod`) work without the token. Only the deploy
commands (`deploy-dev`, `deploy-prod`, `watch-and-upload`) need it.

## Page-side fetch returns 400 ("cardId not configured for pipeline")

If `TermsPage` or any other page that calls `authenticatedEthosFetch`
returns 400, the most common cause is that the launching card's
cardId isn't authorized for the pipeline. Symptoms in DevTools:

```
GET .../api/<pipeline>?cardId=<orgId>|<publisher>|<extension>|PageLinkCard
→ 400
```

Fix: `extension.js` declares `configuration` at the **extension
level** so every card (including PageLinkCard) inherits the
`termsPipeline` + `ethosApiKey` values. Make sure an admin has
saved that extension-level configuration in Experience Manager;
until saved, the cardId isn't registered with the pipeline.

## CI's reusable workflow fails to resolve

The `ci.yml` references
`experience-extension-community/.github/.github/workflows/reusable-ci.yml@main`.
That file must exist on the hub repo's `main` branch. If it was
moved or renamed, update the `uses:` line.
