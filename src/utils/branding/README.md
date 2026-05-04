# Branding utilities

Everything that defines an institution's visual identity lives here. To
re-skin this extension for another institution, swap the values in
`tokens.js` and (optionally) the Typekit kit ID. No component code
references colors or fonts directly.

## Files

| File | Purpose |
|------|---------|
| `tokens.js` | Static design tokens — colors, typography, spacing, radius, elevation, focus, motion, asset URLs, font kit ID. **The only file institutions need to edit.** |
| `theme.js` | `useResolvedTheme()` hook that merges `tokens.js` with the live dashboard theme via `useThemeInfo`. Components consume this hook, never `tokens.js` directly. |
| `icons.js` | Material Symbols Outlined loader and `iconStyle()` helper. |
| `fontLoader.js` | Adobe Typekit loader for the institutional brand font. |
| `index.js` | Public surface for the rest of the codebase. |

## Editing for your institution

1. Open `tokens.js`.
2. Replace every value under `palette`, `typography.fontFamily`,
   `assets`, and `fontLoader.typekitKitId` with your institution's
   equivalents.
3. **Do not** change keys, structure, or remove fields. Components
   import specific keys and will break otherwise.
4. Verify color contrast: text-on-`surface` must be ≥ 4.5:1; UI
   borders ≥ 3:1.
5. If you do not use Adobe Typekit, set `fontLoader.typekitKitId` to
   an empty string and update `typography.fontFamily` to your stack.

## Why a hook, not a context provider?

The dashboard theme is already provided by the SDK's React context.
`useResolvedTheme` reads from it via `useThemeInfo()` and merges the
result with static tokens — there's no value in adding a second
provider on top.
