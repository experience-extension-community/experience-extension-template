# Branding

How to re-skin this extension for your institution.

## One file to change

```
src/utils/branding/tokens.js
```

Replace the values under `palette`, `typography`, `assets`, and
`fontLoader`. **Do not** rename keys — components import them.

## What flows where

| Concern | Source of truth | Who reads it |
|---------|-----------------|--------------|
| Colors | `palette` in `tokens.js`, optionally overridden per-tenant by `useThemeInfo()` (dashboard primary/secondary/CTA) | `useResolvedTheme()` in components |
| Typography | `typography` in `tokens.js` + Adobe Typekit kit ID | `loadBrandFont()` once at mount |
| Icons | `Icon` component, glyph names from <https://fonts.google.com/icons> | Components render `<Icon name="…" />` |
| Asset URLs | `assets` in `tokens.js` | Component code references `assets.logoHorizontal` etc. |

## Accessibility

After changing colors, **verify contrast**:

- Body text against `palette.surface` ≥ 4.5:1
- Large text and UI components ≥ 3:1
- Focus ring (`focus.ring`) visible on every background you use

A quick check tool: <https://webaim.org/resources/contrastchecker/>.

## Dashboard theme override

Experience exposes the tenant's dashboard theme via `useThemeInfo()`.
`useResolvedTheme()` automatically prefers the dashboard's
`primaryColor`, `secondaryColor`, and `ctaColors` over the static
tokens — so a card built by Florida Poly will adopt Stetson's primary
color when running in Stetson's tenant. You don't need to do anything
special to opt in.

## Removing Typekit

If your institution doesn't use Adobe Typekit:

1. Set `fontLoader.typekitKitId` to `''` in `tokens.js`.
2. Update `typography.fontFamily` to your preferred system stack.

`loadBrandFont()` becomes a no-op when the kit ID is empty.
