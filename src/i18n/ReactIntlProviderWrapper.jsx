// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// withIntl HOC — pure functional wrapper that provides the
// react-intl IntlProvider context. Reads `userInfo` from props (the
// Experience SDK passes it down to wrapped cards/pages) and resolves
// the locale; falls back to en-US if not present.
//
// Notes vs FL Poly's older pattern:
//
//   * FL Poly's withIntl is a class component that internally calls
//     `injectIntl(WrappedComponent)` to inject `intl` as a prop.
//     That works under react-intl 5.x. Under react-intl 7.x (this
//     template), `injectIntl` interacts differently with EDS 8.x's
//     `withStyles` HOC and produces a module-load crash.
//
//   * This template's cards use the `useIntl()` hook directly inside
//     their bodies for messages, so the prop injection is unnecessary.
//     Dropping `injectIntl` removes the failure mode.
//
//   * The brand-font and Material Symbols stylesheets are loaded
//     inline by each card (see the `<link>` tags after `<IconSprite />`
//     in every card render — matches FL Poly canvas-teachers'
//     pattern). They are NOT injected from this wrapper, to keep the
//     wrapper minimal and non-invasive.

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { getMessages } from './intlUtility';

const DEFAULT_LOCALE = 'en-US';

export function withIntl(WrappedComponent) {
    function WithIntl(props) {
        const { userInfo } = props;
        const locale = (userInfo && userInfo.locale) || DEFAULT_LOCALE;
        return (
            <IntlProvider locale={locale} messages={getMessages(locale)}>
                <WrappedComponent {...props} />
            </IntlProvider>
        );
    }

    WithIntl.displayName = `WithIntl(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    WithIntl.propTypes = {
        userInfo: PropTypes.object,
    };

    return WithIntl;
}
