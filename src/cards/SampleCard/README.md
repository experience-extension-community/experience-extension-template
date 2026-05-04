# SampleCard

Demonstrates the canonical card patterns:

- Read user info via `useUserInfo()`.
- Read configuration via `useExtensionConfig()` (wraps `useExtensionInfo` + `useCardInfo`).
- Resolve branding via `useResolvedTheme()` — no hardcoded colors.
- Fetch data via `useEthosFetch()` with `LoadingState` / `ErrorState` / `EmptyState`.
- Announce dynamic state with `useAnnouncer()`.
- Render an icon via the `Icon` component.

Replace the body for your extension; keep the structure.
