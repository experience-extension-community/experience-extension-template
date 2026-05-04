# Data Connect pipelines

This template ships pipeline definitions in the top-level
`DataConnect/` folder. They are real, working examples that any
institution running Banner or Colleague through Ethos can import
unchanged and call from the sample cards.

## Why pipelines live in the repo

Pipeline JSONs are **configuration** — they describe which Ethos
resource to call, how to filter it, and how to shape the response.
They contain no credentials. The Ethos API key is supplied at
runtime via the card's server-side configuration.

Versioning pipelines alongside the cards that use them gives you:

- A working starting point for any institution.
- Reviewable history of pipeline changes.
- A single PR review surface for "the card and the pipeline it depends on."

## Pipelines shipped with this template

| File | Used by | Returns |
|------|---------|---------|
| `DataConnect/persons/eec-template-persons-get_v1.0.0.json` | (sample / unused by default) | The signed-in user's Ethos `persons` record. |
| `DataConnect/academic-periods/eec-template-academic-periods-get_v1.0.0.json` | `EthosFetchCard` | Active academic periods (terms). |

## Using these pipelines

1. **Import** — open the Ethos Data Connect web UI, click "Import
   pipeline", and upload the JSON.
2. **Activate** — review the segments, set required parameters
   (`ethosApiKey` is filled in by Experience at runtime), and save.
3. **Wire to the card** — the card's pipeline name (declared in
   `extension.js` as a configuration knob, defaulting to a `PIPELINE_*`
   env var) must match the pipeline's name in Data Connect.

## Customizing for your institution

Two paths:

**(a) Use the community defaults as-is.** Keep the `eec-template-` names,
import unchanged. Works for any Banner/Colleague Ethos tenant.

**(b) Rename for your institution.** Convention:
`<institution-prefix>-<resource>-<verb>_v<semver>.json`. Example:
`fpu-students-list-get_v1.0.0.json`. Update:

1. The pipeline file's `name` field
2. The filename (keep version + extension)
3. The matching `PIPELINE_*` value in `sample.env`
4. Any default in `extension.js`

## Updating an existing pipeline

When you edit a pipeline in the Data Connect UI:

1. Export the updated JSON.
2. Bump the version in the filename (`_v1.0.0` → `_v1.0.1`).
3. Commit the new file alongside any card change that depends on it.
4. Keep the previous version file for a deprecation window so
   tenants that haven't upgraded yet still have a reference.

## Pipeline file anatomy

Every file follows the Ethos Data Connect schema:

```json
{
  "name": "<must-match-filename-minus-version>",
  "description": "what this pipeline returns",
  "parameters": [{ "name": "ethosApiKey", "type": "string", "required": true, "sensitive": true }],
  "apiDefinition": { "authType": "userToken", "httpVerb": "GET" },
  "pipeline": ["Step 1", "Step 2", "Step 3"],
  "segments": {
    "Step 1": { "class": "JavaScriptTransform", "config": { "code": "function transform(message, context) { ... }" } },
    "Step 2": { "class": "ethosProxyGet", "config": { "resource": "persons", "acceptVersions": ["12"] } },
    "Step 3": { "class": "JavaScriptTransform", "config": { "code": "..." } }
  }
}
```

Common segment classes:

- `ethosProxyGet` / `ethosProxyGetFilter` — read from an Ethos resource.
- `JavaScriptTransform` — run JS code with access to message + context.
- `ethosProxyPost` / `ethosProxyPut` / `ethosProxyDelete` — write
  through the Ethos proxy.

For a more complex multi-segment example with category + links
joins, see `custom-simple-links/DataConnect/` in the FL Poly
showcase extension.
