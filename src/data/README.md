# Data layer

Pure async functions that talk to Data Connect / Ethos. No React.

## Contract

Every data function in this folder follows the same envelope:

```js
{
  status: 'success' | 'error',
  data: Array | Object,
  error: Error | null,
}
```

This envelope lets the matching React hook (`src/hooks/use<Domain>.js`)
do a single `if (result.status === 'success')` check and update
state without branching on shape.

## Adding a new data fetcher

1. Create `src/data/<domain>.js` exporting `fetch<Domain>(args)`.
2. Required args: `authenticatedEthosFetch`, `pipeline`, optional
   `signal` (AbortController).
3. Use `authenticatedFetch` from `../utils/ethos/authenticatedFetch`
   for transport (it handles retry / timeout / error normalization).
4. Wrap the call in `try { ... } catch (err) { return { status: 'error',
   data: [], error: normalizeError(err) }; }`.
5. Create the matching `src/hooks/use<Domain>.js` that calls this
   function.
