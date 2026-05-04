// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
jest.mock('@ellucian/experience-extension-utils');
jest.mock('@ellucian/react-design-system/core', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Typography: ({ children, ...props }) => <p {...props}>{children}</p>,
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ErrorState } from './ErrorState';
import { EthosError, ErrorCategory } from '../../utils/ethos';

describe('ErrorState', () => {
  it('renders the fallback message when no error is given', () => {
    render(<ErrorState fallbackMessage="Boom." />);
    expect(screen.getByRole('alert')).toHaveTextContent('Boom.');
  });

  it('renders the EthosError userMessage when one is given', () => {
    const err = new EthosError({ category: ErrorCategory.NETWORK });
    render(<ErrorState error={err} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/cannot reach the server/i);
  });

  it('shows a retry button when onRetry is provided', async () => {
    const onRetry = jest.fn();
    render(<ErrorState onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: /try again/i });
    await userEvent.click(button);
    expect(onRetry).toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ErrorState onRetry={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
