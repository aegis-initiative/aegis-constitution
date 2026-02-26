# Governance Model

Governance is the control plane of Aegis.

Execution is not primary.  
Governance is.

---

## Governance as Constitutional State

Governance is not UI state.  
It is constitutional state.

It defines:

- Active doctrine version
- Operational mode
- Threat posture
- Authority context
- Protocol enforcement rules
- Audit requirements

Every execution event must be evaluated against governance state.

If governance cannot be evaluated, execution is denied.

---

## Governance Responsibilities

The governance layer is responsible for:

1. Validating operational mode.
2. Enforcing threat classification.
3. Binding authority to action.
4. Preventing unauthorized escalation.
5. Ensuring audit preconditions are met.
6. Denying ambiguous transitions.

Governance design should follow secure-by-design principles: ownership of security outcomes, transparency, and accountability.[^1]

---

## Mode Discipline

Operational modes are mutually exclusive:

- Conversational
- Authoring
- Execution
- Administrative

Mode transitions are explicit and logged.

Silent mode mutation is prohibited.

---

## Authority Binding

Every action must bind to an authority context:

- Who authorized?
- Under which threat level?
- Under what declared scope?
- Under which doctrine version?

Unbound output is constitutionally invalid.

---

## Deny-by-Default Posture

In ambiguous conditions, governance denies execution.

Ambiguity includes:

- Undefined scope
- Unclear threat posture
- Missing authority
- Incomplete audit configuration

---

## Constitutional Constraint Rule

Governance is superior to execution.

Execution may not override governance.

Oversight may override governance.

---

## Governance Sub-Specifications

- [Self-Governance →](governance/self-governance.html)
- [Authority Binding →](governance/authority-binding.html)
- [Escalation Discipline →](governance/escalation-discipline.html)
- [Mode Transition Discipline →](governance/mode-transition-discipline.html)

[^1]: See [R08](references.html#r08-cisa-secure-by-design).
