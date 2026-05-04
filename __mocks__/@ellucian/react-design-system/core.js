// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Stand-in for the EDS core component module under Jest. Each
// component renders its children in a plain element with the same
// data-component name so tests can assert on shape without the real
// Path styling.

const React = require('react');

const stub = (name) => {
    const Component = ({ children, ...props }) =>
        React.createElement(
            'div',
            { 'data-component': name, ...props },
            children,
        );
    Component.displayName = name;
    return Component;
};

module.exports = {
    Card: stub('Card'),
    CardContent: stub('CardContent'),
    Button: ({ children, onClick, disabled, ...props }) =>
        React.createElement('button', { onClick, disabled, ...props }, children),
    IconButton: ({ children, onClick, disabled, 'aria-label': ariaLabel, ...props }) =>
        React.createElement(
            'button',
            { onClick, disabled, 'aria-label': ariaLabel, ...props },
            children,
        ),
    TextField: ({ label, value, onChange, error, helperText, ...props }) =>
        React.createElement('label', null,
            React.createElement('span', null, label),
            React.createElement('input', { value: value || '', onChange, ...props }),
            error && helperText
                ? React.createElement('span', { role: 'alert' }, helperText)
                : null,
        ),
    Typography: ({ children, ...props }) =>
        React.createElement('p', props, children),
    Divider: stub('Divider'),
    Grid: stub('Grid'),
    Box: stub('Box'),
    CircularProgress: (props) =>
        React.createElement('div', { 'data-testid': 'spinner', ...props }),
};
