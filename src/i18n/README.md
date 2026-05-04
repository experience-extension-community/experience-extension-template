# Internationalization

Built on `react-intl`, following the conventions used by Ellucian's
official sample-extensions and Florida Poly's production extensions.

## Files

| File | Purpose |
|------|---------|
| `en.json` | Base English message bundle. `{ "messages": { "key": "value" } }` shape. |
| `intlUtility.js` | `getMessages(userLocale)` — locale-cascade resolver (exact → language → English). |
| `ReactIntlProviderWrapper.jsx` | `<ReactIntlProviderWrapper>` and `withIntl(Component)` HOC. Wrap every card and page. |

## Adding a locale

1. Copy `en.json` to `<locale>.json` (e.g. `es.json`, `fr-CA.json`).
2. Translate `messages` values; keep keys identical.
3. Locale lookup is automatic — no other wiring needed.

## Key conventions

- Dotted, lowercase: `card.ethosFetch.title`.
- Group by surface: `card.*`, `page.*`, `ethos.error.*`.
- Use ICU for interpolation and pluralization:
  `{firstName}`, `{count, plural, one {# item} other {# items}}`.
- Never duplicate a string under two keys — pick the most specific.

## Reading messages from a component

```jsx
import { useIntl } from 'react-intl';

function MyCard() {
    const intl = useIntl();
    const title = intl.formatMessage({
        id: 'card.helloUser.title',
        defaultMessage: 'Hello, {firstName}',
    }, { firstName: 'Ada' });
    return <h2>{title}</h2>;
}

export default withIntl(MyCard);  // wrap once at the card root
```
