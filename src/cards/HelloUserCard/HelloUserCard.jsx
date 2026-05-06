// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// MINIMUM VIABLE CARD.
//
// One function component. No HOCs. No SDK hooks. No useStyles, no
// withStyles, no withIntl, no useUserInfo, no useExtensionControl.
// No PropTypes. No useTypekitFont. Nothing.
//
// Just a Typography element with literal text. If this doesn't load
// in the SDK dev shell, the issue is environmental (the manifest,
// package.json, or Ellucian's runtime), not in our component code.
//
// Once this works, build up: add withStyles → add withIntl → add
// hooks → etc., one piece at a time, testing after each.

import React from 'react';
import { Typography } from '@ellucian/react-design-system/core';

const HelloUserCard = () => (
    <Typography variant="body1">Hello, World!</Typography>
);

export default HelloUserCard;
