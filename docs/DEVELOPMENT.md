# Development

Day-to-day local development workflow.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm start` | Runs the Experience extension dev server. |
| `npm run build` | Produces an uploadable bundle in `dist/`. |
| `npm run lint` | ESLint 9 flat config across `**/*.{js,jsx}`. |
| `npm run lint:fix` | Auto-fixes lint issues where possible. |
| `npm run format` | Prettier write. |
| `npm run format:check` | Prettier check (no writes). |
| `npm test` | Jest. |
| `npm run test:ci` | Jest with coverage, single-runner — same shape CI uses. |
| `npm run test:watch` | Jest in watch mode. |
| `npm run verify` | Lint + format check + tests. |

## Layout

```
src/
├── extension.js         # SDK manifest — wires cards and pages
├── cards/               # one folder per card
├── pages/               # one folder per page
├── components/          # in-extension shared UI primitives
├── hooks/               # custom React hooks
├── utils/
│   ├── branding/        # tokens, theme resolver, icons, font loader
│   ├── ethos/           # authenticated fetch + error normalization
│   ├── a11y/            # announcer, keyboard helpers, IDs
│   ├── format/          # Intl-based date/number formatting
│   └── sdk/             # shared PropTypes for SDK-injected props
└── i18n/                # translation files, one per locale
```

## Conventions

- Functional components only.
- Hooks at the top level, never conditional.
- Co-locate component, styles, and tests:
  `Foo/Foo.jsx`, `Foo/Foo.test.jsx`.
- Names answer "what does this do?" without further reading.
  `getStuff` → no. `getActiveCourseEnrollments` → yes.
- Tests for every component (render + jest-axe), every hook, every util.
- Prefer Path Design System components; only build a custom one when
  Path doesn't cover the case.

## Mocking the SDK in tests

The template ships with a manual Jest mock at
`__mocks__/@ellucian/experience-extension-utils.js` providing default
implementations of every SDK hook. Tests that need different behavior
can override per file with `jest.mock(...)`.
