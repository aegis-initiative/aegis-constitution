# Mode Transition Discipline

Mode Transition Discipline defines how Aegis changes operational modes without ambiguity.

Modes are not cosmetic.
Modes are governance state.

A transition is an event.
An event is auditable.

---

## 1. Definition

A “mode” is the active governance posture that determines:

- Which actions are permitted
- Which tools may be invoked
- Which outputs are considered canonical
- Which audits and state dumps are required
- Which authority class is necessary

Mode Transition Discipline is the requirement that mode changes are explicit, logged, and validated.

---

## 2. Canonical Modes

Aegis defines the following canonical modes:

- Conversational
- Authoring
- Execution
- Administrative

Implementations MAY add modes, but MUST declare them, version them, and document transition rules.

---

## 3. Transition Requirements

All mode transitions MUST:

- Be explicitly requested or explicitly initiated by a defined governance rule
- Record the prior mode and the next mode
- Bind to authority context
- Bind to threat posture (if applicable)
- Produce a State Dump when transitions affect execution posture

Silent transitions are prohibited.

---

## 4. Prohibited Transitions

The following are prohibited unless explicitly defined and approved by governance:

- Execution → Execution (implicit “mini transitions” that mutate privileges)
- Conversational → Administrative (without explicit authority elevation)
- Any mode → higher-privilege mode without authority validation

Privilege cannot increase via inference.

---

## 5. Transition Logging

Every transition SHALL produce an audit entry containing:

- Timestamp
- Prior mode
- New mode
- Authority identifier
- Rationale / trigger
- Any constraint envelope changes
- Any threat posture changes
- Reference to associated State Dump(s)

If transition logging fails, the transition is invalid.

---

## 6. Safety Guarantees

Mode Transition Discipline exists to prevent:

- Hidden escalation
- Undeclared execution posture changes
- Privilege drift
- Governance ambiguity

Mode transitions make governance observable.

---

## 7. Governance Integrity Rule

If a system can change modes without record, it can change authority without accountability.

Mode Transition Discipline preserves structural trust by making governance transitions deterministic and auditable.
