# Repository plan

Reviewed **2026-10-18**. Formato24 is focusing on Cocosite instead of launching a new main project every month. This document supersedes earlier proposals for a resource catalog, FreeStack, independent CLI tools, and starter kits as parallel priorities.

## Current public presence

| Repository or product | Status | Purpose |
| --- | --- | --- |
| [`.github`](https://github.com/formato24-os/.github) | Public repository | Organization profile, product direction, policies, feedback forms, and validation tools. |
| Cocosite | Private development alpha | A free proprietary desktop workspace for homelab planning; see [scope and limitations](COCOSITE.md). |

The organization listing and direct repository lookups did not expose `awesome-formato24` or `freestack` at review time. They are not presented as available public projects. This review does not establish whether they were deleted, renamed, or made private. Local prototypes and historical audit records are not public availability announcements.

## Cocosite source structure

The existing development layout keeps desktop, native components, and backend boundaries together. It is an implementation structure, not a promise to publish a repository:

```text
apps/desktop/              # Desktop UI and native integration
crates/                    # Native planning and command-line components
services/api/              # Account-authorized workspace and AI gateway
db/                        # Application schema and migrations
os/                        # Future server OS design; no working image yet
docs/                      # Architecture, product contract, and verification
```

Keep command-line helpers and starter examples with the product while they are implementation details. Split them only if they become independently useful, maintainable deliverables. Naming a future repository does not authorize creating it or publishing proprietary source.

## Before another repository is announced

Define a concrete user need, maintainer, scope, license, data boundaries, setup or usage instructions, and meaningful checks. Verify that any linked source, build, or service is actually accessible to its stated audience.

An owner must explicitly authorize source publication, repository creation or transfer, and licensing. Public releases need their own readiness review; development authentication and a working local screen are not sufficient evidence. Existing rights and third-party notices must be retained.

## Next product gates

1. Complete real email delivery and native account/session acceptance.
2. Verify hosted AI configuration, request limits, data handling, and real responses.
3. Validate the desktop planning workflow with actual test users.
4. Design and separately verify server enrollment and OS preparation.
5. Add workload operations only with typed actions, previews, audit records, and explicit destructive-action authorization.

These are dependencies, not dated commitments. No Enterprise offering or cloud workload-hosting service is announced.
