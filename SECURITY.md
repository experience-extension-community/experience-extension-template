# Security — [Extension Name]

> Per-extension security documentation. Different from the org-level SECURITY.md (which covers the community as a whole) — this file covers risks specific to this extension.

## Reporting vulnerabilities

**Do not open a public issue for security vulnerabilities.** See the [org-level SECURITY policy](https://github.com/experience-extension-community/.github/blob/main/SECURITY.md) for the private reporting path.

## Data classification

| Data type | Classification | Source | Where it lives |
|---|---|---|---|
| User identity (firstName, roles, locale) | Internal | `useUserInfo` (SDK) | Memory only, never persisted |
| Configuration values | Internal | `useCardInfo` / `useExtensionInfo` (SDK) | Memory only |
| `[your data]` | `[public / internal / sensitive / regulated]` | `[source]` | `[location]` |

## Authentication & authorization

This extension authenticates to backend systems using the user's Ellucian token, via `authenticatedEthosFetch` from the `useData` hook. We do not maintain our own auth layer.

User authorization is enforced upstream — the Ethos API (and any backing system) returns 401/403 if the user lacks permission. The extension surfaces these as user-friendly error states; it does not display data the user shouldn't see.

## Secrets

This extension contains no secrets in source code. All credentials (Ethos API keys, etc.) are configured at the institution-tenant level by Experience administrators and never reach the browser.

If your extension needs server-side secrets, document them here and use Experience's server-side configuration (`configuration.server`), not env vars or hardcoded values.

## Known security considerations

- **Untrusted data:** treat all data returned from Ethos, Data Connect, or any external API as untrusted user input. Validate types before rendering. Do not interpret response strings as HTML.
- **Logging:** never `console.log` raw API responses in production code. Logs may contain PII.
- **External links:** if this extension renders links to external systems, set `rel="noopener noreferrer"` and validate URLs.
- **Custom configuration UI:** if this extension defines a custom configuration form, validate all inputs server-side via `setIsCustomConfigurationValid` before allowing save.

## Dependency hygiene

- Dependabot is enabled on this repo.
- Security workflow (`security.yml`) runs on every PR.
- High/critical vulnerabilities block merge.

## Per-release security checklist

Before tagging a release:
- [ ] No secrets, credentials, or institution-specific URLs in any committed file
- [ ] Dependency review clean (no new vulnerable transitive dependencies)
- [ ] CodeQL scan clean
- [ ] axe-core accessibility suite passes
- [ ] All `authenticatedEthosFetch` calls handle 401/403/500 gracefully
