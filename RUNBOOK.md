# Runbook — [Extension Name]

> Replace this stub. This document is the on-call reference for operating this extension in production.

## Ownership

| Role | Person | Contact |
|---|---|---|
| Maintainer institution | [Institution] | — |
| Primary maintainer | [Name] | [email / GitHub handle] |
| Backup maintainer | [Name] | [email / GitHub handle] |
| Escalation | [team or list] | [contact] |

## Where this runs

Ellucian Experience tenant: each adopting institution runs their own copy. There is no central deployment.

## Common failure modes

### Card shows "Unable to load"

Likely causes:
1. **Ethos API returning 401/403** — user token expired or insufficient role permissions for the Ethos resource. Check that the user has the required role and that the Experience tenant's Ethos credentials are valid.
2. **Configuration missing** — required Experience-side config parameter not set. Check Card Management → Configuration in Experience admin.
3. **Backend integration outage** — upstream system (Banner / Workday / custom API) is down. Check the upstream system's status.

### Card loads but shows wrong data

Likely causes:
1. Branding tokens not swapped for adopting institution — visual style is wrong but data is fine.
2. Configuration value typo (case sensitivity, trailing whitespace).
3. Ethos resource version pinning issue — Ethos API contract changed and extension is calling old version.

### Card breaks after Experience version upgrade

Likely cause: SDK breaking change. Check `@ellucian/experience-extension-utils` release notes and update the extension's dependency. Run the test suite locally first.

## Updating the extension

1. Pull the latest `main`.
2. Bump version per Conventional Commits / Changesets.
3. Run `npm run lint && npm test && npm run build`.
4. Open PR; CI must pass.
5. Merge after review; release pipeline tags and creates GitHub Release.
6. Each adopting institution downloads the new release artifact and uploads via Experience admin (Card Management).

## Rollback procedure

Experience admin uploads the previous version's artifact via Card Management. There is no automatic rollback; institutions roll back manually using the GitHub Release artifacts.

## Monitoring

Experience does not provide application-level monitoring for extensions. Adopting institutions should:
- Watch user feedback channels for reports of broken cards.
- Periodically verify the card renders correctly in a test account.
- Subscribe to releases on the GitHub repo for security and bugfix updates.

## Escalation

For bugs: open an issue on the extension repo.
For security vulnerabilities: see SECURITY.md (do not file a public issue).
For Ellucian platform issues (SDK, dashboard, Ethos itself): contact Ellucian support.
