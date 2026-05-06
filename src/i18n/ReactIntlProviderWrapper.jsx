// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// withIntl HOC — class component using injectIntl. Ported byte-for-byte
// from Florida Poly's exp-canvas-teachers and exp-account-details-custom
// extensions. Reads `userInfo` from this.props (the Experience SDK
// passes it down to the card wrapper) and renders the institutional
// Typekit stylesheet inline inside <IntlProvider>.
//
// HOC composition: `withStyles(styles)(withIntl(Card))` — withStyles
// outermost.

import React from 'react';
import { injectIntl, IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import { getMessages } from './intlUtility';

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
                <IntlProvider locale={locale} messages={getMessages(locale)}>
                    <link rel="stylesheet" href="https://use.typekit.net/yld8vhe.css" />
                    <InjectedComponent {...this.props} />
                </IntlProvider>
            );
        }
    }

    WithIntl.propTypes = {
        userInfo: PropTypes.object,
    };

    WithIntl.displayName = `WithIntl(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WithIntl;
}
