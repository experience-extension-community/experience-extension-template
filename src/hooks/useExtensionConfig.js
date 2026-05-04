// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Typed accessor for Experience-managed configuration.
//
// Reads card-level and extension-level configuration via the SDK and
// returns a flat object with optional defaults. Components should
// read configuration through this hook instead of touching
// `useCardInfo` / `useExtensionInfo` directly — that way default
// fallback values live in one place and bugs from missing config
// surface predictably.

import { useExtensionInfo, useCardInfo } from '@ellucian/experience-extension-utils';

/**
 * @param {object} [defaults] map of config key -> default value
 * @returns merged configuration with defaults applied
 */
export const useExtensionConfig = (defaults = {}) => {
  const extensionInfo = useExtensionInfo() || {};
  const cardInfo = useCardInfo() || {};

  const extensionConfig = extensionInfo.configuration?.client || {};
  const cardConfig = cardInfo.configuration?.client || {};

  return {
    ...defaults,
    ...extensionConfig,
    ...cardConfig,
  };
};
