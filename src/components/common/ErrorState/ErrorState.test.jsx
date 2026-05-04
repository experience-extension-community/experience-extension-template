// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { IntlProvider } from 'react-intl';

import { ErrorState } from './ErrorState';
import { EthosError, ErrorCategory } from '../../../utils/ethos';

const renderWithIntl = (ui) =>
    render(<IntlProvider locale="en" messages={{}}>{ui}</IntlProvider>);

describe('ErrorState', () => {
    it('renders the fallback message when no error is given', () => {
        renderWithIntl(<ErrorState />);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders the EthosError userMessage when one is given', () => {
        const err = new EthosError({ category: ErrorCategory.NETWORK });
        renderWithIntl(<ErrorState error={err} />);
        expect(screen.getByRole('alert')).toHaveTextContent(/cannot reach the server/i);
    });

    it('shows a retry button when onRetry is provided', async () => {
        const onRetry = jest.fn();
        renderWithIntl(<ErrorState onRetry={onRetry} />);
        await userEvent.click(screen.getByRole('button', { name: /try again/i }));
        expect(onRetry).toHaveBeenCalled();
    });

    it('has no axe violations', async () => {
        const { container } = renderWithIntl(<ErrorState onRetry={() => {}} />);
        expect(await axe(container)).toHaveNoViolations();
    });
});
