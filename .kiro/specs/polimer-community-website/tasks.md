# Implementation Plan: Polimer Community Website

## Overview

Build a static, single-page website using plain HTML5, CSS3, and vanilla JavaScript (ES6+). The implementation proceeds from project scaffolding and design tokens through each section component, then wires everything together with JavaScript interactivity and a test suite covering both unit and property-based tests.

## Tasks

- [x] 1. Set up project structure, design tokens, and base styles
  - Create the `polimer-community-website/` directory with `index.html`, `style.css`, `script.js`, and `assets/avatars/` subdirectory
  - Define all CSS custom properties (design tokens) in `:root` inside `style.css`: `--color-primary: #2D6A4F`, `--color-secondary: #52B788`, `--color-light: #B7E4C7`, `--color-white: #FFFFFF`, `--color-text: #1A1A1A`, `--font-size-base: 16px`, `--border-radius: 8px`, `--transition: 0.2s ease`
  - Add CSS reset / base styles: `box-sizing: border-box`, `font-size: 16px` on `<html>`, body `color` set to `--color-text`
  - Add a CSS `@media` skeleton for the 768px breakpoint
  - Scaffold `index.html` with `<!DOCTYPE html>`, `<html lang="en">`, `<head>` (charset, viewport meta, title "Polimer Community"), `<link>` for `style.css`, and `<script defer src="script.js">`
  - Add `<header>`, `<nav>`, `<main>`, and `<footer>` landmark elements to `index.html`
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.4, 10.3_

- [x] 2. Implement Navigation Bar
  - [x] 2.1 Build the Navigation Bar HTML structure and desktop styles
    - Inside `<header>`, add `<nav>` containing: site logo/name `<span>` on the left and an `<ul>` of `<a href="#section-id">` links (hero, community, events, members, contact) on the right
    - Style `<header>` as `position: fixed; top: 0; width: 100%; z-index: 1000` with `background-color: var(--color-primary)`
    - Apply `display: flex; justify-content: space-between; align-items: center` to the nav bar layout
    - Add hover styles: change `background-color` to `var(--color-secondary)` on nav links and buttons
    - Add keyboard focus styles: visible outline using a Green_Theme color on all interactive elements
    - _Requirements: 1.1, 1.5, 2.2, 2.5, 2.6_

  - [x] 2.2 Build the hamburger menu button and mobile dropdown
    - Add `<button id="hamburger" aria-label="Open navigation menu" aria-expanded="false">` with an inline SVG hamburger icon inside `<nav>`
    - Hide hamburger button on viewports > 768px; hide `<ul>` nav links on viewports ≤ 768px using `@media` query
    - When `.nav-open` class is present on `<nav>`, display the `<ul>` as a vertical dropdown (CSS only)
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 2.3 Write unit tests for hamburger toggle logic
    - Test that clicking `#hamburger` adds `.nav-open` class to `<nav>` and updates `aria-label` to "Close navigation menu"
    - Test that clicking again removes `.nav-open` and restores `aria-label` to "Open navigation menu"
    - Test that `aria-expanded` attribute is toggled correctly
    - _Requirements: 8.2, 8.3_

- [x] 3. Implement Hero Section
  - [x] 3.1 Build Hero Section HTML and styles
    - Add `<section id="hero">` inside `<main>` with a full-width banner layout and `background-color: var(--color-primary)`
    - Add `<h1>` (≤ 10 words), `<p>` subheadline (≤ 30 words), and `<a href="#contact" class="btn-cta">Join Our Community</a>`
    - Style text in `color: var(--color-white)` for headings and subheadlines
    - Add hover and focus styles for the CTA button
    - _Requirements: 2.3, 3.1, 3.2, 3.3_

- [x] 4. Implement Community Section
  - [x] 4.1 Build Community Section HTML and styles
    - Add `<section id="community">` with `<h2>About Our Community</h2>` and a `<p>` summary (≤ 100 words)
    - Add a CSS Grid container `class="feature-grid"` using `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`
    - Add 3–6 `<div class="feature-card">` elements, each containing an inline SVG icon with `role="img" aria-label="..."`, `<h3>` title (≤ 5 words), and `<p>` description (≤ 20 words)
    - Apply Green_Theme color to each card's background or border using CSS custom properties
    - _Requirements: 2.1, 4.1, 4.2, 4.3, 4.4_

- [x] 5. Implement Events Section
  - [x] 5.1 Build Events Section HTML and styles
    - Add `<section id="events">` with `<h2>Upcoming Events</h2>`
    - Add ≥ 3 event cards, each as `<article class="event-card">` containing: `<h3>` event name, `<time datetime="YYYY-MM-DD">` display date, `<span class="badge">` delivery mode, `<p>` description (≤ 25 words), and optional `<a target="_blank" rel="noopener noreferrer">` registration link
    - Style each event card with a left-border accent using `border-left: 4px solid var(--color-primary)` or full border
    - Display dates in "DD Month YYYY" format via the `formatDate()` helper (implemented in task 9.1)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 6. Implement Members Section
  - [x] 6.1 Build Members Section HTML and styles
    - Add `<section id="members">` with `<h2>Our Members</h2>`
    - Add 3–12 `<article class="member-card">` elements each containing: `<img src="..." alt="[Name]'s avatar" width="64" height="64">`, member name `<p>` (≤ 60 chars), role `<p>` (≤ 80 chars)
    - Style the grid: `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` for viewports > 768px; `grid-template-columns: 1fr` for ≤ 768px via `@media` query
    - Add `onerror` attribute on each `<img>` that sets `src` to a base64-encoded inline SVG placeholder
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.2, 10.5_

  - [ ]* 6.2 Write unit test for avatar image fallback
    - Simulate `onerror` event on a member `<img>` element; assert `src` is replaced with the base64 SVG data URI
    - Assert member name and role `<p>` elements are still present in the DOM after the error
    - _Requirements: 5.5, 10.5_

- [x] 7. Implement Footer
  - [x] 7.1 Build Footer HTML and styles
    - Add `<footer>` with brand name `<span>Polimer Community</span>` and copyright `<p>© 2026 Polimer Community. All rights reserved.</p>`
    - Add `<nav aria-label="Footer navigation">` with anchor links to `#hero`, `#community`, `#events`, `#members`, `#contact`
    - Apply `background-color: var(--color-primary)` and white text
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 8. Checkpoint — Verify static structure
  - Ensure all six sections (nav, hero, community, events, members, footer) render correctly in browser
  - Verify Green_Theme colors and responsive layout at 375px, 768px, and 1280px viewports
  - Check all `<img>` elements have non-empty `alt` attributes; decorative images use `alt=""`
  - Confirm semantic HTML5 landmark elements (`header`, `nav`, `main`, `section`, `footer`) are in place
  - Ask the user if questions arise before continuing to JavaScript

- [x] 9. Implement JavaScript utility functions
  - [x] 9.1 Implement `formatDate(day, month, year)` helper in `script.js`
    - Write a pure function that accepts integer day (1–31), month (1–12), year (YYYY) and returns a string in format `"D Month YYYY"` using a month-name lookup array
    - Export the function so it is importable by the test file
    - _Requirements: 6.5_

  - [ ]* 9.2 Write property test for `formatDate` (Property 1)
    - **Property 1: Event date formatting produces human-readable output**
    - Generate valid dates with `fc.record({ day: fc.integer({min:1,max:28}), month: fc.integer({min:1,max:12}), year: fc.integer({min:2020,max:2030}) })`, call `formatDate()`, assert output matches `/^\d{1,2} [A-Za-z]+ \d{4}$/`
    - Run minimum 100 iterations
    - Tag: `// Feature: polimer-community-website, Property 1: Event date formatting produces human-readable output`
    - **Validates: Requirements 6.5**

  - [x] 9.3 Implement `validateEmail(email)` helper in `script.js`
    - Write a pure function that returns `true` if `email` matches the `local-part@domain.tld` structure, `false` otherwise
    - Handle edge cases: missing `@`, empty local part, missing domain, illegal characters
    - _Requirements: 7.4_

  - [ ]* 9.4 Write property test for `validateEmail` (Property 3)
    - **Property 3: Email validation rejects all structurally invalid addresses**
    - Generate strings with `fc.string()` filtered to exclude valid email patterns; assert `validateEmail()` returns `false`
    - Tag: `// Feature: polimer-community-website, Property 3: Email validation rejects all structurally invalid addresses`
    - **Validates: Requirements 7.4**

  - [x] 9.5 Implement `validateField(value)` (empty/whitespace validation) in `script.js`
    - Write a pure function that returns a "required" error string if `value` is empty or contains only whitespace (`\s`), otherwise returns `null`
    - _Requirements: 7.3_

  - [ ]* 9.6 Write property test for `validateField` (Property 2)
    - **Property 2: Empty or whitespace-only fields are always rejected**
    - Generate whitespace-only strings with `fc.stringOf(fc.constantFrom(' ', '\t', '\n'))` and the empty string; assert `validateField()` returns a required-error (non-null)
    - Tag: `// Feature: polimer-community-website, Property 2: Empty or whitespace-only fields are always rejected`
    - **Validates: Requirements 7.3**

- [x] 10. Implement Contact Section and form validation
  - [x] 10.1 Build Contact Section HTML
    - Add `<section id="contact">` with `<h2>Get In Touch</h2>`
    - Add a two-column layout (CSS Grid or Flexbox) collapsing to single-column at ≤ 768px
    - Add `<form id="contact-form">` with: `<input type="text" id="name" required>`, `<input type="email" id="email" required>`, `<textarea id="message" required>`, `<button type="submit">Send Message</button>`
    - Add `<span class="error-msg" role="alert" id="name-error">`, `<span class="error-msg" role="alert" id="email-error">`, `<span class="error-msg" role="alert" id="message-error">` immediately below each field
    - Add community email `<a href="mailto:...">` and at least one social media `<a href="..." target="_blank" rel="noopener noreferrer">`
    - _Requirements: 7.1, 7.2, 7.6_

  - [x] 10.2 Implement form submission handler in `script.js`
    - Attach a `submit` event listener to `#contact-form` that calls `preventDefault()`
    - On submit: call `validateField()` for name and message, call `validateEmail()` for email; display errors in the corresponding `<span role="alert">` elements when invalid
    - On all fields valid: display `<div class="success-msg">Thank you for reaching out! We will get back to you soon.</div>` and reset all form fields to empty
    - On network/server error (if a fetch is wired): display `<div class="error-banner">Something went wrong. Please try again later.</div>` without clearing fields
    - _Requirements: 7.3, 7.4, 7.5, 7.7_

  - [ ]* 10.3 Write property test for valid form submission (Property 4)
    - **Property 4: Valid form submission always shows confirmation and clears all fields**
    - Generate valid triples with `fc.record({ name: fc.string({minLength:1}).filter(s=>s.trim().length>0), email: fc.emailAddress(), message: fc.string({minLength:1}).filter(s=>s.trim().length>0) })`; populate form fields, simulate submit event; assert confirmation message is shown and all three fields are empty strings
    - Tag: `// Feature: polimer-community-website, Property 4: Valid form submission always shows confirmation and clears all fields`
    - **Validates: Requirements 7.5**

  - [ ]* 10.4 Write unit tests for Contact Form inline validation
    - Test empty name → error shown in `#name-error`
    - Test whitespace-only message → error shown in `#message-error`
    - Test invalid email (missing `@`, missing domain) → "Please enter a valid email address" shown in `#email-error`
    - Test all valid inputs → confirmation message displayed and fields reset
    - _Requirements: 7.3, 7.4, 7.5_

- [x] 11. Implement JavaScript navigation interactivity
  - [x] 11.1 Implement smooth-scroll for anchor links in `script.js`
    - Query all `<a href="#...">` elements; attach `click` event listeners that call `e.preventDefault()` then `document.querySelector(href).scrollIntoView({ behavior: 'smooth' })`
    - _Requirements: 1.4_

  - [x] 11.2 Implement hamburger toggle logic in `script.js`
    - Query `#hamburger` button and `<nav>`; attach `click` handler that toggles `.nav-open` class on `<nav>`
    - Update `aria-label` to "Close navigation menu" when open, "Open navigation menu" when closed
    - Toggle `aria-expanded` attribute accordingly
    - When a nav link inside `.nav-open` is clicked, remove `.nav-open` and reset `aria-label`/`aria-expanded`
    - _Requirements: 8.2, 8.3, 8.4_

  - [x] 11.3 Implement viewport resize handler in `script.js`
    - Attach a `ResizeObserver` (or `window` `resize` event with debounce) that removes `.nav-open` from `<nav>` and resets hamburger `aria-label`/`aria-expanded` when viewport width exceeds 768px
    - _Requirements: 8.5_

  - [ ]* 11.4 Write unit tests for navigation interactivity
    - Test smooth-scroll: simulate click on nav link, assert `scrollIntoView` called with `{ behavior: 'smooth' }`
    - Test hamburger open/close: jsdom click sequence, assert `.nav-open` class and aria attributes
    - Test viewport resize collapse: set window.innerWidth > 768, trigger resize, assert `.nav-open` removed
    - _Requirements: 1.4, 8.2, 8.3, 8.4, 8.5_

- [x] 12. Checkpoint — Full integration verification
  - Ensure all tests pass (`npm test -- --run` or `npx jest`)
  - Verify CTA "Join Our Community" smooth-scrolls to `#contact`
  - Verify hamburger menu opens/closes with correct aria attributes on a 375px viewport
  - Verify avatar `onerror` fallback fires correctly in browser
  - Ask the user if questions arise before finalising

- [ ] 13. Wire date formatting into Events Section
  - [-] 13.1 Apply `formatDate()` to event cards
    - In `script.js`, after DOM content loaded, query all `<time>` elements in `#events`; read the `datetime` attribute (ISO date), parse day/month/year, call `formatDate()`, and set the element's `textContent`
    - _Requirements: 6.5_

- [ ] 14. Final accessibility and performance pass
  - [-] 14.1 Audit and fix WCAG 2.1 AA issues
    - Verify all `<img>` alt attributes are present and descriptive; decorative images use `alt=""`
    - Confirm all interactive elements are reachable via Tab and activatable via Enter
    - Check `aria-label` on hamburger button, `role="alert"` on error spans, `aria-label` on footer nav
    - Verify contrast ratios: `#1A1A1A` on white ≈ 17:1 ✓; white on `#2D6A4F` ≈ 7.5:1 ✓; white on `#52B788` (verify ≥ 4.5:1)
    - _Requirements: 2.4, 2.6, 10.2, 10.3, 10.4_

  - [-] 14.2 Optimize page weight for performance budget
    - Compress/convert any raster images in `assets/avatars/` to keep total page weight under 500 KB
    - Confirm icon set (Feather Icons CDN or inline SVG) does not exceed budget
    - _Requirements: 10.1_

- [~] 15. Final checkpoint — Complete feature verification
  - Ensure all non-optional tests pass
  - Open `index.html` in browser and visually confirm all sections render correctly with Green_Theme colors
  - Confirm responsive layouts at 375px, 768px, and 1280px viewports
  - Ask the user if any questions arise before closing out the implementation

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation before moving to the next phase
- Property tests use [fast-check](https://github.com/dubzzz/fast-check) and validate the four correctness properties defined in the design document
- Unit tests use [Jest](https://jestjs.io/) with jsdom
- Install dev dependencies with: `npm install --save-dev jest jest-environment-jsdom fast-check`
- Run tests once with: `npx jest --testEnvironment jsdom`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "3.1", "4.1", "5.1", "6.1", "7.1"] },
    { "id": 1, "tasks": ["2.2", "9.1", "9.3", "9.5", "10.1"] },
    { "id": 2, "tasks": ["2.3", "9.2", "9.4", "9.6", "10.2", "11.1", "11.2", "11.3"] },
    { "id": 3, "tasks": ["6.2", "10.3", "10.4", "11.4", "13.1"] },
    { "id": 4, "tasks": ["14.1", "14.2"] }
  ]
}
```
