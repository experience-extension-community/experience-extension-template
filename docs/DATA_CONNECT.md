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
- A single PR review surface for "the card and the pipeline it
  depends on."

## Pipelines shipped with this template

| File | Used by | Returns |
|------|---------|---------|
| `DataConnect/persons/eec-template-persons-get_v1.0.0.json` | (sample / unused by default) | The signed-in user's Ethos `persons` record. |
| `DataConnect/academic-periods/eec-template-academic-periods-get_v1.0.0.json` | `EthosFetchCard` + `TermsPage` | Active academic periods (terms). |

## Quickstart — import the shipped pipelines

1. Open the Ethos Data Connect web UI.
2. Click **Import pipeline** (or the equivalent in your version).
3. Upload the JSON file.
4. Review the segments — every step is editable in the UI.
5. Set required parameters (`ethosApiKey` is filled in at runtime
   by Experience's server-side card configuration — leave the
   value blank in Data Connect itself).
6. Save and activate.
7. In Experience Manager → Extension Configuration, save the
   extension config (the `ethosApiKey` field). This step
   **registers every card's `cardId`** with the pipeline. Without
   it the pipeline call returns 400 — see
   [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md#page-side-fetch-returns-400-cardid-not-configured-for-pipeline).

---

## The Ethos API key flow

Understand this once and the rest is easy.

```
   Card / page (browser)               Experience server                   Ethos
   ----------------------              -----------------                   -----
   useData().authenticatedEthosFetch───► (proxies the call,         ─────►  Data Connect
                                          adds the Ethos API key,                pipeline runs,
                                          which it gets from                     calls Ethos
                                          the extension's                        resources, returns
                                          server-side config)                    JSON.
```

Key points:

- **The browser never sees the Ethos API key.** It lives in
  `extension.js` `configuration.server[].value` and never crosses
  the network to the client.
- **Experience injects it server-side** when the card or page
  calls `authenticatedEthosFetch`.
- **Each card's `cardId` is the per-call identity.** Data Connect
  uses this to enforce "this extension is allowed to call this
  pipeline." Saving the extension config in Experience Manager
  registers every card's `cardId` with each pipeline referenced
  in the config block.

### Where to get an Ethos API key

1. Log into the Ethos Integration admin UI for your institution.
2. **Applications** → find or create the application that represents
   this Experience extension.
3. Generate or copy its API key. (Some institutions have a single
   key per Experience tenant; others have one per extension.)
4. Paste it into Experience Manager → Extension Configuration →
   the `ethosApiKey` field.

---

## Creating a new pipeline from scratch

When the shipped samples don't cover your use case, build one.

### Step 1. Decide what you need

Answer four questions before opening the UI:

- **Which Ethos resource?** (`persons`, `student-academic-records`,
  `course-sections`, etc. — see Ethos's resource catalog.)
- **What filter?** (Active terms only? Current student only?
  Current term?)
- **What shape does the card want?** (A flat array of
  `{id, code, title}` objects? A grouped object?)
- **Who can call this?** (Roles required on the underlying Ethos
  resource.)

### Step 2. Create the pipeline in the UI

1. Open Data Connect → **Pipelines** → **New pipeline** (or the
   equivalent label).
2. Name it following the convention:
   `<institution-prefix>-<resource>-<verb>` (e.g.
   `fpu-students-list-get`). The version goes in the filename when
   you export, not in the pipeline name itself.
3. Set the API definition:
   - `authType: userToken` — the request runs as the signed-in
     user, with their Ethos role permissions.
   - `httpVerb: GET` for read pipelines (use `POST` / `PUT` /
     `DELETE` for writes).
4. Add the `ethosApiKey` parameter:
   ```json
   { "name": "ethosApiKey", "type": "string", "required": true, "sensitive": true }
   ```
   `sensitive: true` keeps it out of pipeline logs.

### Step 3. Add segments

A pipeline is a sequence of named **segments**. Each has a
`class` (segment type) and a `config`.

Most read pipelines follow this three-step shape:

1. **`ethosProxyGet`** — hit the Ethos resource.
2. **`JavaScriptTransform`** — filter/group/derive.
3. **`JavaScriptTransform`** — shape the response (drop fields the
   card doesn't need).

See [Pipeline file anatomy](#pipeline-file-anatomy) below for the
exact segment classes and example code.

### Step 4. Test inside Data Connect

The Data Connect UI has a **Test pipeline** action (label may
vary across versions). Run it with a real `ethosApiKey` to verify
the pipeline returns what you expect **before** wiring it to a
card. Iterate on the segments until the response shape is right.

### Step 5. Save, export, commit

1. Save and activate the pipeline.
2. Use the UI's **Export** action to download the JSON.
3. Drop the file into `DataConnect/<resource>/<name>_v1.0.0.json`.
4. Commit alongside the card change that uses it.

### Step 6. Wire it to your card

1. Add an env var in `sample.env` and `.env`:
   ```
   PIPELINE_GET_<RESOURCE>=<your-pipeline-name>
   ```
2. Reference it in `extension.js` (extension-level so all cards
   inherit, or card-level if only one card needs it):
   ```js
   configuration: {
       client: [
           {
               key: '<resourcePipeline>',
               label: '<Resource> pipeline (Data Connect)',
               type: 'text',
               require: false,
               default: process.env.PIPELINE_GET_<RESOURCE> || '<your-pipeline-name>',
           },
       ],
   }
   ```
3. Read it in your hook:
   ```js
   const { configuration } = useCardInfo();
   const pipeline = configuration?.<resourcePipeline> || process.env.PIPELINE_GET_<RESOURCE>;
   ```
4. Save the extension config in Experience Manager (Step 7 of
   [Quickstart](#quickstart--import-the-shipped-pipelines)).

---

## Permissioning the pipeline

Access control happens in **two places**, and missing either
produces 401 / 403:

### A. Data Connect side: who can run the pipeline

By default, only the user who created the pipeline can run it.
To make it callable from your Experience extension:

- **Sharing tab** (or equivalent) inside the pipeline editor —
  share the pipeline with the application / tenant that
  represents this extension.
- Some Data Connect versions auto-share when an Experience
  extension is granted Data Connect access at the tenant level;
  others require explicit per-pipeline sharing. Check what your
  version exposes.

### B. Ethos resource side: what the user can read

Because the API definition uses `authType: userToken`, the
pipeline runs as the **signed-in user** when called from the
card. The user's roles in Ethos must include read permission on
the underlying resource (e.g. `academic-periods`,
`student-academic-records`).

Symptoms you got the roles wrong:

- 401 / 403 from the pipeline.
- Empty payloads when the user should have data.
- "Insufficient permissions" messages in the Ethos audit log.

Fix: have the Ethos admin add the appropriate role to the user
(or the role to the user's role bundle).

### Why not `authType: appToken`?

An application token bypasses user-level Ethos role checks and
runs as the application identity. Useful for cross-user data
(e.g. "all active terms at the institution") but risky for
user-specific data (a student should never see another
student's record).

The shipped academic-periods pipeline uses `userToken` because
the response is identical for every user — there's no
cross-contamination risk — but a per-user pipeline (e.g.
`my-academic-record`) **must** use `userToken` to enforce row-level
security at the Ethos layer.

---

## Pipeline file anatomy

The shipped `eec-template-academic-periods-get` pipeline,
annotated:

```jsonc
{
  // Must match the filename minus the version + extension.
  "name": "eec-template-academic-periods-get",

  // Shown in the Data Connect UI; non-functional.
  "description": "Returns the active academic periods (terms) ...",

  // Inputs the pipeline accepts. ethosApiKey is required + sensitive
  // (kept out of logs).
  "parameters": [
    { "name": "ethosApiKey", "type": "string", "required": true, "sensitive": true }
  ],

  // userToken → runs as the signed-in user (their Ethos roles apply).
  // GET → a read pipeline.
  "apiDefinition": { "authType": "userToken", "httpVerb": "GET" },

  // Ordered list of segment names. Each name maps to an entry
  // in `segments` below. Output of step N → input of step N+1.
  "pipeline": [
    "Get academic periods",
    "Filter active",
    "Shape response"
  ],

  "segments": {
    // Step 1: hit Ethos. acceptVersions pins the resource version
    // for stability. cache: true tells the Ethos PROXY (server-side)
    // to cache responses for 5 minutes — this is independent of
    // any client-side useCache the card might add.
    "Get academic periods": {
      "class": "ethosProxyGet",
      "config": {
        "resource": "academic-periods",
        "acceptVersions": ["16"],
        "cache": true,
        "cacheTTLSeconds": 300,
        "ignoreErrors": false
      }
    },

    // Step 2: filter the array down to today-active periods.
    // message.payload is the previous step's output.
    "Filter active": {
      "class": "JavaScriptTransform",
      "config": {
        "code": "function transform (message, context) { /* filter to today */ }"
      }
    },

    // Step 3: drop fields the card doesn't need; shape into a
    // flat array of { id, code, title, startOn, endOn, category }.
    "Shape response": {
      "class": "JavaScriptTransform",
      "config": {
        "code": "function transform (message, context) { /* map to card shape */ }"
      }
    }
  }
}
```

Full file:
[`DataConnect/academic-periods/eec-template-academic-periods-get_v1.0.0.json`](../DataConnect/academic-periods/eec-template-academic-periods-get_v1.0.0.json).

## Common segment classes

| Class | What it does | Common config keys |
|-------|--------------|--------------------|
| `ethosProxyGet` | Read an Ethos resource. | `resource`, `acceptVersions`, `cache`, `cacheTTLSeconds`, `ignoreErrors` |
| `ethosProxyGetFilter` | Read with a server-side filter (more efficient than `ethosProxyGet` + JS filter). | `resource`, `filter` |
| `ethosProxyPost` / `ethosProxyPut` / `ethosProxyDelete` | Write through the Ethos proxy. | `resource`, `body` |
| `JavaScriptTransform` | Run JS with `(message, context) → { payload }`. | `code`, `pushUndefined`, `stopOnError`, `draft` |

For a more complex multi-segment example with category + links
joins, see `custom-simple-links/DataConnect/` in the FL Poly
showcase extension.

## Customizing for your institution

Two paths:

**(a) Use the community defaults as-is.** Keep the `eec-template-`
names, import unchanged. Works for any Banner/Colleague Ethos
tenant.

**(b) Rename for your institution.** Convention:
`<institution-prefix>-<resource>-<verb>_v<semver>.json`. Example:
`fpu-students-list-get_v1.0.0.json`. Update:

1. The pipeline file's `name` field.
2. The filename (keep `_v<semver>.json`).
3. The matching `PIPELINE_*` value in `sample.env`.
4. The matching `default` in `extension.js`.

## Updating an existing pipeline

When you edit a pipeline in the Data Connect UI:

1. Export the updated JSON.
2. Bump the version in the filename (`_v1.0.0` → `_v1.0.1`).
3. Commit the new file alongside any card change that depends on
   it.
4. Keep the previous version file for a deprecation window so
   tenants that haven't upgraded yet still have a reference.
5. If the response shape changed in a backwards-incompatible way,
   bump the major version (`_v1.0.0` → `_v2.0.0`) and treat the
   old version as a separate pipeline with a separate `name` for
   the deprecation window.

## Common pitfalls

| Symptom | Cause | Fix |
|---------|-------|-----|
| 400 from the pipeline call | Card's `cardId` not registered with the pipeline. | Save the extension config in Experience Manager. See [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md#page-side-fetch-returns-400-cardid-not-configured-for-pipeline). |
| 401 / 403 | User lacks the Ethos role for the resource. | Have the Ethos admin grant the role. |
| 404 on import | Pipeline `name` field doesn't match what's referenced from `extension.js` / `sample.env`. | Make them match exactly (case-sensitive). |
| Stale data | `ethosProxyGet`'s `cacheTTLSeconds` hasn't elapsed. | Wait, or set `cache: false` while iterating. |
| Empty payload | `Filter active` filtered everything out (e.g. test tenant has no active terms). | Check the raw resource directly in Ethos. |

## See also

- [`DataConnect/README.md`](../DataConnect/README.md) — file-naming
  convention + folder layout (the canonical reference for the
  filenames you'll commit).
- [`docs/CONFIGURATION.md`](CONFIGURATION.md) — the three
  configuration surfaces; where `termsPipeline` and `ethosApiKey`
  are declared.
- [`docs/TROUBLESHOOTING.md`](TROUBLESHOOTING.md) — common
  adoption issues including the `cardId` 400.
- [`src/cards/EthosFetchCard/README.md`](../src/cards/EthosFetchCard/README.md)
  — the card that consumes the academic-periods pipeline.
