# Shared components

| Path | Purpose |
|------|---------|
| `Icon/` | Material Symbols Outlined glyph (decorative or labelled). |
| `common/LoadingState/` | Spinner + label, role=status. |
| `common/ErrorState/` | Error message + optional retry, role=alert. Knows how to render `EthosError` user messages. |
| `common/EmptyState/` | Title + optional description for "nothing here yet" surfaces. |
| `common/RefreshDataStatusMessage/` | Inline banner for refresh state ('idle'/'refreshing'/'error'). |

All components use `withStyles` (HOC) from `@ellucian/react-design-system/core/styles`
and pull spacing tokens from
`@ellucian/react-design-system/core/styles/tokens`. They consume
institutional brand colors via `useResolvedTheme()`.

Every component ships with a render test and a `jest-axe` test in the
same folder.
