# Cocosite

**A desktop workspace for planning your homelab.**

Cocosite is Formato24's main product in development. It is intended to help someone with a single dedicated computer turn an idea into a practical homelab plan, then manage that system through a desktop application and an AI-assisted workflow.

Status reviewed: **2026-10-18**. The current Windows development alpha is not a public product launch. No public source repository, download, release date, Enterprise service, or deployment service is announced by this document.

## Current alpha scope

| Area | Implemented in the development alpha | Limit |
| --- | --- | --- |
| Accounts | Email/password access, six-digit email verification, and session handling. | Real inbox delivery and native login/session persistence still need end-user acceptance testing. |
| Onboarding | Workspace, target hardware estimates, project brief, and review. | These steps create a plan; they do not install or deploy a system. |
| Projects | Local SQLite persistence, resource budgets, and JSON export. | Local projects are shared by accounts using the same Windows profile; they are not cloud-synchronized or isolated by online account. |
| Hardware | Read-only CPU, memory, uptime, and volume information from the desktop running the app. | Target server estimates and imported reports are not live server telemetry. |
| Connected backend | Account-owned cloud workspace metadata and an authenticated API. | Hosted AI inference is not available yet; provider configuration and end-to-end acceptance remain pending. |

The product is being tested with development infrastructure. A completed screen or passing component test does not establish that an end-user journey is ready for public use.

## Planned system

The intended journey starts in Cocosite Desktop: describe the project, review the available hardware, prepare a dedicated server, and manage it from the desktop workspace. A future Ubuntu Server-based Cocosite OS would provide the server foundation and a minimal status/recovery console.

Bootable images, USB preparation, server enrollment, container stacks, virtual machines, and Kubernetes are **planned capabilities**. They are not operational features in the current alpha. There is no promised delivery schedule.

## Local hardware, connected AI

Homelab workloads are intended to run on the user's hardware. Account authentication, cloud workspace metadata, and the intended hosted AI experience require connected services. Cocosite is not an entirely local or offline AI product, and it is not a cloud workload-hosting product.

The intended AI request shares the project brief, selected resource estimates and workloads, and limited recent conversation with the Cocosite backend and its inference provider. Desktop hardware readings are not automatically uploaded. Secrets belong on the backend, never in application bundles, exports, issues, or logs.

The current assistant has no execution tools. Any future execution path must use validated operations, clear previews, audit records, and explicit authorization for destructive changes. A project identifier is not a pairing credential.

## Availability and licensing

Cocosite is proprietary and intended to be free to use under its own terms. That does not imply source access, redistribution rights, unlimited inference, guaranteed service availability, or an Enterprise offering. The MIT license in this `.github` repository covers its community material, not the product. Existing license grants and third-party rights are preserved.

## Feedback

If you have received a test build, use [the issue chooser](https://github.com/formato24-os/.github/issues/new/choose) and include its version, the affected step, and reproducible behavior. Public reports must exclude email verification codes, passwords, tokens, personal account details, and private homelab information. Report vulnerabilities through the [private security route](../SECURITY.md).
