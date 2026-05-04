# Branding utilities

Three layers, lowest-priority first:

1. **Path Design System tokens** — imported in `tokens.js` from
   `@ellucian/react-design-system/core/styles/tokens`. Baseline
   visual system. Add tokens to the import block as components
   need them.
2. **Institutional overlay** — also `tokens.js`. Brand colors, font
   stack, asset URLs, Typekit kit ID. Florida Polytechnic defaults.
3. **Live dashboard theme** — `useThemeInfo()` from the SDK. Wins
   for primary/secondary/CTA at the current tenant.

`useResolvedTheme()` (in `theme.js`) merges all three. Components
consume that hook only.

## Files

| File | Purpose |
|------|---------|
| `tokens.js` | Path token re-export + institutional overlay. **The only file institutions need to edit.** |
| `theme.js` | `useResolvedTheme()` — composes all three layers. |
| `icons.js` | `iconStyle()` for Material Symbols Outlined glyph rendering. |
| `loadMaterialSymbols.js` | Imperative loader (with retry) for the icon stylesheet. |
| `fontLoader.js` | Imperative Adobe Typekit loader. |
| `index.js` | Public surface. |

The React-side wrappers (status-aware hooks for the imperative
loaders) live in `src/hooks/useTypekitFont.js` and
`src/hooks/useMaterialIconFonts.js`.

## Editing for your institution

1. Open `tokens.js`.
2. Replace `palette`, `typography.fontFamily`, `assets`, and
   `fontLoader.typekitKitId` with your institution's values.
3. **Do not** rename keys or restructure — components import them.
4. Verify color contrast (≥ 4.5:1 for body text on `palette.surface`,
   ≥ 3:1 for UI components / focus rings).
5. If you do not use Adobe Typekit, set `fontLoader.typekitKitId`
   to `''` and update `typography.fontFamily` to your stack.

## Why a hook, not a context provider?

The dashboard theme already arrives via `useThemeInfo()` (an
SDK-provided React context). Adding our own provider on top would be
redundant.
