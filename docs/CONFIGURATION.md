# Configuration

Three configuration surfaces. Use the right one for each value.

## A. Experience-managed configuration

Set in the Experience admin UI; flows through SDK hooks at runtime.

| Surface | When to use | Read with |
|---------|-------------|-----------|
| Extension-level, client-side | Applies to all cards in the extension | `useExtensionInfo().configuration.client` |
| Extension-level, server-side | Applies to all cards; held server-side | `useExtensionInfo().configuration.server` |
| Card-level, client-side, basic | Single-card simple type | `useCardInfo().configuration.client` |
| Card-level, client-side, custom | Single-card complex UI (dropdowns) | Card configuration component, `useCardInfo()` |
| Card-level, server-side | Single-card secret (API key) | `useCardInfo().configuration.server` |

Card configuration is declared in `src/extension.js` under each card's
`configuration.client` / `configuration.server` arrays.

## B. Environment variables (local dev only)

Defined in `.env.local`. **Never committed.** In production, every value
here is set via Experience-managed configuration instead.

See `.env.example` for the canonical list.

## C. Branding tokens (compile-time)

Static institutional values in `src/utils/branding/tokens.js`. See
[BRANDING.md](BRANDING.md).

## Configuration reference table

Every adopting institution should maintain a table like this in
their `README.md`. Fill it in as your extension grows.

| Name | Surface | Type | Required | Default | Description |
|------|---------|------|----------|---------|-------------|
| `greetingName` | Card client | string | no | user firstName | Fallback greeting name when user has no first name. |
| `EXPERIENCE_TENANT_URL` | env | url | yes (local dev) | — | Tenant URL for local dev. |
| `ETHOS_API_KEY` | env | string | yes (local dev) | — | Ethos API key for local dev. |
| `DATA_CONNECT_PIPELINE_URL` | env | url | no | — | Optional serverless pipeline URL. |
| `TYPEKIT_KIT_ID` | env or `tokens.js` | string | no | `yld8vhe` | Adobe Typekit kit ID. |

If it's not in this table, it doesn't exist. If it's in code, it must
be in this table.
