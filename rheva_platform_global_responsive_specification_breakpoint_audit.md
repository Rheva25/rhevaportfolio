# Rheva Developer Platform — Responsive Architecture & Global Audit Specification
**Document ID:** `DOC_RESPONSIVE_AUDIT_V1`  
**Target Platform:** Rheva Developer Platform (Personal Brand: Rheva Iqbal Abdillah)  
**System Foundation:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Cloud Firestore, Firebase Storage  
**Breakpoints:**
- **Mobile:** `320px – 767px` (Base: `375px` / `390px` / `430px`)
- **Tablet:** `768px – 1023px` (Base: `768px` / `834px` / `900px`)
- **Desktop:** `1024px – 1440px+` (Container Max: `1280px` / `1440px`)

---

## 1. Global Responsive Core Tokens & Rules

### 1.1 Viewport, Containers & Padding Rhythm
| Breakpoint | Outer Page Padding (`px-`) | Section Vertical Rhythm (`py-`) | Max Container Width | Grid Gutters |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (`<768px`)** | `16px` (`px-4`) to `20px` (`px-5`) | `48px` (`py-12`) to `64px` (`py-16`) | `100%` fluid | `16px` (`gap-4`) |
| **Tablet (`768px–1023px`)** | `32px` (`px-8`) | `64px` (`py-16`) to `80px` (`py-20`) | `768px – 960px` | `20px` (`gap-5`) |
| **Desktop (`≥1024px`)** | `48px` (`px-12`) to `64px` (`px-16`) | `96px` (`py-24`) to `128px` (`py-32`) | `1280px` (`max-w-7xl`) | `24px` (`gap-6`) |

### 1.2 Fluid Typography Hierarchy
| Token | Mobile (`<768px`) | Tablet (`768px–1023px`) | Desktop (`≥1024px`) | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `32px – 36px` (`text-3xl / 4xl`) | `44px – 48px` (`text-5xl`) | `56px – 64px` (`text-6xl`) | `leading-[1.1]` |
| **Heading 1 (Page)** | `28px – 32px` (`text-2xl / 3xl`) | `36px` (`text-4xl`) | `40px – 44px` (`text-4xl / 5xl`) | `leading-tight` |
| **Heading 2 (Section)** | `22px – 24px` (`text-xl / 2xl`) | `26px – 28px` (`text-2xl`) | `30px – 32px` (`text-3xl`) | `leading-snug` |
| **Heading 3 (Subhead)** | `18px – 20px` (`text-lg`) | `20px` (`text-xl`) | `22px – 24px` (`text-2xl`) | `leading-snug` |
| **Body (Editorial)** | `15px – 16px` (`text-base`) | `16px` (`text-base`) | `16px – 17px` (`text-base`) | `leading-relaxed (1.65)` |
| **Technical / Monospace** | `11px – 12px` (`text-xs`) | `12px` (`text-xs`) | `12px – 13px` (`text-xs / sm`) | `leading-normal` |

### 1.3 Touch Targets & Interaction Ergonomics
- **Minimum Tap Target:** `44px × 44px` for all clickable/tappable elements on mobile and tablet touch viewports.
- **Form Controls:** Full-width (`w-full`) inputs with `min-h-[44px]` height and `16px` font size on mobile to prevent iOS Safari auto-zoom.
- **Contextual Actions:** Menus and dropdowns utilize bottom-sheet style overlays or full-width sheet drawers on mobile rather than constrained popovers that clip outside screen boundaries.
- **Horizontal Overflow Prevention:** `overflow-x-clip` on root layout containers; strict `overflow-x-auto` with styled scrollbars on data tables, code blocks, and filter pill carousels.

---

## 2. Public Route Audits & Breakpoint Specifications

### 2.1 Public Header & Navigation Shell
- **Desktop (`≥1024px`):** Sticky top bar (`h-16`), minimal wordmark `RHEVA`, centered inline navigation links (`Projects`, `Apps`, `Services`, `Articles`, `About`), and right-aligned `Let's Talk` primary button.
- **Tablet (`768px–1023px`):** Compressed horizontal spacing (`gap-4`), wordmark preserved, `Let's Talk` button condenses or stays secondary outline.
- **Mobile (`<768px`):** Sticky top bar (`h-14`), wordmark `RHEVA` left, hamburger trigger right (`min-w-[44px] min-h-[44px] flex items-center justify-center`). Tapping opens an accessible full-viewport slide-over drawer with high-contrast vertical links, system status beacon, and full-width `Let's Talk` CTA button at the bottom.

### 2.2 Homepage (`/`)
- **Hero Section:**
  - *Desktop:* 2-column or balanced headline with live technical system diagram (`Next.js → Firebase → Vercel`) on the right.
  - *Tablet:* Diagram scales proportionally below or alongside with reduced padding.
  - *Mobile:* Headline rebalances to `text-3xl`, badges wrap into flex rows, CTAs become stacked full-width buttons (`View My Work` followed by `Explore My Apps`), and the architecture node visual converts to a clean linear vertical flow.
- **Featured Projects Strip:**
  - *Desktop:* 2-column large cards with interactive preview thumbnails.
  - *Mobile:* 1-column full-width cards with stacked tags and prominent `View Case Study` links.
- **Apps Catalog & Services Strip:**
  - *Desktop:* 3-column cards.
  - *Tablet:* 2-column cards.
  - *Mobile:* 1-column stacked cards with preserved touch affordances.

### 2.3 Projects Listing (`/projects`) & Project Detail (`/projects/[slug]`)
- **Projects Listing:**
  - *Desktop:* 2-column dense project cards with filter pills along the top.
  - *Tablet:* 2-column cards; filter bar scrolls horizontally (`overflow-x-auto no-scrollbar`).
  - *Mobile:* 1-column stacked cards; thumbnail aspect ratio fixed at 16:9; metadata tags wrap cleanly without clipping.
- **Project Detail Case Study (`/projects/[slug]`):**
  - *Desktop:* Sticky sidebar table-of-contents (`280px`), wide editorial body (`780px`), 2-column architecture diagrams, structured challenge/outcome metric cards.
  - *Tablet:* TOC converts to a sticky collapsible top pill or inline banner; architecture diagrams stack vertically.
  - *Mobile:* Single-column reading flow; system architecture flowcharts rendered inside pinch-zoomable/horizontally scrollable containers with explicit "Swipe to view full diagram" hint; metric cards stack in single-column blocks.

### 2.4 Apps Catalog (`/apps`) & Product Detail (`/apps/[slug]`)
- **Catalog:**
  - *Desktop:* 3-column grid with pricing tier badges, status badges, and direct action triggers.
  - *Mobile:* 1-column stacked layout; pricing model clearly labeled above CTA; cards have generous spacing (`p-5`).
- **Product Detail (`/apps/[slug]`):**
  - *Desktop:* 2-column hero (product specs & licensing card on right, feature monographs on left).
  - *Mobile:* Visual priority strictly preserved: `PRODUCT → VALUE → FEATURES → INTERFACE → ACCESS → CTA`. The deployment card and license request trigger stack beneath the primary feature highlights with a sticky bottom action bar on mobile (`Request License`).

### 2.5 Services & Digital Solutions (`/services`)
- **Desktop:** 2×2 grid of core capability domains (Web Applications, Internal Management Systems, UI/UX Design, Data & Automation) + 4-step horizontal process timeline.
- **Tablet:** 2-column grid; timeline remains 2×2.
- **Mobile:** 1-column service cards with bulleted deliverables; horizontal timeline refactored into a vertical numbered step list with connecting lines to eliminate horizontal scroll fatigue.

### 2.6 Articles Publication (`/articles`) & Article Detail (`/articles/[slug]`)
- **Articles Listing:**
  - *Desktop:* Featured monograph banner + 2-column list of recent technical notes + category filter chips.
  - *Mobile:* 1-column cards; reading time and category badges stacked neatly above the title; horizontal tag filter carousel.
- **Article Detail (`/articles/[slug]`):**
  - *Typography & Line Length:* Max width `680px` (`max-w-prose`) with `leading-relaxed` to guarantee optimal reading ergonomics.
  - *Code Blocks (`<pre><code>`):* Strict horizontal scroll (`overflow-x-auto`), sticky copy button in top-right corner, language badge pinned left. Zero layout overflow.
  - *Callout Boxes & Tables:* Callouts have flexible padding (`p-4 sm:p-5`); tables wrapped in responsive scroll container (`overflow-x-auto shadow-none border rounded-lg`).

### 2.7 About (`/about`)
- **Desktop:** 2-column personal narrative, side-by-side photo gallery (`IMG_7034_Original.jpeg` and `IMG_9031_Original.jpeg`), timeline milestone tree.
- **Mobile:** Photos stack naturally with preserved aspect ratios (`aspect-[4/5]`); timeline converts to a compact single-track vertical list with bullet markers.

### 2.8 Contact & Inbound Inquiry (`/contact`)
- **Desktop:** 2-column layout (contact direct endpoints and WhatsApp on left, structured Firestore inquiry form on right).
- **Mobile:** Single-column layout; direct communication channels placed in a compact header card; form inputs expand to full-width with `min-h-[44px]` touch targets, comfortable keyboard input types (`type="email"`, `type="tel"`), and floating validation feedback.

---

## 3. Admin Application Shell & CMS Responsive Specifications

### 3.1 Admin Shell (`AdminShell`) Breakpoint Matrix
| Component | Desktop (`≥1024px`) | Tablet (`768px–1023px`) | Mobile (`<768px`) |
| :--- | :--- | :--- | :--- |
| **Sidebar Navigation** | Persistent left sidebar (`w-64 fixed inset-y-0`) | Collapsed icon sidebar (`w-16`) or drawer trigger | Hidden off-canvas; accessible via slide-over drawer |
| **Top Admin Header** | Full breadcrumbs, Firestore live beacon, quick search (`⌘K`), Superadmin profile | Compact breadcrumb (`admin / [slug]`), search icon, avatar | Header `h-14` with Hamburger trigger, Page Title, and Avatar |
| **Content Viewport** | `pl-64 pr-8 py-6` | `pl-16 pr-6 py-6` or full-width | Full-width `px-4 py-5` with zero margin entrapment |

### 3.2 Admin Tables (Projects, Apps, Articles, Inquiries)
- **Desktop:** Dense multi-column data table displaying thumbnail preview, title/slug, category, status pill, metrics/tags, author, timestamps, and row action triggers (`•••`).
- **Tablet:** Priority columns only (Checkbox, Title/Identity, Status, Last Updated, Actions); secondary technical metadata accessible via click.
- **Mobile:**
  - *Adaptive Card Transformation:* Instead of unreadable, squished table rows, each record transforms into a responsive card card-item:
    - Top row: Status badge + Timestamp
    - Middle: Title/Identifier (bold) + Category tag
    - Bottom: Primary Action button (e.g. `Edit`, `Inspect`) + Contextual Menu trigger
  - *Horizontal Scroll Container:* When table view is explicitly toggled, the table is wrapped in a container with a subtle fade indicator on the right edge and `overflow-x-auto`.

### 3.3 Admin Editors (`/admin/articles/new`, `/admin/projects/new`, `/admin/apps/new`)
- **Desktop (`≥1024px`):** 2-column editorial workspace (68% Main Content / 32% Publication Sidebar).
- **Tablet (`768px–1023px`):** Two columns compress (60% / 40%) or sidebar becomes collapsible tab panel.
- **Mobile (`<768px`):**
  - Strict single-column stack.
  - Formatting toolbar scrolls horizontally with prominent touch controls.
  - Publication, taxonomy, and SEO settings collapse into expandable accordion sections beneath the main content editor.
  - Sticky bottom action bar with `Save Draft` (outline) and `Publish / Update` (primary blue) always within thumb reach.

### 3.4 Media Library (`/admin/media`)
- **Desktop:** 4-column media asset grid with 32% sticky right inspector drawer (`ASSET TELEMETRY`).
- **Tablet:** 3-column media asset grid; inspector drawer converts to a slide-over sheet.
- **Mobile:** 2-column media asset grid with square aspect ratio thumbnails; tapping an asset opens a full-screen bottom-sheet inspector displaying file spec, alt text editor, and copy URL button. Upload trigger is pinned as a floating action button or prominent top trigger.

### 3.5 Admin Settings (`/admin/settings`)
- **Desktop:** Left vertical sub-navigation list (`General`, `Profile`, `Contact`, `SEO`, `Public Site`, `Security`, `Danger Zone`) + Right wide settings form.
- **Tablet:** Sub-navigation condenses into a horizontal icon/tab bar.
- **Mobile:** Sub-navigation transforms into a sticky horizontal scrollable tab strip or accessible dropdown select. Configuration cards take full width with responsive inputs. Floating unsaved changes bar pins to the bottom viewport edge.

---

## 4. Touch & Ergonomic Verification Checklist
- [x] All primary and secondary CTA buttons maintain a touch height of `≥44px`.
- [x] No fixed horizontal widths exceed `100vw`; page-level horizontal scrolling is prevented across all routes.
- [x] Code snippets in technical monographs feature isolated horizontal scrolling (`overflow-x-auto`) with visible code language badge and accessible copy button.
- [x] Admin data tables dynamically adapt between structured priority columns, horizontal scroll enclosures, and mobile card transformations.
- [x] Admin editing workflows (Project, App, Article editors) cleanly collapse from 2-column desktop layouts to single-column vertical flows on mobile with persistent save actions.
- [x] Modals, drawers, and confirmation dialogs enforce internal scrolling (`max-h-[85vh] overflow-y-auto`) and bottom-positioned action buttons for thumb reachability on mobile viewports.
