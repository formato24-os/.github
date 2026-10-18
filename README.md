# Formato24 · GitHub home

Public profile, product direction, and shared contribution guidelines for **Formato24**. Our current focus is **Cocosite**, a free proprietary desktop application for homelab planning, in private alpha development.

[Organization profile](profile/README.md) · [Cocosite](docs/COCOSITE.md) · [Website](https://formato24.com) · [Feedback](https://github.com/formato24-os/.github/issues/new/choose)

## Current direction

Formato24 is moving from a broad open-source community and monthly project cycle to sustained work on Cocosite. We no longer promise a new main project every month or describe every Formato24 product as open source. The organization remains at `formato24-os`; repository names do not determine a product's license.

Cocosite's current Windows alpha provides account and email-code flows, project onboarding, local plans, resource budgets, and real desktop hardware readings. Hosted AI, a dedicated server OS, and workload management have separate delivery gates. See the [product status](docs/COCOSITE.md) before assuming a capability is available.

This repository publishes documentation, community policies, issue forms, and validation scripts. It does not distribute Cocosite source, application binaries, credentials, or an operational homelab service.

## 📚 Repository guide

| Document | Purpose |
| --- | --- |
| [Organization profile](profile/README.md) | The public introduction shown on GitHub. |
| [Cocosite](docs/COCOSITE.md) | Product scope, alpha status, and data boundaries. |
| [Repository plan](docs/REPOSITORY_PLAN.md) | Current public repository and conditions for future repositories. |
| [Contributing](CONTRIBUTING.md) | Feedback, documentation changes, and license-aware contributions. |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Participation standards and reporting routes. |
| [Security](SECURITY.md) | Private vulnerability reporting. |
| [Support](SUPPORT.md) | Product questions, alpha feedback, and account issues. |
| [Governance](GOVERNANCE.md) | Maintainer responsibilities and product decisions. |
| [Validation](docs/validation.md) | Local checks and automated content validation. |
| [Repository security](docs/repository-security.md) | Security settings and branch-protection guidance. |
| [Foundation audit](docs/foundation-audit.md) | Historical record of the previous foundation. |

## Shared GitHub defaults

This public `.github` repository supplies default contribution, conduct, security, and support documents where another organization repository has no equivalent. It also provides [issue forms](.github/ISSUE_TEMPLATE) and a [pull request template](.github/PULL_REQUEST_TEMPLATE.md).

Repository-specific policies take precedence. These files do not grant access to private source, set a product's license, or establish a support contract. Governance and product status are linked explicitly rather than inherited. See [GitHub's default community file documentation](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file).

## Maintenance

Use clear English, keep a small number of useful emojis, and link only to resources that are actually available. Shared forms must work without repository-specific labels, teams, or issue types.

With Node.js 24 or newer:

```sh
npm ci --ignore-scripts
npm run check
npm run check:links
```

This repository has no application build step. See [validation and maintenance](docs/validation.md) for coverage and network limitations.

## License

The existing [MIT License](LICENSE) continues to cover this repository's original community documents and validation scripts. Vendored [SchemaStore schemas](scripts/schemas/README.md) retain their Apache License 2.0 terms. Cocosite has separate proprietary terms; publishing its description here does not license its source or binaries. Previously granted rights and third-party notices remain in effect.
