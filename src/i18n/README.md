# Internationalization

All user-facing strings live in JSON files in this folder, one per
locale. The default locale is English (`en.json`). Strings are looked
up by stable key names — never hardcode a string in a component.

## Adding a locale

1. Copy `en.json` to `<locale>.json` (e.g. `es.json`, `fr-CA.json`).
2. Translate values, keep keys identical.
3. Register the locale wherever your extension's `IntlProvider` is set up.

## Key conventions

- Dotted, lowercase, kebab where needed: `card.sample.title`.
- Group by surface: `card.*`, `page.*`, `ethos.error.*`, etc.
- Use ICU placeholders for interpolation: `{firstName}`, `{count, plural, one {# item} other {# items}}`.
- Never duplicate a string under two keys — pick the most specific.
