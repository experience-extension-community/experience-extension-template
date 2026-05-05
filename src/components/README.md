# Shared components

Flat structure, mirroring Florida Polytechnic's
`exp-canvas-teachers/src/components/common/` layout exactly. Each
component is one `.jsx` file, default-exported. No barrel `index.js`,
no per-component folders, no nested re-exports.

| File | Purpose |
|------|---------|
| `Icon.jsx` | Material Symbols Outlined glyph (decorative or labelled). Inline-styled via `iconStyle()` helper. No `withStyles`. |
| `common/LoadingState.jsx` | Spinner + label, role=status. **Inline styles, no `withStyles`.** |
| `common/EmptyState.jsx` | Centered icon + title + optional description. Uses `withStyles`. |
| `common/ErrorState.jsx` | Error message + optional retry button, role=alert. Knows how to render `EthosError` user messages. Uses `withStyles`. |
| `common/RefreshDataStatusMessage.jsx` | Inline banner for refresh state. **Inline styles, no `withStyles`.** |

## How to import

Always import as a default from the file directly:

```jsx
import Icon from '../../components/Icon';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import RefreshDataStatusMessage from '../../components/common/RefreshDataStatusMessage';
```

No `import { Foo } from '../../components'` barrel imports — the
extra indirection is structurally fragile when EDS's `withStyles`
HOC participates in the resolution chain.

## Style conventions

- **`Icon`, `LoadingState`, `RefreshDataStatusMessage`** use inline
  `style={...}` for all CSS. Simpler, no HOC overhead.
- **`EmptyState`, `ErrorState`** use `withStyles(styles)` because
  they have multiple class definitions and benefit from JSS class-name
  scoping. Pattern matches FL Poly `exp-canvas-teachers`.
- All components avoid `defaultProps` on function components (React 19
  deprecates that). Default values come from destructuring:
  `({ icon = 'inbox' }) => ...`.

## Tests

Each component has a colocated `.test.jsx` next to its source file
(no nested folders). Tests render through `IntlProvider` so
`useIntl()` works, and run a `jest-axe` check.
