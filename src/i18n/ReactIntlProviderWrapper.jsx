// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// React-Intl provider wrapper + `withIntl` HOC.
//
// Cards read the current user's locale from `useUserInfo()` and
// resolve messages via `getMessages(userLocale)`. Wrap each card
// (or the page root) in `withIntl(Component)` so descendants can
// call `useIntl()`.

import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { useUserInfo } from '@ellucian/experience-extension-utils';

import { getMessages } from './intlUtility';

const DEFAULT_LOCALE = 'en';

export const ReactIntlProviderWrapper = ({ children }) => {
    const userInfo = useUserInfo() || {};
    const locale = userInfo.locale || DEFAULT_LOCALE;
    const messages = getMessages(locale);

    return (
        <IntlProvider locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages}>
            {children}
        </IntlProvider>
    );
};

ReactIntlProviderWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * HOC that wraps a component in the IntlProvider. Use this on the
 * root component of every card and page.
 */
export const withIntl = (Component) => {
    const Wrapped = (props) => (
        <ReactIntlProviderWrapper>
            <Component {...props} />
        </ReactIntlProviderWrapper>
    );
    Wrapped.displayName = `withIntl(${Component.displayName || Component.name || 'Component'})`;
    return Wrapped;
};
