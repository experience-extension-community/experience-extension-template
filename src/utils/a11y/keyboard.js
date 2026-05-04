// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Keyboard navigation primitives. Imported by components that build
// custom widgets where the design system's defaults are not sufficient.

export const Keys = Object.freeze({
  ENTER: 'Enter',
  SPACE: ' ',
  ESC: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
});

/**
 * Treat Enter and Space as "activate." Use on non-button interactive
 * elements (e.g. role="button" divs) to keep them keyboard-operable.
 */
export const onActivate = (handler) => (event) => {
  if (event.key === Keys.ENTER || event.key === Keys.SPACE) {
    event.preventDefault();
    handler(event);
  }
};

/** Bind a handler to the Escape key. */
export const onEscape = (handler) => (event) => {
  if (event.key === Keys.ESC) {
    event.preventDefault();
    handler(event);
  }
};
