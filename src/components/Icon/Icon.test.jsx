// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Icon } from './Icon';

describe('Icon', () => {
  it('hides decorative icons from assistive tech', () => {
    const { container } = render(<Icon name="school" />);
    const span = container.querySelector('span');
    expect(span).toHaveAttribute('aria-hidden', 'true');
  });

  it('exposes a labelled icon as role="img"', () => {
    const { getByRole } = render(<Icon name="school" label="School" />);
    expect(getByRole('img', { name: 'School' })).toBeInTheDocument();
  });

  it('has no axe violations in either mode', async () => {
    const { container, rerender } = render(<Icon name="school" />);
    expect(await axe(container)).toHaveNoViolations();
    rerender(<Icon name="school" label="School" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
