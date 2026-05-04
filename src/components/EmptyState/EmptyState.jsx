// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { Typography } from '@ellucian/react-design-system/core';
import { useResolvedTheme } from '../../utils/branding';
import { Icon } from '../Icon';

export const EmptyState = ({ title, description, icon }) => {
  const { spacing, palette } = useResolvedTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: spacing.lg,
        gap: spacing.sm,
      }}
    >
      <Icon name={icon} size={32} style={{ color: palette.neutralDark }} />
      <Typography variant="h6">{title}</Typography>
      {description ? <Typography variant="body2">{description}</Typography> : null}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
};

EmptyState.defaultProps = {
  description: undefined,
  icon: 'inbox',
};
