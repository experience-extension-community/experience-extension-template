# HelloUserCard

The minimum viable Experience card. Copy this folder as the starting
point for a brand-new card.

Demonstrates:

- `useUserInfo()` — read the signed-in user's name
- `useThemeInfo()` via `useResolvedTheme()` — branded colors
- `useExtensionControl().setLoadingStatus(false)` — dismiss the SDK loading spinner once mounted
- `makeStyles` / `useStyles` from `@ellucian/react-design-system/core/styles`
- Path tokens (`spacing20`, `spacing30`)
- `IconSprite` from `@ellucian/ds-icons/lib`
- `<Icon>` for a Material Symbols Outlined glyph
- `useTypekitFont()` + `useMaterialIconFonts()` — load brand and icon fonts on mount
- `react-intl` — every user-facing string flows through `intl.formatMessage`
- `withIntl(...)` HOC at the export — wraps the card in the IntlProvider

No data fetching. No configuration. No tests of state machines —
just rendering.
