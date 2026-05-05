// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Stand-in for the Path Design System styles module under Jest. EDS
// only exports `withStyles` (HOC); we previously had a `makeStyles`
// stub here too, but the real package doesn't expose makeStyles, and
// shipping a stub for it caused tests to mask a runtime bug. Keep
// this mock honest with the real surface.

const makeClassesProxy = () =>
    new Proxy({}, { get: (_, prop) => (typeof prop === 'string' ? prop : undefined) });

module.exports = {
    withStyles: () => (Component) => {
        const Wrapped = (props) => Component({ ...props, classes: makeClassesProxy() });
        Wrapped.displayName = `withStyles(${Component.displayName || Component.name || 'Component'})`;
        return Wrapped;
    },
};
