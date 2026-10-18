# Repository security baseline

This guidance applies to the public `.github` repository. Other repositories must verify their own settings; this document does not change organization-wide access or Cocosite product licensing.

## Settings to maintain

- Keep private vulnerability reporting enabled and verify it per repository; the setting is not inherited.
- Keep secret scanning, secret scanning push protection, Dependabot alerts, and Dependabot security updates enabled where available.
- Keep default workflow token permissions read-only and prevent workflows from approving pull requests.
- Use GitHub-hosted runners, immutable action references, and checkout without persisted credentials.
- Review npm lockfile and action updates before merging; do not enable automatic dependency merges without a separate policy decision.

See GitHub's [workflow security guidance](https://docs.github.com/en/actions/reference/security/secure-use) and [ruleset documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets).

## Recommended ruleset for main

After the workflow has completed successfully, an organization owner should review and enable an active branch ruleset for `main` with:

1. Pull requests required before merge.
2. The **Content validation** status check required, with branches brought up to date before merge.
3. Force pushes and branch deletion blocked.
4. Review conversations resolved before merge.
5. One approving review when an independent maintainer is available; avoid requiring an unavailable reviewer in a single-maintainer repository.

Keep **Link check** visible on every pull request and on the weekly schedule. Initially, leave it advisory in branch rules because external outages and access limits can block an otherwise correct change. A failing result still needs investigation and a recorded explanation; do not describe an unverified URL as passed.

Limit bypass access to explicitly designated organization owners for exceptional recovery. Do not enable a ruleset until the exact check name appears in the repository and the team has reviewed its impact. Existing stronger rules must be preserved. No ruleset or branch protection is applied by these files.
