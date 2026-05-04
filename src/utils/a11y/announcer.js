// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// ARIA live-region announcer.
//
// Use to announce dynamic state changes (loaded, saved, error) to
// assistive technologies. Two priorities:
//   - polite:    queued; AT speaks when current utterance ends.
//   - assertive: interrupts; reserve for genuine errors.
//
// Components should prefer `useAnnouncer()` (in src/hooks/) over
// touching these primitives directly.

const REGION_ID = (priority) => `eec-live-region-${priority}`;

const ensureRegion = (priority) => {
  if (typeof document === 'undefined') return null;
  const existing = document.getElementById(REGION_ID(priority));
  if (existing) return existing;

  const region = document.createElement('div');
  region.id = REGION_ID(priority);
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', priority);
  region.setAttribute('aria-atomic', 'true');
  // Visually hidden, available to AT.
  Object.assign(region.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: '0',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: '0',
  });
  document.body.appendChild(region);
  return region;
};

export const announce = (message, { priority = 'polite' } = {}) => {
  const region = ensureRegion(priority);
  if (!region) return;
  // Clearing first forces AT to re-announce the new value even when
  // it matches the previous one.
  region.textContent = '';
  // Defer slightly so screen readers register the change.
  setTimeout(() => {
    region.textContent = message;
  }, 50);
};
