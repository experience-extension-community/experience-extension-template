// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Brand font loader.
//
// Loads an Adobe Typekit kit by ID. The kit ID comes from
// `fontLoader.typekitKitId` in `tokens.js`, but can be overridden at
// runtime via the TYPEKIT_KIT_ID environment variable (set in
// `.env.local` for local dev, or via Experience-managed configuration
// in production).
//
// Idempotent — calling `loadBrandFont()` multiple times will only
// inject the stylesheet once.

import { fontLoader } from './tokens';

const STYLESHEET_ID = 'eec-brand-font';

const resolveKitId = () => {
  if (typeof process !== 'undefined' && process.env && process.env.TYPEKIT_KIT_ID) {
    return process.env.TYPEKIT_KIT_ID;
  }
  return fontLoader.typekitKitId;
};

export const loadBrandFont = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLESHEET_ID)) return;

  const kitId = resolveKitId();
  if (!kitId) return; // Institutions that don't use Typekit can leave it blank.

  const link = document.createElement('link');
  link.id = STYLESHEET_ID;
  link.rel = 'stylesheet';
  link.href = `https://use.typekit.net/${kitId}.css`;
  document.head.appendChild(link);
};
