// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
jest.mock('@ellucian/experience-extension-utils');
jest.mock('@ellucian/react-design-system/core', () => ({
  Typography: ({ children, ...props }) => <p {...props}>{children}</p>,
}));

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title and optional description', () => {
    render(<EmptyState title="No data yet" description="Try again tomorrow." />);
    expect(screen.getByText('No data yet')).toBeInTheDocument();
    expect(screen.getByText('Try again tomorrow.')).toBeInTheDocument();
  });

  it('renders without description', () => {
    render(<EmptyState title="No data" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<EmptyState title="x" description="y" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
