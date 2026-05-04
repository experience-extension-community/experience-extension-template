# Data Connect pipelines

This folder holds the JSON pipeline definitions that the cards in
this template expect to find in your Ethos Data Connect tenant.

## Why they live in the repo

Pipeline definitions are **configuration**, not credentials. The JSON
describes which Ethos resource to call, what filter to apply, and how
to transform the response. The Ethos API key is supplied at runtime
via the card's server-side configuration — never embedded in the
pipeline file.

Committing pipelines alongside the cards that use them gives you:

- A working starting point for any institution that forks the template.
- Version-controlled history of pipeline changes.
- A single PR review surface for changes to "the card and the pipeline
  it depends on."

## Folder layout

```
DataConnect/
├── README.md                                this file
├── persons/
│   └── eec-template-persons-get_v1.0.0.json
└── academic-periods/
    └── eec-template-academic-periods-get_v1.0.0.json
```

Group pipeline files by Ethos resource. File-name convention:

```
<institution-or-publisher>-<pipeline-name>_v<semver>.json
```

The community defaults use the `eec-template-` prefix. When you fork,
rename to your institution's prefix (e.g. `fpu-students-list-get_v1.0.0.json`)
and update the matching `PIPELINE_*` env var in `sample.env`.

## Importing into your tenant

1. Open the Ethos Data Connect web UI.
2. Click **Import pipeline** (or the equivalent in your version).
3. Upload the JSON file.
4. Review the segments — every step is editable in the UI.
5. Set any required parameters (most pipelines take an `ethosApiKey`
   parameter that's filled in at runtime by Experience's server-side
   card configuration).
6. Save and activate.

## Updating a pipeline

When you edit a pipeline in the Data Connect UI, export the new JSON
and bump the version in the filename (`_v1.0.0` → `_v1.0.1`). Commit
the new file alongside any card change that depends on it. Keep the
old version file for a deprecation window.

## Anatomy

Each file has:

- `name` — must match the filename (without version + extension).
- `parameters` — input params (e.g. `ethosApiKey`, `personId`).
- `apiDefinition` — `authType`, `httpVerb`.
- `pipeline` — ordered list of segment names defining execution order.
- `segments` — named definitions; each has a `class`
  (`JavaScriptTransform`, `ethosProxyGetFilter`, etc.) and a `config`.

See the FL Poly `custom-simple-links` extension's `DataConnect/`
folder for a more complex multi-segment example with category +
links transforms.
