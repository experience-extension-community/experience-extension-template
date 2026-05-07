// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import SamplePage from './SamplePage/SamplePage';

import { loadMaterialSymbolsCSS } from '../utils/branding/loadMaterialSymbols';

const RouterPage = (props) => {

    useEffect(() => {
        loadMaterialSymbolsCSS();
    }, [])

    return (
        <Router basename={props.pageInfo.basePath}>
            <Switch>
                <Route exact path="/">
                    <Home {...props} />
                </Route>
                <Route path="/sample">
                    <SamplePage {...props} />
                </Route>
            </Switch>
        </Router>
    )

};

RouterPage.propTypes = {
    pageInfo: PropTypes.object.isRequired,
     cardInfo: PropTypes.object.isRequired
};

export default RouterPage;
