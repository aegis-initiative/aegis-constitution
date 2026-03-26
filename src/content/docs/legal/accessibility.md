---
title: Accessibility Statement
description: Accessibility conformance statement for the AEGIS Constitution site
template: doc
---

*Last evaluated: March 21, 2026*

AEGIS Operations LLC is committed to ensuring that `aegis-constitution.com` is accessible to all users, including those who rely on assistive technologies.

---

## Conformance Target

This site targets **WCAG 2.1 Level AA** conformance. WCAG (Web Content Accessibility Guidelines) is the internationally recognized standard for web accessibility, published by the W3C Web Accessibility Initiative.

---

## Current Status

As of the evaluation date above, this site achieves:

- **100/100 Lighthouse Accessibility** score across all pages in both light and dark themes
- Semantic HTML throughout — headings, landmarks, navigation, and content structure
- Color contrast ratios meeting or exceeding **WCAG AA** (4.5:1) for all text; most pairings exceed **AAA** (7:1)
- Keyboard-navigable interface — all interactive elements reachable via keyboard
- Screen reader compatibility — ARIA labels, roles, and states on all controls
- Responsive design — content accessible from 320px viewport width and up
- Respects `prefers-color-scheme` user preference via automatic theme detection

---

## Design System

This site's color system is aligned with the U.S. Web Design System (USWDS) grayscale and bluescale tokens, chosen specifically for their accessibility properties:

- **Accent blue** (`#005ea2` light / `#73b3e7` dark) — meets WCAG AA on respective backgrounds; dark theme meets AAA
- **Text colors** — primary and secondary text exceed AAA (7:1); muted text and accent links meet AA (4.5:1)
- **Focus indicators** — visible focus rings on all interactive elements

---

## Known Limitations

- CSS transitions on navigation elements do not currently respect `prefers-reduced-motion`. These are minor visual transitions (0.15–0.2s) that do not affect content access.
- Dark mode contrast was additionally verified via manual calculation against WCAG thresholds.

If you encounter an accessibility barrier not listed here, please let us know.

---

## Feedback & Accommodation

If you experience difficulty accessing any part of this site, or if you need content in an alternative format, please contact us:

**Email:** [hello@aegis-constitution.com](mailto:hello@aegis-constitution.com)  
**Mailing address and additional contacts:** [Impressum](/legal/impressum/#contact)

We aim to respond to accessibility feedback within five business days.

---

## Evaluation Method

Accessibility is evaluated using a combination of:

- Lighthouse accessibility audits (Chrome DevTools)
- Manual keyboard navigation testing
- Semantic HTML and ARIA review
- Color contrast verification against WCAG 2.1 AA and AAA thresholds

A [Component Showcase](/legal/components/) is available for independent verification — it displays every visual element used across the site and includes a link to run a Lighthouse audit directly.

---

*AEGIS™* | *"Capability without constraint is not intelligence"™*
*AEGIS Initiative — Finnoybu IP LLC*
