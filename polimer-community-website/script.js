/**
 * script.js - Polimer Community Website
 * JavaScript interactivity is added incrementally across tasks.
 * Utility functions (formatDate, validateEmail, validateField) and
 * event handlers are wired in tasks 9.x, 10.x, 11.x.
 */

'use strict';

// -------------------------------------------------------------
// Utility: formatDate
// -------------------------------------------------------------

/** Month names indexed 1-12 (index 0 is unused). */
const MONTH_NAMES = [
  '',           // 0 - unused
  'January',    // 1
  'February',   // 2
  'March',      // 3
  'April',      // 4
  'May',        // 5
  'June',       // 6
  'July',       // 7
  'August',     // 8
  'September',  // 9
  'October',    // 10
  'November',   // 11
  'December',   // 12
];

/**
 * Formats an integer day, month, and year into a human-readable date string.
 *
 * @param {number} day   - Day of the month (1-31)
 * @param {number} month - Month of the year (1-12)
 * @param {number} year  - Four-digit year (e.g. 2026)
 * @returns {string} e.g. "15 September 2026"
 */
function formatDate(day, month, year) {
  return `${day} ${MONTH_NAMES[month]} ${year}`;
}

// -------------------------------------------------------------
// Utility: validateEmail  (task 9.3)
// -------------------------------------------------------------

/**
 * Returns true when `email` conforms to the local-part@domain.tld structure.
 *
 * Rules enforced:
 *  - Must contain "@" with a non-empty local part before it.
 *  - Local part: alphanumeric characters plus the symbols . _ % + -
 *  - Domain: one or more labels separated by dots.
 *  - TLD: 2-63 ASCII letters only (no digits, no hyphens).
 *  - No whitespace or other illegal characters anywhere.
 *
 * @param {string} email
 * @returns {boolean}
 */
function validateEmail(email) {
  if (typeof email !== 'string' || email.trim() === '') return false;
  // Reject an empty local part before checking the full pattern
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return false;
  // Pattern:
  //  ^[a-zA-Z0-9._%+\-]+   - non-empty local part (allowed chars only)
  //  @                      - literal "@"
  //  [a-zA-Z0-9.\-]+        - domain labels (letters, digits, dots, hyphens)
  //  \.                     - mandatory dot before TLD
  //  [a-zA-Z]{2,63}$        - TLD: 2-63 letters
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,63}$/;
  return EMAIL_REGEX.test(email);
}

// -------------------------------------------------------------
// Utility: validateField  (task 9.5)
// -------------------------------------------------------------

/**
 * Returns an error string if `value` is empty or contains only whitespace,
 * otherwise returns null.
 *
 * @param {string} value - The form field value to validate
 * @returns {string|null} "This field is required." when invalid, null when valid
 */
function validateField(value) {
  if (typeof value === 'string' && value.trim().length > 0) {
    return null;
  }
  return 'This field is required.';
}

// -------------------------------------------------------------
// Initialise when the DOM is fully parsed
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // Smooth-scroll for all in-page anchor links  (task 11.1)
  // -----------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // -----------------------------------------------------------------
  // Hamburger toggle  (task 11.2)
  // -----------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav-open');
      hamburger.setAttribute('aria-label',   isOpen ? 'Close navigation menu' : 'Open navigation menu');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Collapse dropdown when a nav link inside it is clicked  (Req 8.4)
    mainNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('nav-open')) {
          mainNav.classList.remove('nav-open');
          hamburger.setAttribute('aria-label',    'Open navigation menu');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // -----------------------------------------------------------------
  // Viewport resize handler  (task 11.3)
  // Collapse the mobile dropdown whenever the viewport widens
  // beyond 768 px so it does not remain open after resizing.  (Req 8.5)
  // -----------------------------------------------------------------

  /**
   * Collapses the nav dropdown and resets hamburger aria state.
   * Called when the viewport width crosses above 768 px.
   */
  function collapseNav() {
    if (mainNav && mainNav.classList.contains('nav-open')) {
      mainNav.classList.remove('nav-open');
      if (hamburger) {
        hamburger.setAttribute('aria-label',    'Open navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  }

  // Debounce helper: fires `fn` only after `delay` ms of inactivity.
  let _resizeTimer = null;
  function debounce(fn, delay) {
    return function () {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(fn, delay);
    };
  }

  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
      collapseNav();
    }
  }, 150));

  // -----------------------------------------------------------------
  // Wire formatDate() to event card <time> elements  (task 13.1)
  // Reads each element's datetime attribute (ISO "YYYY-MM-DD"),
  // parses it, and replaces the static text with the formatted string.
  // -----------------------------------------------------------------
  document.querySelectorAll('#events time[datetime]').forEach((el) => {
    const datetime = el.getAttribute('datetime');
    if (!datetime) return;
    const parts = datetime.split('-').map(Number);
    if (parts.length !== 3) return;
    const [year, month, day] = parts;
    el.textContent = formatDate(day, month, year);
  });

  // -------------------------------------------------------
  // Contact Form — submission handler  (task 10.2)
  // -------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // --- Grab field references ---
      const nameInput    = document.getElementById('name');
      const emailInput   = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameError    = document.getElementById('name-error');
      const emailError   = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      // --- Clear previous error states ---
      [nameInput, emailInput, messageInput].forEach((field) => {
        field.classList.remove('field-error');
      });
      nameError.textContent    = '';
      emailError.textContent   = '';
      messageError.textContent = '';

      // --- Validate each field ---
      const nameErr    = validateField(nameInput.value);
      const messageErr = validateField(messageInput.value);

      // Email: check required first, then format
      let emailErr = null;
      if (validateField(emailInput.value) !== null) {
        emailErr = validateField(emailInput.value); // "This field is required."
      } else if (!validateEmail(emailInput.value)) {
        emailErr = 'Please enter a valid email address';
      }

      // --- Display inline errors ---
      let isValid = true;

      if (nameErr) {
        nameError.textContent = nameErr;
        nameInput.classList.add('field-error');
        isValid = false;
      }

      if (emailErr) {
        emailError.textContent = emailErr;
        emailInput.classList.add('field-error');
        isValid = false;
      }

      if (messageErr) {
        messageError.textContent = messageErr;
        messageInput.classList.add('field-error');
        isValid = false;
      }

      // --- Remove any existing status banner ---
      const existingBanner = contactForm.parentNode.querySelector(
        '.success-msg, .error-banner'
      );
      if (existingBanner) existingBanner.remove();

      if (!isValid) return;

      // --- All fields valid: reset form and show confirmation ---
      try {
        contactForm.reset();

        const successDiv = document.createElement('div');
        successDiv.className = 'success-msg';
        successDiv.textContent =
          'Thank you for reaching out! We will get back to you soon.';
        contactForm.insertAdjacentElement('afterend', successDiv);
      } catch (err) {
        // Network / server error path (triggered if a real fetch ever fails)
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-banner';
        errorDiv.textContent =
          'Something went wrong. Please try again later.';
        contactForm.insertAdjacentElement('afterend', errorDiv);
      }
    });
  }
});

// -------------------------------------------------------------
// CommonJS export shim - allows Jest to import utility functions
// without converting the file to an ES module.
// -------------------------------------------------------------
if (typeof module !== 'undefined') {
  module.exports = { formatDate, validateEmail, validateField };
}
