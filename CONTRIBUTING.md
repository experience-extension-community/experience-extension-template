# Contributing

Thanks for your interest in contributing. This document covers
contributions to **this template repository**. For org-wide
contribution guidance, see the
[hub repository's CONTRIBUTING.md](https://github.com/experience-extension-community/.github/blob/main/CONTRIBUTING.md).

## Quick start

```bash
nvm use                  # uses the version pinned in .nvmrc
npm install
cp .env.example .env.local
npm start                # runs the extension dev server
```

## Workflow

1. Open an issue first for anything non-trivial, so we can align on scope.
2. Fork the repo, create a branch named after the issue
   (`feat/123-add-courses-card`, `fix/124-typekit-load-order`).
3. Make changes. Add tests. Run `npm run verify` locally.
4. Commit using **Conventional Commits** (`feat:`, `fix:`, `docs:`,
   `chore:`, `refactor:`, `test:`, `ci:`, `style:`).
5. **DCO sign-off every commit** — `git commit -s`. We do not require a CLA.
6. Open a PR. Fill out the PR template completely.
7. CI must pass. One approving review is required for merge.

## Hard rules

- **License**: Apache 2.0 with `// SPDX-License-Identifier: Apache-2.0`
  on every `.js`/`.jsx` file.
- **Stack**: JavaScript + PropTypes. **No TypeScript.**
- **UI**: from `@ellucian/react-design-system/core` first, custom
  components only when justified.
- **Icons**: Material Symbols Outlined via the `Icon` component.
  Don't import the Path icon library.
- **Branding**: every color / font / spacing value comes from
  `useResolvedTheme()`. **No hardcoded hex values in components.**
- **Accessibility**: WCAG 2.2 AA. Every component ships with a render
  test and a `jest-axe` test.
- **No vendor-specific AI files** (CLAUDE.md, AGENTS.md, .cursorrules,
  copilot-instructions.md, .claude/). The framework is intentionally
  vendor-neutral. Add those to your local fork if you want them.

## Local AI tooling

Use whatever assistant you like — or none. The conventions in this
file plus `README.md` and `ARCHITECTURE.md` are the only project
context any AI tool needs. Don't commit vendor-specific config.

## Institutional contributors

If your institution mandates internal config files (Florida Polytechnic's
enterprise framework requires `CLAUDE.md` and `AGENTS.md`, for example),
keep those in an institutional fork or a private branch. Don't push them
to this repository or any extension repository in the org.

## Reporting security issues

Do **not** open a public issue. Use GitHub's private security advisory:
[Report a vulnerability](https://github.com/experience-extension-community/experience-extension-template/security/advisories/new).
