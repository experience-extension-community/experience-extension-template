// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IntlProvider } from 'react-intl';

import LoadingState from './LoadingState';

const renderWithIntl = (ui) =>
    render(
        <IntlProvider locale="en" messages={{}}>
            {ui}
        </IntlProvider>,
    );

describe('LoadingState', () => {
    it('renders the default label and a spinner', () => {
        renderWithIntl(<LoadingState />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.getByText('Loading…')).toBeInTheDocument();
    });

    it('respects a custom label', () => {
        renderWithIntl(<LoadingState label="Fetching grades…" />);
        expect(screen.getByText('Fetching grades…')).toBeInTheDocument();
    });

    it('has no axe violations', async () => {
        const { container } = renderWithIntl(<LoadingState />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
