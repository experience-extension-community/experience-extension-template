// Copyright 2021-2025 Ellucian Company L.P. and its affiliates.
// SPDX-License-Identifier: Apache-2.0
//
// Ported byte-for-byte from FloridaPoly/experience-ethos-examples/
// account-details-dataconnect/extension/src/i18n/ReactIntlProviderWrapper.jsx
// (FL Poly's canonical curated reference, also used in the
// FloridaPoly/exp-account-details-custom production extension).

import React from 'react';
import { injectIntl, IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { getMessages } from '../i18n/intlUtility';

export function withIntl(WrappedComponent) {
    let InjectedComponent;

    class WithIntl extends React.Component {
        constructor(props) {
            super(props);
            InjectedComponent = injectIntl(WrappedComponent);
        }
        render() {
            const { userInfo: { locale } } = this.props;

            return (
                <IntlProvider locale={locale} messages={getMessages(locale)}>
                    <InjectedComponent {...this.props} />
                </IntlProvider>
            );
        }
    }
    WithIntl.propTypes = {
        userInfo: PropTypes.object
    };
    WithIntl.displayName = `WithIntl(${WrappedComponent.displayName})`;
    return WithIntl;
}
