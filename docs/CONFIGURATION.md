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

This template declares **extension-level** `configuration` in
`extension.js`, so `termsPipeline` (client) and `ethosApiKey`
(server) are configured once and inherited by every card and the
page. Pattern confirmed from FloridaPoly/custom-simple-links.

Card-level `configuration` is still available where you need
per-card knobs.

## B. Environment variables (local dev only)

Defined in `.env`. **Never committed.** In production, every value
here is set via Experience-managed configuration instead.

See `sample.env` for the canonical list.

## C. Branding (compile-time)

Static institutional values — colors, the Typekit kit ID, the web
font name, asset URLs — live in `src/utils/branding/brandColors.js`.
Not configurable via env or admin UI; edit the file and rebuild.
See [`BRANDING.md`](BRANDING.md).

## Configuration reference table

Every adopting institution should maintain a table like this in
their `README.md`. Fill it in as your extension grows.

| Name | Surface | Type | Required | Default | Description |
|------|---------|------|----------|---------|-------------|
| `termsPipeline` | Extension client | string | no | `eec-template-academic-periods-get` | Data Connect pipeline name for active terms. |
| `ethosApiKey` | Extension server | password | yes | — | Ethos API key used by `authenticatedEthosFetch` for every card / page in the extension. |
| `EXPERIENCE_EXTENSION_UPLOAD_TOKEN` | env | jwt | yes (deploy) | — | Upload token from Experience admin UI. |
| `PUBLISHER` | env | string | no | `ExperienceExtensionCommunity` | Public publisher slug. |
| `PIPELINE_GET_TERMS` | env | string | no | `eec-template-academic-periods-get` | Default for `termsPipeline` at build time. |
| `ETHOS_API_KEY` | env | string | yes (local dev) | — | Ethos API key for local dev. |
| `brandFont.kitId` | code (`brandColors.js`) | string | no | `yld8vhe` | Adobe Typekit (Adobe Fonts) kit ID. See [`BRANDING.md`](BRANDING.md). |
| `brandFont.webFontName` | code (`brandColors.js`) | string | no | `new-science` | Web font name for the primary font in the kit. Must match what Adobe shows for the kit. |

If it's not in this table, it doesn't exist. If it's in code, it must
be in this table.
