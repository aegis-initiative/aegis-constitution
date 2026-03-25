# Component API Reference -- aegis-constitution

*Complete API reference for all Astro components. Generated 2026-03-23.*

---

## AegisLogo

**File:** src/components/AegisLogo.astro

**Purpose:** Renders the AEGIS shield+diamond logo as inline SVG. Theme-aware via CSS variables.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| size | number | 32 | Height in pixels. Width computed from aspect ratio (443.721/478.328). |

**CSS Variables Used:**
- --color-brand-gray -- Shield fill color
- --color-accent -- Diamond fill color

**Responsive:** No responsive behavior; size is fixed by prop.

**JavaScript:** None.

**Dependencies:** None.

**Notes:** SVG uses aria-hidden="true". Width auto-calculated from nearly-square aspect ratio. In header, --color-brand-gray overridden to --header-text.

---

## AegisWordmark

**File:** src/components/AegisWordmark.astro

**Purpose:** Renders the AEGIS wordmark (logo + "AEGIS" text) as inline SVG. Theme-aware.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| height | number | 32 | Height in pixels (if width not set) |
| width | number | computed | Width in pixels. If omitted, computed from height and aspect ratio (450.101/645.785). |

**CSS Variables Used:**
- --color-brand-gray -- Text and shield fill
- --color-accent -- Diamond fill

**Responsive:** No intrinsic responsive behavior. Parent containers may resize it.

**JavaScript:** None.

**Dependencies:** None.

**Notes:** aria-hidden="true". Original viewBox 450.101 x 645.785 (taller than wide). Used in landing hero (width 400), watermark (height 720), print page.

---

## Aside

**File:** src/components/Aside.astro

**Purpose:** Styled callout boxes for constitutional content. Four semantic types with distinct color coding.

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| type | "doctrine" / "application" / "constraint" / "prohibition" | Yes | Color scheme and label text |

**Slot:** Default slot -- content rendered inside the aside.

**CSS Variables Used:**
- --color-border -- Default aside border
- --color-accent -- Doctrine border/title (light)

**CSS Classes:** .aside (base), .aside-{type} (colors), .aside-title (title row), .aside-icon (shield SVG)

**Responsive:** No breakpoint-specific behavior. Full width of parent.

**JavaScript:** None.

**Dependencies:** None.

**Theme Behavior:** Light: colored border + tinted bg + colored title. Dark: adjusted via :global([data-theme="dark"]) selectors.

**Color Map:**

| Type | Light Border | Light BG | Dark Border | Dark BG |
|---|---|---|---|---|
| doctrine | var(--color-accent) | #E9F0F8 | #73b3e7 | #162e51 |
| application | #006B2D | #E9F8EF | #73E7A3 | #16512F |
| constraint | #855400 | #F8F2E9 | #E7BC73 | #513B16 |
| prohibition | #A5000B | #F8E9EA | #EC8E94 | #51161A |

---

## Breadcrumb

**File:** src/components/Breadcrumb.astro

**Purpose:** Breadcrumb navigation trail.

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| items | BreadcrumbItem[] | Yes | Array of breadcrumb segments |

**BreadcrumbItem Interface:** label (string, required), href (string, optional -- last item never linked).

**CSS Variables Used:** --color-bg, --color-text-muted, --color-text, --color-accent.

**Responsive:**
- < 560px: Home link hidden
- >= 560px: Home link visible
- >= 1024px: Left padding calc(320px + 1rem)

**JavaScript:** None.

**Dependencies:** None.

**ARIA:** nav[aria-label="Breadcrumb"], last item aria-current="page".

---

## Footer

**File:** src/components/Footer.astro

**Purpose:** Site footer with authorship, build date, copyright, legal links.

**Props:** None.

**Computed Values:** year (current year), buildDate (YYYY.MM.DD format).

**CSS Variables Used:** --color-border-subtle, --color-text-secondary, --color-text-muted, --color-accent, --color-bg.

**Responsive:**
- < 1024px: Stacked centered, copyright above author (CSS order)
- >= 1024px: Two-column horizontal, author left, copyright right

**JavaScript:** None.

**Dependencies:** None.

---

## Header

**File:** src/components/Header.astro

**Purpose:** Sticky site header with logo, search, tool buttons, theme toggle.

**Props:** None.

**Imports:** AegisLogo, Search.

**Computed Values:** version (AEGIS_VERSION env), isCalVer, versionHref.

**CSS Variables Used:** --header-bg, --header-border, --header-text, --header-text-muted, --color-accent, --color-bg, --color-bg-muted, --color-border, --color-text, --color-text-muted.

**CSS Classes:** .site-header (sticky, z-100, 4rem), .header-inner (flex), .site-title, .site-name (hidden < 400px), .header-tools, .tool-btn (32x32), .search-btn, .menu-btn, .version-badge, .pdf-btn.

**Responsive:**
- < 400px: Site name hidden
- < 1024px: Search bar hidden, search/menu icons visible, PDF/version hidden
- >= 1024px: Search bar visible, search/menu hidden, PDF/version visible

**JavaScript:**
- Theme toggle: cycles light/dark/auto, localStorage "aegis-theme", updates data-theme + icons
- System theme listener
- Menu button: toggles aria-expanded, calls window.openSidebar()

**Dependencies:** AegisLogo, Search.

**Global CSS:** Defines .toc-btn styles for TableOfContents injection.

---

## PrevNext

**File:** src/components/PrevNext.astro

**Purpose:** Previous/Next navigation at bottom of doc pages.

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| prev | NavItem | No | Previous page |
| next | NavItem | No | Next page |

**NavItem Interface:** label (string), href (string).

**CSS Variables Used:** --color-border-subtle, --color-border, --color-accent, --color-accent-low, --color-text-muted.

**Responsive:**
- < 1024px: Stacked vertical, full-width cards
- >= 1024px: Side-by-side, 45% width

**JavaScript:** None.

**Dependencies:** None.

**Notes:** Renders nothing if both undefined. 8px border-radius. focus-visible outline.

---

## Search

**File:** src/components/Search.astro

**Purpose:** Complete search system: trigger, modal, Pagefind, recent searches.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| placeholder | string | "Search" | Input placeholder |
| showImages | boolean | false | Show images in results |

**Custom Element:** site-search (SiteSearch extends HTMLElement).

**CSS Variables Used:** --header-text, --color-accent, --color-bg, --color-bg-muted, --color-border, --color-text, all --search-* variables (8 total).

**JavaScript Features:**
- Dialog modal open/close
- Ctrl+K / Cmd+K keyboard shortcut (toggle)
- Apple device Cmd key detection
- Pagefind UI lazy init on first open
- Recent searches (localStorage "aegis-recent-searches", max 5)
- Result row click delegation
- URL trailing slash cleanup

**CSS Architecture:**
- Scoped: trigger button, modal frame
- Global: Pagefind UI overrides via #aegis__search specificity
- Pagefind CSS imported in frontmatter (not via @import in style)

**Dependencies:** @pagefind/default-ui (runtime), Header (mobile #search-open button).

**Responsive:**
- < 1024px: Trigger hidden, modal full-screen
- >= 50rem: Modal centered (max 40rem), cancel hidden

**Key Implementation Details:**
- display:block on custom element (not display:contents) to maintain flex layout
- No @layer for overrides (Pagefind CSS unlayered, would win)
- Tree diagram for sub-results uses CSS gradients on ::before

---

## Sidebar

**File:** src/components/Sidebar.astro

**Purpose:** Left navigation with accordion groups (doc pages) or flat list (legal pages).

**Props:** None (reads Astro.url.pathname).

**Navigation Data (hardcoded):** 4 groups (Constitution 15 items, Doctrine 6, Principles 9, Protocols 8) + legal nav (8 items).

**Helper Functions:** isActive(slug), isGroupActive(items).

**CSS Variables Used:** --sidebar-bg, --color-border-subtle, --color-border, --color-text, --color-text-secondary, --color-text-muted, --color-accent.

**CSS Classes:** .sidebar (fixed 320px, z-40), .nav-group (details), .nav-group-label (summary), .caret (chevron), .nav-items (ul), .nav-link, .nav-link.active, .legal-nav, .sidebar-version, .sidebar-overlay.

**Responsive:**
- < 1024px: Hidden. Opens as drawer (.open class, min(320px, 85vw))
- >= 1024px: Visible. Mobile version hidden.

**JavaScript:**
- Accordion: single-group-open via toggle event
- Mobile: openSidebar()/closeSidebar() on window
- Overlay click closes

**Dependencies:** None.

---

## TableOfContents

**File:** src/components/TableOfContents.astro

**Purpose:** Right-rail and dropdown ToC with scroll spy. All content generated client-side.

**Props:** None.

**HTML Structure:** aside.toc-rail (right rail), div.toc-dropdown (floating panel).

**CSS Variables Used:** --color-text, --color-text-secondary, --color-text-muted, --color-border, --color-accent, --color-bg-subtle.

**Responsive:**
- < 1024px: Both hidden
- 1024px--1366px: Rail hidden, button injected in header, dropdown available
- > 1366px: Rail visible, dropdown/button hidden

**JavaScript:**
- buildToc(): extracts H2 headings, auto-generates IDs
- renderList(): populates rail and dropdown
- setupScrollSpy(): IntersectionObserver (rootMargin: -10% 0px -80% 0px)
- injectHeaderButton(): creates "On this page" button in header
- Click: scrolls to HR above heading, updates hash
- Resize: re-evaluates button, hides dropdown outside range

**Dependencies:** Header.astro (injects into .header-tools, uses .toc-btn styles).

---

## DocLayout

**File:** src/layouts/DocLayout.astro

**Purpose:** Primary page layout for documentation pages.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| title | string | required | Page title |
| description | string | default tagline | Meta description |

**Slots:** default (content), "breadcrumb" (navigation bar).

**Imports:** Header, Sidebar, Footer, TableOfContents, AegisWordmark.

**Head:** Meta, OG tags, Twitter Card, favicon, canonical, font preloads, FOUC script.

**Global Styles:** @font-face (10 files), CSS reset, all CSS variables (light+dark, 30+ vars), base typography, tables, page layout, footnotes, watermark, responsive rules, ToC global styles.

**JavaScript:** Footnote back-reference scroll handler.

**Dependencies:** Header, Sidebar, Footer, TableOfContents, AegisWordmark.

---

## Plugin: remark-asides

**File:** src/plugins/remark-asides.mjs

**Purpose:** Transforms :::type container directives to aside HTML. Types: doctrine, application, constraint, prohibition.

**Dependencies:** unist-util-visit.

---

## Plugin: rehype-asides

**File:** src/plugins/rehype-asides.mjs

**Purpose:** Post-processes aside elements to inject title with shield SVG icon if not present.

**Dependencies:** unist-util-visit.

**Notes:** Avoids double-processing by checking for existing .aside-title child.
