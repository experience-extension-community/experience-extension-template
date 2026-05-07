# HelloUserCard ("User Card")

Minimum-viable card. Greets the signed-in user with avatar, full
name, email, and locale chip. No data fetch, no configuration. Use
as a starting point when adding a new card.

## What it shows

- Avatar with initials (`firstName[0]` + `lastName[0]`).
- Time-of-day greeting + first name (Good morning / afternoon /
  evening).
- Full name (only if it differs from "firstName lastName").
- Email (`mailto:` link).
- Locale chip.

## SDK hooks used

| Hook | What it gives | Why |
|------|---------------|-----|
| `useUserInfo()` | `firstName`, `lastName`, `fullName`, `emailAddress`, `locale` | The whole point of the card. |
| `useIntl()` | `formatMessage` | Localized greeting + fallback name. |

Plus two template-internal hooks:

- `useTypekitFont()` — loads the institution's Typekit kit.
- `useMaterialIconFonts()` — loads Material Symbols Outlined for icons.

## Configuration

None. Renders entirely off `useUserInfo()`. The extension-level
`ethosApiKey` and `termsPipeline` declared in `extension.js` are
ignored by this card.

## Customization points

| What | Where |
|------|-------|
| Brand colors / fonts | `src/utils/branding/brandColors.js` (project-wide; this card consumes `brandColors.primary` for the avatar, `surface`/`surfaceMuted` for backgrounds, `textPrimary`/`textSecondary`/`textMuted` for typography). |
| Greeting copy | `src/i18n/en.json` keys below. |
| Time thresholds | `computeGreeting()` in `HelloUserCard.jsx` (defaults: <12 morning, <18 afternoon, else evening). |
| Layout | `styles` block at top of `HelloUserCard.jsx`. |

## i18n keys

| Key | Default | Notes |
|-----|---------|-------|
| `hello.morning` | "Good morning" | Used when local hour < 12. |
| `hello.afternoon` | "Good afternoon" | Used when local hour < 18. |
| `hello.evening` | "Good evening" | Used otherwise. |
| `hello.fallback` | "Welcome" | Shown when `firstName` is empty. |

Add matching keys in `src/i18n/<locale>.json` to localize. See
[`docs/I18N.md`](../../../docs/I18N.md).

## Files

```
HelloUserCard/
└── HelloUserCard.jsx     The card component
```

## Replacing this card

This is a teaching card. To remove or replace:

1. Delete the `HelloUserCard/` folder.
2. Remove its entry from `extension.js` `cards: [...]`.
3. Remove its keys from `src/i18n/en.json` (and any locale files).
4. (Optional) Remove `useUserInfo` from
   `__mocks__/@ellucian/experience-extension-utils.js` if no other
   card uses it.

If you're keeping it as a starting point, copy the folder and
rename. Update the `type`, `title`, `displayCardType`, and
`source` in `extension.js`. Replace the body of the component with
your own JSX.
