// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { CircularProgress } from '@ellucian/react-design-system/core';
import { useResolvedTheme } from '../../utils/branding';

export const LoadingState = ({ label }) => {
  const { spacing } = useResolvedTheme();

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        gap: spacing.sm,
      }}
    >
      <CircularProgress aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
};

LoadingState.propTypes = {
  label: PropTypes.string,
};

LoadingState.defaultProps = {
  label: 'Loading…',
};
