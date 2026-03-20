# CLAUDE.md — aegis-constitution

*Instructions for Claude Code — 2026-03-20*

---

## What This Repository Is

`aegis-initiative/aegis-constitution` is the canonical public home of the AEGIS™
Constitution — the supreme law governing every AEGIS-compliant system. It is a
versioned, citable, openly licensed document set deployed as a public website at
`aegis-constitution.com` via Cloudflare Pages (Astro).

This repo contains **no implementation code**. It contains constitutional doctrine.
Every edit here has downstream citation consequences. Treat it accordingly.

The site content lives in `src/content/docs/`. Constitutional text is maintained as
individual article files in `src/content/docs/constitution/`.

---

## For Claude Code

### Always

- Read a file before editing it
- Verify article numbers, titles, and one-liners match across all files before committing
- When any protected content changes (articles, doctrine, principles, protocols, version history, `package.json`), review and update `README.md`, `constitution/index.md`, and `CLAUDE.md` to ensure consistency before committing
- Run `npm run build` before committing content changes — build errors block deployment

### Never

- Add new articles, rename articles, or renumber articles without explicit instruction
- Describe `aegissystems.live`, `aegis-initiative.com`, or `aegis-labs.dev` as live or deployed
- Commit directly to `main` — all changes via PR

---

## Repo Structure

```
.                                ← Root
├── README.md                    ← GitHub landing page — keep article table current
├── CLAUDE.md                    ← This file
├── astro.config.mjs             ← Astro site config — sidebar defined here
├── package.json                 ← Node dependencies and scripts
├── tsconfig.json                ← TypeScript config
├── src/
│   ├── assets/                  ← Brand assets (SVGs)
│   │   ├── AEGIS_logo_aegis-constitution.svg
│   │   ├── AEGIS_wordmark.svg
│   │   ├── AEGIS_wordmark_dark.svg
│   │   └── AEGIS_wordmark_light.svg
│   ├── components/              ← Astro layout components
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Sidebar.astro
│   │   └── TableOfContents.astro
│   ├── layouts/
│   │   └── DocLayout.astro      ← Primary document layout
│   ├── pages/
│   │   ├── index.astro          ← Site home
│   │   └── [...slug].astro      ← Dynamic content routing
│   ├── content/
│   │   └── docs/
│   │       ├── index.mdx        ← Site home (splash page)
│   │       ├── constitution/    ← 15 files — see table below
│   │       ├── doctrine/        ← Doctrine articles (index + 5 articles)
│   │       ├── principles/      ← Principles (index + 8 principles)
│   │       ├── protocols/       ← Protocols (index + 7 protocols)
│   │       ├── about/           ← About page
│   │       ├── contact/         ← Contact page
│   │       ├── legal/           ← Legal pages (privacy, terms, cookies, copyright, disclaimer, impressum)
│   │       └── releases/        ← Release notes
│   └── content.config.ts        ← Astro content collection config — do not edit
```

### Constitution Content Files

| File | Article | Status |
|---|---|---|
| `constitution/index.md` | Preamble + article table | Live |
| `constitution/article-i.md` | Bounded Capability | Live |
| `constitution/article-ii.md` | Authority Binding | Live |
| `constitution/article-iii.md` | Deterministic Enforcement | Live |
| `constitution/article-iv.md` | Human Oversight | Live |
| `constitution/article-v.md` | Information Sovereignty | Live |
| `constitution/article-vi.md` | Governance Transparency | Live |
| `constitution/article-vii.md` | Auditability | Live |
| `constitution/article-viii.md` | Collective Defense | Live |
| `constitution/article-ix.md` | Deny by Default | Live |
| `constitution/article-x.md` | Constitutional Supremacy | Live |
| `constitution/article-xi.md` | Escalation Discipline | Live |
| `constitution/compliance.md` | Constitutional Compliance | Live |
| `constitution/amendments.md` | Amendments + version history | Live |
| `constitution/interpretation.md` | Interpretation rules | Live |

---

## Terminology: Critical Distinctions

Do not conflate these terms.

| Term | Definition | Do Not Confuse With |
|---|---|---|
| Article files | Astro site content — one file per article in `src/content/docs/constitution/` | N/A |
| Tamper-evident | Detectable alteration via append-only + hash-chaining | Immutable — do not use "immutable" for audit records |
| v0.1.0 | Eight-article constitution — NIST submission anchor | v0.2.0 |
| v0.1.1 | DOI snapshot — [doi:10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564) | v0.2.x — Snapshot #2 will have its own DOI |
| v0.2.0 | Current — eleven articles | v0.1.0 |
| Ratified | Status after Snapshot #2 publication | Draft — current status |

**"Immutable" is prohibited for audit records.** The correct term is **tamper-evident**.
This was corrected in v0.2.0. Do not reintroduce "immutable" in any content.

---

## Single Source of Truth

| Topic | Canonical location |
|---|---|
| Constitutional text | `src/content/docs/constitution/` (individual article files) |
| Site content | `src/content/docs/` |
| Article table | `README.md` + `constitution/index.md` — must stay in sync |
| Version history | `constitution/amendments.md` |
| Normative references | Inline footnotes in individual article files |
| Site config / sidebar | `astro.config.mjs` |
| Brand assets | `src/assets/` |

---

## Frozen Artifacts

| Artifact | Status | Rule |
|---|---|---|
| v0.1.1 release | DOI snapshot — [doi:10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564) | Frozen. Do not reference as current version. |

---

## Version Model

The constitution follows semantic versioning:

| Increment | Meaning |
|---|---|
| X.0.0 | Breaking changes to constitutional principles |
| 0.X.0 | New articles or non-breaking clarifications |
| 0.0.X | Editorial corrections |

**Current version:** v0.2.0 (Draft — pending Snapshot #2 tag and Zenodo DOI)

v0.1.1 remains the version of record for the NIST AI RMF position statement submitted
March 7, 2026 ([doi:10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564)).
Those citations are valid and unaffected by v0.2.0.

---

## Snapshot Sequencing

**Snapshot #1** — Complete:
- v0.1.1 tagged on `aegis-initiative/aegis-constitution` (formerly `finnoybu/aegis-systems`)
- DOI: [10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564)
- `finnoybu/aegis-governance` tagged v0.1.0 and v0.1.1 — no DOI required

**Snapshot #2** — Pending (IEEE submission anchor):
- Tag `aegis-initiative/aegis-constitution` v0.2.x
- Change constitution status: Draft → Ratified
- Mint Zenodo DOI (Snapshot #2)
- Update IEEE paper citations to Snapshot #2 DOIs

Do not announce `aegis-initiative/aegis-constitution` publicly until Snapshot #2.

---

## Article Integrity Rules

Articles I–VIII are **locked** — pinned by the NIST submission and the v0.1.1 DOI
([doi:10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564)). Any change
to these articles requires a formal constitutional amendment. No exceptions.

Articles IX–XI are **protected** — added in v0.2.0. Changes require explicit instruction
and must follow the amendment process.

| # | Article | One-liner | Status |
|---|---|---|---|
| I | Bounded Capability | AI systems may only access capabilities explicitly defined and granted — undefined capabilities are denied by default | Locked |
| II | Authority Binding | Every action must be attributable to a verified, authorized actor — unbound execution is constitutionally invalid | Locked |
| III | Deterministic Enforcement | Governance decisions are enforced by architecture, not by model compliance or voluntary adherence | Locked |
| IV | Human Oversight | Autonomous systems remain subordinate to human authority — escalation pathways are a constitutional requirement, not a feature | Locked |
| V | Information Sovereignty | Information access is a governed capability — AI systems may not transfer information across trust boundaries without explicit authorization | Locked |
| VI | Governance Transparency | Governance logic must be inspectable, auditable, and understandable — opaque enforcement is constitutionally impermissible | Locked |
| VII | Auditability | Every governance decision and executed action must produce a tamper-evident, append-only audit record — audit failure blocks execution | Locked |
| VIII | Collective Defense | Governance at scale requires shared intelligence — AEGIS-compliant systems must be capable of federated governance participation | Locked |
| IX | Deny by Default | In the presence of ambiguity — unclear threat posture, missing scope, unverifiable authority, or unavailable audit — execution does not proceed | Protected |
| X | Constitutional Supremacy | Governance architecture takes precedence over model reasoning — no AI output may override a constitutional governance decision | Protected |
| XI | Escalation Discipline | Escalation requires explicit request, reclassification, approval, and documentation — escalation by inference is prohibited | Protected |

Articles II, IV, V, and VIII were renamed in v0.2.0. Each article file notes its prior title.
Articles IX, X, and XI are new in v0.2.0.

---

## Normative References

Citations are inline in individual article files using `[^N]` footnote syntax.
Each article file contains both the inline reference and the full citation definition
at the bottom of the file. Use IEEE style for academic papers.

| Footnote | Source | Article(s) |
|---|---|---|
| [^1] | Anderson (1972) — capability-based authorization | I, III |
| [^2] | Schneider (2000) — enforceable security policies | III |
| [^3] | Saltzer & Schroeder (1975) — least privilege | V |
| [^4] | AEGIS Canon — Transparency Before Trust | VI |
| [^5] | AEGIS Canon — State Dump Protocol §5 | VII |
| [^6] | Leveson (2011) — fail-safe design | IX |

When adding citations, include the full definition at the bottom of the article file
where the footnote is referenced.

---

## Relationship to aegis-governance

`aegis-initiative/aegis-constitution` is the **public face** of constitutional doctrine.
`finnoybu/aegis-governance` is the **full technical specification corpus**.

Constitutional articles provide the "what" and "why." The governance RFCs provide the
"how." Do not duplicate technical specification content from aegis-governance here —
link to it instead.

Do not copy, restate, or paraphrase content between these repositories in either
direction. Cross-reference only.

---

## Git Workflow

```
git checkout -b <type>/<short-description>
git add <specific files>
git commit -m "Type: description

Co-Authored-By: <active model name and version> <noreply@anthropic.com>"
git push -u origin <branch>
gh pr create ...
gh pr merge <number> --squash --auto
```

Branch naming: `docs/topic`, `feat/topic`, `fix/topic`\
Merge strategy: squash merge always\
Never force-push. Never commit directly to `main`.

---

## Build & Deploy

See `package.json` for available scripts. Current commands:

```bash
npm run dev      # Local dev server at localhost:4321
npm run build    # Production build to ./dist/
npm run preview  # Preview production build locally
```

Deployment is automatic via Cloudflare Pages on push to `main`.
Build command: `npm run build` | Output: `dist/` | Root: `` (repo root)

Always verify `npm run build` passes cleanly before merging a PR.

`package.json` is protected — changes to scripts or dependencies must trigger a
review of README, index, and CLAUDE.md to ensure consistency.

---

## Markdown Conventions

- Frontmatter required on all content files: `title`, `description`; `sidebar.order` required for sidebar-visible content; `template: doc` required for legal pages
- Line breaks in frontmatter: trailing spaces - no backslashes `\` at end of line
- Blockquotes `>` for notices and pull quotes — not fenced code blocks
- Tables for structured data — not bullet lists
- Do not use "immutable" — use "tamper-evident"

---

## Brand

| Element | Value |
|---|---|
| AEGIS Blue | `#0084e7` (RGB) / `#397ec2` (CMYK) |
| AEGIS Gray | `#777777` (RGB) / `#787878` (CMYK) |
| AEGIS Dark | `#161616` (RGB) / `#171717` (CMYK) |
| White | `#ffffff` |
| Heading / UI font | Inter |
| Body font | Open Sans |
| Logo (navbar) | `src/assets/AEGIS_logo_aegis-constitution.svg` |
| Wordmark (neutral) | `src/assets/AEGIS_wordmark.svg` |
| Wordmark (dark bg) | `src/assets/AEGIS_wordmark_dark.svg` |
| Wordmark (light bg) | `src/assets/AEGIS_wordmark_light.svg` |

Brand assets are protected. Do not modify colors, fonts, or logos without explicit
instruction. Changes to brand assets must trigger a review of README, index, and
CLAUDE.md to ensure consistency.

---

## Footer (all pages)

Footer is implemented in `src/components/Footer.astro`. Required elements:

- **Authorship:** Built and maintained by Ken Tannenbaum (linked to GitHub Pages)
- **Timestamp:** Last updated: YYYY.MM.DD (build)
- **Copyright:** © 2026 AEGIS Initiative. All Rights Reserved. (linked to legal index)
- **Legal links:** Cookies | Privacy | Terms (direct links to legal pages)

Desktop: two-column (authorship left, copyright/legal right). Narrow screens: stacked centered.