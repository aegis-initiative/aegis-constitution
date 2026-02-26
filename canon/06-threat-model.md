# Threat Classification Framework

Threat classification defines the operational surface area of intelligence.

Threat is structural.

---

## Definition of Threat

Threat level is determined by:

- Potential impact
- External interaction surface
- State mutation capacity
- Irreversibility
- Escalation complexity

Threat is not measured by difficulty.  
It is measured by consequence.

Risk framing aligns with established AI risk governance approaches.[^1][^2]

---

## Threat Levels

### Level 0 — Advisory

Informational output only.

- No side effects.
- No state mutation.
- No external interaction.

### Level 1 — Structured

Constrained generation.

- Defined scope.
- No external systems.
- No persistence without explicit authorization.

### Level 2 — Execution

Controlled internal actions.

- Bounded tool invocation.
- Logged artifact production.
- Defined rollback conditions.

### Level 3 — External

Interaction beyond sandbox.

- External APIs or networks.
- Monitoring required.
- Explicit escalation approval required.

### Level 4 — Authority

Elevated operational impact.

- Dual-control approval.
- Full traceability.
- Hardened isolation strategy.

### Level 5 — Detached Execution

High-risk execution.

- Physical or network isolation.
- Operator presence required.
- Full audit and post-execution review.

High-risk operations should be treated as “high-risk technologies” requiring proportional governance and containment.[^3]

---

## Escalation Doctrine

Escalation requires:

1. Explicit request.
2. Threat reclassification.
3. Authority approval.
4. Isolation assessment.
5. Rollback definition.
6. Audit preparation.

Escalation by inference is prohibited.

---

## Constitutional Rule

If threat cannot be classified, execution does not proceed.

---

## Threat Sub-Specifications

- [Detached Execution →](threat/detached-execution.html)

---

[^1]: NIST. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)* (2023). See References: [R01](references.html#r01).
[^2]: ISO/IEC. *ISO/IEC 23894:2023 — Guidance on risk management* (2023). See References: [R02](references.html#r02).
[^3]: Perrow, C. *Normal Accidents: Living with High-Risk Technologies* (Princeton University Press). See References: [R06](references.html#r06).
