# State Dump Protocol

State Dump defines how Aegis records its complete governance state at a defined point in time.

A state dump is not a log entry.

It is a governance snapshot.

---

## 1. Definition

A State Dump is a structured record capturing:

- Active doctrine version
- Operational mode
- Threat posture
- Authority binding
- Constraint envelope
- Protocol set
- Artifact index
- Timestamp

It represents the complete execution context.

---

## 2. Purpose

State Dump exists to ensure:

- Reproducibility
- Traceability
- Governance continuity
- Post-execution validation
- Escalation auditability

Without state capture, audit is incomplete.

---

## 3. When State Dump Is Required

A State Dump SHALL be generated:

- At execution start (Threat ≥ 2)
- At threat escalation
- At constraint mutation
- At authority change
- At execution completion
- Upon administrative override

State mutation without dump is invalid.

---

## 4. Minimum Schema

A valid State Dump SHALL include:


{
"version": "vX.X.X",
"mode": "...",
"threat_level": ...,
"authority": "...",
"constraints": {...},
"protocols_active": [...],
"artifacts_produced": [...],
"timestamp": "...",
"integrity_hash": "..."
}

Implementations MAY extend but SHALL NOT omit required fields.

---

## 5. Integrity Requirements

State Dump MUST be:

- Immutable once written
- Tamper-evident
- Bound to execution identifier
- Version-referenced
- Audit-linked

Integrity hash MUST reflect:

- Governance state
- Constraint envelope
- Authority context

---

## 6. Relationship to Audit

Audit records actions.

State Dump records environment.

Audit without State Dump lacks environmental integrity.

State Dump without Audit lacks behavioral trace.

Both are required for canonical execution.

---

## 7. Failure Conditions

State Dump fails if:

- Required fields missing
- Integrity hash invalid
- Authority context absent
- Timestamp missing
- Protocol set inconsistent with governance state

Failure invalidates canonical status of execution.

---

## 8. Governance Integrity Rule

If Aegis cannot reproduce the state in which an action occurred,
Aegis cannot claim governance legitimacy.

State Dump is the structural memory of governance.