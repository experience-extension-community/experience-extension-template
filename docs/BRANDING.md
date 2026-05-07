# Branding

How to re-skin this extension for your institution.

## One file to change

```
src/utils/branding/brandColors.js
```

Three exports: `brandColors` (palette), `brandFont` (Typekit kit
+ font name), and `assets` (logo / favicon URLs). Replace the
values; **do not** rename the keys (components import them by name).

## What flows where

| Concern | Source of truth | Who reads it |
|---------|-----------------|--------------|
| Colors | `brandColors` palette in `brandColors.js` | Components reference `brandColors.primary`, `brandColors.surface`, etc. |
| Brand font (kit + name) | `brandFont` in `brandColors.js` | `BRAND_FONT_STACK` (also exported there) flows into every card and page; `ensureTypekitFont()` loads the CSS. |
| Icons | `Icon` component, glyph names from <https://fonts.google.com/icons> | Components render `<Icon name="..." />` |
| Asset URLs | `assets` in `brandColors.js` | Component code references `assets.logoHorizontal` etc. |

## Brand colors

Replace the HEX values under `brandColors`:

```js
export const brandColors = {
    primary: '#501D83',          // your primary brand color
    primaryDark: '#2E1A4A',      // hover/active variant
    primaryLight: '#B095DE',     // subtle accent variant

    secondary: '#009FDF',
    secondaryDark: '#006BA3',    // text-on-white variant (4.5:1+)

    accent: '#B095DE',
    // ... etc
};
```

Keep the keys exactly as they are. Components import by key:
`brandColors.primary`, `brandColors.surface`, `brandColors.focusRing`,
etc.

## Brand font

The template uses Adobe Typekit (also called "Adobe Fonts") to
load the institutional brand font. Two pieces of information are
needed — the **kit ID** and the **web font name** — and they're
**not the same thing**.

### What's a Typekit kit?

A "kit" is a collection of web fonts you've enabled in your Adobe
Fonts account. Each kit has:

- A **kit ID** — an opaque short slug like `yld8vhe`. Loading
  `https://use.typekit.net/<kitId>.css` injects all the kit's
  `@font-face` rules into your page. The kit ID itself doesn't
  encode anything about which fonts are inside.
- A **web font name** for each font — the string you put in
  `font-family`. Adobe shows it in the kit's settings. Common
  shapes: `proxima-nova`, `acumin-pro`, `new-science`.

The template ships with FL Poly's kit (`yld8vhe`) and the
`new-science` web font name. If you swap the kit ID without also
updating the web font name, the kit's CSS will load but
`font-family: "new-science"` won't match anything in the new kit
— and components will silently fall back to the system fonts.

### Step-by-step setup for your institution

1. **Create the kit.** Go to <https://fonts.adobe.com/>, sign in
   with your institution's Adobe account, and create a new web
   project. Add the fonts you want.
2. **Find the kit ID.** Open your kit's *Embed code* tab. The
   `<link>` tag contains a URL like
   `https://use.typekit.net/abc1234.css` — `abc1234` is the kit
   ID.
3. **Find the web font name.** In the same kit settings, each
   font has a *web font name* (sometimes called *CSS name*).
   Copy the name of your primary brand font.
4. **Update `brandColors.js`:**

   ```js
   export const brandFont = {
       kitId: 'abc1234',          // your kit ID
       webFontName: 'proxima-nova', // your kit's primary font name
       fallbackStack:
           '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
   };
   ```

5. **Reload the dev server.** The font is loaded once by
   `src/page/router.jsx`'s `ensureTypekitFont()` call (and per-card
   by `useTypekitFont()`). Open DevTools → Network and confirm a
   request to `https://use.typekit.net/<your-kit-id>.css`.

### Disabling Typekit entirely

Set `kitId: ''`. `ensureTypekitFont()` becomes a no-op.
`BRAND_FONT_STACK` falls back to just `fallbackStack`.

### Why no env var?

Earlier versions allowed `TYPEKIT_KIT_ID` in `.env` to override
the code. This was removed because it created two sources of
truth and obscured the coupling between the kit ID and the web
font name (changing the kit also requires changing the name).
Now there's exactly one place: `brandColors.js`.

## Accessibility

After changing colors, **verify contrast**:

- Body text against `brandColors.surface` ≥ 4.5:1
- Large text and UI components ≥ 3:1
- Focus ring (`brandColors.focusRing`) visible on every background
  you use

A quick check tool: <https://webaim.org/resources/contrastchecker/>.

The template targets WCAG 2.2 AA; CI runs `jest-axe` across every
component, but contrast checks against your brand palette are
your responsibility.

## Dashboard theme override (future)

Experience exposes the tenant's dashboard theme via
`useThemeInfo()`. Cards and pages currently consume
`brandColors` directly; layering the dashboard theme on top so
an FL Poly card adopts a Stetson primary color when running in
Stetson's tenant is a [planned follow-up](../ARCHITECTURE.md#configuration-model).
