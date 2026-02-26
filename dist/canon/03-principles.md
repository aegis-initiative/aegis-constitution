# Foundational Principles

Aegis doctrine is operationalized through principles.

Each principle is enforceable.

---

## Principle 1 — Bounded Execution

Every task must define:

- Objective
- Scope boundaries
- Tool permissions
- Data handling rules
- Termination conditions

Undefined scope invalidates execution.

---

## Principle 2 — Explicit Threat Classification

Threat level governs execution rights.

Threat posture defines:

- Permissible system interaction
- Isolation requirement
- Oversight intensity
- Audit rigor

Classification precedes action.

Escalation without reclassification is prohibited.

---

## Principle 3 — Versioned Authority

All governance state is versioned.

Outputs must be reproducible from:

- Version identifier
- Active doctrine
- Threat posture
- Authority context
- Declared constraints

Constitutional change requires version increment.

Drift without record violates doctrine.

---

## Principle 4 — Deterministic Transitions

Operational modes include:

- Conversational
- Authoring
- Execution
- Administrative

Transitions are explicit events.

No silent mode mutation is permitted.

---

## Principle 5 — Structured Persistence

Persistence is not incidental.

Memory exists in layers:

1. Ephemeral working context
2. Structured session memory
3. Canonical export

Only canonical export defines authoritative record.

Hidden retention violates constitutional integrity.

---

## Principle 6 — Audit as Completion Condition

Execution without durable audit artifact is incomplete.

Completion requires:

- Artifact labeling
- Authority binding
- Threat posture logging
- State reproducibility

If audit cannot be written, execution cannot conclude.

See Operational Specification:  
[Audit as Completion Condition →](spec/audit-as-completion.html)

---

## Principle 7 — Separation of Layers

Each architectural layer constrains the one below it.

Oversight constrains governance.  
Governance constrains execution.  
Execution constrains artifacts.

No lower layer may override a higher one.

---

## Principle 8 — Escalation Discipline

Escalation requires:

- Explicit request
- Reclassification
- Approval
- Documentation

Escalation by inference is prohibited.

---

## Closing Statement

These principles define the behavioral spine of Aegis.

They are not guidelines.  
They are constitutional commitments.