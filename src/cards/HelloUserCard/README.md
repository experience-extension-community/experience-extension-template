# HelloUserCard

The minimum viable Experience card. Copy this folder as the starting
point for a brand-new card.

Demonstrates:

- `useUserInfo()` — read the signed-in user's name
- `useExtensionControl().setLoadingStatus(false)` — dismiss the SDK loading spinner once mounted
- `withStyles` HOC from `@ellucian/react-design-system/core/styles` — class-name injection via `classes` prop
- Path tokens (`spacing20`, `spacing30`) imported directly from `@ellucian/react-design-system/core/styles/tokens`
- `brandColors.polyPurple` literal hex value imported from `src/utils/branding/brandColors.js`
- `IconSprite` from `@ellucian/ds-icons/lib`
- `<Icon>` for a Material Symbols Outlined glyph
- `useTypekitFont()` — load the brand font on mount (the icon stylesheet is loaded inline by `withIntl`)
- `react-intl` — every user-facing string flows through `intl.formatMessage`
- `withIntl(...)` HOC — wraps the card in IntlProvider; the SDK passes `userInfo` as a prop to this wrapper

HOC composition order is the FL Poly canonical:

```jsx
export default withStyles(styles)(withIntl(HelloUserCard));
```

withStyles outermost.

No data fetching. No configuration. No tests of state machines —
just rendering.
