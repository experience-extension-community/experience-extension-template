// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Shared PropTypes for SDK-injected props. Components that read
// `cardInfo`, `pageInfo`, `userInfo`, `dashboardInfo`, or `themeInfo`
// can import these instead of redeclaring the shape locally.

import PropTypes from 'prop-types';

export const userInfoShape = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  preferredName: PropTypes.string,
  email: PropTypes.string,
  locale: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
});

export const cardInfoShape = PropTypes.shape({
  cardId: PropTypes.string,
  cardPrefix: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  configuration: PropTypes.shape({
    client: PropTypes.object,
    server: PropTypes.object,
  }),
});

export const pageInfoShape = PropTypes.shape({
  pageId: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  configuration: PropTypes.shape({
    client: PropTypes.object,
    server: PropTypes.object,
  }),
});

export const dashboardInfoShape = PropTypes.shape({
  dashboardId: PropTypes.string,
  name: PropTypes.string,
});

export const themeInfoShape = PropTypes.shape({
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  ctaColors: PropTypes.shape({
    active: PropTypes.string,
    base: PropTypes.string,
    hover: PropTypes.string,
    tint: PropTypes.string,
  }),
});
