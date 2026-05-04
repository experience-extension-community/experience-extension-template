// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { authenticatedFetch } from './authenticatedFetch';
import { EthosError, ErrorCategory } from './errors';

const makeResponse = ({ ok = true, status = 200, body = { hello: 'world' }, contentType = 'application/json' } = {}) => ({
  ok,
  status,
  statusText: ok ? 'OK' : 'ERR',
  headers: {
    get: (name) => {
      if (name.toLowerCase() === 'content-type') return contentType;
      if (name.toLowerCase() === 'x-request-id') return 'req-1';
      return null;
    },
  },
  json: async () => body,
  text: async () => JSON.stringify(body),
});

describe('authenticatedFetch', () => {
  it('throws if no fetcher is provided', async () => {
    await expect(authenticatedFetch(undefined, '/x')).rejects.toBeInstanceOf(EthosError);
  });

  it('returns parsed JSON when the response is ok', async () => {
    const fetcher = jest.fn().mockResolvedValue(makeResponse());
    const result = await authenticatedFetch(fetcher, '/x');
    expect(result.data).toEqual({ hello: 'world' });
    expect(result.status).toBe(200);
    expect(result.requestId).toBe('req-1');
  });

  it('throws a categorized EthosError for non-ok responses', async () => {
    const fetcher = jest.fn().mockResolvedValue(
      makeResponse({ ok: false, status: 401 }),
    );
    await expect(
      authenticatedFetch(fetcher, '/x', { maxRetries: 0 }),
    ).rejects.toMatchObject({ category: ErrorCategory.AUTH, status: 401 });
  });

  it('retries transient server errors and eventually succeeds', async () => {
    const fetcher = jest
      .fn()
      .mockResolvedValueOnce(makeResponse({ ok: false, status: 503 }))
      .mockResolvedValueOnce(makeResponse());
    const result = await authenticatedFetch(fetcher, '/x', { maxRetries: 1 });
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(result.data).toEqual({ hello: 'world' });
  });

  it('does not retry validation errors', async () => {
    const fetcher = jest
      .fn()
      .mockResolvedValue(makeResponse({ ok: false, status: 422 }));
    await expect(
      authenticatedFetch(fetcher, '/x', { maxRetries: 3 }),
    ).rejects.toMatchObject({ category: ErrorCategory.VALIDATION });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
