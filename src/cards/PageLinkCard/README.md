# PageLinkCard ("Sample Pages")

Card → page navigation launcher. Three rows; each opens a
sub-page of the extension page. The "Hooks & properties" row
opens a small choice dialog: card-context hooks (in a dialog) or
page-context hooks (on the `/hooks` page).

## What it shows

| Row | What it does |
|-----|--------------|
| Hooks & properties | Opens a choice dialog → either `DebugHooksDialog` (card hooks) or `navigateToPage({ route: '/hooks' })` (page hooks). |
| Active Terms | `navigateToPage({ route: '/terms' })` → `TermsPage`. |
| Configured Links | `navigateToPage({ route: '/links' })` → `LinksPage`. |

Body click anywhere outside the rows opens the page hub (`/`).

## SDK hooks used (card)

| Hook | Why |
|------|-----|
| `useExtensionControl().setLoadingStatus(false)` | Dismiss SDK skeleton. |
| `cardControl.navigateToPage({ route })` | Card → page navigation. |
| `useIntl()` | Localize row labels + dialog copy. |

## SDK hooks used (the dialog)

`DebugHooksDialog` (`src/components/common/DebugHooksDialog.jsx`)
reads every card-context hook and dumps the result — useful as a
developer reference. Hooks called: `useCardInfo`,
`useCardControl`, `useUserInfo`, `useThemeInfo`,
`useExtensionControl`, `useExtensionInfo`, `useData`, `useCache`,
`useExperienceInfo`, `useDashboardInfo`.

## Configuration (manifest)

Declared in `extension.js`:

| Field | Default | What it does |
|-------|---------|--------------|
| `pageRoute.route` | `/` | Body-click destination on the dashboard. |
| `pageRoute.excludeClickSelectors` | `['button']` | Stops body-click from hijacking the row buttons. |

Inherits the extension-level `termsPipeline` + `ethosApiKey` from
`extension.js` (used downstream by the page).

## Important: pageRoute and excludeClickSelectors

If you add interactive children to this card (more buttons,
links), make sure the SDK doesn't swallow their clicks. Either:

- Add the selector to `excludeClickSelectors` (currently
  `['button']`).
- Or use `event.stopPropagation()` on the child handler.

**Symptom:** clicking a row navigates to the page hub instead of
doing what the row says. Cause: missing exclusion.

## Customization points

| What | Where |
|------|-------|
| Add / remove rows | `PAGES` array in `PageLinkCard.jsx`. Each entry: `{ route, icon, labelId, defaultLabel }`. |
| Change row destination | `route` field in each `PAGES` entry. Must match a `<Route>` in `src/page/router.jsx`. |
| Change which row triggers the choice dialog | `HOOKS_ROUTE` constant + the conditional in `handleRowClick`. |
| Disable choice dialog | Remove the special-case in `handleRowClick`; the row will navigate directly. |
| Choice dialog copy | i18n keys `card.pageLink.choice.*`. |

## i18n keys

| Key | Default |
|-----|---------|
| `card.pageLink.description` | "Open a section of the extension page." |
| `card.pageLink.hooks` | "Hooks & properties" |
| `card.pageLink.terms` | "Active terms" |
| `card.pageLink.links` | "Configured links" |
| `card.pageLink.choice.title` | (dialog title) |
| `card.pageLink.choice.body` | (dialog body — explains the choice) |
| `card.pageLink.choice.card` | "Card hooks" |
| `card.pageLink.choice.page` | "Page hooks" |

## Files

```
PageLinkCard/
└── PageLinkCard.jsx
```

The page module that this card launches lives in `src/page/`. See
[`src/page/README.md`](../../page/README.md).

## Replacing this card

If your extension is **cards-only** (no page):

1. Delete `src/page/` entirely.
2. Remove the `page: { source: ... }` field from `extension.js`.
3. Delete this card.

If you keep the page but want different launcher rows:

1. Edit the `PAGES` array. Each entry needs `route`, `icon`
   (Material Symbols Outlined name), `labelId`, `defaultLabel`.
2. Make sure each `route` matches a `<Route>` in
   `src/page/router.jsx`.
3. Update i18n keys.
