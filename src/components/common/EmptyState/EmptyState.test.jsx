// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IntlProvider } from 'react-intl';

import { EmptyState } from './EmptyState';

const renderWithIntl = (ui) =>
    render(<IntlProvider locale="en" messages={{}}>{ui}</IntlProvider>);

describe('EmptyState', () => {
    it('renders title and optional description', () => {
        renderWithIntl(<EmptyState title="No data yet" description="Try again tomorrow." />);
        expect(screen.getByText('No data yet')).toBeInTheDocument();
        expect(screen.getByText('Try again tomorrow.')).toBeInTheDocument();
    });

    it('renders without description', () => {
        renderWithIntl(<EmptyState title="No data" />);
        expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('has no axe violations', async () => {
        const { container } = renderWithIntl(<EmptyState title="x" description="y" />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
