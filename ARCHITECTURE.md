# Architecture — [Extension Name]

> Replace this stub with your extension's real architecture document. Every published extension must have a populated ARCHITECTURE.md.

## What this extension does

One paragraph describing the user-facing behavior and the institutional problem it solves.

## What it does not do

Explicitly list functionality this extension *doesn't* cover, to set expectations and prevent scope creep.

## Components

```
src/
├── extension.js         ← Ellucian extension manifest
├── cards/
│   └── <CardName>/      ← Card component(s)
├── pages/
│   └── <PageName>/      ← Page component(s) (if applicable)
├── components/          ← In-extension shared components
├── hooks/               ← Custom hooks
├── utils/               ← Branding, Ethos, a11y utilities
└── i18n/                ← Locale strings
```

## Data flow

Describe each data path the extension touches:

1. **User opens dashboard** → Experience renders the card via SDK
2. **Card mounts** → calls `useCardInfo`, `useUserInfo`, `useExtensionControl`
3. **Data fetch** → `authenticatedEthosFetch` to `[endpoint]`
4. **Render** → loading → success/error/empty states
5. **(Optional) Page navigation** → card emits navigation; page receives `cardConfiguration`

## Ellucian SDK hooks used

List each hook with its purpose:

- `useCardInfo` — card configuration and IDs
- `useUserInfo` — authenticated user context (firstName, roles, locale)
- `useThemeInfo` — runtime dashboard theme (composed with branding tokens)
- `useExtensionControl` — `setLoadingStatus`, `setErrorMessage`
- `useData` — `authenticatedEthosFetch` for Ethos / Data Connect calls
- `useCache` — browser-cached data with `extensionId|cardId` scope

## External integrations

| System | Pattern | Auth | Endpoints | Data classification |
|---|---|---|---|---|
| Ellucian Ethos GraphQL | `authenticatedEthosFetch` | User token | `[list endpoints]` | `[public / internal / sensitive]` |
| Data Connect serverless API | `authenticatedEthosFetch` | User token | `[pipeline name]` | `[classification]` |
| Banner BPAPI | OAuth via Ethos proxy | User token | `[endpoints]` | `[classification]` |

If your extension talks to no external systems, state that explicitly.

## Configuration surfaces

Refer to the README's Configuration Reference table for every knob. This section explains *why* configuration is structured the way it is — which values are admin-managed (Experience UI), which are env-based (local dev), and which are branding tokens (code-time).

## Diagrams

Drop architecture diagrams in `docs/diagrams/` and link from here. Mermaid diagrams render natively on GitHub.

## Decisions

Architecture decision records live in `docs/decisions/`. Format: `ADR-NNN-short-title.md`.
