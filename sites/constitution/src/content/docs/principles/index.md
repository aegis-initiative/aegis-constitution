---
title: Principles
description: Eight enforceable behavioral commitments that operationalize AEGIS doctrine
sidebar:
  order: 1
---

*Doctrine defines what must be true. Principles define how systems must behave.*

---

Principles operationalize doctrine. Where doctrine establishes the foundational
reasoning for why governance is structured as it is, principles translate that
reasoning into enforceable behavioral commitments. Each principle is derived from
one or more doctrine articles and grounds one or more constitutional requirements.

Principles are not guidelines. They do not describe preferred behavior or best
practices. They define what AEGIS-compliant systems must do — and what they must
not do. Each principle is enforceable, and each carries a failure mode: a
description of what a non-compliant system looks like and what that non-compliance
costs.

The eight principles define the behavioral spine of AEGIS. Together they bridge
the gap between the foundational reasoning of doctrine and the architectural
requirements of the constitution.

---

## The Eight Principles

| # | Principle | One-Line Commitment |
|---|---|---|
| [1](/principles/principle-1) | **Bounded Execution** | Every task must define objective, scope, tool permissions, data handling rules, and termination conditions — undefined scope invalidates execution |
| [2](/principles/principle-2) | **Explicit Threat Classification** | Threat level governs execution rights — classification precedes action, escalation without reclassification is prohibited |
| [3](/principles/principle-3) | **Versioned Authority** | All governance state is versioned — outputs must be reproducible from version identifier, doctrine, threat posture, authority context, and declared constraints |
| [4](/principles/principle-4) | **Deterministic Transitions** | Operational mode transitions are explicit events — no silent mode mutation is permitted |
| [5](/principles/principle-5) | **Structured Persistence** | Persistence is not incidental — only canonical export defines authoritative record, hidden retention violates constitutional integrity |
| [6](/principles/principle-6) | **Audit as Completion Condition** | Execution without a durable audit artifact is incomplete — if audit cannot be written, execution cannot conclude |
| [7](/principles/principle-7) | **Separation of Layers** | Each architectural layer constrains the one below it — no lower layer may override a higher one |
| [8](/principles/principle-8) | **Escalation Discipline** | Escalation requires explicit request, reclassification, approval, and documentation — escalation by inference is prohibited |
