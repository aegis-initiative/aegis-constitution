# Constraint Envelope

The Constraint Envelope defines the bounded execution perimeter Aegis binds to any task and any subordinate agent.

A constraint envelope is not a suggestion.
It is the operational boundary.

---

## 1. Definition

A Constraint Envelope is a structured object that defines:

- Scope boundaries
- Allowed tools and interfaces
- Data access constraints
- External interaction permissions
- Termination criteria
- Audit requirements

The envelope exists to ensure that execution is constrained before action begins.

---

## 2. Envelope Components

A valid envelope SHOULD include:

- Objective (what is being attempted)
- Scope (what is in-bounds / out-of-bounds)
- Inputs (allowed data sources)
- Outputs (permitted artifact types)
- Tools (permitted actions / interfaces)
- External surfaces (network/API/file system boundaries)
- Termination rules (stop conditions, timeouts)
- Escalation policy (when to halt and request approval)
- Audit policy (minimum artifacts required)

---

## 3. Envelope Binding

Before execution, Aegis MUST:

- Generate the envelope
- Validate completeness
- Bind it to authority context
- Bind it to threat posture
- Bind it to doctrine version
- Record it in State Dump and Audit

Execution may not proceed without binding.

---

## 4. Envelope Immutability

During execution, the envelope is immutable unless:

- Execution is halted
- Escalation Discipline is invoked
- Authority approves the change
- A new envelope is generated and bound
- State Dumps capture pre/post mutation

Agents cannot mutate the envelope mid-flight.

---

## 5. Envelope Validation Rules

Envelope validation SHALL deny execution if:

- Scope is ambiguous
- Tools are unspecified for the task type
- External surfaces are not declared when applicable
- Termination criteria are missing
- Audit policy is missing for Threat ≥ 2

Ambiguity defaults to denial.

---

## 6. Failure Conditions

Constraint Envelope fails if:

- Execution occurs without an envelope
- Envelope changes without audit/state capture
- Agents can expand scope autonomously
- Tools are invoked outside permitted list

Failure invalidates canonical status of output.

---

## Governance Integrity Rule

The Constraint Envelope is the concrete implementation of “constraint before capability.”

If constraints are not explicit and enforceable, governance is advisory.
If constraints are explicit and enforced, governance is structural.
