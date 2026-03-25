# Product Knowledge -- aegis-constitution

*Comprehensive design and behavior reference for the AEGIS Constitution site. Generated 2026-03-23.*

---

## 1. Site Overview

The AEGIS Constitution site is a static documentation website built with **Astro 6** and deployed to **Cloudflare Pages** at aegis-constitution.com. It publishes the AEGIS governance charter as a versioned, citeable, openly licensed document set.

- **Framework:** Astro 6 with MDX integration
- **Search:** Pagefind (static search index, built post-build)
- **PDF generation:** Puppeteer (generates two PDF variants from a /print/ page)
- **Fonts:** Self-hosted woff2 (no external font dependencies)
- **Node requirement:** >= 22.12.0
- **Build output:** dist/
- **Deployment:** Cloudflare Pages, automatic on push to main

### Build Commands

| Command | Purpose |
|---|---|
| npm run dev | Local dev server at localhost:4321 |
| npm run build | Production build + Pagefind index |
| npm run postbuild | Copy Pagefind assets to public/ |
| npm run preview | Preview production build |
| npm run pdf | Generate PDF variants via Puppeteer |

---

## 2. Site Architecture

### Page Types

1. **Landing page** (/) -- Full-screen hero with wordmark, no sidebar, no ToC
2. **Doc pages** (/[...slug]/) -- Three-column layout with sidebar, content, and ToC rail
3. **404 page** (/404) -- Centered error display with fuzzy route suggestions
4. **Print page** (/print/) -- Full document compilation for PDF generation, no navigation

### Routing

- / -- src/pages/index.astro (landing page, standalone layout)
- /print/ -- src/pages/print.astro (print compilation, standalone layout)
- /404 -- src/pages/404.astro (error page, standalone layout)
- All other routes -- src/pages/[...slug].astro (dynamic, uses DocLayout)

The [...slug].astro page uses getStaticPaths() to generate routes from the docs content collection. Every .md and .mdx file in src/content/docs/ becomes a page.

### Content Collection

Defined in src/content.config.ts. Collection "docs" uses glob loader for md/mdx in src/content/docs. Schema: title (string, required), description (string, optional), sidebar.hidden (boolean, optional), sidebar.order (number, optional). Legal pages also use a "template: doc" frontmatter field.

---

## 3. Content Sections

### Constitution (15 files)
- constitution/index.md -- Preamble
- constitution/article-i.mdx through article-xi.mdx -- 11 articles
- constitution/compliance.mdx, amendments.mdx, interpretation.md

### Doctrine (6 files)
- doctrine/index.md + doctrine/article-i through article-v.mdx

### Principles (9 files)
- principles/index.md + principles/principle-1 through principle-8.mdx

### Protocols (8 files)
- protocols/index.mdx + protocols/protocol-1 through protocol-7.mdx

### Other Content
- about/index.md, contact/index.md, references.md
- legal/index.md + 8 legal pages (terms, privacy, acceptable-use, accessibility, dmca, disclaimer, cookies, impressum)
- releases/ -- CalVer structured release notes

---

## 4. Layout System

### DocLayout (src/layouts/DocLayout.astro)

Primary layout for all doc pages:

    html[data-theme="auto"]
      head (meta, OG, fonts, FOUC prevention script)
      body
        Header
        slot[name="breadcrumb"]
        div.page-wrapper (flex)
          Sidebar (left, fixed 320px)
          main.main-content (center, flexible)
            slot (page content)
            Footer
            div.watermark (AEGIS wordmark at 8% opacity, height 720px)
          TableOfContents (right, fixed 320px)

### Three-Column Layout Behavior

| Viewport | Left Sidebar | Content | Right ToC |
|---|---|---|---|
| < 1024px | Hidden (drawer on demand) | Full width, padded 1.5rem | Hidden |
| 1024px--1366px | Fixed 320px, visible | margin-left: 320px | Hidden (dropdown button in header) |
| > 1366px | Fixed 320px, visible | margin-left+right: 320px | Fixed 320px, visible |

Content area: max-width 72rem below 1367px, none above.

### Landing Page Layout

Standalone page (src/pages/index.astro) -- no DocLayout, no sidebar, no ToC. Header with menu button hidden. Centered hero with flexbox. Own CSS variables and font-face declarations.

Desktop: side-by-side hero text (left) + wordmark (right), 8rem gap.
Mobile (< 768px): stacked centered, wordmark on top, 2rem gap.
Small mobile (< 480px): reduced sizes.

### 404 Page Layout

Standalone. Centered vertically: faded logo (30% opacity), "404" heading (5rem), error message, fuzzy route suggestions via Levenshtein distance, "Return to Home" pill button.

### Print Page Layout

Standalone for Puppeteer PDF generation. Title page, ToC with dot leaders, section dividers, all articles with page-break-before. Two modes: download (blue links, 0.75in margins) and print (plain text, 1.25in margins, body.print-mode class).

### Legal Pages vs Doc Pages

Same layout but Sidebar detects /legal pathname and renders flat navigation list instead of accordion groups.

---

## 5. Design System -- CSS Variables

### Light Theme (:root / [data-theme="light"])

| Variable | Value | Role |
|---|---|---|
| --color-bg | #ffffff | Page background |
| --color-bg-subtle | #f5f5f5 | Subtle backgrounds |
| --color-bg-muted | #eeeeee | Muted backgrounds |
| --color-border | #d4d4d4 | Primary borders |
| --color-border-subtle | #e8e8e8 | Subtle borders |
| --color-text | #161616 | Primary text (brand black) |
| --color-text-secondary | #595959 | Secondary text (7:1 on white) |
| --color-text-muted | #595959 | Muted text (7:1 on white) |
| --color-accent | #0062a5 | Primary accent (7:1 on white) |
| --color-accent-brand | #0062a5 | Brand accent |
| --color-accent-low | #e8f4fd | Low-contrast accent bg |
| --color-accent-high | #005ea2 | High-contrast accent |
| --color-brand-gray | #595959 | Brand gray (7:1 on white) |
| --header-bg | #fafafa | Header background |
| --header-border | #777777 | Header bottom border |
| --header-text | #707070 | Header text (5:1 on fafafa) |
| --header-text-muted | #707070 | Header muted text |
| --sidebar-bg | #ffffff | Sidebar background |
| --subheader-bg | #005a9e | Subheader bar |
| --subheader-text | #ffffff | Subheader text |
| --search-modal-bg | rgba(10,22,40,0.5) | Modal backdrop |
| --search-dialog-bg | #ffffff | Search dialog bg |
| --search-border | #d4d4d4 | Search borders |
| --search-accent | #0062a5 | Search accent |
| --search-text | #161616 | Search text |
| --search-shortcut-bg | #eeeeee | Shortcut badge bg |

### Dark Theme ([data-theme="dark"])

| Variable | Value | Role |
|---|---|---|
| --color-bg | #161616 | Page background (brand black) |
| --color-bg-subtle | #1e1e1e | Subtle backgrounds |
| --color-bg-muted | #2a2a2a | Muted backgrounds |
| --color-border | #3a3a3a | Primary borders |
| --color-border-subtle | #2a2a2a | Subtle borders |
| --color-text | #e8e8e8 | Primary text |
| --color-text-secondary | #b0b0b0 | Secondary text |
| --color-text-muted | #888888 | Muted text |
| --color-accent | #4da6f0 | Primary accent (lighter blue) |
| --color-accent-brand | #0084e7 | Brand blue |
| --color-accent-low | #0d2640 | Low-contrast accent bg |
| --color-accent-high | #4da6f0 | High-contrast accent |
| --color-brand-gray | #999999 | Brand gray on dark |
| --header-bg | #000000 | Header bg (pure black) |
| --header-border | #000000 | Header border |
| --header-text | #e8e8e8 | Header text |
| --header-text-muted | #999999 | Header muted text |
| --sidebar-bg | #161616 | Sidebar bg (matches page) |
| --search-modal-bg | rgba(10,22,40,0.7) | Modal backdrop |
| --search-dialog-bg | #161616 | Search dialog bg |
| --search-border | #3a3a3a | Search borders |
| --search-accent | #4da6f0 | Search accent |
| --search-text | #e8e8e8 | Search text |
| --search-shortcut-bg | #2a2a2a | Shortcut badge bg |

### Landing Page Variable Differences

The landing page defines slightly different CSS variables:

| Variable | Light | Dark |
|---|---|---|
| --color-bg | #ffffff | #1b1b1b |
| --color-text | #1b1b1b | #f0f0f0 |
| --color-text-secondary | #454545 | #c9c9c9 |
| --color-text-muted | #5c5c5c | #adadad |
| --color-accent | #005ea2 | #73b3e7 |
| --color-accent-high | #1a4480 | #a3cef1 |

---

## 6. Typography

### Font Families

| Role | Font | Weights | Used In |
|---|---|---|---|
| Headings/UI | IBM Plex Sans (variable) | 100-700 normal+italic | h1-h6, sidebar, breadcrumbs, buttons, footer, aside titles |
| Body | Poppins | 300, 300i, 400, 400i, 500, 500i, 600, 600i | Body text, paragraphs, lists |
| Fallback | system-ui, sans-serif | -- | Universal fallback |
| Monospace | monospace | -- | Version badges, code |

### Font Sizes

| Element | Size | Notes |
|---|---|---|
| html base | 14px (mobile), 16px (>= 560px) | Breakpoint at 560px |
| h1 | 2.5rem | |
| h2 | 2rem | margin-top: 2rem |
| h3 | 1.5rem | margin-top: 1.5rem |
| Body text | 1rem | Poppins 300 |
| Sidebar nav links | 0.875rem | |
| Sidebar group labels | 0.875rem | IBM Plex Sans 600 |
| Breadcrumb | 0.8125rem | IBM Plex Sans 600 |
| ToC rail links | 0.8125rem | |
| ToC H3 links | 0.75rem | Indented |
| Footer | 0.875rem | |
| Footer meta | 0.8125rem mobile, 0.75rem desktop | |
| Aside body | 0.9375rem | |
| Aside title | 1.25rem | IBM Plex Sans 600 |
| Version badge | 0.75rem | monospace |
| PrevNext label | 0.75rem | uppercase, 0.06em spacing |
| PrevNext title | 0.9375rem | IBM Plex Sans 500 |
| Hero title | 3.875rem / 2.875rem / 2.25rem | desktop / tablet / mobile |
| Hero tagline | 1.25rem / 1.125rem / 1rem | desktop / tablet / mobile |
| Error 404 | 5rem | IBM Plex Sans 400 |
| Search trigger | 0.875rem | |

### Line Heights

| Context | Value |
|---|---|
| Base (html) | 1.7 |
| Headings | 1.3 |
| Sidebar/ToC links | 1.4 |
| Hero title | 1.15 |
| Hero tagline | 1.6 |
| Print body | 1.6 |
| Footnotes | 1.5 |

### Font Weights

300 (light, body default), 400 (regular, headings), 500 (medium, buttons/ToC active), 600 (semibold, labels/headers/active nav).

### Letter Spacing

Headings: 0.01em. Breadcrumbs/aside titles/version: 0.02em. PrevNext label: 0.06em.

---

## 7. Color Palette -- Aside Colors

| Type | Light Border | Light BG | Dark Border | Dark BG |
|---|---|---|---|---|
| Doctrine | var(--color-accent) | #E9F0F8 | #73b3e7 | #162e51 |
| Application | #006B2D | #E9F8EF | #73E7A3 | #16512F |
| Constraint | #855400 | #F8F2E9 | #E7BC73 | #513B16 |
| Prohibition | #A5000B | #F8E9EA | #EC8E94 | #51161A |

### Fixed Colors

Brand Blue #0084e7 (decorative/print), Brand Gray #757575 (print/non-theme), Active nav text #ffffff (light) / #161616 (dark), Sidebar overlay rgba(0,0,0,0.4).

---

## 8. Spacing System

| Context | Value |
|---|---|
| Main content padding | 2rem 1.5rem (mobile), 2rem (desktop) |
| Sidebar/ToC width | 320px each |
| Header height | 4rem |
| Sidebar top offset | 4rem |
| Breadcrumb padding | 0.75rem 1.5rem 0 |
| Breadcrumb left (desktop) | calc(320px + 1rem) |
| Footer padding | 1.25rem 1.5rem |
| Aside padding | 1rem 1.25rem |
| Aside margin | 1.5rem 0 |
| Nav link padding | 0.3rem 1rem |
| Nav group label padding | 0.75rem 1.25rem |
| HR margin | 1.5rem 0 |
| PrevNext margin-top | 3rem |
| Watermark padding | 3rem 0 1rem |
| Hero gap | 8rem (desktop), 2rem (mobile) |
| Table cell padding | 0.5rem 1rem |
| scroll-margin-top [id] | 6.55rem |

---

## 9. Breakpoints

| Breakpoint | What Changes |
|---|---|
| 400px | Site name appears in header |
| 480px | Landing: smaller hero title/wordmark below this |
| 560px | Font size 14px->16px; breadcrumb home link appears |
| 768px | Landing: hero stacks vertically |
| 1024px | Sidebar visible; mobile menu hidden; search bar shown; PDF buttons; version badge; PrevNext/footer horizontal |
| 1024px--1366px | ToC dropdown button in header |
| 1367px | ToC rail visible; content margin-right: 320px |

---

## 10. Theme System

Three-state toggle cycles: light -> dark -> auto -> light. Storage: localStorage "aegis-theme". Auto resolves via prefers-color-scheme. FOUC prevention: inline script in head sets data-theme before paint. System change listener updates when on auto. Three SVG icons: Sun (light), Moon (dark), Monitor (auto).

---

## 11. Navigation System

### Sidebar Accordion

Native details/summary elements. JS enforces single-group-open: when one opens, others close. Groups auto-open if current page is within.

### Active State

White text on accent bg (light), #161616 text on accent bg (dark). font-weight: 600, border-radius: 0 4px 4px 0.

### Left-Border Indicator

Default: 2px solid transparent. Hover: border var(--color-text-muted). Active: border var(--color-accent), accent bg fill.

### Mobile Drawer

Below 1024px: hamburger calls window.openSidebar(). Fixed drawer min(320px, 85vw), overlay rgba(0,0,0,0.4), body scroll locked. Overlay click closes.

### Legal Navigation

/legal paths get flat list instead of accordion.

### Prev/Next

Hardcoded navOrder array in [...slug].astro. Only constitution/doctrine/principles/protocols pages. Cards with border, hover accent.

### Breadcrumb

From slug path. Section index: one item. Sub-pages: section link + current title. Home hidden < 560px. Desktop: left offset calc(320px + 1rem).

---

## 12. Search System

Pagefind post-build index. @pagefind/default-ui loaded dynamically. site-search web component.

Desktop: search bar with Ctrl+K/Cmd+K badge. Mobile: magnifying glass icon.

Modal: full-screen mobile, centered dialog (max 40rem) desktop. Backdrop blur 0.25rem. Cancel button mobile only.

Recent searches: localStorage "aegis-recent-searches", max 5. Result cards: bordered, document icon, tree diagram sub-results. Clickable rows. URL trailing slash cleanup.

Pagefind theming via #aegis__search CSS variables. Specificity-based overrides (not @layer).

---

## 13. Header

Sticky top, z-index 100, height 4rem. Three sections: Logo+name (left), Search (center desktop), Tools (right).

| Button | Mobile | Desktop | Notes |
|---|---|---|---|
| Search icon | Visible | Hidden | Opens modal |
| GitHub link | Visible | Visible | External |
| Theme toggle | Visible | Visible | light/dark/auto |
| Print PDF | Hidden | Visible | Opens print PDF |
| Download PDF | Hidden | Visible | Downloads PDF |
| Version badge | Hidden | Visible | CalVer links to release notes |
| Menu | Visible | Hidden | Opens drawer |

Version: AEGIS_VERSION env var. CalVer format links to release notes.

---

## 14. Table of Contents

### Right Rail (> 1366px)
Fixed 320px, scrollable. H2 headings with left-border indicator.

### Dropdown (1024--1366px)
"On this page" button injected into header. 280px floating dropdown.

### Scroll Spy
IntersectionObserver rootMargin: -10% 0px -80% 0px.

### Click Behavior
Closes dropdown, finds heading, walks back to HR above, scrolls below header with 8px padding, updates hash.

### Heading ID
Auto-generates from text if missing.

---

## 15. Footer

Left/bottom: "Built and maintained by Ken Tannenbaum" + build date. Right/top: copyright + About|Contact|Legal. Mobile stacked centered (order swap). Desktop (>= 1024px) horizontal.

---

## 16. Watermark

AEGIS wordmark at bottom of doc pages: opacity 0.08, grayscale, no pointer-events, no select, height 720px, centered.

---

## 17. Aside System

MDX usage: <Aside type="doctrine">Content</Aside>

Types: doctrine (blue), application (green), constraint (amber), prohibition (red).

4px left border, tinted bg, shield icon + label (IBM Plex Sans 600, 1.25rem), border-radius 4px.

Plugins: remark-asides.mjs (:::directive syntax), rehype-asides.mjs (post-process aside elements). Both inject shield SVG and title.

---

## 18. Footnotes

Inline: [ N ] format (::before/::after). Accent color, weight 500. Section: border-top 2px, 0.875rem, secondary color. Back-ref scroll: smooth scroll one line above, accounting for header.

---

## 19. Print / PDF System

/print/ renders all content: title page, ToC with dot leaders, section dividers, all articles with page-break-before.

scripts/generate-pdf.mjs uses Puppeteer. Download: 0.75in margins, blue links. Print: 1.25in margins, plain text (body.print-mode). Both: Letter size, 1in top/bottom, header/footer with version and page numbers, internal links rewritten to PDF anchors.

---

## 20. Animations/Transitions

All 0.15s except sidebar caret and ToC chevron (0.2s ease). No keyframe animations. No page transitions. Smooth scroll on ToC clicks.

---

## 21. Accessibility

ARIA: sidebar, breadcrumb, ToC labels. aria-current="page" on active items. Focus visible: PrevNext outline 2px accent. Keyboard: Ctrl+K search, Escape ToC close. Color contrast: 7:1 text (light), 5:1 header. aria-hidden on decorative SVGs. scroll-margin-top 6.55rem on [id].

---

## 22. Open Graph

og:type website, og:title, og:description, og:image /OG_image.png (1200x630), og:site_name, Twitter summary_large_image. Landing page has own hardcoded OG.

---

## 23. Assets

SVG (src/assets/): logo, wordmark (neutral/dark/light). Components use inline SVG, not these files.

Public: favicon.svg, OG_image.png/svg, fonts/ (10 woff2), icons/, pagefind/ (generated), two PDFs.

Fonts: IBM Plex Sans variable (2 files, 100-700), Poppins (8 files, 300-600 normal+italic). Two preloaded.

---

## 24. Scripts

generate-pdf.mjs (Puppeteer PDFs), append-dev-log.py, generate-release-notes.py, nightly-release.py.

---

## 25. Key Implementation Details

- **FOUC Prevention:** Inline head script reads localStorage, sets data-theme before paint
- **Content Rendering:** [...slug].astro fetches via getCollection("docs"), generates static paths, renders via Astro render()
- **Hardcoded Navigation:** Sidebar nav is static array in Sidebar.astro. navOrder in [...slug].astro must match.
- **Version Env Var:** AEGIS_VERSION from import.meta.env. CalVer links to releases.
- **No CSS Framework:** Custom CSS + variables. Astro scoped + global styles.
- **Pagefind CSS:** Imported in frontmatter. Overrides via #aegis__search specificity (not @layer).
