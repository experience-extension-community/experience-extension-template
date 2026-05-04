# ConfigurableCard

Demonstrates the `customConfiguration` pattern: an admin-driven form
component that persists arbitrary structured config which the card
itself reads at render time.

## Files

| File | Purpose |
|------|---------|
| `ConfigurableCard.jsx` | Card render. Reads `customConfiguration.links`. |
| `ConfigurableCardConfig.jsx` | The form. Wired to `extension.js`'s `customConfiguration: { source: '...' }`. |

## Persistence shape

```json
{
  "links": [
    { "label": "Library", "url": "https://library.example.edu" },
    { "label": "Bookstore", "url": "https://bookstore.example.edu" }
  ]
}
```

## Form contract

The form reads existing config via `useCardInfo()` and writes via
`useCardControl()`:

- `setCustomConfiguration({ links })` — persists the value
- `setIsCustomConfigurationValid(bool)` — gates the Save button

Both run inside a `useEffect` that responds to local state changes,
so every keystroke updates validation and the staged config.

## URL validation

Uses the native `URL` constructor with a protocol check — accepts
`http:` and `https:` only. Invalid rows show inline error helper text
and disable Save.
