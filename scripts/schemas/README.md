# Issue form schemas

The JSON schemas in this directory come from [SchemaStore](https://github.com/SchemaStore/schemastore/tree/0500f757f7e87d66262f362ed29ebd208ddfd1d1/src/schemas/json), commit `0500f757f7e87d66262f362ed29ebd208ddfd1d1`, retrieved on 2026-10-17. They are included under SchemaStore's [Apache License 2.0](LICENSE), with the upstream license preserved in this directory.

- `github-issue-forms.json`: GitHub issue form schema.
- `github-issue-config.json`: issue template chooser configuration schema.

Validation runs offline against these snapshots. To update, review the upstream schema diff, replace both JSON files from an identified upstream commit, preserve the license, update this provenance, and run the full checks. The semantic checks in `scripts/validate.mjs` also reject duplicate input IDs and duplicate form names.
