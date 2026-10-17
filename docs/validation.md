# Validation and maintenance

Use Node.js 24 or a newer supported release and npm. No account, API token, or paid service is required to run the checks.

## Run locally

```sh
npm ci --ignore-scripts
npm run check
npm run check:links
```

`npm run check` runs Markdown linting, structural validation, YAML and issue form validation, local link and heading anchor checks, a limited secret-pattern scan, and automated tests of the validation tools. `npm run check:links` also requests external URLs. Dependencies are exact versions recorded in `package-lock.json`; installation scripts are disabled.

The Markdown library is called directly rather than adding a separate globbing CLI. The lockfile overrides its transitive KaTeX dependency to patched version `0.18.2`. Retain or update that override until the upstream dependency range includes a patched release; run `npm audit` when updating dependencies.

## What is checked

- **Markdown:** markdownlint's default rules, with line length disabled to accommodate prose and tables. The pull request template intentionally starts with a second-level heading and has a scoped first-heading exception.
- **YAML:** parsing with duplicate keys rejected, for every YAML file including hidden GitHub directories.
- **Issue forms:** vendored [SchemaStore schemas](../scripts/schemas/README.md), unique template names, and unique input IDs. Schema validation is offline and does not fetch remote code.
- **Structure:** required files, UTF-8 without a BOM, LF endings, and resource metadata where the catalog is enabled.
- **Links:** Markdown links, images, reference-style links, and Markdown or standalone URL values inside YAML. Relative file paths and local Markdown heading fragments must resolve. Absolute links into this repository's `main` files are checked against the proposed local files, so additions work before merge.
- **Workflows:** YAML syntax, a `pull_request` trigger, read-only permissions, bounded job timeouts, immutable action references, and checkout without persisted credentials. GitHub executes and validates the complete workflow when it runs.
- **Credentials:** common GitHub token, AWS key ID, and private key patterns are rejected without printing the matched value. This is a limited safeguard; repository secret scanning and careful review remain necessary.

Code examples inside Markdown code spans and fenced blocks are not treated as live links. External website fragments are not validated because generated page anchors vary; local Markdown fragments are validated. No check claims to verify the accuracy of a resource description or a complete license analysis automatically.

## Network behavior

The link checker deduplicates URLs, checks at most two hosts concurrently, and processes each host serially with at least 1.2 seconds between URLs. It uses GET requests, follows redirects, validates TLS, and sets a 20-second request timeout.

Network failures, HTTP 408, 425, 429, and 5xx responses receive up to three attempts with exponential delays. `Retry-After` is honored within a 30-second retry budget; a longer delay returns an unverified result for a later run. HTTP 403 and 429 are never accepted as successful checks. Persistent failures produce a nonzero exit code and should be investigated rather than automatically deleting an entry.

The only initial exclusions in `.validation.json` are exact GitHub issue creation and private vulnerability submission routes for the two Formato24 repositories. These require sign-in; verify the underlying issue and security settings separately. Every exclusion must explain its reason. Do not exempt entire domains, suppress arbitrary HTTP failures, or disable TLS verification to obtain a passing result.

No HTTP cache is persisted between CI runs, so scheduled checks make fresh requests. Local references are always checked. Link requests send no credentials or authorization headers.

## GitHub Actions

The **Validate** workflow runs on pull requests, pushes to `main`, manual dispatch, and Mondays at 06:17 UTC. It has two independent jobs:

| Check name | Purpose |
| --- | --- |
| Content validation | Markdown, YAML, issue forms, structure, local links, and validation tool tests. |
| Link check | Local references and external URL availability. |

Both jobs run on GitHub-hosted Ubuntu runners with `contents: read`. Actions are pinned to full commit SHAs and do not receive repository secrets. They use `pull_request`, not privileged `pull_request_target` execution. Dependabot proposes monthly npm and GitHub Actions updates; review and rerun checks before merging them.

For branch protection recommendations, see [Repository security](repository-security.md).
