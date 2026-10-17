# Proposed repository structure

This plan describes possible future repositories for Formato24 Open Source. It does not announce existing products, available services, or release dates. Creating or changing any repository beyond `.github` requires separate owner authorization.

## Repository map

| Proposed repository | Purpose | Initial scope |
| --- | --- | --- |
| `awesome-formato24` | A curated directory of useful developer resources. | Clear categories, inclusion criteria, short descriptions, and a small reviewed collection. |
| `freestack` | A catalog of free and open source options for building software. | Structured entries explaining capabilities, license, hosting model, and free-plan limits where applicable. |
| `cli-<purpose>` | A focused command-line tool with a name that describes its task. | One validated workflow, useful help output, documented exit codes, and a tested installation path. |
| `starter-<stack>` | A reusable starting point for a specific, validated stack. | A runnable example, setup instructions, checks, and a documented customization path. |

`<purpose>` and `<stack>` are naming patterns, not literal repository names. Select exact names and technologies only after the use case is agreed.

## Suggested layouts

### awesome-formato24

```text
README.md                  # Curated index and selection criteria
LICENSE                    # Explicit reuse terms
CONTRIBUTING.md             # Resource submission and review rules
resources/                 # Focused category pages, when the index grows
.github/workflows/          # Link and formatting checks
```

Each resource should have a direct official link, a short factual description, and a clear reason for inclusion. Mark paid products and limited free tiers accurately. Avoid referral links, unsupported rankings, and unverified claims.

### freestack

```text
README.md                  # Purpose, scope, and how to browse the catalog
LICENSE
catalog/                   # Structured entries grouped by capability
schema/                    # Entry format and validation rules
docs/                      # Curation policy and example workflows
scripts/                   # Catalog and link validation
.github/workflows/          # Automated catalog checks
```

Suggested entry fields: `name`, `website`, `source`, `category`, `summary`, `license`, `hosting`, `free_plan_limits`, and `last_verified`. Distinguish open source software from proprietary services with free plans. Verify terms and limits against official sources; never promise that a free tier will remain available.

Start with the catalog. Consider a browsing interface only after the entry format and maintenance process are useful in practice.

### CLI tools

```text
README.md                  # Installation, quick start, and examples
LICENSE
src/                       # Command implementation
tests/                     # User-visible behavior and failure paths
docs/                      # Command reference and design decisions
examples/                  # Small, reproducible workflows
.github/workflows/          # Checks and release automation
```

Prefer one repository per independently released tool. Choose the language and distribution channel to suit its users. Design safe defaults, clear errors, and explicit confirmation for destructive commands. Document configuration without embedding credentials.

### Starter kits

```text
README.md                  # Prerequisites, setup, checks, and deployment options
LICENSE
src/                       # Minimal working application or package
tests/                     # Checks for the primary starter workflow
docs/                      # Architecture and customization notes
.env.example               # Variable names with non-secret example values
.github/workflows/          # Checks for the documented setup
```

Use a template repository when a starter is ready. Keep dependencies and optional integrations minimal. Each starter should work without an undisclosed account, unavailable service, or committed credential. Choose exact stack names after evaluating the intended audience and maintenance capacity.

## Launch sequence

1. Establish the shared profile, policies, and templates in `.github`.
2. Propose `awesome-formato24` as a focused first resource repository.
3. Validate the FreeStack entry format and curation workload before creating `freestack`.
4. Select the first monthly project through a proposal; choose a CLI tool or starter kit when it addresses a specific need and has a willing maintainer.

Every new repository should define its purpose, status, license, setup or usage instructions, maintenance responsibility, and a realistic initial scope. Inherit community defaults where suitable and override them only when project-specific guidance is needed. Enable private vulnerability reporting per repository; that setting is not inherited from `.github`.
