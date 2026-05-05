// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import RefreshDataStatusMessage from './RefreshDataStatusMessage';

const renderWithIntl = (ui) =>
    render(
        <IntlProvider locale="en" messages={{}}>
            {ui}
        </IntlProvider>,
    );

describe('RefreshDataStatusMessage', () => {
    it('renders nothing for the idle status', () => {
        const { container } = renderWithIntl(<RefreshDataStatusMessage status="idle" />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders a polite live region while refreshing', () => {
        renderWithIntl(<RefreshDataStatusMessage status="refreshing" />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByText(/refreshing/i)).toBeInTheDocument();
    });

    it('renders an alert region on error and a retry button when provided', () => {
        renderWithIntl(<RefreshDataStatusMessage status="error" onRetry={() => {}} />);
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });
});
