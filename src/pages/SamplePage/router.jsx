// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// The page entry point referenced by `page.source` in extension.js.
// Uses HashRouter so it works inside the Experience iframe shell.
//
// Add additional routes here as the extension grows; the
// PageLinkCard's pageRoute defaults to `/`.

import { HashRouter, Route, Switch } from 'react-router-dom';

import { SamplePage } from './SamplePage';
import { withIntl } from '../../i18n/ReactIntlProviderWrapper';

const Router = () => (
    <HashRouter>
        <Switch>
            <Route path="/" exact component={SamplePage} />
        </Switch>
    </HashRouter>
);

export default withIntl(Router);
