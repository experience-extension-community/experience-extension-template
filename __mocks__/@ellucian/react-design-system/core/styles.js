// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Stand-in for the Path Design System styles module under Jest.
// makeStyles / withStyles return a no-op classes object.

const makeClassesProxy = () =>
    new Proxy({}, { get: (_, prop) => (typeof prop === 'string' ? prop : undefined) });

module.exports = {
    makeStyles: () => () => makeClassesProxy(),
    withStyles: () => (Component) => {
        const Wrapped = (props) => Component({ ...props, classes: makeClassesProxy() });
        Wrapped.displayName = `withStyles(${Component.displayName || Component.name || 'Component'})`;
        return Wrapped;
    },
};
