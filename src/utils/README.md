# Utilities

Vendored shared utilities — every extension created from this template
inherits this `utils/` tree.

| Folder | Purpose |
|--------|---------|
| `branding/` | Tokens, theme resolver, Material Symbols Outlined, brand font loader. The institution-swap surface. |
| `ethos/` | `authenticatedFetch` with retry/timeout/error-normalization, Data Connect serverless helper, `EthosError` class. |
| `a11y/` | Live-region announcer, unique-ID helper, keyboard-event helpers. |
| `format/` | Locale-aware date / number / currency / percent formatters built on `Intl`. |
| `sdk/` | Shared PropTypes for SDK-injected props. |

When (Phase 2) we extract these to a published package
(`@experience-community/utils`), the public surface here is what
ships — keep imports going through each folder's `index.js` so the
migration is mechanical.
