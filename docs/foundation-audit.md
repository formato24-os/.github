# Foundation audit

Audit date: **2026-10-17**. Scope: `formato24-os/.github`. Baseline commit: `815182c8fdb5f17f592ac84230e87052b54a5fff`.

## Existing foundation

All 16 tracked files were inspected: the organization profile, repository README, contribution guide, Code of Conduct, security policy, support guide, governance model, MIT license, repository plan, four issue forms, issue chooser configuration, pull request template, and Git attributes.

The documents consistently describe the community's purpose and intended monthly project cycle without claiming existing releases, partnerships, or services. The profile's restrained emojis are retained. Shared policy links use stable organization URLs. No application build or GitHub Actions workflow existed at the baseline.

## Findings and improvements

| Finding | Response |
| --- | --- |
| Validation was manual and not reproducible by contributors. | Added an exact-version npm toolchain, lockfile, local commands, and pull request checks. |
| No scheduled link monitoring. | Added a weekly workflow, bounded retries, per-host pacing, and narrow documented exclusions. |
| Issue forms had no automated schema checks. | Added offline schema snapshots and duplicate name and input ID checks. |
| Secret scanning and push protection were disabled. | Enabled both using repository administration permissions. |
| Dependabot alerts were enabled but security updates were disabled. | Enabled security updates and added monthly dependency update configuration. |
| Private vulnerability reporting was already enabled. | Verified and retained it. |
| No branch protection or branch rulesets were configured. | Documented an appropriate ruleset for owner review after the checks are available. |
| Workflow defaults were already read-only and could not approve pull requests. | Retained those settings and explicitly restricted the new workflow. |

Actions were enabled for all actions at audit time, with no platform-enforced SHA requirement. The new workflow pins its own action references and validates that invariant. Organization-wide action policies were outside this audit's scope.

## Remaining decisions

- An organization owner should review and apply the proposed [main branch ruleset](repository-security.md).
- A dedicated private community contact for conduct concerns remains undesignated, as the existing Code of Conduct states. Its documented GitHub reporting routes are retained rather than inventing an address.
- The repository plan should identify Awesome Formato24 as published only after its repository has been created and verified. FreeStack, CLI tools, and starter kits remain proposals.

The automated checks are described in [Validation and maintenance](validation.md). This audit is a dated snapshot, not a promise that repository settings cannot change.
