// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
jest.mock('@ellucian/experience-extension-utils');
jest.mock('@ellucian/react-design-system/core', () => ({
  CircularProgress: (props) => <span data-testid="spinner" {...props} />,
}));

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('renders the default label and spinner', () => {
    render(<LoadingState />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('respects a custom label', () => {
    render(<LoadingState label="Fetching grades…" />);
    expect(screen.getByText('Fetching grades…')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<LoadingState />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
