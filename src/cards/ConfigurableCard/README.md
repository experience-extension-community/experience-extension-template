# ConfigurableCard ("Configurable Links")

A card whose **content** is set by an admin via a custom
configuration form. Demonstrates the `customConfiguration` pattern:
an admin form (rendered in Experience Manager) writes data, the
card reads + renders it.

## What it shows

Categorized links in collapsible sections. Each `<details>` is a
category; each link inside is an `<a target="_blank">`. Three
colors are admin-pickable from a swatch palette: category heading
color, link text color, hover accent.

## SDK hooks used (card)

| Hook | Why |
|------|-----|
| `useCardInfo()` | Read the persisted `customConfiguration.categories` and `.colors`. |
| `useExtensionControl().setLoadingStatus(false)` | Dismiss the SDK skeleton on mount. |
| `useIntl()` | Localize empty-state copy + unnamed-category fallback. |

Plus `useTypekitFont()`, `useMaterialIconFonts()`.

## SDK hooks used (config form)

| Hook / prop | Why |
|-------------|-----|
| `cardControl.setCustomConfiguration({ customConfiguration: { client: { categories, colors } } })` | Persist the admin's edits. |
| `cardControl.setIsCustomConfigurationValid(boolean, errorCount)` | Tell Experience whether **Save** can be enabled. |
| `cardInfo.configuration.customConfiguration.client` | Read the existing values when the form opens. |

## customConfiguration shape

```js
{
    customConfiguration: {
        client: {
            categories: [
                {
                    id: 'cat-...',
                    name: 'Academics',
                    links: [
                        { id: 'link-...', label: 'Course catalog', url: 'https://...' },
                    ],
                },
            ],
            colors: {
                category: 'muted',     // one of COLOR_PRESETS keys
                link: 'dark',
                hover: 'primary',
            },
        },
    },
}
```

When `useCardInfo()` reads this back, the SDK lifts `client.X` to
the top level — so the card sees
`cardInfo.configuration.customConfiguration.categories` (no
`.client.` in the read path). The form, on the other hand, reads
`cardInfo.configuration.customConfiguration.client.categories` to
match what `setCustomConfiguration` writes.

## Color presets

`src/cards/ConfigurableCard/colorPresets.js` defines a registry of
stable preset keys mapped to values from `brandColors`:

| Preset key | Resolves to | Default role |
|-----------|-------------|--------------|
| `muted` | `brandColors.textSecondary` | Category headings |
| `dark` | `brandColors.textPrimary` | Link text |
| `primary` | `brandColors.primary` | Hover accent |
| `secondary` | `brandColors.secondary` | (admin choice) |
| `accent` | `brandColors.accent` | (admin choice) |

Storing **keys** (not hex values) means re-skinning the extension
by editing `brandColors.js` automatically updates every saved card
instance — institutional control stays in one place. An admin who
picks `primary` today and another tomorrow still gets the
institution's current `primary` even if it was changed in the
code.

## Configuration

No `extension.js`-level config knobs. Admin-driven content lives
entirely in `customConfiguration`. The extension-level
`ethosApiKey` is **not** used by this card — there's no Data
Connect call.

## Customization points

| What | Where |
|------|-------|
| Default colors when an admin hasn't picked yet | `DEFAULT_COLORS` in `colorPresets.js`. |
| Add / remove preset colors | `COLOR_PRESETS` array + `resolveColor` switch in `colorPresets.js` (and matching i18n keys for swatch tooltips). |
| URL validation rules | `isValidUrl` in `ConfigurableCardConfig.jsx` (default: requires `http:` or `https:`). |
| Drag handle visuals | `dragHandle` style in `ConfigurableCardConfig.jsx`. |
| Live preview content | `AppearancePreview` in `ConfigurableCardConfig.jsx`. |
| Body-click destination | `pageRoute.route` in `extension.js` (defaults to `/links`). |
| Body-click exclusions | `pageRoute.excludeClickSelectors: ['a', 'button', 'summary', 'details']` keeps every interactive element working. |

## i18n keys (selection)

Full list under `card.configurable.*` in `src/i18n/en.json`.
Highlights:

| Key | Default | Where used |
|-----|---------|-----------|
| `card.configurable.empty` | (full empty-state message) | Card body when no links configured. |
| `card.configurable.unnamedCategory` | "Links" | Used as the heading when admin leaves category name blank. |
| `card.configurable.section.appearance` | "Appearance" | Config form section heading. |
| `card.configurable.section.links` | "Configure links" | Config form section heading. |
| `card.configurable.section.colors.help` | (help text) | Above the swatch pickers. |
| `card.configurable.color.field.{category,link,hover}` | Field labels | Above each swatch picker. |
| `card.configurable.color.{muted,dark,primary,secondary,accent}` | Preset names | Swatch tooltip + currently-selected label. |
| `card.configurable.action.addCategory` | "Add category" | Button at bottom of form. |

## Files

```
ConfigurableCard/
├── ConfigurableCard.jsx           The card (read + render)
├── ConfigurableCardConfig.jsx     The admin form (drag-and-drop,
│                                  swatches, URL validation)
└── colorPresets.js                Stable preset keys → brandColors
```

## Drag-and-drop

The form uses `@dnd-kit/core` + `@dnd-kit/sortable`:

- Outer `<DndContext>` reorders categories.
- Inner per-category `<DndContext>` reorders links inside that
  category.
- Cross-category link drag is intentionally **not** supported —
  keeps the UX simple. To move a link between categories, remove
  it and re-add.

Pointer + keyboard sensors are wired so the form is
keyboard-accessible (drag with Space/Enter, move with arrow keys).

## Replacing this card

To turn this into your real "configurable" card:

1. Decide on your `customConfiguration` shape and update both:
   - The form (`ConfigurableCardConfig.jsx`) — read existing
     values, persist edits, validate.
   - The card (`ConfigurableCard.jsx`) — read + render.
2. Update i18n keys.
3. (Optional) Replace the color preset registry with your own —
   or remove the appearance panel entirely if branding shouldn't
   be admin-controlled.

## See also

- [`docs/DATA_CONNECT.md`](../../../docs/DATA_CONNECT.md) — not
  used by this card, but useful when graduating from
  `customConfiguration` to live data.
- [`docs/I18N.md`](../../../docs/I18N.md) — adding new locales.
- [`src/utils/branding/brandColors.js`](../../utils/branding/brandColors.js)
  — where the preset hex values resolve to.
