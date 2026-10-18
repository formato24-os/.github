# Security policy

Report suspected vulnerabilities privately. Do not include undisclosed vulnerabilities, account credentials, or private homelab details in public issues or pull requests.

## Private reporting

Use **Security → Report a vulnerability** in the affected repository when available. For concerns about Cocosite or matters without a suitable public source repository, use the [private reporting form in `.github`](https://github.com/formato24-os/.github/security/advisories/new). Private vulnerability reporting is enabled here; a GitHub account is required.

Include the product, version or commit, affected component, prerequisites, likely impact, and a minimal safe reproduction. Redact passwords, verification codes, reset links, session cookies, tokens, database URLs, personal data, and private network addresses. Maintainers can request additional details through the private report thread.

## Relevant boundaries

For Cocosite, account verification, session handling, workspace ownership, backend credentials, exports, and future device enrollment are security-sensitive boundaries. Local project storage currently belongs to the Windows profile and is shared by Cocosite accounts using that profile; online accounts do not provide local project isolation. See the [product overview](https://github.com/formato24-os/.github/blob/main/docs/COCOSITE.md) for current limitations.

Only test systems and accounts you are authorized to assess. Do not access other people's data, scan unrelated networks, disrupt workloads, or erase disks to demonstrate a report. Product and repository identifiers are not credentials.

## Versions and coordination

This shared policy does not establish long-term support or guarantee a fix for every alpha or historical build. Include the exact affected version so maintainers can assess it. Proprietary licensing does not prevent a good-faith private report through this route.

Maintainers assess reports as availability permits. No guaranteed response time, bug bounty, or paid security service is established here. Coordinate disclosure before publishing details; advisories should describe affected versions, impact, and mitigations when appropriate. Reporter credit requires the reporter's consent.

Routine bugs, delivery problems, and usage questions belong in [Support](https://github.com/formato24-os/.github/blob/main/SUPPORT.md).
