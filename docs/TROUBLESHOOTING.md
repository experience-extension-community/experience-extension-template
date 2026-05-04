# Troubleshooting

Common issues hit when adopting this template.

## `npm install` fails on `@ellucian/*` packages

Those dependencies install from CDN tarballs (per the SDK 8.1.2
upgrade docs). Symptoms: 404, certificate error, or `ENOTFOUND`.

- Confirm the version strings in `package.json` match the latest
  `experience-update-docs.md`.
- Confirm corporate proxy / firewall allows `cdn.elluciancloud.com`.
- Delete `package-lock.json` and `node_modules`, then re-run `npm install`.

## Lint complains about `eslint.config.mjs`

You need ESLint 9.x. Old ESLint 8.x doesn't understand the flat
config. Verify with `npx eslint -v`. Re-run `npm install` if you
recently upgraded the package version.

## Brand font isn't loading

- Open DevTools → Network. Look for a request to
  `https://use.typekit.net/<kit-id>.css`.
- If the request 404s, your kit ID is wrong (set in `tokens.js` or
  the `TYPEKIT_KIT_ID` env var).
- If the request is missing entirely, confirm `loadBrandFont()` is
  called in your card / page mount effect.

## Material Symbols Outlined glyphs render as text

Same root cause as above for the icon font. Look for a request to
`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined…`.
If absent, confirm `loadIconFont()` is called once after mount.

## Tests fail with `useThemeInfo is not a function`

The Jest manual mock at `__mocks__/@ellucian/experience-extension-utils.js`
provides a default `useThemeInfo`. Tests need to call
`jest.mock('@ellucian/experience-extension-utils')` for that mock to
take effect — see existing component tests for the pattern.

## CI's reusable workflow fails to resolve

The `ci.yml` references
`experience-extension-community/.github/.github/workflows/reusable-ci.yml@main`.
That file must exist on the hub repo's `main` branch. If it was
moved or renamed, update the `uses:` line.
