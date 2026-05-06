// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SamplePage from './SamplePage';

const RouterPage = (props) => (
    <Router basename={props.pageInfo?.basePath || '/'}>
        <Switch>
            <Route path="/">
                <SamplePage {...props} />
            </Route>
        </Switch>
    </Router>
);

RouterPage.propTypes = {
    pageInfo: PropTypes.object.isRequired,
};

export default RouterPage;
