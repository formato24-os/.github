# 🌐 Formato24 Open Source

**Open technology. Built together.**

Community foundations for [Formato24 Open Source](https://github.com/formato24-os), an international community building open source software and free developer resources.

[Website](https://formato24.com) · [Organization profile](profile/README.md) · [Contribute](CONTRIBUTING.md)

## 📚 Community documents

| Document | Purpose |
| --- | --- |
| [Organization profile](profile/README.md) | Public introduction displayed on the organization overview. |
| [Contributing](CONTRIBUTING.md) | How to propose, develop, and review changes. |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Participation standards and reporting options. |
| [Security](SECURITY.md) | Private vulnerability reporting and disclosure. |
| [Support](SUPPORT.md) | Where to ask questions and report problems. |
| [Governance](GOVERNANCE.md) | Roles, decisions, and monthly project selection. |
| [Repository plan](docs/REPOSITORY_PLAN.md) | Proposed resource library, FreeStack, CLI tools, and starter kits. |
| [Validation](docs/validation.md) | Local checks and automated Markdown, YAML, issue form, and link validation. |
| [Foundation audit](docs/foundation-audit.md) | Findings, improvements, and remaining owner decisions. |
| [Repository security](docs/repository-security.md) | Security baseline and recommended protection for `main`. |

## 🔗 Shared GitHub defaults

This public `.github` repository supplies default contributing, conduct, security, and support documents to organization repositories that do not define their own equivalents. It also provides [issue forms](.github/ISSUE_TEMPLATE) and a [pull request template](.github/PULL_REQUEST_TEMPLATE.md).

GitHub does not copy these files into other repositories. Repository-specific documents take precedence; a repository with its own issue templates or issue template configuration overrides the shared issue template directory. `GOVERNANCE.md` and the repository plan are referenced explicitly rather than inherited automatically. See [GitHub's default community file documentation](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file).

The [profile README](profile/README.md) appears on the organization's public overview. Proposed repositories in the plan are not announcements of released products.

## Maintaining this repository

Keep public content in clear English. Keep shared forms independent of repository-specific labels, teams, and issue types. This repository contains community documentation, templates, and validation tools; it has no application build step.

With Node.js 24 or newer and npm, run:

```sh
npm ci --ignore-scripts
npm run check
npm run check:links
```

See [Validation and maintenance](docs/validation.md) for check coverage, network limits, and documented exclusions.

## License

Original community files and validation scripts are available under the [MIT License](LICENSE). Vendored [SchemaStore schemas](scripts/schemas/README.md) retain their Apache License 2.0. These terms apply to this repository only. Each software or resource repository must include its own license; GitHub does not inherit licenses from `.github`.
