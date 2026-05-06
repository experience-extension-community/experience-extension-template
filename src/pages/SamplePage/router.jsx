// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Page entry referenced by extension.js's `page.source`.
//
// Pattern matches the working FL Poly extensions (e.g.
// custom-simple-links/src/page/router.jsx):
//   - BrowserRouter (NOT HashRouter) with basename = pageInfo.basePath
//   - Component accepts SDK props (pageInfo, cardInfo, ...)
//   - Routes use children syntax so props propagate to child pages
//
// Add additional <Route>s here as the extension grows; each child
// page receives the SDK props via spread.

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SamplePage from './SamplePage';

const RouterPage = (props) => (
    <Router basename={props.pageInfo?.basePath || '/'}>
        <Switch>
            <Route exact path="/">
                <SamplePage {...props} />
            </Route>
            <Route path="/sample">
                <SamplePage {...props} />
            </Route>
        </Switch>
    </Router>
);

RouterPage.propTypes = {
    pageInfo: PropTypes.object.isRequired,
};

export default RouterPage;
