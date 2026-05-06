// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// HashRouter entry referenced by extension.js's `page.source`. The
// page itself uses default English text — no react-intl wrapper at
// this iteration.

import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import SamplePage from './SamplePage';

const Router = () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={SamplePage} />
        </Switch>
    </HashRouter>
);

export default Router;
