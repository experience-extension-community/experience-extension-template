// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);
