// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors
//
// Material Symbols Outlined glyph.
//
// Decorative icons (default) get aria-hidden so AT skips them.
// Provide `label` for icons that carry meaning the surrounding UI
// does not already convey — that converts the element to role="img"
// with the label as its accessible name.

import React from 'react';
import PropTypes from 'prop-types';
import { iconStyle } from '../utils/branding/icons';

const Icon = ({
    name,
    size = 24,
    weight = 400,
    fill = 0,
    grade = 0,
    label,
    className,
    style,
}) => {
    const decorative = !label;
    const ariaProps = decorative
        ? { 'aria-hidden': 'true' }
        : { role: 'img', 'aria-label': label };

    return (
        <span
            {...ariaProps}
            className={className}
            style={{ ...iconStyle({ size, weight, fill, grade }), ...style }}
        >
            {name}
        </span>
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    weight: PropTypes.number,
    fill: PropTypes.oneOf([0, 1]),
    grade: PropTypes.number,
    label: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default Icon;
