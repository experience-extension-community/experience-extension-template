# SamplePage

The full-width page that pairs with `PageLinkCard`.

## Files

| File | Purpose |
|------|---------|
| `router.jsx` | HashRouter entry. The path `extension.js`'s `page.source` points to. |
| `SamplePage.jsx` | The page itself. Reads `useUserInfo`, `useDashboardInfo`, `useExtensionInfo`. |

## Why HashRouter?

Experience pages render inside an iframe. HashRouter avoids
collisions with the host's own routing and works without server
rewrites. If you have a specific reason to use BrowserRouter, swap
here — but most extensions are fine with HashRouter.
