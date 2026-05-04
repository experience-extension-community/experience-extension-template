# EthosFetchCard

Demonstrates the canonical Data Connect / Ethos data flow.

Two-layer architecture:

- **`src/data/academicPeriods.js`** — pure async fetcher; no React; returns `{ status, data, error }`.
- **`src/hooks/useAcademicPeriods.js`** — React state machine wrapping the fetcher. Returns `{ data, isLoading, isRefreshing, isError, error, refresh }`.

The card itself just renders state. Loading / error / empty / data
are four mutually exclusive branches.

Configuration: the pipeline name comes from the card-level config knob
`termsPipeline` (declared in `extension.js`), with
`process.env.PIPELINE_GET_TERMS` as the local-dev fallback.

Demonstrates:

- `useAcademicPeriods` (domain hook) → `fetchAcademicPeriods` (data fn) → `authenticatedFetch` (transport)
- `setLoadingStatus(isLoading)` to keep the SDK's loading shimmer in sync
- `useAnnouncer` for screen-reader announcements (polite for success, assertive for failure)
- `LoadingState`, `ErrorState`, `EmptyState`, `RefreshDataStatusMessage` from `components/common/`
- `formatDate` for locale-aware term ranges
- ICU plural in the announcement message (`{count, plural, one {# term loaded} other {# terms loaded}}`)
