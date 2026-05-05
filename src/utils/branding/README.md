# Branding utilities

Mirrors Florida Poly's `src/styles/brandColors.js` + `src/utils/fontLoader.js`
pattern used in `exp-account-details-custom` and `exp-canvas-teachers`.

## Files

| File | Purpose |
|------|---------|
| `brandColors.js` | Flat object of literal hex values, plus `colorBackgroundDefault` from EDS as the one Path token used. **The only file institutions need to edit.** Also exports `fontLoader` (Typekit kit ID) and `assets` (logo URLs). |
| `fontLoader.js` | `ensureTypekitFont()` imperative loader — used by `useTypekitFont()` hook in `src/hooks/`. |
| `icons.js` | `iconStyle()` helper for Material Symbols Outlined glyph rendering. The stylesheet itself is loaded inline by `withIntl` (`src/i18n/ReactIntlProviderWrapper.jsx`); no programmatic loader needed. |

## Editing for your institution

1. Open `brandColors.js`.
2. Replace the hex values (`polyPurple`, `cyberBlue`, etc.) with your
   institution's brand colors.
3. Verify color contrast: text-on-`surface` ≥ 4.5:1, UI ≥ 3:1.
4. Replace `fontLoader.typekitKitId` with your kit ID, or set it to
   `''` if you don't use Typekit.
5. Replace `assets` URLs with your institution's hosted logos.

## Why no `useResolvedTheme` hook?

An earlier iteration of this template had a runtime theme-merging
hook that combined Path tokens, an institutional overlay, and the
live dashboard theme via `useThemeInfo`. It crashed in the SDK dev
shell. FL Poly's working extensions don't have one — they use static
`brandColors` literal hex values. We do the same.

If your institution wants per-tenant runtime theme override, you
can add `useThemeInfo()` reads inside individual cards. Don't
introduce a layer of indirection that isn't proven against the SDK.

## What about Path's color tokens?

Path Design System exports many color tokens. We import only the
single token FL Poly imports in production: `colorBackgroundDefault`.
The full token catalog lives at
<https://path-designsystem.elluciancloud.com/#/utilities/tokens>
— add additional imports here if your styles need them, but don't
guess names; verify each against the docs first.
