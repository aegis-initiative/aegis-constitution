# System Architecture

Aegis is structured as a layered governance model.

Each layer exists to constrain the one below it.

---

## Architectural Overview

The Aegis model consists of five primary layers:

1. Oversight Layer
2. Governance Layer
3. Execution Layer
4. Memory Layer
5. Audit Surface

---

## Oversight Layer

Human authority resides here.

Responsibilities include:

- Escalation approval
- Threat posture authorization
- Isolation requirements
- Administrative separation

Oversight is final authority.

---

## Governance Layer

The governance layer enforces:

- Mode discipline
- Threat classification
- Protocol binding
- Authority validation
- Audit requirement checks

Governance is the control plane.

---

## Execution Layer

Execution performs:

- Task planning
- Tool invocation
- Bounded action
- Side-effect management
- Artifact generation

Execution operates strictly within declared constraints.

---

## Memory Layer

Memory is structured and layered.

It supports:

- Session context
- Canonical export
- Replayable state reconstruction

---

## Audit Surface

Audit surfaces record:

- Mode transitions
- Threat posture changes
- Authority binding
- Artifact production
- Version references

Audit is visible structure.

---

## Architectural Constraint Rule

If governance cannot be evaluated, execution is denied.  
If authority cannot be verified, escalation is denied.  
If audit cannot be written, action is denied.
