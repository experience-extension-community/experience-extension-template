// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { iconStyle } from '../../utils/branding/icons';

/**
 * Material Symbols Outlined glyph.
 *
 * Decorative icons (default) get aria-hidden so AT skips them.
 * Provide `label` for icons that carry meaning the surrounding UI
 * does not already convey — that converts the element to role="img"
 * with the label as its accessible name.
 *
 * Loading the icon stylesheet is the responsibility of a parent —
 * call `useMaterialIconFonts()` (or `loadMaterialSymbolsCSS()`) once
 * at the card / page root.
 */
export const Icon = ({ name, size, weight, fill, grade, label, className, style }) => {
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

Icon.defaultProps = {
    size: 24,
    weight: 400,
    fill: 0,
    grade: 0,
    label: undefined,
    className: undefined,
    style: undefined,
};
