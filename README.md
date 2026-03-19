<p align="center">
  <img src="src/assets/AEGIS_logo_aegis-constitution.svg" width="80" alt="AEGIS™ Constitution">
</p>

<p align="center">
  <strong>aegis-constitution</strong><br>
  The canonical AEGIS™ governance charter — versioned, citeable, and openly licensed
</p>

<p align="center">
  <a href="https://github.com/aegis-initiative"><img src="https://img.shields.io/badge/org-aegis--initiative-0084e7?style=flat-square&logo=github" alt="Org"></a>
  <a href="https://aegissystems.app"><img src="https://img.shields.io/badge/site-aegissystems.app-0084e7?style=flat-square" alt="Site"></a>
  <img src="https://img.shields.io/github/v/tag/aegis-initiative/aegis-constitution?label=version&style=flat-square&color=C9A84C" alt="Version">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache%202.0-green?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/ip--owner-Finnoybu%20IP%20LLC-blueviolet?style=flat-square" alt="IP Owner">
</p>

---

## Overview

This repository contains the **AEGIS™ Constitution** — the authoritative governance charter defining the foundational principles, architectural requirements, and constitutional commitments for all AEGIS™-compliant systems.

The Constitution is the public, canonical reference that external parties, researchers, policymakers, and implementers can cite, audit, and build upon.

> **Capability without constraint is not intelligence™**

---

## The Eleven Constitutional Articles

The AEGIS™ Constitution establishes eleven foundational governance principles, each of which constitutes an architectural requirement — not an aspirational guideline:

| Article | Principle | One-Line Commitment |
|---|---|---|
| I | **Bounded Capability** | AI systems may only access capabilities explicitly defined and granted — undefined capabilities are denied by default |
| II | **Authority Binding** | Every action must be attributable to a verified, authorized actor — unbound execution is constitutionally invalid |
| III | **Deterministic Enforcement** | Governance decisions are enforced by architecture, not by model compliance or voluntary adherence |
| IV | **Human Oversight** | Autonomous systems remain subordinate to human authority — escalation pathways are a constitutional requirement, not a feature |
| V | **Information Sovereignty** | Information access is a governed capability — AI systems may not transfer information across trust boundaries without explicit authorization |
| VI | **Governance Transparency** | Governance logic must be inspectable, auditable, and understandable — opaque enforcement is constitutionally impermissible |
| VII | **Auditability** | Every governance decision and executed action must produce a tamper-evident, append-only audit record — audit failure blocks execution |
| VIII | **Collective Defense** | Governance at scale requires shared intelligence — AEGIS-compliant systems must be capable of federated governance participation |
| IX | **Deny by Default** | In the presence of ambiguity — unclear threat posture, missing scope, unverifiable authority, or unavailable audit — execution does not proceed |
| X | **Constitutional Supremacy** | Governance architecture takes precedence over model reasoning — no AI output may override a constitutional governance decision |
| XI | **Escalation Discipline** | Escalation requires explicit request, reclassification, approval, and documentation — escalation by inference is prohibited |

Read the full text: [CONSTITUTION.md](CONSTITUTION.md)

---

## Constitutional Corpus

The Constitution is the supreme document. Everything else derives from it or enforces it.

| Layer | Document | Purpose |
|---|---|---|
| Constitution | [CONSTITUTION.md](CONSTITUTION.md) | Eleven foundational articles — the supreme law |
| Doctrine | [DOCTRINE.md](DOCTRINE.md) | The "why" — first principles grounding each constitutional commitment |
| Principles | [PRINCIPLES.md](PRINCIPLES.md) | Eight enforceable behavioral commitments that operationalize doctrine |
| Protocols | [PROTOCOLS.md](PROTOCOLS.md) | Seven binding operational rules that implement constitutional requirements |
| Sub-Specifications | [sub-specs/](sub-specs/) | Detailed technical implementation of specific constitutional requirements |
| Amendment Record | [AMENDMENTS.md](AMENDMENTS.md) | Versioned history of every constitutional change with rationale |

---

## Versioning

The Constitution is versioned using semantic versioning. Each ratified version is tagged in git and published as a GitHub Release.

| Version | Status | Date | Notes |
|---|---|---|---|
| v0.1.1 | Archived — superseded by v0.2.0 for new citations | 2026-03-19 | Initial eight-article constitution; canonical snapshot at [doi:10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564) |
| v0.2.0 | Current | 2026-03-19 | Eleven articles; four renamed; three added; constitutional register adopted |

To propose an amendment, open a pull request with your proposed changes and a rationale statement in the PR description. See [AMENDMENTS.md](AMENDMENTS.md) for the amendment process.

---

## Submitted to NIST

On March 7, 2026, AEGIS™ was submitted as an **unsolicited position statement** to the NIST AI Risk Management Framework, proposing architectural governance as a complementary layer to existing AI risk management approaches. That submission references v0.1.1 of this constitution (doi:[10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564)).

---

## Related Resources

| Resource | Relationship |
|---|---|
| [doi:10.5281/zenodo.19112564](https://doi.org/10.5281/zenodo.19112564) | Canonical snapshot — v0.1.1 constitution as cited in the March 7, 2026 NIST submission |
| [finnoybu/aegis-governance](https://github.com/finnoybu/aegis-governance) | Full governance specification corpus — AGP-1, GFN-1, ATM-1, RFCs |

---

## License & Trademark

Licensed under the [Apache License 2.0](LICENSE).

AEGIS™ and **"Capability without constraint is not intelligence™"** are trademarks of **Finnoybu IP LLC**.\
Use of AEGIS™ marks in derivative works must not imply endorsement without explicit written permission.

---

*AEGIS™* | *"Capability without constraint is not intelligence"™*\
*AEGIS Initiative — Finnoybu IP LLC*
