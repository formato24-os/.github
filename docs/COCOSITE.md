# Cocosite

**A desktop management workspace for your homelab, by Formato24.**

Status reviewed: **2026-10-21 — beta qualification in progress**.

## Development build

| Area | Implemented behavior | Boundary |
| --- | --- | --- |
| Accounts | Neon Auth email verification and Google sign-in integration | Public OAuth, email delivery and recovery must pass launch acceptance. |
| Storage | Local account-separated projects and explicit cloud metadata synchronization | Secrets and complete operational configurations are not cloud-synchronized. |
| Environments | Explicit mutual TLS pairing and authenticated node snapshots | Connectivity requires the local network or a separately configured VPN. |
| Workloads | Digest-pinned catalog, restricted Compose, immutable approved plans and durable local operation receipts | No unrestricted AI shell; removal preserves named volumes. |
| Management | Container, image, network and volume inventory; bounded host settings and power controls; Swarm resource management adapters | A management grouping is not distributed scheduling or high availability. |
| AI | Hosted advice, typed proposals and constrained UI widgets | Provider availability is shared. No unlimited inference or automatic paid upgrade is promised. |
| Installation | Graphical Ubuntu-based image builder, signed-image USB writer and Windows MSI candidate | VM qualification is not physical hardware acceptance or a public release. |

The free product targets **one cluster with up to three explicitly paired computers**. Hardware is detected after connection; users do not need to estimate CPU or RAM to name a cluster.

## Local workloads, connected services

Workloads, volumes, operational secrets and container logs stay on the user's computers. Accounts, selected project metadata and hosted AI use cloud services. Users choose the context shared with the assistant. Project and server identifiers are public identifiers, not credentials.

Every executable change must pass deterministic validation and receive approval for its exact target, configuration and observed state. Durable operation receipts support duplicate requests and reconnection. Existing workloads continue independently of cloud AI.

## Availability

Windows x64 is the desktop target. The dedicated server target is Ubuntu Server 24.04 x86-64. Public downloads remain closed until release checks pass. Cocosite's public website and beta registration page were taken offline on 2026-10-27; there is currently no public registration or download page.

Kubernetes, virtual machines, a Cocosite cloud relay, automatic high availability and an Enterprise service are not part of the current release.

## Licensing and feedback

Cocosite is proprietary and free to use under its product terms. This repository's documentation license does not cover the application. Existing third-party rights remain unchanged.

[Formato24](https://www.formato24.com) · [TikTok @formato24.com](https://www.tiktok.com/@formato24.com) · [Feedback](https://github.com/formato24-os/.github/issues/new/choose)

Report vulnerabilities through the [private security route](../SECURITY.md). Never include credentials or private system details in a public issue.
