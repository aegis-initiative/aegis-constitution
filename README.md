# AEGIS Constitution

Static canonical site for the AEGIS governance framework.

------------------------------------------------------------------------

## Repository Architecture

    aegis-constitution/
    ├── canon/     # Authoritative Markdown source ("truth layer")
    ├── dist/      # Rendered static output (deployed artifact)
    ├── tools/     # Utility scripts (scaffolding)
    └── README.md

------------------------------------------------------------------------

## Canonical Source of Truth

All constitutional content originates in:

    canon/

This directory contains the authoritative Markdown files.

The `dist/` directory contains rendered HTML and static assets derived
from the canonical Markdown.

No content should be edited directly in `dist/` unless intentionally
patching deployment artifacts.

------------------------------------------------------------------------

## Deployment Model

Production is deployed via **Cloudflare Pages**.

Cloudflare configuration:

-   **Build command:** *(none)*
-   **Build output directory:** `dist`
-   **Root directory:** repository root

Cloudflare serves the contents of `dist/` directly.

------------------------------------------------------------------------

## Workflow

1.  Edit canonical Markdown in `canon/`.
2.  Regenerate `dist/` (if build tooling is in use).
3.  Commit updated `dist/`.
4.  Open pull request.
5.  Merge into `main`.
6.  Cloudflare auto-deploys.

> Note: There is currently no automated build step configured in
> Cloudflare.

------------------------------------------------------------------------

## Versioning

Version metadata is sourced from:

    dist/data/version.json

Header displays:

    {codename} {version}

Footer displays:

    AEGIS • Structured Intelligence
    Canonical Record
    © 2026 Finnoybu IP LLC. All rights reserved.

------------------------------------------------------------------------

## Assets

Hero image:

    dist/assets/hero.png

Background:

    dist/assets/bg.png

------------------------------------------------------------------------

## Legal

All content, documentation, and software in this repository are:

© 2026 Finnoybu IP LLC\
All rights reserved.
