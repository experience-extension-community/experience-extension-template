// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Webpack configuration for the Experience extension build.
//
// The Ellucian SDK exposes `webpackConfigBuilder` from
// `@ellucian/experience-extension`. We call it with our extension
// manifest + version and (optionally) mutate the resulting config
// for advanced scenarios. This pattern is the canonical one used by
// Ellucian's official sdk-samples and every Florida Poly extension.

require('dotenv').config();
const packageJson = require('./package.json');
const extensionConfig = require('./extension.js');
const Dotenv = require('dotenv-webpack');

const { webpackConfigBuilder } = require('@ellucian/experience-extension');

// If the manifest was authored without a publisher, fall back to the
// PUBLISHER env var (set in `.env`). Lets one fork serve multiple
// institutional builds without editing extension.js per build.
const { PUBLISHER } = process.env;
if (!extensionConfig.publisher && PUBLISHER) {
    extensionConfig.publisher = PUBLISHER;
}

module.exports = async (env, options) => {
    const webpackConfig = await webpackConfigBuilder({
        extensionConfig,
        extensionVersion: packageJson.version,
        mode: options.mode || 'production',
        verbose: env.verbose || process.env.EXPERIENCE_EXTENSION_VERBOSE || false,
        upload: env.upload || process.env.EXPERIENCE_EXTENSION_UPLOAD || false,
        forceUpload:
            env.forceUpload || process.env.EXPERIENCE_EXTENSION_FORCE_UPLOAD || false,
        uploadToken: process.env.EXPERIENCE_EXTENSION_UPLOAD_TOKEN,
        liveReload: env.liveReload || false,
        port: process.env.PORT || 8082,
    });

    // Inject .env values into the bundle so cards can read PIPELINE_*,
    // TYPEKIT_KIT_ID, etc. via `process.env.*` at runtime.
    webpackConfig.plugins.push(new Dotenv({ systemvars: true }));

    return webpackConfig;
};
