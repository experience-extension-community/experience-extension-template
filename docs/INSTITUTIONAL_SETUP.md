# Institutional setup

A 30-minute walkthrough for the first developer at an institution
adopting an extension built from this template.

## Prerequisites

- Access to your Experience tenant admin UI.
- An Ethos Integration tenant (use a non-production environment for dev).
- Node.js `24.13.0` (run `nvm use` after cloning).
- A working knowledge of Ellucian Path Design System (the docs
  themselves are short — link in the references below).

## Steps

1. **Fork or "Use this template"**, into your institution's GitHub org.
2. **Replace placeholders** — work top-to-bottom through `REPLACE_THESE.md`.
3. **Configure secrets** — copy `.env.example` to `.env.local` and fill
   in your tenant URLs and Ethos API key.
4. **Run the extension locally** — `npm install && npm start`. Confirm
   the sample card renders inside Experience.
5. **Re-skin** — open `src/utils/branding/tokens.js`, replace colors,
   typography, asset URLs, and the Typekit kit ID with your institution's
   values. Reload the dev server and verify.
6. **Replace the sample** — adapt the card and page in `src/cards/` and
   `src/pages/` to your real use case.
7. **Wire up CI** — push the repo, ensure GitHub Actions ran successfully.
8. **Upload to Experience** — run `npm run build`, then upload the produced
   bundle through Experience's admin UI.

## References

- [Ellucian Experience SDK reference](https://path-designsystem.elluciancloud.com/)
- [Path Design System](https://path-designsystem.elluciancloud.com/)
- [Material Symbols Outlined catalog](https://fonts.google.com/icons)
- [Adobe Typekit kit setup](https://helpx.adobe.com/fonts/using/embed-codes.html)
