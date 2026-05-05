// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// withIntl HOC — class component using injectIntl. Mirrors the pattern
// used by Florida Poly's exp-account-details-custom and
// exp-canvas-teachers extensions exactly. Reads `userInfo` from props
// (the Experience SDK passes it down) and renders the institutional
// brand-font + Material Symbols Outlined stylesheets inline so they
// load whenever a card or page wrapped with withIntl mounts.

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, IntlProvider } from 'react-intl';

import { getMessages } from './intlUtility';

// Adobe Typekit kit ID for the institutional brand font. Replace with
// your kit, or remove the matching <link> below if your institution
// doesn't use Typekit.
const TYPEKIT_HREF = 'https://use.typekit.net/yld8vhe.css';

// Material Symbols Outlined — Google Fonts hosted icon font. Used by
// the <Icon> component. Loaded inline so any card / page that mounts
// gets the icon glyphs available immediately.
const MATERIAL_SYMBOLS_HREF =
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=block';

export function withIntl(WrappedComponent) {
    let InjectedComponent;

    class WithIntl extends React.Component {
        constructor(props) {
            super(props);
            InjectedComponent = injectIntl(WrappedComponent);
        }

        render() {
            const { userInfo: { locale } = {} } = this.props;

            return (
                <IntlProvider
                    locale={locale || 'en'}
                    messages={getMessages(locale || 'en')}
                >
                    <link rel="stylesheet" href={TYPEKIT_HREF} />
                    <link rel="stylesheet" href={MATERIAL_SYMBOLS_HREF} />
                    <InjectedComponent {...this.props} />
                </IntlProvider>
            );
        }
    }

    WithIntl.propTypes = {
        userInfo: PropTypes.object,
    };

    WithIntl.displayName = `WithIntl(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithIntl;
}
