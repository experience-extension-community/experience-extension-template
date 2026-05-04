// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import PropTypes from 'prop-types';
import { Button, Typography } from '@ellucian/react-design-system/core';
import { useResolvedTheme } from '../../utils/branding';
import { Icon } from '../Icon';
import { EthosError } from '../../utils/ethos';

export const ErrorState = ({ error, onRetry, fallbackMessage }) => {
  const { spacing, palette } = useResolvedTheme();

  const message =
    (error instanceof EthosError && error.userMessage?.fallback) || fallbackMessage;

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: spacing.lg,
        gap: spacing.sm,
      }}
    >
      <Icon name="error" size={32} fill={1} label="Error" style={{ color: palette.danger }} />
      <Typography variant="body1">{message}</Typography>
      {onRetry ? (
        <Button color="secondary" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
};

ErrorState.propTypes = {
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.object]),
  onRetry: PropTypes.func,
  fallbackMessage: PropTypes.string,
};

ErrorState.defaultProps = {
  error: undefined,
  onRetry: undefined,
  fallbackMessage: 'Something went wrong.',
};
