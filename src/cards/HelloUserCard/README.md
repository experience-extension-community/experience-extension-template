# HelloUserCard

The minimum viable Experience card. **Use this as your starting point**
when adding a new card. It's also the only card in the manifest that
carries a `template:` block (the catalog showcase entry).

## What it demonstrates

- `function Card({ classes }) { ... }` shape — class-name injection
  via `withStyles` HOC, accessed from props
- `useUserInfo()` hook for the signed-in user's name
- `<div className={classes.root}>` outer wrapper (NOT `<Card>` —
  Experience supplies the card chrome itself; wrapping in another
  Card is redundant)
- `<IconSprite />` from `@ellucian/ds-icons/lib` rendered once near
  the top so Path icons render
- `Typography` + `spacing20`/`spacing30` design tokens
- HOC composition: `withStyles(styles)(HelloUserCard)`

## Pattern matches

Mirrors Florida Poly's working extension cards:
- `exp-account-details-custom/src/cards/AccountDetails.jsx` (hooks for SDK access)
- `custom-simple-links/src/cards/FavoriteLinks/FavoriteLinksCard.jsx` (withStyles + literal strings)
- Ellucian official `sdk-samples/extension.js` shape

## What it does NOT use

Intentionally omitted to keep the starting point as simple as possible:

- `withIntl` / `useIntl` / `injectIntl` — literal English strings only.
  Add localization later if needed (see `src/i18n/` for the wiring).
- `useTypekitFont`, `useMaterialIconFonts` — brand fonts not loaded.
  Add them if you need Typekit / Material Symbols Outlined glyphs.
- `useExtensionControl().setLoadingStatus` — not needed for cards
  with no async data.
- Custom configuration / pipeline.

Add these one at a time as your card needs them.
