# Design Document: Polimer Community Website

## Overview

The Polimer Community Website is a static, single-page website built with plain HTML5, CSS3, and vanilla JavaScript. It requires no build tools, no server-side processing, and no external JavaScript frameworks. The site is served directly from the file system or any static hosting provider.

The design is organized around a single `index.html` file with distinct, semantically-structured sections. All styling lives in a single `style.css` file and all interactivity in a single `script.js` file. The visual language is defined by a green color palette that represents sustainability and growth.

**Tech Stack:**
- HTML5 (semantic markup)
- CSS3 (custom properties, Flexbox, Grid, media queries)
- Vanilla JavaScript (ES6+)
- No external runtime dependencies (icons via inline SVG or a CDN icon set such as Feather Icons, loaded via `<link>`)

---

## Architecture

The site follows a flat, single-page architecture (SPA-like scrolling, no routing). All content is rendered at load time — there is no dynamic data fetching.

```mermaid
graph TD
    Browser -->|HTTP GET index.html| StaticHost[Static File Host]
    StaticHost --> index.html
    index.html -->|link| style.css
    index.html -->|script defer| script.js
    index.html --> NavBar[Navigation Bar]
    index.html --> Hero[Hero Section]
    index.html --> Community[Community Section]
    index.html --> Events[Events Section]
    index.html --> Members[Members Section]
    index.html --> Contact[Contact Section]
    index.html --> FooterComp[Footer]
```

### File Structure

```
polimer-community-website/
├── index.html          # Single page entry point
├── style.css           # All styles, including custom properties and media queries
├── script.js           # Navigation toggle, smooth scroll, form validation
└── assets/
    └── avatars/        # Member avatar images (or placeholder SVGs)
```

### Scroll Architecture

All navigation is anchor-based (`href="#section-id"`). JavaScript intercepts click events on anchor links to apply smooth-scroll behavior via `scrollIntoView({ behavior: 'smooth' })` rather than relying on the CSS `scroll-behavior` property alone (for broader browser support).

---

## Components and Interfaces

### 1. Navigation Bar (`<header>` / `<nav>`)

- Renders as a sticky `position: fixed` bar spanning full viewport width.
- Contains the site logo/name on the left and nav links on the right.
- On viewports ≤ 768px, nav links are hidden and replaced by a hamburger button (`<button>` with `aria-label`).
- Toggling the hamburger adds/removes an `.is-open` class on the `<nav>`, which shows a vertical dropdown via CSS.
- The `aria-label` of the hamburger button is toggled between `"Open navigation menu"` and `"Close navigation menu"` via JS.
- A `ResizeObserver` (or `window.resize` event) collapses the dropdown and restores horizontal layout when the viewport widens above 768px.

**Key attributes / classes:**
| Element | Attribute/Class | Purpose |
|---|---|---|
| `<button id="hamburger">` | `aria-label`, `aria-expanded` | Accessibility for mobile toggle |
| `<nav>` | `.nav-open` | Triggers dropdown visibility |
| `<a>` nav links | `href="#section-id"` | Anchor scroll targets |

---

### 2. Hero Section (`<section id="hero">`)

- Full-width banner with a Green_Theme background.
- Contains an `<h1>` headline (≤ 10 words), a `<p>` subheadline (≤ 30 words), and a CTA `<button>` or `<a>` labeled "Join Our Community".
- Clicking the CTA smooth-scrolls to `#contact`.

---

### 3. Community Section (`<section id="community">`)

- `<h2>` heading: "About Our Community".
- A `<p>` summary paragraph (≤ 100 words).
- A grid of 3–6 feature cards, each a `<div class="feature-card">` containing:
  - An icon (inline SVG or `<img>` with `alt`).
  - A `<h3>` title (≤ 5 words).
  - A `<p>` description (≤ 20 words).
- Cards use CSS Grid with `auto-fit` / `minmax` for responsiveness.

---

### 4. Events Section (`<section id="events">`)

- `<h2>` heading: "Upcoming Events".
- A list of ≥ 3 event cards, each containing:
  - Event name (`<h3>`)
  - Date in "DD Month YYYY" format (`<time datetime="YYYY-MM-DD">`)
  - Delivery mode label (e.g., "Online" / "In-Person") as a `<span class="badge">`.
  - Description `<p>` (≤ 25 words).
  - Optional registration `<a target="_blank" rel="noopener noreferrer">` link.
- Each card has a left-border accent or full border in a Green_Theme color.

---

### 5. Members Section (`<section id="members">`)

- `<h2>` heading: "Our Members".
- 3–12 member cards in a responsive CSS Grid.
  - Viewport > 768px: minimum 3 columns (`repeat(auto-fit, minmax(220px, 1fr))`).
  - Viewport ≤ 768px: single column (`grid-template-columns: 1fr`).
- Each card contains:
  - `<img src="..." alt="[Name]'s avatar" width="64" height="64">` with an `onerror` handler that swaps `src` to an inline SVG placeholder.
  - Member name `<p>` (≤ 60 characters).
  - Role/title `<p>` (≤ 80 characters).
- Fallback avatar uses a base64-encoded SVG data URI set via `onerror`.

---

### 6. Contact Section (`<section id="contact">`)

- `<h2>` heading: "Get In Touch".
- Layout: two-column on wide viewports (form left, contact details right); single-column on mobile.
- Contact Form (`<form id="contact-form">`):
  - `<input type="text" id="name" required>` — full name
  - `<input type="email" id="email" required>` — email address
  - `<textarea id="message" required>` — message
  - `<button type="submit">Send Message</button>`
- Inline validation: on submit attempt, JS validates each field. Errors are rendered into `<span class="error-msg" role="alert">` elements immediately below each input.
- On valid submission: displays a `<div class="success-msg">` with the confirmation text; resets the form.
- On network/server error (if a real submission endpoint is ever added): displays `<div class="error-banner">` with the error text without clearing fields.
- Community details: email address `<a href="mailto:...">`, and at least one social media `<a href="..." target="_blank" rel="noopener noreferrer">`.

---

### 7. Footer (`<footer>`)

- Displays "Polimer Community" brand name and copyright: "© 2026 Polimer Community. All rights reserved."
- Anchor links to all five main sections (same page).
- Background: `#2D6A4F` or `#52B788`.

---

## Data Models

Because this is a static website, there is no database. All content is hard-coded in HTML. The implicit data shapes are:

### Member Card

```
{
  avatarSrc: string,       // path to image or empty (triggers fallback)
  avatarAlt: string,       // "[Name]'s avatar" or descriptive alt
  name: string,            // max 60 characters
  role: string             // max 80 characters
}
```

### Event Entry

```
{
  name: string,            // event name
  date: string,            // ISO 8601 e.g. "2026-09-15"
  displayDate: string,     // "15 September 2026"
  deliveryMode: string,    // "Online" | "In-Person"
  description: string,     // max 25 words
  registrationUrl?: string // optional; opened in new tab
}
```

### Feature Card

```
{
  icon: string,            // inline SVG markup or img src
  title: string,           // max 5 words
  description: string      // max 20 words
}
```

### Contact Form State (client-side, in-memory)

```
{
  name: string,
  email: string,
  message: string,
  status: "idle" | "validating" | "success" | "error"
}
```

### CSS Custom Properties (Design Tokens)

```css
:root {
  --color-primary:   #2D6A4F;  /* dark green */
  --color-secondary: #52B788;  /* medium green */
  --color-light:     #B7E4C7;  /* light green */
  --color-white:     #FFFFFF;
  --color-text:      #1A1A1A;  /* body text */
  --font-size-base:  16px;
  --border-radius:   8px;
  --transition:      0.2s ease;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Assessment: PBT Applicability

This feature is primarily a **static HTML/CSS/JS website** involving UI rendering, CSS layout, DOM manipulation, and a small amount of pure JavaScript logic. The vast majority of requirements are structural/visual checks best handled by example-based tests. However, four areas involve pure functions with large input spaces where property-based testing provides meaningful value:

1. Date formatting (pure function: date → display string)
2. Empty/whitespace field validation (pure function: string → valid/invalid)
3. Email format validation (pure function: string → valid/invalid)
4. Form submission behavior across all valid inputs (stateful but deterministic logic)

**Decision: Partial PBT applicability** — correctness properties are written for the validation and formatting logic; all UI/CSS/layout requirements use example-based or manual tests.

---

### Property 1: Event date formatting produces human-readable output

*For any* valid calendar date (day, month, year), the `formatDate()` function SHALL produce a string matching the pattern `{D} {MonthName} {YYYY}` where the day is a 1–2 digit number, the month is the full English month name, and the year is a four-digit number.

**Validates: Requirements 6.5**

---

### Property 2: Empty or whitespace-only fields are always rejected

*For any* string composed entirely of whitespace characters (spaces, tabs, newlines) or the empty string, submitted as any required form field (name, email, or message), the validation logic SHALL return a "required" error and SHALL NOT treat the input as valid.

**Validates: Requirements 7.3**

---

### Property 3: Email validation rejects all structurally invalid addresses

*For any* string that does not conform to the `local-part@domain.tld` structure — including strings missing `@`, missing the domain component, having an empty local part, or containing illegal characters — the `validateEmail()` function SHALL return `false` and the form SHALL display the message "Please enter a valid email address" below the email field.

**Validates: Requirements 7.4**

---

### Property 4: Valid form submission always shows confirmation and clears all fields

*For any* combination of a valid non-whitespace name, a structurally valid email address, and a non-empty message, submitting the contact form SHALL display the confirmation message "Thank you for reaching out! We will get back to you soon." and SHALL reset all three form fields (name, email, message) to empty strings.

**Validates: Requirements 7.5**

---

## Error Handling

| Scenario | Behavior |
|---|---|
| Member avatar image fails to load | `onerror` swaps `src` to inline SVG placeholder; name and role remain displayed (Req 5.5, 10.5) |
| Contact form submitted with empty fields | Inline `<span role="alert">` appears below each empty field (Req 7.3) |
| Contact form submitted with invalid email | Inline message "Please enter a valid email address" below email field (Req 7.4) |
| Contact form server/network error | Error banner "Something went wrong. Please try again later." without clearing fields (Req 7.7) |
| External registration link | Opens in new tab with `rel="noopener noreferrer"` to prevent tab-napping (Req 6.4) |
| Viewport resize while nav open | Dropdown auto-collapses and horizontal layout restores (Req 8.5) |

---

## Testing Strategy

Because this is a static UI-focused website, the testing approach is primarily **example-based unit tests** for JavaScript logic, **snapshot/DOM tests** for rendering, and **manual/visual checks** for layout and accessibility.

### Unit Tests (JavaScript Logic)

Test file: `script.test.js` (using [Jest](https://jestjs.io/) with jsdom)

Focus areas:
- **Email validation function**: example-based tests covering valid formats, missing `@`, missing domain, invalid TLD, empty string.
- **Form state validation**: tests for empty name, whitespace-only message, invalid email producing correct error messages.
- **Hamburger toggle**: verifies `aria-label` updates and `.nav-open` class toggling.
- **Image fallback**: verifies `onerror` handler sets the placeholder `src`.

### Property-Based Tests (Validation and Formatting Logic)

Library: [fast-check](https://github.com/dubzzz/fast-check) (JavaScript)

Each property test runs a minimum of **100 iterations**.

| Property | Test | fast-check Arbitrary |
|---|---|---|
| Property 1: Date formatting produces human-readable output | Generate valid dates (day 1–28, month 1–12, year 2020–2030); call `formatDate()`; assert output matches `/^\d{1,2} [A-Za-z]+ \d{4}$/` | `fc.record({ day: fc.integer({min:1,max:28}), month: fc.integer({min:1,max:12}), year: fc.integer({min:2020,max:2030}) })` |
| Property 2: Empty/whitespace fields rejected | Generate whitespace-only strings (or empty string) for each required field; assert `validateField()` returns a required-error | `fc.stringOf(fc.constantFrom(' ', '\t', '\n'))` |
| Property 3: Email validation rejects invalid addresses | Generate structurally invalid email strings; assert `validateEmail()` returns false | `fc.string()` filtered to exclude valid email patterns |
| Property 4: Valid submission clears fields and shows confirmation | Generate valid (name, email, message) triples; simulate submit; assert confirmation shown and all fields empty | `fc.record({ name: fc.string({minLength:1}).filter(s=>s.trim().length>0), email: fc.emailAddress(), message: fc.string({minLength:1}).filter(s=>s.trim().length>0) })` |

Tag format for each test:
```js
// Feature: polimer-community-website, Property 1: Event date formatting produces human-readable output
// Feature: polimer-community-website, Property 2: Empty or whitespace-only fields are always rejected
// Feature: polimer-community-website, Property 3: Email validation rejects all structurally invalid addresses
// Feature: polimer-community-website, Property 4: Valid form submission always shows confirmation and clears all fields
```

### Example-Based / Integration Tests

| Area | Approach |
|---|---|
| Navigation smooth scroll | jsdom + click simulation; verify `scrollIntoView` called with correct arguments |
| Hamburger open/close | jsdom; click hamburger, assert `.nav-open` class and aria-label |
| Responsive layout breakpoints | Manual browser resize or Playwright viewport tests |
| Green theme color application | CSS custom property inspection in browser DevTools |
| Member card responsive grid | Manual viewport test at 768px, 769px |
| Event date format | Unit test `formatDate()` with representative inputs |
| Keyboard navigation (Tab/Enter) | Manual testing with keyboard; NVDA/VoiceOver for screen reader check |

### Accessibility Checks

- Run [axe-core](https://github.com/dequelabs/axe-core) via browser extension or Playwright integration to catch WCAG 2.1 AA violations (contrast, alt text, ARIA labels, focus indicators).
- Manual keyboard navigation walkthrough (Tab through all interactive elements, Enter to activate).
- Contrast ratio verification: body text `#1A1A1A` on white → ≈ 17:1 ✓; white on `#2D6A4F` → ≈ 7.5:1 ✓; white on `#52B788` → verify with tool (target ≥ 4.5:1).

### Performance Check

- Use Chrome Lighthouse (or PageSpeed Insights) to verify above-the-fold load time ≤ 3 seconds on a simulated 10 Mbps connection.
- Keep total page weight under 500 KB (uncompressed) by using compressed images and avoiding heavy dependencies.
