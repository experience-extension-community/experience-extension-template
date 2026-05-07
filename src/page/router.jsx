// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Page router. Loads brand fonts (Material Symbols + Typekit) once
// here so individual pages don't need their own font hooks.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import HooksPage from './HooksPage';
import TermsPage from './TermsPage';
import LinksPage from './LinksPage';

import { loadMaterialSymbolsCSS } from '../utils/branding/loadMaterialSymbols';
import { ensureTypekitFont } from '../utils/branding/fontLoader';

const RouterPage = (props) => {
    useEffect(() => {
        loadMaterialSymbolsCSS();
        ensureTypekitFont();
    }, []);

    return (
        <Router basename={props.pageInfo.basePath}>
            <Switch>
                <Route exact path="/">
                    <Home {...props} />
                </Route>
                <Route path="/hooks">
                    <HooksPage {...props} />
                </Route>
                <Route path="/terms">
                    <TermsPage {...props} />
                </Route>
                <Route path="/links">
                    <LinksPage {...props} />
                </Route>
            </Switch>
        </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired,
};

export default RouterPage;
