---
name: Rheva Engineering System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#4e5562'
  on-tertiary: '#ffffff'
  tertiary-container: '#666d7b'
  on-tertiary-container: '#eaf0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  surface-light: '#FFFFFF'
  border-light: '#E5E7EB'
  bg-dark: '#0A0A0A'
  surface-dark: '#111111'
  text-primary-dark: '#F5F5F5'
  text-secondary-dark: '#A1A1AA'
  border-dark: '#27272A'
  accent-dark: '#3B82F6'
  status-success: '#10B981'
  status-warning: '#F59E0B'
  status-error: '#EF4444'
typography:
  display:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 80px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Geist
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.025em
  h1:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.025em
  h1-mobile:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  h2:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  h2-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  h3:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  body-large:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  technical-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  technical-tag:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  technical-micro:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a high-precision, technical, and architectural posture for an independent software engineer and product creator. It rejects generic developer portfolio tropes—such as neon terminal glows, decorative 3D meshes, floating geometry, and buzzword-laden copy—in favor of a disciplined, premium editorial SaaS aesthetic inspired by production-grade tools like Linear, Vercel, and Stripe.

The core brand thesis is unequivocal: *Show what I can build, not merely that I can code.* The experience balances two distinct environments under a unified visual grammar:
1. **Public Platform (Portfolio, Case Studies, Product Catalog, Editorial):** Confident whitespace, architectural typography hierarchies, structural 1px dividers, and system diagrams that articulate product and engineering maturity to enterprises, educational institutions, and government bodies.
2. **Internal Workspace (Private Admin CMS & Operations):** Dense, data-rich, utility-first UI prioritizing information scanning, compact operational tables, keyboard shortcuts, and zero-distraction workflow management.

The design philosophy relies on structural clarity: physical layout constraints, clear typographic contrasts, and deliberate accent placement. Blue is never used decoratively; it functions as an indicator of direct interactivity, system state, or verified production deployments.

## Colors

The color system operates on an exacting, neutral substrate where chromatic energy is conserved strictly for semantic value and deliberate focus.

### Thematic Modes
- **Light Theme (Default Public Baseline):** Grounded in `#F8F9FA` for canvas backgrounds, elevated with pure `#FFFFFF` on surface cards and controls. Text hierarchy uses `#111111` for high-contrast optical legibility and `#6B7280` for secondary metadata and technical annotation. Borders adhere to `#E5E7EB`.
- **Dark Theme (Admin Workspace & Toggle):** Grounded in `#0A0A0A` canvas depth with `#111111` container surfaces. Structural delineations use `#27272A` hairline borders, complemented by `#F5F5F5` primary text and `#A1A1AA` muted body text.

### Accent Discipline
Blue (`#2563EB` in light mode, `#3B82F6` in dark mode) is reserved for:
- Primary interactive triggers (Action buttons, submit states)
- Active navigation tabs and selected sidebar entries
- Hyperlinks and interactive system path breadcrumbs
- Active deployment indicators, live software statuses, and release versioning tags

Do not use gradients, tinted background washes, or saturated chromatic panels across large surface areas.

## Typography

The typography pairings contrast clean grotesque geometry with technical monospace precision:
- **Headings & Structural Titles (`Geist`):** Delivers a crisp, modern, engineered appearance. Tight negative letter-spacing ensures optical balance at scale.
- **Body & Continuous Copy (`Inter`):** Provides high legibility and neutral reading flow for editorial long-form articles, project retrospectives, and architecture summaries.
- **System Layer & Metadata (`JetBrains Mono`):** Strictly deployed for code snippets, architecture nodes, system logs, commit hashes, version numbers (`v2.4.0`), software availability indicators, status counters, and technical categorization tags.

Editorial discipline requires headings to be concise and factual. Avoid excessive font weights across intermediate body elements; maintain clear contrast by letting structural scale and position do the work.

## Layout & Spacing

The layout is built on a rigid 4px base scale (4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128px), prioritizing vertical pacing and content alignment.

### Public Grid Framework
- **Desktop (≥1024px):** Max width `1280px` centered canvas, 12-column grid, `24px` (`1.5rem`) gutters, and `96px` to `128px` section padding.
- **Tablet (768px - 1023px):** 8-column layout, `20px` gutters, and `80px` section padding.
- **Mobile (<768px):** 4-column layout, `16px` (`1rem`) gutters, `16px` edge margins, and `64px` section padding.

### Admin Dashboard Layout
The private CMS workspace eschews wide presentation margins for dense productivity:
- Fixed 260px collapsible desktop navigation sidebar.
- 100% fluid workspace canvas constrained with inner auto-scroll zones and sticky secondary action toolbars.
- Data table row heights locked to compact 40px–44px bounds with persistent 16px horizontal cell padding.

## Elevation & Depth

Visual hierarchy does not rely on diffused drop shadows or floating card layers. Depth is achieved through explicit architectural boundaries:

1. **Surface Contrast:** Primary canvas backgrounds (`#F8F9FA` / `#0A0A0A`) set against elevated structural cards (`#FFFFFF` / `#111111`).
2. **Hairline Structural Borders:** Crisp 1px solid edges (`#E5E7EB` in light mode, `#27272A` in dark mode) provide definition without heavy drop shadows.
3. **Restrained Utility Shadows:** Floating overlays, dropdown menus, and modal dialogs use an intentional, low-spread ambient shadow:
   - `0px 1px 2px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.04)` (Light Mode)
   - `0px 0px 0px 1px #27272A, 0px 8px 16px -4px rgba(0, 0, 0, 0.5)` (Dark Mode)
4. **Interactive Focus Layers:** Interactive cards transition border color to neutral-strong (`#111111` or `#F5F5F5`) or primary accent on keyboard focus, maintaining zero physical displacement or translation bounces.

## Shapes

The design uses a restrained, structural corner radius scale to preserve an architectural feel:
- **Small Controls & Inputs:** `6px` (`rounded-sm` to `rounded-md`) for text inputs, select boxes, dropdown items, checkboxes, and inline table filters.
- **Interactive Triggers & Buttons:** `8px` (`rounded-md`) for primary, secondary, and destructive action controls.
- **Cards & Data Panels:** `12px` (`rounded-lg`) for project cards, product catalog cards, code blocks, and dashboard overview metrics.
- **Large Outer Shells & Modals:** `16px` (`rounded-xl`) for application wrappers, slide-over sheets, and dialog overlays.
- **Pills (`rounded-full`):** Reserved exclusively for semantic status badges (e.g., "Available for selected projects"), technology tags (`Next.js`, `Firebase`), and categorization chips. Never use pill-shaped CTA buttons.

## Components

### Buttons & Interactive Controls
- **Primary:** Filled `#111111` (dark: `#F5F5F5`) with inverse text, 8px radius, height 40px (desktop) / 36px (admin compact). Accent blue fill reserved strictly for conversion checkpoints (e.g., "Start a Conversation", "Request License").
- **Secondary / Outline:** Background transparent, 1px border `#E5E7EB` (dark: `#27272A`), hover background `#F8F9FA` (dark: `#18181B`).
- **Ghost:** Text-only, 8px hover padding, background transition to `#F3F4F6` (dark: `#18181B`).

### Badges & Technical Tags
- Built strictly with `JetBrains Mono` at 12px / font-weight 500.
- `rounded-full` pill geometry, 4px vertical padding, 10px horizontal padding.
- Light gray default fill (`#F3F4F6` / dark: `#18181B`) with 1px border (`#E5E7EB` / dark: `#27272A`).
- Live system status indicators feature a leading 6px static circle dot (Green `#10B981` for Available, Amber `#F59E0B` for In Progress).

### Cards & Project Showcases
- White background (`#FFFFFF`), 1px structural border (`#E5E7EB`), 12px radius.
- Internal padding of 24px (public product) or 16px (admin widget).
- Visual previews feature a 1px inner divider separating screenshot assets from functional copy and meta tags.
- Interactive cards feature a 1px border color hover shift to `#111111` (dark: `#3F3F46`). Avoid card lift/elevation transforms.

### Input Fields & Controls
- Height 40px, 6px radius, background `#FFFFFF` (dark: `#111111`), 1px border `#E5E7EB` (dark: `#27272A`).
- Focus ring: 2px solid offset with primary accent `#2563EB` (dark: `#3B82F6`) and zero ambient glow.
- Checkboxes and radios adhere to 16px dimensions with matching 4px / full radii.

### Data Tables (Admin)
- Hairline column and row borders with alternating hover row state (`#F9FAFB` / dark: `#141414`).
- Headers rendered in 12px uppercase `JetBrains Mono` with muted secondary color (`#6B7280` / `#A1A1AA`).
- Explicit status badge cells, monospace numeric counters, and action dropdown trigger dots aligned strictly to the right.