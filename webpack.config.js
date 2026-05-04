// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Webpack configuration for the Experience extension build.
//
// The Ellucian SDK ships a base webpack config at
// `@ellucian/experience-extension/webpack`. This file passes through
// to that base config without modification — sufficient for the
// majority of extensions.
//
// If you need to extend the build (custom loaders, alias resolution,
// additional plugins), import the base config and merge into it
// here. Do NOT copy/paste the SDK's internals — that fights
// future SDK upgrades.

module.exports = require('@ellucian/experience-extension/webpack');
