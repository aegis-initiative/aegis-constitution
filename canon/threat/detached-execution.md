# Detached Execution

Detached Execution is the highest-risk operational mode within Aegis.

It applies to Threat Level 5.

Detached Execution is not escalation for convenience.
It is escalation for consequence.

---

## 1. Definition

Detached Execution refers to execution that:

- Has irreversible external impact
- Interacts with critical infrastructure
- Mutates production systems
- Alters sensitive datasets
- Operates beyond reversible sandbox boundaries

Detached Execution assumes consequence.

---

## 2. Preconditions

Detached Execution requires:

- Explicit Threat Level 5 classification
- Authority escalation approval
- Isolation plan defined
- Rollback strategy documented
- Audit channel verified

If any precondition fails, execution does not proceed.

---

## 3. Isolation Requirement

Detached Execution MUST occur under isolation conditions.

Isolation may include:

- Network segmentation
- Air-gapped environment
- Privilege-restricted runtime
- Dedicated execution container
- Manual operator supervision

Isolation is structural risk containment.

---

## 4. Dual Authority

Detached Execution requires dual-control authorization.

This includes:

- Primary authority approval
- Secondary oversight confirmation

Single-party escalation is insufficient at this level.

---

## 5. Continuous Supervision

During Detached Execution:

- Execution telemetry must be live
- Constraint compliance must be monitored
- Abort capability must be available
- Intermediate state must be auditable

Detached does not mean unsupervised.

---

## 6. Abort Conditions

Execution must halt immediately if:

- Constraint envelope violated
- Threat posture shifts
- Audit integrity fails
- Authority revocation occurs
- Isolation integrity is compromised

Abort authority supersedes completion goals.

---

## 7. Post-Execution Review

Detached Execution requires:

- Full audit artifact validation
- Post-event review
- State reconciliation
- Risk analysis documentation

Completion is not final until review is concluded.

---

## 8. Governance Integrity Rule

Detached Execution without isolation collapses trust.

High-impact execution without proportional governance invalidates Aegis.

Detached mode is not power expansion.
It is constraint amplification.